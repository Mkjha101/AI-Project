const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
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
  altPhone: {
    type: String,
    sparse: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit alternate phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(v) {
        return v < new Date();
      },
      message: 'Date of birth cannot be in the present or future'
    }
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  
  // Tourist Place Information
  touristPlaceName: {
    type: String,
    required: [true, 'Tourist place name is required'],
    unique: true, // One admin per tourist place
    trim: true
  },
  
  // Region Data (marked by admin on map)
  regionData: {
    boundaries: [[Number]], // Array of [lng, lat] coordinates forming polygon
    center: [Number], // [lng, lat]
    area: Number, // in square meters
    maxCapacity: Number, // estimated tourist capacity
    isSetup: {
      type: Boolean,
      default: false
    }
  },
  
  // Facilities in region (managed by admin)
  facilities: [{
    category: {
      type: String,
      required: true,
      enum: [
        'hospital', 'clinic', 'pharmacy',
        'police-station', 'fire-station',
        'restaurant', 'cafe', 'food-stall',
        'hotel', 'guest-house', 'hostel',
        'public-toilet', 'washroom',
        'parking', 'taxi-stand', 'bus-stop',
        'atm', 'bank',
        'shop', 'market', 'mall',
        'temple', 'mosque', 'church', 'gurudwara',
        'museum', 'monument', 'viewpoint',
        'information-center', 'tourist-office',
        'florist', 'photographer',
        'petrol-pump', 'ev-charging',
        'other'
      ]
    },
    name: String,
    ownerName: String,
    phone: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    },
    verified: {
      type: Boolean,
      default: false
    },
    address: String,
    notes: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
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
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  passwordResetToken: String,
  passwordResetExpiry: Date,
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

// Indexes
adminSchema.index({ 'regionData.center': '2dsphere' });
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ phone: 1 }, { unique: true });
adminSchema.index({ username: 1 }, { unique: true });
adminSchema.index({ touristPlaceName: 1 }, { unique: true });
adminSchema.index({ verificationToken: 1 });

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
