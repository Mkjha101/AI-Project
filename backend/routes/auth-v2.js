const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Tourist = require('../models/Tourist');
const TourismOfficer = require('../models/TourismOfficer');
const Admin = require('../models/Admin');
const { generateToken, sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// Helper to get model and expiry days based on user type
function getUserModel(type) {
  switch(type) {
    case 'tourist': return { Model: Tourist, expiryDays: 10 };
    case 'officer': return { Model: TourismOfficer, expiryDays: 3 };
    case 'admin': return { Model: Admin, expiryDays: 3 };
    default: return null;
  }
}

// Helper to check phone number usage limits
async function checkPhoneLimit(phone, isAlt = false) {
  const limit = isAlt ? 5 : 3;
  const field = isAlt ? 'altPhone' : 'phone';
  
  const count = await Tourist.countDocuments({ [field]: phone });
  return count < limit;
}

// ==================== TOURIST SIGNUP ====================
router.post('/signup/tourist', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('altEmail').optional().isEmail().normalizeEmail().withMessage('Valid alternate email required'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number required'),
  body('altPhone').optional().matches(/^[0-9]{10}$/).withMessage('Valid 10-digit alternate phone required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('dateOfBirth').isISO8601().toDate().withMessage('Valid date of birth required'),
  body('gender').isIn(['male', 'female', 'other', 'prefer-not-to-say']).withMessage('Valid gender required'),
  body('nationality').notEmpty().withMessage('Nationality is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, altEmail, phone, altPhone, password, dateOfBirth, gender, nationality } = req.body;

    // Validate DOB is not present/future
    if (new Date(dateOfBirth) >= new Date()) {
      return res.status(400).json({ error: 'Date of birth cannot be in the present or future' });
    }

    // Check email uniqueness
    const existingEmail = await Tourist.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check phone limits
    const phoneAllowed = await checkPhoneLimit(phone, false);
    if (!phoneAllowed) {
      return res.status(400).json({ error: 'This phone number has reached the maximum registration limit (3 users)' });
    }

    if (altPhone) {
      const altPhoneAllowed = await checkPhoneLimit(altPhone, true);
      if (!altPhoneAllowed) {
        return res.status(400).json({ error: 'This alternate phone number has reached the maximum registration limit (5 users)' });
      }
    }

    // Generate verification token
    const verificationToken = generateToken();
    const verificationTokenExpiry = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days

    // Create tourist
    const tourist = new Tourist({
      name,
      email,
      altEmail,
      phone,
      altPhone,
      password,
      dateOfBirth,
      gender,
      nationality,
      verificationToken,
      verificationTokenExpiry,
      isVerified: false
    });

    await tourist.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken, 'tourist');

    // Emit socket event if available
    const io = req.app.get('io');
    if (io) {
      io.emit('user:registered', { type: 'tourist', email, name });
    }

    res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
      email,
      expiresIn: '10 days'
    });

  } catch (error) {
    console.error('Tourist signup error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ==================== TOURISM OFFICER SIGNUP ====================
router.post('/signup/officer', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('altEmail').optional().isEmail().normalizeEmail(),
  body('phone').matches(/^[0-9]{10}$/),
  body('altPhone').optional().matches(/^[0-9]{10}$/),
  body('password').isLength({ min: 8 }),
  body('dateOfBirth').isISO8601().toDate(),
  body('gender').isIn(['male', 'female', 'other', 'prefer-not-to-say']),
  body('officerId').notEmpty().withMessage('Officer ID is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, altEmail, phone, altPhone, password, dateOfBirth, gender, officerId, designation } = req.body;

    // Validate DOB
    if (new Date(dateOfBirth) >= new Date()) {
      return res.status(400).json({ error: 'Date of birth cannot be in the present or future' });
    }

    // Check uniqueness
    const existingEmail = await TourismOfficer.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const existingPhone = await TourismOfficer.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const existingOfficerId = await TourismOfficer.findOne({ officerId });
    if (existingOfficerId) {
      return res.status(400).json({ error: 'Officer ID already exists' });
    }

    // Generate verification token
    const verificationToken = generateToken();
    const verificationTokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

    const officer = new TourismOfficer({
      name,
      email,
      altEmail,
      phone,
      altPhone,
      password,
      dateOfBirth,
      gender,
      officerId,
      designation,
      verificationToken,
      verificationTokenExpiry,
      isVerified: false,
      adminApproved: false
    });

    await officer.save();

    await sendVerificationEmail(email, verificationToken, 'officer');

    const io = req.app.get('io');
    if (io) {
      io.emit('officer:registered', { email, name, officerId });
    }

    res.status(201).json({
      message: 'Registration successful! Please verify your email. After verification, an admin will approve your account.',
      email,
      expiresIn: '3 days'
    });

  } catch (error) {
    console.error('Officer signup error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ==================== ADMIN SIGNUP ====================
router.post('/signup/admin', [
  body('name').trim().notEmpty(),
  body('username').trim().isLength({ min: 3, max: 30 }).matches(/^[a-zA-Z0-9_]+$/),
  body('email').isEmail().normalizeEmail(),
  body('phone').matches(/^[0-9]{10}$/),
  body('altPhone').optional().matches(/^[0-9]{10}$/),
  body('password').isLength({ min: 8 }),
  body('dateOfBirth').isISO8601().toDate(),
  body('gender').isIn(['male', 'female', 'other', 'prefer-not-to-say']),
  body('touristPlaceName').trim().notEmpty().withMessage('Tourist place name is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, phone, altPhone, password, dateOfBirth, gender, touristPlaceName } = req.body;

    // Validate DOB
    if (new Date(dateOfBirth) >= new Date()) {
      return res.status(400).json({ error: 'Date of birth cannot be in the present or future' });
    }

    // Check uniqueness
    const checks = await Promise.all([
      Admin.findOne({ email }),
      Admin.findOne({ username }),
      Admin.findOne({ phone }),
      Admin.findOne({ touristPlaceName })
    ]);

    if (checks[0]) return res.status(400).json({ error: 'Email already registered' });
    if (checks[1]) return res.status(400).json({ error: 'Username already taken' });
    if (checks[2]) return res.status(400).json({ error: 'Phone number already registered' });
    if (checks[3]) return res.status(400).json({ error: 'An admin already exists for this tourist place' });

    // Generate verification token
    const verificationToken = generateToken();
    const verificationTokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

    // Generate adminId
    const adminId = `ADM${Date.now()}`;

    const admin = new Admin({
      name,
      username,
      email,
      phone,
      altPhone,
      password,
      dateOfBirth,
      gender,
      touristPlaceName,
      adminId,
      verificationToken,
      verificationTokenExpiry,
      isVerified: false
    });

    await admin.save();

    await sendVerificationEmail(email, verificationToken, 'admin');

    const io = req.app.get('io');
    if (io) {
      io.emit('admin:registered', { email, name, touristPlaceName });
    }

    res.status(201).json({
      message: 'Registration successful! Please verify your email within 3 days.',
      email,
      username,
      expiresIn: '3 days'
    });

  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ==================== EMAIL VERIFICATION ====================
router.get('/verify', async (req, res) => {
  try {
    const { token, type } = req.query;

    if (!token || !type) {
      return res.status(400).json({ error: 'Invalid verification link' });
    }

    const modelInfo = getUserModel(type);
    if (!modelInfo) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const { Model } = modelInfo;

    const user = await Model.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification link' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('user:verified', { type, email: user.email });
    }

    res.json({
      message: 'Email verified successfully! You can now login.',
      type,
      requiresAdminApproval: type === 'officer' && !user.adminApproved
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// ==================== RESEND VERIFICATION ====================
router.post('/resend-verification', [
  body('email').isEmail().normalizeEmail(),
  body('type').isIn(['tourist', 'officer', 'admin'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, type } = req.body;
    const modelInfo = getUserModel(type);
    if (!modelInfo) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const { Model, expiryDays } = modelInfo;

    const user = await Model.findOne({ email, isVerified: false });
    if (!user) {
      return res.status(404).json({ error: 'User not found or already verified' });
    }

    // Generate new token
    const verificationToken = generateToken();
    const verificationTokenExpiry = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save();

    await sendVerificationEmail(email, verificationToken, type);

    res.json({ message: 'Verification email resent successfully!' });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Failed to resend verification email' });
  }
});

// ==================== LOGIN (Tourist/Officer) ====================
router.post('/login', [
  body('identifier').notEmpty().withMessage('Email or phone required'),
  body('password').notEmpty().withMessage('Password required'),
  body('type').isIn(['tourist', 'officer']).withMessage('Type must be tourist or officer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { identifier, password, type } = req.body;
    const Model = type === 'tourist' ? Tourist : TourismOfficer;

    // Find by email or phone
    const isEmail = identifier.includes('@');
    const user = await Model.findOne(
      isEmail ? { email: identifier } : { phone: identifier }
    ).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if account is locked
    if (user.accountLocked) {
      return res.status(403).json({ error: 'Account is locked. Please contact support.' });
    }

    // Check if verified
    if (!user.isVerified) {
      return res.status(403).json({ 
        error: 'Please verify your email before logging in',
        needsVerification: true
      });
    }

    // For officers, check admin approval
    if (type === 'officer' && !user.adminApproved) {
      return res.status(403).json({ 
        error: 'Your account is pending admin approval',
        needsApproval: true
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incrementLoginAttempts();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, type },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const io = req.app.get('io');
    if (io) {
      io.emit('user:login', { type, email: user.email });
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        type
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== ADMIN LOGIN ====================
router.post('/login/admin', [
  body('identifier').notEmpty().withMessage('Username or email required'),
  body('password').notEmpty().withMessage('Password required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { identifier, password } = req.body;

    // Find by username or email
    const isEmail = identifier.includes('@');
    const admin = await Admin.findOne(
      isEmail ? { email: identifier } : { username: identifier }
    ).select('+password');

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (admin.accountLocked) {
      return res.status(403).json({ error: 'Account is locked. Please contact support.' });
    }

    if (!admin.isVerified) {
      return res.status(403).json({ 
        error: 'Please verify your email before logging in',
        needsVerification: true
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await admin.incrementLoginAttempts();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await admin.updateLastLogin();

    const token = jwt.sign(
      { id: admin._id, role: admin.role, type: 'admin' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const io = req.app.get('io');
    if (io) {
      io.emit('admin:login', { email: admin.email, touristPlace: admin.touristPlaceName });
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        touristPlaceName: admin.touristPlaceName,
        regionSetup: admin.regionData?.isSetup || false
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== FORGOT PASSWORD ====================
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail(),
  body('type').isIn(['tourist', 'officer', 'admin'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, type } = req.body;
    const modelInfo = getUserModel(type);
    if (!modelInfo) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const { Model } = modelInfo;
    const user = await Model.findOne({ email });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If the email exists, a password reset link has been sent.' });
    }

    // Generate reset token
    const resetToken = generateToken();
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = resetExpiry;
    await user.save();

    await sendPasswordResetEmail(email, resetToken, type);

    res.json({ message: 'If the email exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// ==================== RESET PASSWORD ====================
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 }),
  body('type').isIn(['tourist', 'officer', 'admin'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password, type } = req.body;
    const modelInfo = getUserModel(type);
    if (!modelInfo) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    const { Model } = modelInfo;
    const user = await Model.findOne({
      passwordResetToken: token,
      passwordResetExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset link' });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    user.accountLocked = false; // Unlock if locked
    user.loginAttempts = 0;
    await user.save();

    res.json({ message: 'Password reset successfully! You can now login with your new password.' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// ==================== FORGOT USERNAME (Admin Only) ====================
router.post('/forgot-username', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(404).json({ error: 'No admin account found with this email' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ 
      message: 'Username retrieved successfully',
      username: admin.username
    });

  } catch (error) {
    console.error('Forgot username error:', error);
    res.status(500).json({ error: 'Failed to retrieve username' });
  }
});

module.exports = router;
