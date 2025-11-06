const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');
const Geofence = require('../models/Geofence');

const router = express.Router();

// Check if a point is within any active geofences
router.post('/check', [
    body('latitude').isFloat({ min: -90, max: 90 }),
    body('longitude').isFloat({ min: -180, max: 180 }),
    body('userId').optional().isString()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { latitude, longitude, userId } = req.body;

        // Find active geofences that contain this point
        const activeGeofences = await Geofence.find({
            'monitoring.isActive': true
        });

        const containingGeofences = [];
        const alerts = [];

        for (const geofence of activeGeofences) {
            let isInside = false;

            if (geofence.geometry.type === 'Circle') {
                const distance = geofence.calculateDistance(
                    geofence.geometry.coordinates[1], // lat
                    geofence.geometry.coordinates[0], // lng
                    latitude,
                    longitude
                );
                isInside = distance <= geofence.geometry.radius;
            }
            // Add polygon check logic here if needed

            if (isInside) {
                containingGeofences.push({
                    id: geofence._id,
                    name: geofence.name,
                    type: geofence.type,
                    rules: geofence.rules
                });

                // Check for rule violations
                const now = new Date();
                const currentHour = now.getHours();
                const currentTime = `${currentHour.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

                // Check time restrictions
                if (geofence.rules.allowedHours) {
                    const startTime = geofence.rules.allowedHours.start;
                    const endTime = geofence.rules.allowedHours.end;
                    
                    if (currentTime < startTime || currentTime > endTime) {
                        alerts.push({
                            geofenceId: geofence._id,
                            geofenceName: geofence.name,
                            type: 'time_restriction',
                            message: `Access outside allowed hours (${startTime} - ${endTime})`,
                            severity: 'medium'
                        });
                    }
                }

                // Check capacity if applicable
                if (geofence.rules.maxCapacity && geofence.statistics.currentOccupancy) {
                    const occupancyRate = geofence.statistics.currentOccupancy / geofence.rules.maxCapacity;
                    if (occupancyRate >= geofence.rules.alertThreshold) {
                        alerts.push({
                            geofenceId: geofence._id,
                            geofenceName: geofence.name,
                            type: 'capacity_exceeded',
                            message: `High occupancy: ${Math.round(occupancyRate * 100)}% of capacity`,
                            severity: occupancyRate >= 0.9 ? 'high' : 'medium'
                        });
                    }
                }
            }
        }

        res.json({
            success: true,
            data: {
                location: { latitude, longitude },
                inGeofence: containingGeofences.length > 0,
                geofences: containingGeofences,
                alerts: alerts,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Geofence check error:', error);
        res.status(500).json({ error: 'Failed to check geofence status' });
    }
});

// Create a new geofence alert
router.post('/alert', authenticateToken, [
    body('geofenceId').isMongoId(),
    body('type').isIn(['capacity_exceeded', 'unauthorized_access', 'suspicious_activity', 'emergency']),
    body('message').notEmpty().trim(),
    body('severity').optional().isIn(['low', 'medium', 'high', 'critical'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { geofenceId, type, message, severity, location } = req.body;

        const geofence = await Geofence.findById(geofenceId);
        if (!geofence) {
            return res.status(404).json({ error: 'Geofence not found' });
        }

        const alert = {
            type: type,
            message: message,
            severity: severity || 'medium',
            triggeredAt: new Date(),
            resolved: false
        };

        geofence.alerts.push(alert);
        geofence.updatedAt = new Date();
        
        await geofence.save();

        // Get the newly added alert
        const newAlert = geofence.alerts[geofence.alerts.length - 1];

        res.status(201).json({
            success: true,
            message: 'Geofence alert created successfully',
            data: {
                alert: {
                    id: newAlert._id,
                    geofenceId: geofence._id,
                    geofenceName: geofence.name,
                    type: newAlert.type,
                    message: newAlert.message,
                    severity: newAlert.severity,
                    triggeredAt: newAlert.triggeredAt,
                    resolved: newAlert.resolved
                },
                location: location || null
            }
        });

    } catch (error) {
        console.error('Create geofence alert error:', error);
        res.status(500).json({ error: 'Failed to create geofence alert' });
    }
});

// Get all geofences
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { 
            active, 
            type, 
            includeStats = 'false',
            includeAlerts = 'false' 
        } = req.query;

        const filter = {};
        if (active !== undefined) {
            filter['monitoring.isActive'] = active === 'true';
        }
        if (type) {
            filter.type = type;
        }

        let query = Geofence.find(filter);

        // Conditionally populate based on query params
        if (includeStats === 'true') {
            // Include statistics in response
        }

        const geofences = await query
            .populate('createdBy', 'username profile.firstName profile.lastName')
            .sort({ createdAt: -1 });

        // Filter alerts if requested
        const responseData = geofences.map(geofence => {
            const geofenceObj = geofence.toObject();
            
            if (includeAlerts !== 'true') {
                delete geofenceObj.alerts;
            } else {
                // Only include unresolved alerts
                geofenceObj.alerts = geofenceObj.alerts.filter(alert => !alert.resolved);
            }

            return geofenceObj;
        });

        res.json({
            success: true,
            data: {
                geofences: responseData,
                count: responseData.length
            }
        });

    } catch (error) {
        console.error('Get geofences error:', error);
        res.status(500).json({ error: 'Failed to retrieve geofences' });
    }
});

// Create a new geofence
router.post('/', authenticateToken, [
    body('name').notEmpty().trim().escape(),
    body('type').isIn(['tourist_zone', 'restricted_area', 'emergency_zone', 'high_traffic', 'monitoring_area']),
    body('geometry.type').isIn(['Polygon', 'Circle']),
    body('geometry.coordinates').notEmpty(),
    body('rules.maxCapacity').optional().isInt({ min: 1 }),
    body('rules.alertThreshold').optional().isFloat({ min: 0, max: 1 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validate geometry based on type
        const { geometry } = req.body;
        if (geometry.type === 'Circle') {
            if (!geometry.coordinates || !Array.isArray(geometry.coordinates) || geometry.coordinates.length !== 2) {
                return res.status(400).json({ 
                    error: 'Circle geometry requires coordinates as [longitude, latitude]' 
                });
            }
            if (!geometry.radius || geometry.radius <= 0) {
                return res.status(400).json({ 
                    error: 'Circle geometry requires a positive radius in meters' 
                });
            }
        }

        const geofenceData = {
            ...req.body,
            createdBy: req.user.id,
            statistics: {
                totalVisitors: 0,
                currentOccupancy: 0,
                peakOccupancy: {},
                lastUpdated: new Date()
            }
        };

        const geofence = new Geofence(geofenceData);
        await geofence.save();

        await geofence.populate('createdBy', 'username profile.firstName profile.lastName');

        res.status(201).json({
            success: true,
            message: 'Geofence created successfully',
            data: { geofence }
        });

    } catch (error) {
        console.error('Create geofence error:', error);
        res.status(500).json({ error: 'Failed to create geofence' });
    }
});

// Update geofence statistics (for monitoring systems)
router.put('/:id/stats', authenticateToken, [
    body('currentOccupancy').optional().isInt({ min: 0 }),
    body('totalVisitors').optional().isInt({ min: 0 }),
    body('averageStayTime').optional().isFloat({ min: 0 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const geofence = await Geofence.findById(req.params.id);
        if (!geofence) {
            return res.status(404).json({ error: 'Geofence not found' });
        }

        const { currentOccupancy, totalVisitors, averageStayTime } = req.body;

        // Update statistics
        if (currentOccupancy !== undefined) {
            geofence.statistics.currentOccupancy = currentOccupancy;

            // Update peak occupancy tracking
            const now = new Date();
            const today = now.toDateString();
            
            if (!geofence.statistics.peakOccupancy.today || 
                currentOccupancy > geofence.statistics.peakOccupancy.today) {
                geofence.statistics.peakOccupancy.today = currentOccupancy;
            }
        }

        if (totalVisitors !== undefined) {
            geofence.statistics.totalVisitors = totalVisitors;
        }

        if (averageStayTime !== undefined) {
            geofence.statistics.averageStayTime = averageStayTime;
        }

        geofence.statistics.lastUpdated = new Date();
        geofence.updatedAt = new Date();

        await geofence.save();

        res.json({
            success: true,
            message: 'Geofence statistics updated successfully',
            data: { 
                statistics: geofence.statistics 
            }
        });

    } catch (error) {
        console.error('Update geofence stats error:', error);
        res.status(500).json({ error: 'Failed to update geofence statistics' });
    }
});

// Resolve a geofence alert
router.put('/:geofenceId/alerts/:alertId/resolve', authenticateToken, async (req, res) => {
    try {
        const { geofenceId, alertId } = req.params;

        const geofence = await Geofence.findById(geofenceId);
        if (!geofence) {
            return res.status(404).json({ error: 'Geofence not found' });
        }

        const alert = geofence.alerts.id(alertId);
        if (!alert) {
            return res.status(404).json({ error: 'Alert not found' });
        }

        alert.resolved = true;
        alert.resolvedAt = new Date();
        geofence.updatedAt = new Date();

        await geofence.save();

        res.json({
            success: true,
            message: 'Alert resolved successfully',
            data: { alert }
        });

    } catch (error) {
        console.error('Resolve alert error:', error);
        res.status(500).json({ error: 'Failed to resolve alert' });
    }
});

// Get geofence analytics
router.get('/:id/analytics', authenticateToken, async (req, res) => {
    try {
        const { timeframe = '7d' } = req.query;

        const geofence = await Geofence.findById(req.params.id);
        if (!geofence) {
            return res.status(404).json({ error: 'Geofence not found' });
        }

        // Calculate date range
        const now = new Date();
        let startDate = new Date(now);
        
        switch (timeframe) {
            case '24h':
                startDate.setHours(now.getHours() - 24);
                break;
            case '7d':
            default:
                startDate.setDate(now.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(now.getDate() - 30);
                break;
        }

        // Generate mock analytics data
        const analytics = {
            occupancyTrend: [],
            alertsSummary: {
                total: geofence.alerts.length,
                resolved: geofence.alerts.filter(a => a.resolved).length,
                byType: {}
            },
            utilizationRate: geofence.rules.maxCapacity ? 
                (geofence.statistics.currentOccupancy / geofence.rules.maxCapacity * 100).toFixed(1) : 
                null,
            averageStayTime: geofence.statistics.averageStayTime || 0,
            peakHours: ['10:00', '14:00', '18:00'], // Mock data
            timeframe: timeframe
        };

        // Count alerts by type
        geofence.alerts.forEach(alert => {
            analytics.alertsSummary.byType[alert.type] = 
                (analytics.alertsSummary.byType[alert.type] || 0) + 1;
        });

        res.json({
            success: true,
            data: {
                geofence: {
                    id: geofence._id,
                    name: geofence.name,
                    type: geofence.type
                },
                analytics: analytics,
                generatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Get geofence analytics error:', error);
        res.status(500).json({ error: 'Failed to retrieve geofence analytics' });
    }
});

// Test endpoint
router.get('/test/connection', (req, res) => {
    res.json({
        message: 'Geofence service is working',
        timestamp: new Date().toISOString(),
        endpoints: {
            'POST /check': 'Check if point is in geofence',
            'POST /alert': 'Create geofence alert',
            'GET /': 'Get all geofences',
            'POST /': 'Create new geofence',
            'PUT /:id/stats': 'Update geofence statistics',
            'GET /:id/analytics': 'Get geofence analytics'
        }
    });
});

module.exports = router;