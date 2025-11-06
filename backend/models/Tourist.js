const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const touristSchema = new mongoose.Schema({
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
    select: false
  },
  
  // Username (editable, unique)
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  
  // Blockchain ID & Visit Info
  blockchainId: {
    type: String,
    unique: true,
    sparse: true
  },
  idCardIssued: {
    type: Boolean,
    default: false
  },
  idCardIssuedDate: Date,
  idCardReturnedDate: Date,
  
  // Current Visit Location
  currentVisitLocation: {
    name: String,
    region: String,
    state: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  visitStatus: {
    type: String,
    enum: ['not-visiting', 'active', 'completed'],
    default: 'not-visiting'
  },
  
  // Group Information
  currentGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TouristGroup'
  },
  groupRole: {
    type: String,
    enum: ['creator', 'member'],
    default: 'member'
  },
  
  // Travel Type
  travelType: {
    type: String,
    enum: ['solo', 'group-friends', 'family', 'colleagues', 'other'],
    default: 'solo'
  },
  
  // Emergency Contacts
  emergencyContacts: [{
    name: {
      type: String,
      required: true
    },
    relation: String,
    phone: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Profile
  profileImage: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  nationality: {
    type: String,
    default: 'Indian'
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  
  // Security & Status
  role: {
    type: String,
    default: 'tourist',
    immutable: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
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
  
  // Preferences
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      shareLocationWithGroup: {
        type: Boolean,
        default: true
      },
      showProfileToOfficers: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Visit History
  visitHistory: [{
    location: {
      name: String,
      region: String
    },
    checkIn: Date,
    checkOut: Date,
    blockchainId: String,
    duration: Number // in hours
  }],
  
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
touristSchema.index({ email: 1, phone: 1 });
touristSchema.index({ username: 1 });
touristSchema.index({ blockchainId: 1 });
touristSchema.index({ 'currentVisitLocation.coordinates': '2dsphere' });

// Hash password before saving
touristSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate random username if not provided
touristSchema.pre('save', async function(next) {
  if (!this.username && this.isNew) {
    const randomNum = Math.floor(Math.random() * 10000);
    this.username = `tourist_${this.name.toLowerCase().replace(/\s/g, '_')}_${randomNum}`;
  }
  next();
});

// Compare password method
touristSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
touristSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  this.loginAttempts = 0;
  await this.save();
};

// Increment login attempts
touristSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts += 1;
  if (this.loginAttempts >= 5) {
    this.accountLocked = true;
  }
  await this.save();
};

// Start visit
touristSchema.methods.startVisit = async function(locationData, blockchainId) {
  this.currentVisitLocation = locationData;
  this.visitStatus = 'active';
  this.blockchainId = blockchainId;
  this.idCardIssued = true;
  this.idCardIssuedDate = new Date();
  await this.save();
};

// End visit
touristSchema.methods.endVisit = async function() {
  if (this.visitStatus === 'active') {
    const checkInDate = this.idCardIssuedDate;
    const checkOutDate = new Date();
    const duration = (checkOutDate - checkInDate) / (1000 * 60 * 60); // hours
    
    this.visitHistory.push({
      location: this.currentVisitLocation,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      blockchainId: this.blockchainId,
      duration
    });
    
    this.visitStatus = 'completed';
    this.idCardReturnedDate = checkOutDate;
  }
  await this.save();
};

module.exports = mongoose.model('Tourist', touristSchema);
