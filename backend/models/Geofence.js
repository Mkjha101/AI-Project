const mongoose = require('mongoose');

const geofenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    type: {
        type: String,
        enum: ['tourist_zone', 'restricted_area', 'emergency_zone', 'high_traffic', 'monitoring_area', 'facility'],
        required: true
    },
    // Facility-specific fields
    category: String, // Hospital, Hotel, Restaurant, etc.
    ownerName: String,
    phone: String,
    address: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number] // [longitude, latitude]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon', 'Circle'],
        },
        coordinates: {
            type: mongoose.Schema.Types.Mixed, // For Polygon: [[[lng, lat]]], For Circle: [lng, lat]
        },
        radius: Number // Only for Circle type, in meters
    },
    rules: {
        maxCapacity: Number,
        alertThreshold: {
            type: Number,
            min: 0,
            max: 1,
            default: 0.8
        },
        allowedHours: {
            start: String, // "HH:MM" format
            end: String
        },
        restrictions: [String]
    },
    monitoring: {
        isActive: {
            type: Boolean,
            default: true
        },
        sensors: [{
            type: String,
            location: [Number], // [longitude, latitude]
            status: {
                type: String,
                enum: ['active', 'inactive', 'maintenance'],
                default: 'active'
            }
        }],
        aiEnabled: {
            type: Boolean,
            default: true
        }
    },
    alerts: [{
        type: {
            type: String,
            enum: ['capacity_exceeded', 'unauthorized_access', 'suspicious_activity', 'emergency']
        },
        message: String,
        severity: {
            type: String,
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium'
        },
        triggeredAt: {
            type: Date,
            default: Date.now
        },
        resolved: {
            type: Boolean,
            default: false
        },
        resolvedAt: Date
    }],
    statistics: {
        totalVisitors: {
            type: Number,
            default: 0
        },
        currentOccupancy: {
            type: Number,
            default: 0
        },
        peakOccupancy: {
            today: Number,
            thisWeek: Number,
            thisMonth: Number
        },
        averageStayTime: Number, // in minutes
        lastUpdated: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
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
geofenceSchema.index({ 'geometry.coordinates': '2dsphere' });
geofenceSchema.index({ type: 1, 'monitoring.isActive': 1 });

// Update timestamp on save
geofenceSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Method to check if a point is inside the geofence
geofenceSchema.methods.containsPoint = function(longitude, latitude) {
    if (this.geometry.type === 'Circle') {
        const [centerLng, centerLat] = this.geometry.coordinates;
        const distance = this.calculateDistance(centerLat, centerLng, latitude, longitude);
        return distance <= this.geometry.radius;
    }
    // For polygon, use MongoDB's geospatial query
    return false; // Implement polygon containment logic if needed
};

// Calculate distance between two points (Haversine formula)
geofenceSchema.methods.calculateDistance = function(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

module.exports = mongoose.model('Geofence', geofenceSchema);