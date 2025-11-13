const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const tourismOfficerSchema = new mongoose.Schema({
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
  altEmail: {
    type: String,
    lowercase: true,
    trim: true,
    sparse: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid alternate email']
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
  
  // Officer Details
  officerId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    enum: ['Field Officer', 'Senior Officer', 'Inspector', 'Safety Officer', 'Tourist Guide']
  },
  department: {
    type: String,
    default: 'Tourism Department'
  },
  
  // ID Card & Blockchain
  blockchainId: {
    type: String,
    unique: true,
    sparse: true // Allows null values while maintaining uniqueness
  },
  idCardIssued: {
    type: Boolean,
    default: false
  },
  idCardIssuedDate: Date,
  idCardExpiryDate: Date,
  idCardStatus: {
    type: String,
    enum: ['not-issued', 'active', 'expired', 'revoked'],
    default: 'not-issued'
  },
  
  // Location Assignment
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
    region: String,
    state: String
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  
  // Work Status
  employmentStatus: {
    type: String,
    enum: ['active', 'on-leave', 'retired', 'resigned', 'suspended'],
    default: 'active'
  },
  currentDutyStatus: {
    type: String,
    enum: ['on-duty', 'off-duty', 'on-leave', 'break'],
    default: 'off-duty'
  },
  
  // Attendance
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    checkIn: Date,
    checkOut: Date,
    status: {
      type: String,
      enum: ['present', 'absent', 'half-day', 'on-leave'],
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    }
  }],
  
  // Current Location Tracking (when on duty)
  currentLocation: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },
  lastLocationUpdate: Date,
  
  // Role & Permissions
  role: {
    type: String,
    default: 'tourism-officer',
    immutable: true
  },
  permissions: {
    canViewColleagues: {
      type: Boolean,
      default: true
    },
    canViewTourists: {
      type: Boolean,
      default: true
    },
    canReportIncidents: {
      type: Boolean,
      default: true
    },
    canUpdateStatus: {
      type: Boolean,
      default: true
    }
  },
  
  // Security
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  adminApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  approvedAt: Date,
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
  
  // Profile
  profileImage: String,
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
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  relievingDate: Date,
  
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
tourismOfficerSchema.index({ 'assignedLocation.coordinates': '2dsphere' });
tourismOfficerSchema.index({ 'currentLocation': '2dsphere' });
tourismOfficerSchema.index({ email: 1, phone: 1 });
tourismOfficerSchema.index({ officerId: 1 });
tourismOfficerSchema.index({ blockchainId: 1 });

// Hash password before saving
tourismOfficerSchema.pre('save', async function(next) {
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
tourismOfficerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
tourismOfficerSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  this.loginAttempts = 0;
  await this.save();
};

// Increment login attempts
tourismOfficerSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts += 1;
  if (this.loginAttempts >= 5) {
    this.accountLocked = true;
  }
  await this.save();
};

// Mark attendance
tourismOfficerSchema.methods.markAttendance = async function(status, location) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const existingAttendance = this.attendance.find(a => 
    new Date(a.date).getTime() === today.getTime()
  );
  
  if (existingAttendance) {
    if (!existingAttendance.checkOut && status === 'present') {
      existingAttendance.checkOut = new Date();
    }
  } else {
    this.attendance.push({
      date: today,
      checkIn: new Date(),
      status,
      location: location ? {
        type: 'Point',
        coordinates: location
      } : undefined
    });
  }
  
  await this.save();
};

module.exports = mongoose.model('TourismOfficer', tourismOfficerSchema);
