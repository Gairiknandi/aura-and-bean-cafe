import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✓ Configured production SMTP email transporter.');
  } else {
    // Generate test Ethereal account if no production SMTP is provided
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('✓ Configured Ethereal test email transporter (mock/development mode).');
    } catch (e) {
      console.warn('Fallback to JSON transport:', e.message);
      transporter = nodemailer.createTransport({ jsonTransport: true });
    }
  }

  return transporter;
}

export async function sendBookingConfirmationEmail(booking) {
  const mailTransporter = await getTransporter();

  const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF6EE; margin: 0; padding: 24px; color: #26211E; }
        .email-container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 14px; overflow: hidden; border: 1px solid #E8DFD3; box-shadow: 0 8px 24px rgba(33, 19, 13, 0.08); }
        .email-header { background: #21130D; padding: 32px 24px; text-align: center; color: #FAF6EE; }
        .brand-title { font-size: 24px; letter-spacing: 2px; font-weight: bold; margin: 0; color: #FFFFFF; }
        .brand-sub { font-size: 11px; letter-spacing: 3px; color: #C5853B; text-transform: uppercase; margin-top: 4px; }
        .email-body { padding: 32px 28px; }
        .badge { display: inline-block; background: #E8F5E9; color: #2E7D32; font-weight: 600; font-size: 12px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        h1 { font-size: 22px; color: #21130D; margin: 0 0 12px 0; }
        p { font-size: 15px; line-height: 1.6; color: #555555; margin: 0 0 20px 0; }
        .code-box { background: #F4EBE0; border-left: 4px solid #C5853B; padding: 14px 18px; margin: 20px 0; border-radius: 6px; }
        .code-label { font-size: 12px; text-transform: uppercase; color: #6B625B; letter-spacing: 1px; }
        .code-val { font-size: 20px; font-weight: bold; color: #21130D; display: block; margin-top: 2px; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table td { padding: 10px 0; border-bottom: 1px solid #E8DFD3; font-size: 14px; }
        .details-table td.label { color: #6B625B; width: 40%; }
        .details-table td.val { color: #21130D; font-weight: 600; text-align: right; }
        .policy-box { background: #FAF6EE; padding: 14px 18px; border-radius: 8px; font-size: 13px; color: #6B625B; line-height: 1.5; margin-top: 24px; }
        .email-footer { background: #F4EBE0; padding: 20px; text-align: center; font-size: 12px; color: #948B83; border-top: 1px solid #E8DFD3; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <div class="brand-title">AURA & BEAN</div>
          <div class="brand-sub">ROASTERY & KITCHEN • BENGALURU</div>
        </div>
        <div class="email-body">
          <span class="badge">✓ Reservation Accepted & Confirmed</span>
          <h1>We Look Forward to Hosting You, ${booking.guest_name}!</h1>
          <p>Your table booking request at Aura & Bean has been accepted and confirmed by our host concierge.</p>

          <div class="code-box">
            <span class="code-label">Booking Reference Code</span>
            <span class="code-val">${booking.booking_code}</span>
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Date & Time</td>
              <td class="val">${formattedDate} • ${booking.booking_time}</td>
            </tr>
            <tr>
              <td class="label">Party Size</td>
              <td class="val">${booking.party_size} ${booking.party_size === 1 ? 'Guest' : 'Guests'}</td>
            </tr>
            <tr>
              <td class="label">Seating Atmosphere</td>
              <td class="val">${booking.seating_area}</td>
            </tr>
            <tr>
              <td class="label">Occasion</td>
              <td class="val">${booking.occasion || 'Casual Gathering'}</td>
            </tr>
            ${booking.special_requests ? `
            <tr>
              <td class="label">Special Requests</td>
              <td class="val">${booking.special_requests}</td>
            </tr>` : ''}
          </table>

          <div class="policy-box">
            <strong>Table Holding Policy:</strong> Tables are held for up to 15 minutes past your scheduled reservation time. If your party is delayed, please call our host desk directly at <a href="tel:+918041234567" style="color: #C5853B; text-decoration: none;">+91 80 4123 4567</a>.
          </div>
        </div>
        <div class="email-footer">
          Plot 482, 12th Main Road, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038<br>
          © ${new Date().getFullYear()} Aura & Bean Artisanal Cafe & Roastery.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Aura & Bean Cafe" <reservations@aurabeancafe.com>',
    to: booking.guest_email,
    subject: `Table Confirmed: ${booking.booking_code} - Aura & Bean Cafe`,
    text: `Your reservation at Aura & Bean Cafe (${booking.booking_code}) is confirmed for ${formattedDate} at ${booking.booking_time} for ${booking.party_size} guests. Atmosphere: ${booking.seating_area}.`,
    html: htmlContent
  };

  const info = await mailTransporter.sendMail(mailOptions);
  console.log(`Email dispatched to ${booking.guest_email} (Message ID: ${info.messageId})`);

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`Preview email URL: ${previewUrl}`);
  }

  return { success: true, messageId: info.messageId, previewUrl };
}
