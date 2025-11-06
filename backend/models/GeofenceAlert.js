const mongoose = require('mongoose');

const geofenceAlertSchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TouristTracking',
    required: true,
    index: true
  },
  blockchainId: {
    type: String,
    required: true,
    index: true
  },
  geofenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geofence',
    required: true
  },
  geofenceName: {
    type: String,
    required: true
  },
  alertType: {
    type: String,
    enum: ['entry', 'exit', 'breach'],
    required: true
  },
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    default: 'warning'
  },
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
  message: {
    type: String,
    required: true
  },
  acknowledged: {
    type: Boolean,
    default: false
  },
  acknowledgedBy: {
    type: String
  },
  acknowledgedAt: {
    type: Date
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  notificationMethods: [{
    type: String,
    enum: ['app', 'sms', 'email', 'push']
  }],
  metadata: {
    touristName: String,
    phoneNumber: String,
    nationality: String
  }
}, {
  timestamps: true
});

// Indexes
geofenceAlertSchema.index({ location: '2dsphere' });
geofenceAlertSchema.index({ createdAt: -1 });
geofenceAlertSchema.index({ acknowledged: 1, createdAt: -1 });
geofenceAlertSchema.index({ blockchainId: 1, createdAt: -1 });

// Methods
geofenceAlertSchema.methods.acknowledge = function(acknowledgedBy) {
  this.acknowledged = true;
  this.acknowledgedBy = acknowledgedBy;
  this.acknowledgedAt = new Date();
  return this.save();
};

// Static methods
geofenceAlertSchema.statics.getUnacknowledgedAlerts = function(limit = 50) {
  return this.find({ acknowledged: false })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('geofenceId')
    .lean();
};

geofenceAlertSchema.statics.getAlertsByTourist = function(blockchainId, limit = 20) {
  return this.find({ blockchainId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('geofenceId')
    .lean();
};

geofenceAlertSchema.statics.getCriticalAlerts = function(hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  return this.find({
    severity: 'critical',
    acknowledged: false,
    createdAt: { $gte: since }
  })
    .sort({ createdAt: -1 })
    .populate('geofenceId')
    .lean();
};

module.exports = mongoose.model('GeofenceAlert', geofenceAlertSchema);
