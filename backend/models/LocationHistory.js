const mongoose = require('mongoose');

const locationHistorySchema = new mongoose.Schema({
  // Reference to tourist
  blockchainId: {
    type: String,
    required: true,
    index: true
  },
  
  phoneNumber: {
    type: String,
    required: true,
    index: true
  },
  
  // Location data
  location: {
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
  
  // Metadata
  accuracy: Number, // GPS accuracy in meters
  altitude: Number,
  speed: Number, // meters per second
  heading: Number, // degrees
  
  // Timestamp
  recordedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  // Source of location data
  source: {
    type: String,
    enum: ['gps', 'network', 'manual'],
    default: 'gps'
  },
  
  // Device info
  deviceInfo: {
    userAgent: String,
    platform: String,
    battery: Number
  }
}, {
  timestamps: true
});

// Geospatial index
locationHistorySchema.index({ location: '2dsphere' });

// Compound indexes for efficient queries
locationHistorySchema.index({ blockchainId: 1, recordedAt: -1 });
locationHistorySchema.index({ phoneNumber: 1, recordedAt: -1 });

// TTL index - auto-delete records older than 90 days
locationHistorySchema.index({ recordedAt: 1 }, { expireAfterSeconds: 7776000 });

// Static method to get tourist's location history
locationHistorySchema.statics.getHistory = function(blockchainId, limit = 100) {
  return this.find({ blockchainId })
    .sort({ recordedAt: -1 })
    .limit(limit);
};

// Static method to get location history within time range
locationHistorySchema.statics.getHistoryByTimeRange = function(blockchainId, startTime, endTime) {
  return this.find({
    blockchainId,
    recordedAt: {
      $gte: startTime,
      $lte: endTime
    }
  }).sort({ recordedAt: -1 });
};

// Static method to get tourist's path (simplified coordinates)
locationHistorySchema.statics.getPath = function(blockchainId, limit = 50) {
  return this.find({ blockchainId })
    .select('location.coordinates recordedAt')
    .sort({ recordedAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('LocationHistory', locationHistorySchema);
