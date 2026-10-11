/**
 * Cloudflare Pages Function: /api/contact
 * Handles consultation requests and delivers emails via Resend REST API
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

    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in Cloudflare Pages environment variables.');
      return new Response(
        JSON.stringify({
          error: 'Email service configuration missing. Please ensure RESEND_API_KEY is configured in Cloudflare Pages.',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const fromEmail = context.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    const receiverEmail = context.env.CONTACT_RECEIVER_EMAIL || 'admin@eugenfnf.com';

    // 4. Construct luxury formatted HTML email for coaching / sales team
    const emailHtml = `
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
          Delivered from Eugen Fit & Fine Website • Cloudflare Pages Function
        </div>
      </div>
    `;

    // 5. Send Email via Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Eugen FnF Inquiries <${fromEmail}>`,
        to: [receiverEmail],
        reply_to: email,
        subject: `New Consultation: ${fullName} (${plan} Tier)`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errBody = await resendResponse.text();
      console.error('Resend API Error:', errBody);
      return new Response(
        JSON.stringify({ error: 'Failed to send consultation email via Resend.', details: errBody }),
        { status: 502, headers: corsHeaders }
      );
    }

    const resendResult = await resendResponse.json();
    return new Response(
      JSON.stringify({ success: true, message: 'Consultation request received successfully.', id: resendResult.id }),
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
