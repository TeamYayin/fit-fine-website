/**
 * Email Templates Module for Eugen Fit & Fine
 * 
 * Follows Single Responsibility Principle (SRP):
 * This module is solely responsible for rendering luxury HTML and text email templates.
 * It is decoupled from network I/O, routing, and HTTP handlers.
 */

/**
 * Renders the internal admin / coaching lead alert email HTML.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.phone
 * @param {string} [data.plan='Gold']
 * @param {string} [data.callbackDate]
 * @param {string} [data.callbackTime]
 * @param {string} [data.message]
 * @returns {string} Branded HTML email string
 */
export function renderAdminNotificationEmail({
  fullName,
  email,
  phone,
  plan = 'Gold',
  callbackDate = 'As soon as possible',
  callbackTime = 'Morning (9 AM - 12 PM)',
  message = '',
}) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff; padding: 32px; border: 1px solid #D4AF37; border-radius: 8px;">
      <div style="text-align: center; border-bottom: 1px solid #333333; padding-bottom: 20px; margin-bottom: 24px;">
        <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Eugen Fit & Fine</h1>
        <p style="color: #888888; font-size: 13px; margin-top: 6px; text-transform: uppercase; letter-spacing: 1px;">New Consultation Request</p>
      </div>

      <div style="background-color: #1c1c1e; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <h2 style="color: #ffffff; font-size: 17px; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #2a2a2c; padding-bottom: 8px;">Applicant Details</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="color: #D4AF37; padding: 6px 0; font-weight: bold; width: 140px;">Selected Tier:</td>
            <td style="color: #ffffff; font-weight: bold;">${plan} Tier</td>
          </tr>
          <tr>
            <td style="color: #888888; padding: 6px 0;">Full Name:</td>
            <td style="color: #ffffff;">${fullName}</td>
          </tr>
          <tr>
            <td style="color: #888888; padding: 6px 0;">Email Address:</td>
            <td style="color: #ffffff;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="color: #888888; padding: 6px 0;">Phone Number:</td>
            <td style="color: #ffffff;"><a href="tel:${phone}" style="color: #D4AF37; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="color: #888888; padding: 6px 0;">Callback Date:</td>
            <td style="color: #ffffff;">${callbackDate}</td>
          </tr>
          <tr>
            <td style="color: #888888; padding: 6px 0;">Preferred Window:</td>
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

      <div style="text-align: center; color: #666666; font-size: 12px; margin-top: 30px; border-top: 1px solid #222222; padding-top: 16px;">
        Delivered from Eugen Fit & Fine Website • Cloudflare Serverless Function
      </div>
    </div>
  `;
}

/**
 * Renders the applicant / member confirmation email HTML.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.phone
 * @param {string} [data.plan='Gold']
 * @param {string} [data.callbackDate]
 * @param {string} [data.callbackTime]
 * @param {string} [data.receiverEmail='subscriptions@eugenfnf.com']
 * @returns {string} Branded HTML email string
 */
export function renderUserConfirmationEmail({
  fullName,
  phone,
  plan = 'Gold',
  callbackDate = 'As soon as possible',
  callbackTime = 'Morning (9 AM - 12 PM)',
  receiverEmail = 'subscriptions@eugenfnf.com',
}) {
  return `
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
            <td style="color: #FFFFFF;">${callbackDate}</td>
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
}

