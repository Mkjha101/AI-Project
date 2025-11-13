const crypto = require('crypto');

/**
 * Generate a random token for email verification or password reset
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Send verification email (mock implementation)
 * TODO: Integrate with actual email service (SendGrid, AWS SES, Nodemailer, etc.)
 */
async function sendVerificationEmail(email, token, userType = 'tourist') {
  const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/verify?token=${token}&type=${userType}`;
  
  console.log('\n📧 ========== EMAIL VERIFICATION ==========');
  console.log(`To: ${email}`);
  console.log(`Subject: Verify Your SaarthiAI Account`);
  console.log(`\nClick the link below to verify your account:`);
  console.log(verifyUrl);
  console.log(`\nThis link will expire in ${userType === 'tourist' ? '10 days' : '3 days'}.`);
  console.log('==========================================\n');
  
  // TODO: Replace with actual email sending logic
  // Example with nodemailer:
  // await transporter.sendMail({
  //   from: process.env.EMAIL_FROM,
  //   to: email,
  //   subject: 'Verify Your SaarthiAI Account',
  //   html: `<p>Click <a href="${verifyUrl}">here</a> to verify your account.</p>`
  // });
  
  return { success: true, verifyUrl };
}

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email, token, userType = 'tourist') {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}&type=${userType}`;
  
  console.log('\n📧 ========== PASSWORD RESET ==========');
  console.log(`To: ${email}`);
  console.log(`Subject: Reset Your SaarthiAI Password`);
  console.log(`\nClick the link below to reset your password:`);
  console.log(resetUrl);
  console.log(`\nThis link will expire in 1 hour.`);
  console.log(`If you didn't request this, please ignore this email.`);
  console.log('======================================\n');
  
  // TODO: Replace with actual email sending
  
  return { success: true, resetUrl };
}

/**
 * Send admin approval notification to tourism officer
 */
async function sendApprovalNotification(email, approved = true) {
  console.log('\n📧 ========== ADMIN APPROVAL NOTIFICATION ==========');
  console.log(`To: ${email}`);
  console.log(`Subject: ${approved ? 'Account Approved' : 'Account Rejected'}`);
  console.log(`\n${approved ? 
    'Your tourism officer account has been approved! You can now access your dashboard.' :
    'Your tourism officer account application was not approved. Please contact the administrator for more information.'
  }`);
  console.log('===================================================\n');
  
  return { success: true };
}

module.exports = {
  generateToken,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendApprovalNotification
};
