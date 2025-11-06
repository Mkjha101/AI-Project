const mongoose = require('mongoose');

const touristTrackingSchema = new mongoose.Schema({
  // Blockchain ID from the physical ID card
  blockchainId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Tourist's phone number (primary identifier)
  phoneNumber: {
    type: String,
    required: true,
    index: true
  },
  
  // Current location
  currentLocation: {
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
  
  // Additional tourist info
  touristInfo: {
    name: String,
    email: String,
    nationality: String,
    emergencyContact: String
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspicious', 'emergency'],
    default: 'active',
    index: true
  },
  
  // Card issue/return tracking
  cardIssued: {
    type: Boolean,
    default: true
  },
  
  issuedAt: {
    type: Date,
    default: Date.now
  },
  
  returnedAt: {
    type: Date,
    default: null
  },
  
  // Last location update
  lastUpdated: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  // Geofence tracking
  currentGeofences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geofence'
  }],
  
  // Alert history
  alerts: [{
    type: {
      type: String,
      enum: ['geofence_breach', 'suspicious_activity', 'emergency', 'offline']
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    resolved: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Geospatial index for location queries
touristTrackingSchema.index({ currentLocation: '2dsphere' });

// Compound index for active tourists
touristTrackingSchema.index({ status: 1, cardIssued: 1 });

// Method to update location
touristTrackingSchema.methods.updateLocation = function(longitude, latitude) {
  this.currentLocation = {
    type: 'Point',
    coordinates: [longitude, latitude]
  };
  this.lastUpdated = new Date();
  return this.save();
};

// Method to add alert
touristTrackingSchema.methods.addAlert = function(type, message) {
  this.alerts.push({
    type,
    message,
    timestamp: new Date(),
    resolved: false
  });
  return this.save();
};

// Method to mark card as returned
touristTrackingSchema.methods.returnCard = function() {
  this.cardIssued = false;
  this.returnedAt = new Date();
  this.status = 'inactive';
  return this.save();
};

// Static method to get active tourists
touristTrackingSchema.statics.getActiveTourists = function() {
  return this.find({ 
    status: 'active', 
    cardIssued: true 
  }).sort({ lastUpdated: -1 });
};

// Static method to find nearby tourists
touristTrackingSchema.statics.findNearby = function(longitude, latitude, maxDistance = 5000) {
  return this.find({
    currentLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance
      }
    },
    status: 'active',
    cardIssued: true
  });
};

module.exports = mongoose.model('TouristTracking', touristTrackingSchema);
