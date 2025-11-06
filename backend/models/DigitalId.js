const mongoose = require('mongoose');

const digitalIdSchema = new mongoose.Schema({
  digitalId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  blockchainHash: String,
  idType: {
    type: String,
    enum: ['tourist_id', 'resident_id', 'authority_id', 'emergency_id'],
    default: 'tourist_id'
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'revoked', 'pending'],
    default: 'active'
  },
  ownerType: {
    type: String,
    enum: ['User', 'Tourist', 'TourismOfficer', 'Admin', 'Unknown'],
    default: 'Unknown'
  },
  ownerRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'ownerType'
  },
  qrCode: String,
  publicKey: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date,
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

digitalIdSchema.index({ createdAt: -1 });
digitalIdSchema.index({ ownerRef: 1, ownerType: 1 });

module.exports = mongoose.model('DigitalId', digitalIdSchema);
