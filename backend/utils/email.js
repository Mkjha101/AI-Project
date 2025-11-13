const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Generate a random token for email verification or password reset
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Send verification email (REAL implementation)
 */
async function sendVerificationEmail(email, token, userType = 'tourist') {
  const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/verify?token=${token}&type=${userType}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Verify Your SaarthiAI Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to SaarthiAI!</h2>
          <p>Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify My Account
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in ${userType === 'tourist' ? '10 days' : '3 days'}.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't create an account, please ignore this email.
          </p>
        </div>
      `
    });

    console.log(`✅ Verification email sent to ${email}`);
    return { success: true, verifyUrl };
  } catch (error) {
    console.error('❌ Failed to send verification email:', error);
    throw error;
  }
}

/**
 * Send password reset email (REAL implementation)
 */
async function sendPasswordResetEmail(email, token, userType = 'tourist') {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}&type=${userType}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Reset Your SaarthiAI Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset for your SaarthiAI account.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset My Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this password reset, please ignore this email.
          </p>
        </div>
      `
    });

    console.log(`✅ Password reset email sent to ${email}`);
    return { success: true, resetUrl };
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error);
    throw error;
  }
}

/**
 * Send admin approval notification to tourism officer (REAL implementation)
 */
async function sendApprovalNotification(email, approved = true) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: approved ? 'Tourism Officer Account Approved' : 'Tourism Officer Application Update',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${approved ? '#28a745' : '#dc3545'};">${approved ? 'Account Approved!' : 'Application Update'}</h2>
          <p>${approved ?
            'Congratulations! Your tourism officer account has been approved by the administrator.' :
            'We regret to inform you that your tourism officer account application was not approved at this time.'
          }</p>
          ${approved ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/officer/login" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Access Your Dashboard
              </a>
            </div>
            <p>You can now log in and access all tourism officer features.</p>
          ` : `
            <p>Please contact the administrator for more information about your application status.</p>
          `}
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If you have any questions, please contact support.
          </p>
        </div>
      `
    });

    console.log(`✅ Approval notification sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send approval notification:', error);
    throw error;
  }
}

module.exports = {
  generateToken,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendApprovalNotification
};
