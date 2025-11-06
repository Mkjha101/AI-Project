const express = require('express');
const { authenticateToken } = require('./auth');
const Incident = require('../models/Incident');
const Geofence = require('../models/Geofence');
const User = require('../models/User');

const router = express.Router();

// Get Dashboard Statistics
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const { timeframe = '24h' } = req.query;
        
        // Calculate date range
        const now = new Date();
        let startDate = new Date(now);
        
        switch (timeframe) {
            case '1h':
                startDate.setHours(now.getHours() - 1);
                break;
            case '24h':
            default:
                startDate.setHours(now.getHours() - 24);
                break;
            case '7d':
                startDate.setDate(now.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(now.getDate() - 30);
                break;
        }

        const dateFilter = { createdAt: { $gte: startDate } };

        try {
            // Fetch data from database
            const [
                totalIncidents,
                openIncidents,
                criticalIncidents,
                totalGeofences,
                activeGeofences,
                totalUsers,
                recentIncidents,
                incidentsByType,
                incidentsBySeverity
            ] = await Promise.all([
                Incident.countDocuments(dateFilter),
                Incident.countDocuments({ ...dateFilter, status: { $in: ['open', 'in_progress'] } }),
                Incident.countDocuments({ ...dateFilter, severity: 'critical' }),
                Geofence.countDocuments(),
                Geofence.countDocuments({ 'monitoring.isActive': true }),
                User.countDocuments({ isActive: true }),
                Incident.find(dateFilter)
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .populate('reportedBy', 'username profile.firstName profile.lastName')
                    .select('title type severity status location createdAt'),
                Incident.aggregate([
                    { $match: dateFilter },
                    { $group: { _id: '$type', count: { $sum: 1 } } }
                ]),
                Incident.aggregate([
                    { $match: dateFilter },
                    { $group: { _id: '$severity', count: { $sum: 1 } } }
                ])
            ]);

            // Calculate response times and resolution rates
            const resolvedIncidents = await Incident.find({
                ...dateFilter,
                status: 'resolved',
                'response.actualResolutionTime': { $exists: true }
            });

            let avgResponseTime = 0;
            if (resolvedIncidents.length > 0) {
                const totalResponseTime = resolvedIncidents.reduce((sum, incident) => {
                    const responseTime = new Date(incident.response.actualResolutionTime) - new Date(incident.createdAt);
                    return sum + responseTime;
                }, 0);
                avgResponseTime = totalResponseTime / resolvedIncidents.length / (1000 * 60); // Convert to minutes
            }

            const resolutionRate = totalIncidents > 0 ? (resolvedIncidents.length / totalIncidents * 100) : 0;

            // Get active alerts from geofences
            const geofencesWithAlerts = await Geofence.find({
                'alerts.resolved': false
            }).select('name alerts');

            const activeAlerts = geofencesWithAlerts.reduce((alerts, geofence) => {
                const unresolvedAlerts = geofence.alerts.filter(alert => !alert.resolved);
                return alerts.concat(unresolvedAlerts.map(alert => ({
                    id: alert._id,
                    geofenceName: geofence.name,
                    type: alert.type,
                    severity: alert.severity,
                    message: alert.message,
                    triggeredAt: alert.triggeredAt
                })));
            }, []);

            res.json({
                success: true,
                data: {
                    overview: {
                        totalIncidents,
                        openIncidents,
                        criticalIncidents,
                        totalGeofences,
                        activeGeofences,
                        totalUsers,
                        avgResponseTime: Math.round(avgResponseTime),
                        resolutionRate: Math.round(resolutionRate * 10) / 10
                    },
                    breakdown: {
                        incidentsByType: incidentsByType.reduce((acc, item) => {
                            acc[item._id] = item.count;
                            return acc;
                        }, {}),
                        incidentsBySeverity: incidentsBySeverity.reduce((acc, item) => {
                            acc[item._id] = item.count;
                            return acc;
                        }, {})
                    },
                    recentActivity: {
                        incidents: recentIncidents,
                        alerts: activeAlerts.slice(0, 10) // Limit to 10 most recent
                    },
                    timeframe,
                    generatedAt: new Date().toISOString()
                }
            });

        } catch (dbError) {
            console.error('Database error:', dbError.message);
            
            // Fallback with mock data if database is not available
            const mockStats = {
                overview: {
                    totalIncidents: Math.floor(Math.random() * 50) + 10,
                    openIncidents: Math.floor(Math.random() * 20) + 5,
                    criticalIncidents: Math.floor(Math.random() * 5) + 1,
                    totalGeofences: Math.floor(Math.random() * 20) + 5,
                    activeGeofences: Math.floor(Math.random() * 15) + 3,
                    totalUsers: Math.floor(Math.random() * 100) + 20,
                    avgResponseTime: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
                    resolutionRate: Math.floor(Math.random() * 30) + 70 // 70-100%
                },
                breakdown: {
                    incidentsByType: {
                        crowd_overcrowding: Math.floor(Math.random() * 10) + 2,
                        suspicious_behavior: Math.floor(Math.random() * 8) + 1,
                        emergency: Math.floor(Math.random() * 3) + 1,
                        safety_violation: Math.floor(Math.random() * 5) + 1
                    },
                    incidentsBySeverity: {
                        low: Math.floor(Math.random() * 15) + 5,
                        medium: Math.floor(Math.random() * 12) + 3,
                        high: Math.floor(Math.random() * 8) + 2,
                        critical: Math.floor(Math.random() * 3) + 1
                    }
                },
                recentActivity: {
                    incidents: [],
                    alerts: []
                },
                timeframe,
                generatedAt: new Date().toISOString(),
                note: 'Database unavailable - using mock data'
            };

            res.json({
                success: true,
                data: mockStats
            });
        }

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to retrieve dashboard statistics' });
    }
});

// Get Active Alerts
router.get('/alerts', authenticateToken, async (req, res) => {
    try {
        const { limit = 20, severity, type } = req.query;

        const filter = {};
        if (severity) filter['alerts.severity'] = severity;
        if (type) filter['alerts.type'] = type;

        try {
            // Get geofence alerts
            const geofencesWithAlerts = await Geofence.find({
                'alerts.resolved': false,
                ...filter
            }).select('name type alerts location').limit(parseInt(limit));

            // Get recent high-severity incidents
            const recentIncidents = await Incident.find({
                status: { $in: ['open', 'in_progress'] },
                severity: { $in: ['high', 'critical'] }
            })
            .populate('reportedBy', 'username profile.firstName profile.lastName')
            .sort({ createdAt: -1 })
            .limit(10);

            // Format alerts
            const geofenceAlerts = geofencesWithAlerts.reduce((alerts, geofence) => {
                const unresolvedAlerts = geofence.alerts.filter(alert => !alert.resolved);
                return alerts.concat(unresolvedAlerts.map(alert => ({
                    id: alert._id,
                    source: 'geofence',
                    sourceId: geofence._id,
                    sourceName: geofence.name,
                    type: alert.type,
                    severity: alert.severity,
                    message: alert.message,
                    triggeredAt: alert.triggeredAt,
                    location: geofence.location || null
                })));
            }, []);

            const incidentAlerts = recentIncidents.map(incident => ({
                id: incident._id,
                source: 'incident',
                sourceId: incident._id,
                sourceName: incident.title,
                type: incident.type,
                severity: incident.severity,
                message: incident.description,
                triggeredAt: incident.createdAt,
                location: incident.location,
                reportedBy: incident.reportedBy
            }));

            // Combine and sort by severity and time
            const allAlerts = [...geofenceAlerts, ...incidentAlerts]
                .sort((a, b) => {
                    // Sort by severity first (critical > high > medium > low)
                    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
                    if (severityDiff !== 0) return severityDiff;
                    
                    // Then by time (newest first)
                    return new Date(b.triggeredAt) - new Date(a.triggeredAt);
                })
                .slice(0, parseInt(limit));

            res.json({
                success: true,
                data: {
                    alerts: allAlerts,
                    summary: {
                        total: allAlerts.length,
                        bySeverity: {
                            critical: allAlerts.filter(a => a.severity === 'critical').length,
                            high: allAlerts.filter(a => a.severity === 'high').length,
                            medium: allAlerts.filter(a => a.severity === 'medium').length,
                            low: allAlerts.filter(a => a.severity === 'low').length
                        },
                        bySource: {
                            geofence: geofenceAlerts.length,
                            incident: incidentAlerts.length
                        }
                    }
                }
            });

        } catch (dbError) {
            console.error('Database error:', dbError.message);
            
            // Mock alerts data
            const mockAlerts = [
                {
                    id: '1',
                    source: 'geofence',
                    sourceName: 'Central Park Zone',
                    type: 'capacity_exceeded',
                    severity: 'high',
                    message: 'Tourist area capacity exceeded - 95% occupancy',
                    triggeredAt: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
                },
                {
                    id: '2',
                    source: 'incident',
                    sourceName: 'Suspicious Activity Report',
                    type: 'suspicious_behavior',
                    severity: 'medium',
                    message: 'Unusual gathering detected in main square',
                    triggeredAt: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
                }
            ];

            res.json({
                success: true,
                data: {
                    alerts: mockAlerts,
                    summary: {
                        total: mockAlerts.length,
                        bySeverity: { critical: 0, high: 1, medium: 1, low: 0 },
                        bySource: { geofence: 1, incident: 1 }
                    },
                    note: 'Database unavailable - using mock data'
                }
            });
        }

    } catch (error) {
        console.error('Get alerts error:', error);
        res.status(500).json({ error: 'Failed to retrieve alerts' });
    }
});

// Get Real-time Monitoring Data
router.get('/monitoring', authenticateToken, async (req, res) => {
    try {
        const { geofenceId } = req.query;

        try {
            let filter = { 'monitoring.isActive': true };
            if (geofenceId) {
                filter._id = geofenceId;
            }

            const activeGeofences = await Geofence.find(filter)
                .select('name type statistics location monitoring')
                .limit(20);

            // Get recent incidents for context
            const recentIncidents = await Incident.find({
                createdAt: { $gte: new Date(Date.now() - 3600000) }, // Last hour
                status: { $in: ['open', 'in_progress'] }
            })
            .select('title type severity location aiAnalysis.crowdDensity aiAnalysis.riskScore')
            .limit(10);

            const monitoringData = {
                geofences: activeGeofences.map(geofence => ({
                    id: geofence._id,
                    name: geofence.name,
                    type: geofence.type,
                    currentOccupancy: geofence.statistics.currentOccupancy || 0,
                    maxCapacity: geofence.rules?.maxCapacity || null,
                    occupancyRate: geofence.rules?.maxCapacity ? 
                        (geofence.statistics.currentOccupancy || 0) / geofence.rules.maxCapacity : null,
                    alertThreshold: geofence.rules?.alertThreshold || 0.8,
                    location: geofence.location,
                    status: geofence.monitoring.isActive ? 'active' : 'inactive',
                    lastUpdated: geofence.statistics.lastUpdated
                })),
                recentIncidents: recentIncidents.map(incident => ({
                    id: incident._id,
                    title: incident.title,
                    type: incident.type,
                    severity: incident.severity,
                    location: incident.location,
                    crowdDensity: incident.aiAnalysis?.crowdDensity || null,
                    riskScore: incident.aiAnalysis?.riskScore || null
                })),
                systemStatus: {
                    totalActiveGeofences: activeGeofences.length,
                    averageOccupancy: activeGeofences.length > 0 ? 
                        activeGeofences.reduce((sum, g) => sum + (g.statistics.currentOccupancy || 0), 0) / activeGeofences.length : 0,
                    alertsInLastHour: recentIncidents.length,
                    lastUpdated: new Date().toISOString()
                }
            };

            res.json({
                success: true,
                data: monitoringData
            });

        } catch (dbError) {
            console.error('Database error:', dbError.message);
            
            // Mock monitoring data
            const mockMonitoringData = {
                geofences: [
                    {
                        id: '1',
                        name: 'Tourist Center',
                        type: 'tourist_zone',
                        currentOccupancy: Math.floor(Math.random() * 200) + 50,
                        maxCapacity: 300,
                        occupancyRate: Math.random() * 0.4 + 0.4, // 0.4 to 0.8
                        alertThreshold: 0.8,
                        status: 'active',
                        lastUpdated: new Date().toISOString()
                    },
                    {
                        id: '2',
                        name: 'Heritage Site',
                        type: 'monitoring_area',
                        currentOccupancy: Math.floor(Math.random() * 150) + 25,
                        maxCapacity: 200,
                        occupancyRate: Math.random() * 0.3 + 0.3,
                        alertThreshold: 0.7,
                        status: 'active',
                        lastUpdated: new Date().toISOString()
                    }
                ],
                recentIncidents: [],
                systemStatus: {
                    totalActiveGeofences: 2,
                    averageOccupancy: 75,
                    alertsInLastHour: 0,
                    lastUpdated: new Date().toISOString()
                },
                note: 'Database unavailable - using mock data'
            };

            res.json({
                success: true,
                data: mockMonitoringData
            });
        }

    } catch (error) {
        console.error('Get monitoring data error:', error);
        res.status(500).json({ error: 'Failed to retrieve monitoring data' });
    }
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({
        message: 'Dashboard service is working',
        timestamp: new Date().toISOString(),
        endpoints: {
            'GET /stats': 'Get dashboard statistics',
            'GET /alerts': 'Get active alerts',
            'GET /monitoring': 'Get real-time monitoring data'
        }
    });
});

module.exports = router;