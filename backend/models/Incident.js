const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['crowd_overcrowding', 'suspicious_behavior', 'emergency', 'safety_violation', 'other'],
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved', 'closed'],
        default: 'open'
    },
    location: {
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        },
        address: String,
        landmark: String,
        geofenceId: String
    },
    aiAnalysis: {
        crowdDensity: {
            type: Number,
            min: 0,
            max: 1
        },
        riskScore: {
            type: Number,
            min: 0,
            max: 1
        },
        anomalyDetected: Boolean,
        predictions: [{
            type: String,
            confidence: Number,
            timestamp: Date
        }],
        imageAnalysis: {
            imagePath: String,
            detectedObjects: [{
                class: String,
                confidence: Number,
                bbox: [Number] // [x, y, width, height]
            }],
            crowdCount: Number
        }
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    witnesses: [{
        name: String,
        contact: String,
        digitalId: String,
        verified: Boolean
    }],
    evidence: [{
        type: {
            type: String,
            enum: ['image', 'video', 'document', 'audio']
        },
        filePath: String,
        fileName: String,
        fileSize: Number,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    response: {
        actions: [{
            action: String,
            takenBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            notes: String
        }],
        estimatedResolutionTime: Date,
        actualResolutionTime: Date
    },
    tags: [String],
    priority: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for geospatial queries
incidentSchema.index({ 'location.coordinates': '2dsphere' });

// Index for efficient querying
incidentSchema.index({ status: 1, severity: 1, createdAt: -1 });
incidentSchema.index({ type: 1, createdAt: -1 });
incidentSchema.index({ reportedBy: 1 });

// Update timestamp on save
incidentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Incident', incidentSchema);