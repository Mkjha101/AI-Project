const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');
const Incident = require('../models/Incident');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for evidence uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'evidence');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'evidence-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for evidence
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mov|pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type for evidence upload'));
        }
    }
});

// Get all incidents with filtering and pagination
router.get('/', authenticateToken, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            severity,
            type,
            assignedTo,
            startDate,
            endDate,
            search
        } = req.query;

        // Build filter object
        const filter = {};
        
        if (status) filter.status = status;
        if (severity) filter.severity = severity;
        if (type) filter.type = type;
        if (assignedTo) filter.assignedTo = assignedTo;
        
        // Date range filter
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        // Search in title and description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
            populate: [
                { path: 'reportedBy', select: 'username email profile.firstName profile.lastName' },
                { path: 'assignedTo', select: 'username email profile.firstName profile.lastName' }
            ]
        };

        // Use pagination if available, otherwise do manual pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const incidents = await Incident.find(filter)
            .populate(options.populate)
            .sort(options.sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Incident.countDocuments(filter);

        res.json({
            success: true,
            data: {
                incidents,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });

    } catch (error) {
        console.error('Get incidents error:', error);
        res.status(500).json({ error: 'Failed to retrieve incidents' });
    }
});

// Get single incident by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id)
            .populate('reportedBy', 'username email profile.firstName profile.lastName')
            .populate('assignedTo', 'username email profile.firstName profile.lastName')
            .populate('response.actions.takenBy', 'username profile.firstName profile.lastName');

        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        res.json({
            success: true,
            data: { incident }
        });

    } catch (error) {
        console.error('Get incident error:', error);
        res.status(500).json({ error: 'Failed to retrieve incident' });
    }
});

// Create new incident
router.post('/', authenticateToken, [
    body('title').notEmpty().trim().escape(),
    body('description').notEmpty().trim(),
    body('type').isIn(['crowd_overcrowding', 'suspicious_behavior', 'emergency', 'safety_violation', 'other']),
    body('severity').optional().isIn(['low', 'medium', 'high', 'critical']),
    body('location.coordinates').isArray({ min: 2, max: 2 }),
    body('location.coordinates.*').isNumeric()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const incidentData = {
            ...req.body,
            reportedBy: req.user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Set default priority based on severity
        if (!incidentData.priority) {
            const severityToPriority = {
                low: 1,
                medium: 3,
                high: 4,
                critical: 5
            };
            incidentData.priority = severityToPriority[incidentData.severity || 'medium'];
        }

        const incident = new Incident(incidentData);
        await incident.save();

        // Populate the saved incident
        await incident.populate('reportedBy', 'username email profile.firstName profile.lastName');

        res.status(201).json({
            success: true,
            message: 'Incident created successfully',
            data: { incident }
        });

    } catch (error) {
        console.error('Create incident error:', error);
        res.status(500).json({ error: 'Failed to create incident' });
    }
});

// Update incident
router.put('/:id', authenticateToken, [
    body('title').optional().trim().escape(),
    body('description').optional().trim(),
    body('status').optional().isIn(['open', 'in_progress', 'resolved', 'closed']),
    body('severity').optional().isIn(['low', 'medium', 'high', 'critical']),
    body('assignedTo').optional().isMongoId()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        // Check permissions - only reporter, assigned user, or admin can update
        const canUpdate = 
            req.user.role === 'admin' ||
            incident.reportedBy.toString() === req.user.id ||
            (incident.assignedTo && incident.assignedTo.toString() === req.user.id);

        if (!canUpdate) {
            return res.status(403).json({ error: 'Permission denied' });
        }

        // Update fields
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== undefined) {
                incident[key] = req.body[key];
            }
        });

        incident.updatedAt = new Date();
        await incident.save();

        await incident.populate([
            { path: 'reportedBy', select: 'username email profile.firstName profile.lastName' },
            { path: 'assignedTo', select: 'username email profile.firstName profile.lastName' }
        ]);

        res.json({
            success: true,
            message: 'Incident updated successfully',
            data: { incident }
        });

    } catch (error) {
        console.error('Update incident error:', error);
        res.status(500).json({ error: 'Failed to update incident' });
    }
});

// Add response action to incident
router.post('/:id/actions', authenticateToken, [
    body('action').notEmpty().trim(),
    body('notes').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        const action = {
            action: req.body.action,
            takenBy: req.user.id,
            timestamp: new Date(),
            notes: req.body.notes || ''
        };

        if (!incident.response) {
            incident.response = { actions: [] };
        }

        incident.response.actions.push(action);
        incident.updatedAt = new Date();
        
        await incident.save();
        await incident.populate('response.actions.takenBy', 'username profile.firstName profile.lastName');

        res.json({
            success: true,
            message: 'Action added successfully',
            data: { 
                action: incident.response.actions[incident.response.actions.length - 1]
            }
        });

    } catch (error) {
        console.error('Add action error:', error);
        res.status(500).json({ error: 'Failed to add action' });
    }
});

// Upload evidence for incident
router.post('/:id/evidence', authenticateToken, upload.array('evidence', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No evidence files provided' });
        }

        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            // Clean up uploaded files
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
            return res.status(404).json({ error: 'Incident not found' });
        }

        // Add evidence files to incident
        const evidenceFiles = req.files.map(file => ({
            type: file.mimetype.startsWith('image/') ? 'image' : 
                  file.mimetype.startsWith('video/') ? 'video' :
                  file.mimetype.includes('pdf') ? 'document' : 'document',
            filePath: `/uploads/evidence/${file.filename}`,
            fileName: file.originalname,
            fileSize: file.size,
            uploadedAt: new Date()
        }));

        incident.evidence.push(...evidenceFiles);
        incident.updatedAt = new Date();
        
        await incident.save();

        res.json({
            success: true,
            message: 'Evidence uploaded successfully',
            data: { 
                uploadedFiles: evidenceFiles.length,
                evidence: evidenceFiles
            }
        });

    } catch (error) {
        console.error('Upload evidence error:', error);
        // Clean up uploaded files on error
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }
        res.status(500).json({ error: 'Failed to upload evidence' });
    }
});

// Get incidents statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
    try {
        const { timeframe = '30d' } = req.query;
        
        // Calculate date range based on timeframe
        const now = new Date();
        let startDate = new Date(now);
        
        switch (timeframe) {
            case '24h':
                startDate.setHours(now.getHours() - 24);
                break;
            case '7d':
                startDate.setDate(now.getDate() - 7);
                break;
            case '30d':
            default:
                startDate.setDate(now.getDate() - 30);
                break;
            case '90d':
                startDate.setDate(now.getDate() - 90);
                break;
        }

        const dateFilter = { createdAt: { $gte: startDate } };

        // Get various statistics
        const [
            totalIncidents,
            openIncidents,
            criticalIncidents,
            statusStats,
            typeStats,
            severityStats
        ] = await Promise.all([
            Incident.countDocuments(dateFilter),
            Incident.countDocuments({ ...dateFilter, status: { $in: ['open', 'in_progress'] } }),
            Incident.countDocuments({ ...dateFilter, severity: 'critical' }),
            Incident.aggregate([
                { $match: dateFilter },
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            Incident.aggregate([
                { $match: dateFilter },
                { $group: { _id: '$type', count: { $sum: 1 } } }
            ]),
            Incident.aggregate([
                { $match: dateFilter },
                { $group: { _id: '$severity', count: { $sum: 1 } } }
            ])
        ]);

        res.json({
            success: true,
            data: {
                summary: {
                    total: totalIncidents,
                    open: openIncidents,
                    critical: criticalIncidents,
                    timeframe: timeframe
                },
                breakdown: {
                    byStatus: statusStats.reduce((acc, item) => {
                        acc[item._id] = item.count;
                        return acc;
                    }, {}),
                    byType: typeStats.reduce((acc, item) => {
                        acc[item._id] = item.count;
                        return acc;
                    }, {}),
                    bySeverity: severityStats.reduce((acc, item) => {
                        acc[item._id] = item.count;
                        return acc;
                    }, {})
                },
                generatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to retrieve statistics' });
    }
});

// Test endpoint
router.get('/test/connection', (req, res) => {
    res.json({
        message: 'Incidents service is working',
        timestamp: new Date().toISOString(),
        endpoints: {
            'GET /': 'Get all incidents',
            'POST /': 'Create new incident',
            'GET /:id': 'Get incident by ID',
            'PUT /:id': 'Update incident',
            'POST /:id/actions': 'Add response action',
            'POST /:id/evidence': 'Upload evidence',
            'GET /stats/summary': 'Get incidents statistics'
        }
    });
});

module.exports = router;