const mongoose = require('mongoose');

const touristGroupSchema = new mongoose.Schema({
  // Group Info
  groupName: {
    type: String,
    required: [true, 'Group name is required'],
    trim: true
  },
  groupType: {
    type: String,
    enum: ['friends', 'family', 'colleagues', 'mixed', 'other'],
    required: true
  },
  
  // Creator (Owner)
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: true
  },
  
  // Members
  members: [{
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'left', 'removed'],
      default: 'active'
    },
    nickname: String // Optional nickname within group
  }],
  
  // Location Info (bound to a specific tourist destination)
  visitLocation: {
    name: {
      type: String,
      required: true
    },
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
  
  // Group Status
  status: {
    type: String,
    enum: ['active', 'completed', 'disbanded'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  
  // Group Settings
  settings: {
    allowLocationSharing: {
      type: Boolean,
      default: true
    },
    allowMessaging: {
      type: Boolean,
      default: true
    },
    allowCalling: {
      type: Boolean,
      default: true
    },
    maxMembers: {
      type: Number,
      default: 50
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  
  // Chat Messages
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'location', 'system'],
      default: 'text'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    readBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist'
    }]
  }],
  
  // Call History
  callHistory: [{
    initiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist'
    },
    callType: {
      type: String,
      enum: ['voice', 'video'],
      required: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist'
    }],
    startTime: Date,
    endTime: Date,
    duration: Number // in seconds
  }],
  
  // Shared Locations (POIs shared within group)
  sharedLocations: [{
    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist'
    },
    name: String,
    description: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    },
    category: {
      type: String,
      enum: ['restaurant', 'attraction', 'hotel', 'emergency', 'meeting-point', 'other']
    },
    sharedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Emergency Alerts within group
  groupAlerts: [{
    alertedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist'
    },
    alertType: {
      type: String,
      enum: ['emergency', 'help-needed', 'lost', 'meeting-point', 'general']
    },
    message: String,
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    acknowledged: [{
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist'
      },
      acknowledgedAt: Date
    }]
  }],
  
  // Metadata
  updatedAt: Date
}, {
  timestamps: true
});

// Indexes
touristGroupSchema.index({ creator: 1 });
touristGroupSchema.index({ 'members.tourist': 1 });
touristGroupSchema.index({ status: 1 });
touristGroupSchema.index({ 'visitLocation.coordinates': '2dsphere' });

// Virtual for active members count
touristGroupSchema.virtual('activeMembersCount').get(function() {
  return this.members.filter(m => m.status === 'active').length;
});

// Method to add member
touristGroupSchema.methods.addMember = async function(touristId, nickname) {
  // Check if already a member
  const existingMember = this.members.find(
    m => m.tourist.toString() === touristId.toString() && m.status === 'active'
  );
  
  if (existingMember) {
    throw new Error('Tourist is already a member of this group');
  }
  
  // Check max members limit
  if (this.activeMembersCount >= this.settings.maxMembers) {
    throw new Error('Group has reached maximum members limit');
  }
  
  this.members.push({
    tourist: touristId,
    nickname,
    status: 'active'
  });
  
  // Add system message
  this.messages.push({
    sender: touristId,
    content: 'Joined the group',
    messageType: 'system'
  });
  
  await this.save();
};

// Method to remove member
touristGroupSchema.methods.removeMember = async function(touristId) {
  const member = this.members.find(
    m => m.tourist.toString() === touristId.toString()
  );
  
  if (!member) {
    throw new Error('Tourist is not a member of this group');
  }
  
  member.status = 'left';
  
  // Add system message
  this.messages.push({
    sender: touristId,
    content: 'Left the group',
    messageType: 'system'
  });
  
  await this.save();
};

// Method to send message
touristGroupSchema.methods.sendMessage = async function(senderId, content, messageType = 'text') {
  this.messages.push({
    sender: senderId,
    content,
    messageType
  });
  
  await this.save();
  return this.messages[this.messages.length - 1];
};

// Method to complete group (when all members return ID cards)
touristGroupSchema.methods.completeGroup = async function() {
  this.status = 'completed';
  this.completedAt = new Date();
  await this.save();
};

module.exports = mongoose.model('TouristGroup', touristGroupSchema);
