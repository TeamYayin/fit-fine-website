/**
 * Cloudflare Pages Function & Worker Handler: /api/contact
 * Handles consultation requests and delivers:
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
    if (!fullName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Please provide full name, email address, and phone number.' }),
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

    const rawFromEmail = context?.env?.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    const receiverEmail = context?.env?.CONTACT_RECEIVER_EMAIL || 'subscriptions@eugenfnf.com';

    // Normalize sender email address (strip existing display names or angle brackets)
    const cleanFromAddress = rawFromEmail.replace(/^.*<([^>]+)>.*$/, '$1').trim();
    const adminFromHeader = `Eugen FnF Inquiries <${cleanFromAddress}>`;
    const userFromHeader = `Eugen Fit & Fine <${cleanFromAddress}>`;

    // 4. Construct luxury formatted HTML email for coaching / sales team
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff; padding: 30px; border: 1px solid #D4AF37; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 25px;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Eugen Fit & Fine</h1>
          <p style="color: #888; font-size: 13px; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">New Consultation Request</p>
        </div>

        <div style="background-color: #1c1c1e; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #2a2a2c; padding-bottom: 8px;">Applicant Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="color: #D4AF37; padding: 6px 0; font-weight: bold; width: 140px;">Selected Tier:</td>
              <td style="color: #ffffff; font-weight: bold;">${plan} Tier</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 6px 0;">Full Name:</td>
              <td style="color: #ffffff;">${fullName}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 6px 0;">Email Address:</td>
              <td style="color: #ffffff;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #888; padding: 6px 0;">Phone Number:</td>
              <td style="color: #ffffff;"><a href="tel:${phone}" style="color: #D4AF37; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="color: #888; padding: 6px 0;">Callback Date:</td>
              <td style="color: #ffffff;">${callbackDate || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 6px 0;">Preferred Window:</td>
              <td style="color: #ffffff;">${callbackTime}</td>
            </tr>
          </table>
        </div>

        ${
          message
            ? `
        <div style="background-color: #1c1c1e; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; font-size: 16px; margin-top: 0; margin-bottom: 10px;">Goals & Notes</h2>
          <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        `
            : ''
        }

        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #222; padding-top: 15px;">
          Delivered from Eugen Fit & Fine Website • Cloudflare Serverless Function
        </div>
      </div>
    `;

    // 5. Construct luxury confirmation email for the applicant / user
    const userConfirmationHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A0A0A; color: #FFFFFF; padding: 32px; border: 1px solid #D4AF37; border-radius: 10px;">
        <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.25); padding-bottom: 20px; margin-bottom: 24px;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Eugen Fit & Fine</h1>
          <p style="color: #A0A0A0; font-size: 13px; margin-top: 6px; text-transform: uppercase; letter-spacing: 1.5px;">Consultation Confirmed</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #EEEEEE;">
          Hello <strong>${fullName}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #CCCCCC;">
          Thank you for requesting an elite coaching consultation with Eugen Fit & Fine. We have received your application for the <strong>${plan} Tier</strong> and our senior coaching team is preparing your review.
        </p>

        <div style="background-color: #141416; border: 1px solid #28282C; border-left: 3px solid #D4AF37; border-radius: 6px; padding: 18px; margin: 24px 0;">
          <h3 style="color: #D4AF37; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 12px;">Your Consultation Request Summary</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #CCCCCC;">
            <tr>
              <td style="padding: 6px 0; color: #888888; width: 140px;">Coaching Tier:</td>
              <td style="color: #FFFFFF; font-weight: bold;">${plan} Tier</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888888;">Callback Date:</td>
              <td style="color: #FFFFFF;">${callbackDate || 'As soon as possible'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888888;">Callback Window:</td>
              <td style="color: #FFFFFF;">${callbackTime}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #888888;">Contact Phone:</td>
              <td style="color: #FFFFFF;">${phone}</td>
            </tr>
          </table>
        </div>

        <h3 style="color: #FFFFFF; font-size: 15px; margin-bottom: 8px;">What to Expect Next</h3>
        <ol style="color: #BBBBBB; font-size: 14px; line-height: 1.7; padding-left: 20px; margin-top: 0;">
          <li>A dedicated performance coach will review your objectives and lifestyle structure.</li>
          <li>We will call you at <strong>${phone}</strong> during your requested callback window.</li>
          <li>Together, we will calibrate your training protocol, nutrition breakdown, and tier onboarding.</li>
        </ol>

        <p style="font-size: 13px; color: #888888; line-height: 1.5; margin-top: 24px;">
          Have questions or need to reschedule? Reply directly to this email or contact us at <a href="mailto:${receiverEmail}" style="color: #D4AF37; text-decoration: none;">${receiverEmail}</a>.
        </p>

        <div style="border-top: 1px solid #222222; margin-top: 28px; padding-top: 18px; text-align: center; color: #666666; font-size: 12px;">
          © ${new Date().getFullYear()} Eugen Fit & Fine • Elite Fitness Experience
        </div>
      </div>
    `;

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
