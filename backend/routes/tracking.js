const express = require('express');
const router = express.Router();
const TouristTracking = require('../models/TouristTracking');
const LocationHistory = require('../models/LocationHistory');
const Geofence = require('../models/Geofence');
const GeofenceAlert = require('../models/GeofenceAlert');

// Link phone number to blockchain ID (called when ID card is issued)
router.post('/link', async (req, res) => {
  try {
    const { 
      blockchainId, 
      phoneNumber, 
      touristInfo,
      initialLocation 
    } = req.body;

    // Validate required fields
    if (!blockchainId || !phoneNumber) {
      return res.status(400).json({ 
        error: 'blockchainId and phoneNumber are required' 
      });
    }

    // Check if blockchain ID already exists and is active
    const existing = await TouristTracking.findOne({ blockchainId });
    if (existing && existing.cardIssued) {
      return res.status(400).json({ 
        error: 'This blockchain ID is already in use',
        existingPhone: existing.phoneNumber
      });
    }

    // Create or update tracking record
    const trackingData = {
      blockchainId,
      phoneNumber,
      touristInfo: touristInfo || {},
      status: 'active',
      cardIssued: true,
      issuedAt: new Date(),
      returnedAt: null,
      lastUpdated: new Date()
    };

    // Set initial location if provided
    if (initialLocation && initialLocation.longitude && initialLocation.latitude) {
      trackingData.currentLocation = {
        type: 'Point',
        coordinates: [initialLocation.longitude, initialLocation.latitude]
      };
    }

    const tracking = await TouristTracking.findOneAndUpdate(
      { blockchainId },
      trackingData,
      { upsert: true, new: true }
    );

    // Log initial location if provided
    if (initialLocation && initialLocation.longitude && initialLocation.latitude) {
      await LocationHistory.create({
        blockchainId,
        phoneNumber,
        location: {
          type: 'Point',
          coordinates: [initialLocation.longitude, initialLocation.latitude]
        },
        source: 'manual',
        recordedAt: new Date()
      });
    }

    res.status(201).json({
      message: 'Tourist tracking activated',
      tracking: {
        blockchainId: tracking.blockchainId,
        phoneNumber: tracking.phoneNumber,
        status: tracking.status,
        issuedAt: tracking.issuedAt
      }
    });

  } catch (error) {
    console.error('Link error:', error);
    res.status(500).json({ 
      error: 'Failed to link blockchain ID', 
      details: error.message 
    });
  }
});

// Update tourist location (called from mobile app every 30s)
router.post('/location', async (req, res) => {
  try {
    const { 
      blockchainId, 
      phoneNumber, 
      latitude, 
      longitude,
      accuracy,
      altitude,
      speed,
      heading,
      deviceInfo
    } = req.body;

    // Validate required fields
    if (!blockchainId || !latitude || !longitude) {
      return res.status(400).json({ 
        error: 'blockchainId, latitude, and longitude are required' 
      });
    }

    // Validate coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ 
        error: 'Invalid coordinates' 
      });
    }

    // Find tourist tracking record
    const tracking = await TouristTracking.findOne({ blockchainId });
    if (!tracking) {
      return res.status(404).json({ 
        error: 'Tourist tracking not found. Please link blockchain ID first.' 
      });
    }

    // Update current location
    await tracking.updateLocation(longitude, latitude);

    // Check for geofence breaches
    const geofences = await Geofence.find({
      isActive: true,
      area: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        }
      }
    });

    // Create alerts for restricted geofences
    for (const geofence of geofences) {
      if (geofence.type === 'restricted') {
        // Check if alert already exists in last 5 minutes (prevent spam)
        const recentAlert = await GeofenceAlert.findOne({
          blockchainId,
          geofenceId: geofence._id,
          createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
        });

        if (!recentAlert) {
          const alert = await GeofenceAlert.create({
            touristId: tracking._id,
            blockchainId,
            geofenceId: geofence._id,
            geofenceName: geofence.name,
            alertType: 'breach',
            severity: 'critical',
            location: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            message: `Tourist entered restricted zone: ${geofence.name}`,
            metadata: {
              touristName: tracking.touristInfo?.name,
              phoneNumber: tracking.phoneNumber,
              nationality: tracking.touristInfo?.nationality
            }
          });

          // Add alert to tracking record
          await tracking.addAlert('geofence_breach', `Entered restricted zone: ${geofence.name}`, 'critical');

          // Update tourist status to suspicious
          if (tracking.status === 'active') {
            tracking.status = 'suspicious';
            await tracking.save();
          }
        }
      }
    }

    // Save to location history
    await LocationHistory.create({
      blockchainId,
      phoneNumber: phoneNumber || tracking.phoneNumber,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      accuracy,
      altitude,
      speed,
      heading,
      deviceInfo,
      source: 'gps',
      recordedAt: new Date()
    });

    res.json({
      message: 'Location updated successfully',
      timestamp: new Date(),
      location: {
        latitude,
        longitude
      }
    });

  } catch (error) {
    console.error('Location update error:', error);
    res.status(500).json({ 
      error: 'Failed to update location', 
      details: error.message 
    });
  }
});

// Get all active tourists (for admin dashboard)
router.get('/tourists', async (req, res) => {
  try {
    const { status = 'active', limit = 100 } = req.query;

    const query = { cardIssued: true };
    if (status) {
      query.status = status;
    }

    const tourists = await TouristTracking.find(query)
      .select('-alerts -__v')
      .sort({ lastUpdated: -1 })
      .limit(parseInt(limit));

    res.json({
      count: tourists.length,
      tourists: tourists.map(t => ({
        blockchainId: t.blockchainId,
        phoneNumber: t.phoneNumber,
        touristInfo: t.touristInfo,
        location: {
          latitude: t.currentLocation?.coordinates[1],
          longitude: t.currentLocation?.coordinates[0]
        },
        status: t.status,
        lastUpdated: t.lastUpdated,
        issuedAt: t.issuedAt
      }))
    });

  } catch (error) {
    console.error('Get tourists error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tourists', 
      details: error.message 
    });
  }
});

// Get tourist details by blockchain ID
router.get('/tourist/:blockchainId', async (req, res) => {
  try {
    const { blockchainId } = req.params;

    const tracking = await TouristTracking.findOne({ blockchainId });
    if (!tracking) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    res.json({
      blockchainId: tracking.blockchainId,
      phoneNumber: tracking.phoneNumber,
      touristInfo: tracking.touristInfo,
      location: {
        latitude: tracking.currentLocation?.coordinates[1],
        longitude: tracking.currentLocation?.coordinates[0]
      },
      status: tracking.status,
      cardIssued: tracking.cardIssued,
      issuedAt: tracking.issuedAt,
      returnedAt: tracking.returnedAt,
      lastUpdated: tracking.lastUpdated,
      alerts: tracking.alerts
    });

  } catch (error) {
    console.error('Get tourist error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tourist', 
      details: error.message 
    });
  }
});

// Get location history for a tourist
router.get('/history/:blockchainId', async (req, res) => {
  try {
    const { blockchainId } = req.params;
    const { limit = 100, startTime, endTime } = req.query;

    let history;
    if (startTime && endTime) {
      history = await LocationHistory.getHistoryByTimeRange(
        blockchainId,
        new Date(startTime),
        new Date(endTime)
      );
    } else {
      history = await LocationHistory.getHistory(blockchainId, parseInt(limit));
    }

    res.json({
      blockchainId,
      count: history.length,
      history: history.map(h => ({
        latitude: h.location.coordinates[1],
        longitude: h.location.coordinates[0],
        accuracy: h.accuracy,
        recordedAt: h.recordedAt,
        source: h.source
      }))
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch history', 
      details: error.message 
    });
  }
});

// Get tourist's path (simplified coordinates for map display)
router.get('/path/:blockchainId', async (req, res) => {
  try {
    const { blockchainId } = req.params;
    const { limit = 50 } = req.query;

    const path = await LocationHistory.getPath(blockchainId, parseInt(limit));

    res.json({
      blockchainId,
      path: path.map(p => ({
        lat: p.location.coordinates[1],
        lng: p.location.coordinates[0],
        time: p.recordedAt
      })).reverse() // Oldest to newest for path rendering
    });

  } catch (error) {
    console.error('Get path error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch path', 
      details: error.message 
    });
  }
});

// Return ID card (unlink blockchain ID from tourist)
router.post('/return', async (req, res) => {
  try {
    const { blockchainId } = req.body;

    if (!blockchainId) {
      return res.status(400).json({ error: 'blockchainId is required' });
    }

    const tracking = await TouristTracking.findOne({ blockchainId });
    if (!tracking) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    await tracking.returnCard();

    res.json({
      message: 'ID card returned successfully',
      blockchainId,
      returnedAt: tracking.returnedAt,
      status: tracking.status
    });

  } catch (error) {
    console.error('Return card error:', error);
    res.status(500).json({ 
      error: 'Failed to return card', 
      details: error.message 
    });
  }
});

// Find tourists near a location
router.post('/nearby', async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5000 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        error: 'latitude and longitude are required' 
      });
    }

    const tourists = await TouristTracking.findNearby(
      longitude, 
      latitude, 
      maxDistance
    );

    res.json({
      count: tourists.length,
      tourists: tourists.map(t => ({
        blockchainId: t.blockchainId,
        phoneNumber: t.phoneNumber,
        location: {
          latitude: t.currentLocation.coordinates[1],
          longitude: t.currentLocation.coordinates[0]
        },
        lastUpdated: t.lastUpdated
      }))
    });

  } catch (error) {
    console.error('Nearby search error:', error);
    res.status(500).json({ 
      error: 'Failed to search nearby', 
      details: error.message 
    });
  }
});

// Update tourist status (for admin)
router.patch('/status/:blockchainId', async (req, res) => {
  try {
    const { blockchainId } = req.params;
    const { status, alertMessage } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'status is required' });
    }

    const tracking = await TouristTracking.findOne({ blockchainId });
    if (!tracking) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    tracking.status = status;

    if (alertMessage) {
      await tracking.addAlert('suspicious_activity', alertMessage);
    }

    await tracking.save();

    res.json({
      message: 'Status updated successfully',
      blockchainId,
      status: tracking.status
    });

  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ 
      error: 'Failed to update status', 
      details: error.message 
    });
  }
});

// Get all geofence alerts
router.get('/alerts', async (req, res) => {
  try {
    const { acknowledged, severity, limit = 50 } = req.query;
    
    const query = {};
    if (acknowledged !== undefined) {
      query.acknowledged = acknowledged === 'true';
    }
    if (severity) {
      query.severity = severity;
    }

    const alerts = await GeofenceAlert.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('geofenceId')
      .lean();

    res.json({
      count: alerts.length,
      alerts: alerts.map(a => ({
        id: a._id,
        blockchainId: a.blockchainId,
        geofenceName: a.geofenceName,
        alertType: a.alertType,
        severity: a.severity,
        message: a.message,
        location: {
          latitude: a.location.coordinates[1],
          longitude: a.location.coordinates[0]
        },
        acknowledged: a.acknowledged,
        acknowledgedBy: a.acknowledgedBy,
        metadata: a.metadata,
        createdAt: a.createdAt
      }))
    });

  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch alerts', 
      details: error.message 
    });
  }
});

// Get alerts for specific tourist
router.get('/alerts/:blockchainId', async (req, res) => {
  try {
    const { blockchainId } = req.params;
    const { limit = 20 } = req.query;

    const alerts = await GeofenceAlert.getAlertsByTourist(blockchainId, parseInt(limit));

    res.json({
      blockchainId,
      count: alerts.length,
      alerts: alerts.map(a => ({
        id: a._id,
        geofenceName: a.geofenceName,
        alertType: a.alertType,
        severity: a.severity,
        message: a.message,
        acknowledged: a.acknowledged,
        createdAt: a.createdAt
      }))
    });

  } catch (error) {
    console.error('Get tourist alerts error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tourist alerts', 
      details: error.message 
    });
  }
});

// Acknowledge alert
router.patch('/alerts/:alertId/acknowledge', async (req, res) => {
  try {
    const { alertId } = req.params;
    const { acknowledgedBy = 'system' } = req.body;

    const alert = await GeofenceAlert.findById(alertId);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    await alert.acknowledge(acknowledgedBy);

    res.json({
      message: 'Alert acknowledged',
      alert: {
        id: alert._id,
        acknowledged: alert.acknowledged,
        acknowledgedBy: alert.acknowledgedBy,
        acknowledgedAt: alert.acknowledgedAt
      }
    });

  } catch (error) {
    console.error('Acknowledge alert error:', error);
    res.status(500).json({ 
      error: 'Failed to acknowledge alert', 
      details: error.message 
    });
  }
});

// Get critical alerts (last 24 hours)
router.get('/alerts/critical/recent', async (req, res) => {
  try {
    const { hours = 24 } = req.query;
    const alerts = await GeofenceAlert.getCriticalAlerts(parseInt(hours));

    res.json({
      count: alerts.length,
      alerts: alerts.map(a => ({
        id: a._id,
        blockchainId: a.blockchainId,
        touristName: a.metadata?.touristName,
        geofenceName: a.geofenceName,
        message: a.message,
        location: {
          latitude: a.location.coordinates[1],
          longitude: a.location.coordinates[0]
        },
        createdAt: a.createdAt
      }))
    });

  } catch (error) {
    console.error('Get critical alerts error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch critical alerts', 
      details: error.message 
    });
  }
});

module.exports = router;
