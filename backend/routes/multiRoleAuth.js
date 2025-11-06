const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const TourismOfficer = require('../models/TourismOfficer');
const Tourist = require('../models/Tourist');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// Generate JWT Token
const generateToken = (user, role) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// ==================== ADMIN SIGNUP ====================
router.post('/admin/signup', async (req, res) => {
  try {
    const { name, email, phone, password, assignedLocation, adminId, designation } = req.body;
    
    const [existingAdmin, existingOfficer, existingTourist] = await Promise.all([
      Admin.findOne({ $or: [{ email }, { phone }] }),
      TourismOfficer.findOne({ $or: [{ email }, { phone }] }),
      Tourist.findOne({ $or: [{ email }, { phone }] })
    ]);
    
    if (existingAdmin || existingOfficer || existingTourist) {
      return res.status(400).json({ success: false, message: 'Email or phone number already registered' });
    }
    
    const existingAdminId = await Admin.findOne({ adminId });
    if (existingAdminId) {
      return res.status(400).json({ success: false, message: 'Admin ID already exists' });
    }
    
    const admin = new Admin({ name, email, phone, password, assignedLocation, adminId, designation: designation || 'Tourism Administrator' });
    await admin.save();
    
    const token = generateToken(admin, 'admin');
    const adminResponse = admin.toObject();
    delete adminResponse.password;
    
    res.status(201).json({ success: true, message: 'Admin registered successfully', token, user: adminResponse });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
});

// ==================== ADMIN LOGIN ====================
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    if (admin.accountLocked) {
      return res.status(403).json({ success: false, message: 'Account is locked. Contact support.' });
    }
    
    if (admin.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account is not active. Contact support.' });
    }
    
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      await admin.incrementLoginAttempts();
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    await admin.updateLastLogin();
    const token = generateToken(admin, 'admin');
    const adminResponse = admin.toObject();
    delete adminResponse.password;
    
    res.json({ success: true, message: 'Login successful', token, user: adminResponse });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
});

// ==================== OFFICER SIGNUP ====================
router.post('/officer/signup', async (req, res) => {
  try {
    const { name, email, phone, password, designation, assignedLocation, officerId } = req.body;
    
    const [existingAdmin, existingOfficer, existingTourist] = await Promise.all([
      Admin.findOne({ $or: [{ email }, { phone }] }),
      TourismOfficer.findOne({ $or: [{ email }, { phone }] }),
      Tourist.findOne({ $or: [{ email }, { phone }] })
    ]);
    
    if (existingAdmin || existingOfficer || existingTourist) {
      return res.status(400).json({ success: false, message: 'Email or phone number already registered' });
    }
    
    const existingOfficerId = await TourismOfficer.findOne({ officerId });
    if (existingOfficerId) {
      return res.status(400).json({ success: false, message: 'Officer ID already exists' });
    }
    
    const officer = new TourismOfficer({ name, email, phone, password, designation, assignedLocation, officerId });
    await officer.save();
    
    const token = generateToken(officer, 'tourism-officer');
    const officerResponse = officer.toObject();
    delete officerResponse.password;
    
    res.status(201).json({ success: true, message: 'Tourism Officer registered successfully', token, user: officerResponse });
  } catch (error) {
    console.error('Officer signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
});

// ==================== OFFICER LOGIN ====================
router.post('/officer/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const officer = await TourismOfficer.findOne({ email }).select('+password');
    
    if (!officer) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    if (officer.accountLocked) {
      return res.status(403).json({ success: false, message: 'Account is locked. Contact support.' });
    }
    
    if (officer.employmentStatus !== 'active') {
      return res.status(403).json({ success: false, message: 'Account is not active. Contact administrator.' });
    }
    
    const isPasswordValid = await officer.comparePassword(password);
    if (!isPasswordValid) {
      await officer.incrementLoginAttempts();
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    await officer.updateLastLogin();
    const token = generateToken(officer, 'tourism-officer');
    const officerResponse = officer.toObject();
    delete officerResponse.password;
    
    res.json({ success: true, message: 'Login successful', token, user: officerResponse });
  } catch (error) {
    console.error('Officer login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
});

// ==================== TOURIST SIGNUP ====================
router.post('/tourist/signup', async (req, res) => {
  try {
    const { name, email, phone, password, username, emergencyContacts } = req.body;
    
    const [existingAdmin, existingOfficer, existingTourist] = await Promise.all([
      Admin.findOne({ $or: [{ email }, { phone }] }),
      TourismOfficer.findOne({ $or: [{ email }, { phone }] }),
      Tourist.findOne({ $or: [{ email }, { phone }] })
    ]);
    
    if (existingAdmin || existingOfficer || existingTourist) {
      return res.status(400).json({ success: false, message: 'Email or phone number already registered' });
    }
    
    if (username) {
      const existingUsername = await Tourist.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ success: false, message: 'Username already taken. Please choose another.' });
      }
    }
    
    const tourist = new Tourist({ name, email, phone, password, username, emergencyContacts: emergencyContacts || [] });
    await tourist.save();
    
    const token = generateToken(tourist, 'tourist');
    const touristResponse = tourist.toObject();
    delete touristResponse.password;
    
    res.status(201).json({ success: true, message: 'Tourist registered successfully', token, user: touristResponse });
  } catch (error) {
    console.error('Tourist signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
});

// ==================== TOURIST LOGIN ====================
router.post('/tourist/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const tourist = await Tourist.findOne({ email }).select('+password');
    
    if (!tourist) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    if (tourist.accountLocked) {
      return res.status(403).json({ success: false, message: 'Account is locked. Contact support.' });
    }
    
    if (tourist.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account is not active. Contact support.' });
    }
    
    const isPasswordValid = await tourist.comparePassword(password);
    if (!isPasswordValid) {
      await tourist.incrementLoginAttempts();
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    await tourist.updateLastLogin();
    const token = generateToken(tourist, 'tourist');
    const touristResponse = tourist.toObject();
    delete touristResponse.password;
    
    res.json({ success: true, message: 'Login successful', token, user: touristResponse });
  } catch (error) {
    console.error('Tourist login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
});

// ==================== VERIFY TOKEN ====================
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    let user;
    switch (decoded.role) {
      case 'admin':
        user = await Admin.findById(decoded.id);
        break;
      case 'tourism-officer':
        user = await TourismOfficer.findById(decoded.id);
        break;
      case 'tourist':
        user = await Tourist.findById(decoded.id);
        break;
      default:
        return res.status(401).json({ success: false, message: 'Invalid role' });
    }
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: decoded.role } });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
