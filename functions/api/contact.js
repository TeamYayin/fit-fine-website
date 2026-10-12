import {
  renderAdminNotificationEmail,
  renderUserConfirmationEmail,
} from '../templates/emailTemplates.js';

/**
 * Cloudflare Pages Function & Worker Handler: /api/contact
 * Handles consultation requests, input validation, and delivers:
 * 1. Admin Alert to coaching team (CONTACT_RECEIVER_EMAIL)
 * 2. Confirmation & Welcome Email to applicant (email)
 */
export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const data = await context.request.json();
    const {
      fullName,
      email,
      phone,
      plan = 'Gold',
      callbackDate,
      callbackTime = 'Morning (9 AM - 12 PM)',
      message = '',
      _honeypot,
    } = data;

    // 1. Honeypot check: bots fill hidden fields, silently discard
    if (_honeypot && _honeypot.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Request processed' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Validate mandatory fields
    if (!fullName || !email || !phone || !callbackDate) {
      return new Response(
        JSON.stringify({ error: 'Please provide full name, email, phone number, and preferred date.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Phone number validation (10 to 15 digits, international/Indian formats)
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid 10 to 15 digit phone number (e.g. +91 98765 43210).' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 5. Date validation (must not be past date)
    const parsedDate = new Date(callbackDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(parsedDate.getTime()) || parsedDate < today) {
      return new Response(
        JSON.stringify({ error: 'Please select a valid upcoming callback date.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = context?.env?.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in Cloudflare environment variables.');
      return new Response(
        JSON.stringify({
          error: 'Email service configuration missing. Please ensure RESEND_API_KEY is configured in Cloudflare.',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    let rawFromEmail = context?.env?.CONTACT_FROM_EMAIL || 'noreply-contact@eugenfnf.com';
    // If still set to onboarding@resend.dev from testing, automatically use the verified domain
    if (rawFromEmail === 'onboarding@resend.dev') {
      rawFromEmail = 'noreply-contact@eugenfnf.com';
    }
    const receiverEmail = context?.env?.CONTACT_RECEIVER_EMAIL || 'subscriptions@eugenfnf.com';

    // Normalize sender email address (strip existing display names or angle brackets)
    const cleanFromAddress = rawFromEmail.replace(/^.*<([^>]+)>.*$/, '$1').trim();
    const adminFromHeader = `Eugen FnF Inquiries <${cleanFromAddress}>`;
    const userFromHeader = `Eugen Fit & Fine <${cleanFromAddress}>`;

    console.log(`[contact] Dispatching emails via Resend with sender: ${cleanFromAddress}`);

    // Render templates using dedicated emailTemplates module (Single Responsibility Principle)
    const adminEmailHtml = renderAdminNotificationEmail({
      fullName,
      email,
      phone,
      plan,
      callbackDate,
      callbackTime,
      message,
    });

    const userConfirmationHtml = renderUserConfirmationEmail({
      fullName,
      phone,
      plan,
      callbackDate,
      callbackTime,
      receiverEmail,
    });

    // 6. Send Admin Notification Email
    const adminEmailPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: adminFromHeader,
        to: [receiverEmail],
        reply_to: email,
        subject: `New Consultation: ${fullName} (${plan} Tier)`,
        html: adminEmailHtml,
      }),
    });

    // 7. Send User Confirmation Email
    const userEmailPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: userFromHeader,
        to: [email],
        reply_to: receiverEmail,
        subject: `Consultation Confirmed • Eugen Fit & Fine`,
        html: userConfirmationHtml,
      }),
    });

    const [adminRes, userRes] = await Promise.allSettled([adminEmailPromise, userEmailPromise]);

    // Check admin email dispatch result
    if (adminRes.status === 'rejected' || !adminRes.value.ok) {
      const errBody = adminRes.status === 'fulfilled' ? await adminRes.value.text() : adminRes.reason?.message;
      console.error('Resend Admin Email Error:', errBody);
      return new Response(
        JSON.stringify({ error: 'Failed to send consultation email via Resend.', details: errBody }),
        { status: 502, headers: corsHeaders }
      );
    }

    let userEmailStatus = 'sent';
    let userEmailError = null;
    let userEmailId = null;

    if (userRes.status === 'rejected' || !userRes.value.ok) {
      userEmailStatus = 'failed';
      userEmailError = userRes.status === 'fulfilled' ? await userRes.value.text() : userRes.reason?.message;
      console.error('User confirmation email error:', userEmailError);
    } else {
      const userData = await userRes.value.json().catch(() => ({}));
      userEmailId = userData?.id || null;
      console.log('User confirmation email sent successfully. ID:', userEmailId);
    }

    const adminResult = await adminRes.value.json().catch(() => ({}));
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Consultation request received successfully.',
        id: adminResult.id,
        userConfirmation: {
          status: userEmailStatus,
          id: userEmailId,
          error: userEmailError,
        },
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Serverless Function Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error processing request.', details: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
