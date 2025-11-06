const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false // Don't include password in queries by default
  },
  
  // Location Assignment (Admin is bound to specific location)
  assignedLocation: {
    name: {
      type: String,
      required: [true, 'Location name is required']
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },
    region: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    district: String,
    pincode: String
  },
  
  // Admin Details
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    default: 'Tourism Administrator'
  },
  department: {
    type: String,
    default: 'Tourism Department'
  },
  
  // Status & Security
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  role: {
    type: String,
    default: 'admin',
    immutable: true
  },
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  accountLocked: {
    type: Boolean,
    default: false
  },
  
  // Permissions
  permissions: {
    canManageOfficers: {
      type: Boolean,
      default: true
    },
    canViewAllTourists: {
      type: Boolean,
      default: true
    },
    canManageGeofences: {
      type: Boolean,
      default: true
    },
    canHandleIncidents: {
      type: Boolean,
      default: true
    },
    canGenerateReports: {
      type: Boolean,
      default: true
    }
  },
  
  // Profile
  profileImage: String,
  joiningDate: {
    type: Date,
    default: Date.now
  },
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  timestamps: true
});

// Index for geospatial queries
adminSchema.index({ 'assignedLocation.coordinates': '2dsphere' });
adminSchema.index({ email: 1, phone: 1 });

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
adminSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  this.loginAttempts = 0;
  await this.save();
};

// Increment login attempts
adminSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts += 1;
  if (this.loginAttempts >= 5) {
    this.accountLocked = true;
  }
  await this.save();
};

module.exports = mongoose.model('Admin', adminSchema);
