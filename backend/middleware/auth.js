const jwt = require('jsonwebtoken');
const Tourist = require('../models/Tourist');
const TourismOfficer = require('../models/TourismOfficer');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Authenticate JWT token
 */
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Check if user is verified
 */
const requireVerification = async (req, res, next) => {
  try {
    const { id, type } = req.user;
    let Model;

    switch(type) {
      case 'tourist': Model = Tourist; break;
      case 'officer': Model = TourismOfficer; break;
      case 'admin': Model = Admin; break;
      default: return res.status(400).json({ error: 'Invalid user type' });
    }

    const user = await Model.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ 
        error: 'Email verification required',
        needsVerification: true
      });
    }

    req.userDoc = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Verification check failed' });
  }
};

/**
 * Check if tourism officer is admin-approved
 */
const requireAdminApproval = async (req, res, next) => {
  try {
    const { type } = req.user;
    
    if (type !== 'officer') {
      return next(); // Only officers need admin approval
    }

    const officer = req.userDoc || await TourismOfficer.findById(req.user.id);
    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    if (!officer.adminApproved) {
      return res.status(403).json({ 
        error: 'Admin approval required',
        needsApproval: true
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Approval check failed' });
  }
};

/**
 * Restrict to specific roles
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied',
        requiredRole: roles
      });
    }
    next();
  };
};

/**
 * Restrict to specific user types
 */
const restrictToTypes = (...types) => {
  return (req, res, next) => {
    if (!types.includes(req.user.type)) {
      return res.status(403).json({ 
        error: 'Access denied',
        requiredType: types
      });
    }
    next();
  };
};

/**
 * Check if admin has completed region setup
 */
const requireRegionSetup = async (req, res, next) => {
  try {
    const admin = req.userDoc || await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    if (!admin.regionData?.isSetup) {
      return res.status(403).json({ 
        error: 'Region setup required',
        needsRegionSetup: true
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Region setup check failed' });
  }
};

module.exports = {
  authenticate,
  requireVerification,
  requireAdminApproval,
  restrictTo,
  restrictToTypes,
  requireRegionSetup
};
