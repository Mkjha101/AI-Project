const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const TourismOfficer = require('../models/TourismOfficer');
const Geofence = require('../models/Geofence');
const auth = require('../middleware/auth');
const { sendApprovalNotification } = require('../utils/email');

// Middleware to check if user is admin
const adminOnly = async (req, res, next) => {
    try {
        if (req.user.type !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authorization check failed' });
    }
};

// POST /api/admin/region-setup - Save region boundaries and setup
router.post('/region-setup', auth, adminOnly, async (req, res) => {
    try {
        const { regionData } = req.body;

        if (!regionData || !regionData.boundaries || regionData.boundaries.length < 3) {
            return res.status(400).json({ error: 'Invalid region data. At least 3 points required.' });
        }

        if (!regionData.maxCapacity || regionData.maxCapacity < 1) {
            return res.status(400).json({ error: 'Invalid max capacity' });
        }

        // Update admin with region data
        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        admin.regionData = {
            boundaries: regionData.boundaries,
            center: regionData.center,
            area: regionData.area,
            maxCapacity: regionData.maxCapacity,
            isSetup: true,
        };

        await admin.save();

        res.json({
            message: 'Region setup completed successfully',
            regionData: admin.regionData,
        });
    } catch (error) {
        console.error('Region setup error:', error);
        res.status(500).json({ error: 'Failed to save region setup' });
    }
});

// GET /api/admin/officers/pending - Get pending officer approvals
router.get('/officers/pending', auth, adminOnly, async (req, res) => {
    try {
        const pendingOfficers = await TourismOfficer.find({
            adminApproved: false,
        }).select('-password');

        res.json({ officers: pendingOfficers });
    } catch (error) {
        console.error('Fetch pending officers error:', error);
        res.status(500).json({ error: 'Failed to fetch pending officers' });
    }
});

// GET /api/admin/officers/all - Get all officers
router.get('/officers/all', auth, adminOnly, async (req, res) => {
    try {
        const officers = await TourismOfficer.find().select('-password');
        res.json({ officers });
    } catch (error) {
        console.error('Fetch officers error:', error);
        res.status(500).json({ error: 'Failed to fetch officers' });
    }
});

// POST /api/admin/officers/:id/approve - Approve officer
router.post('/officers/:id/approve', auth, adminOnly, async (req, res) => {
    try {
        const officer = await TourismOfficer.findById(req.params.id);
        if (!officer) {
            return res.status(404).json({ error: 'Officer not found' });
        }

        officer.adminApproved = true;
        await officer.save();

        // Send approval notification email
        try {
            await sendApprovalNotification(
                officer.email,
                officer.fullName,
                'Your Tourism Officer Account Has Been Approved!',
                'Your account has been approved by the administrator. You can now access all features.'
            );
        } catch (emailError) {
            console.error('Failed to send approval email:', emailError);
            // Don't fail the approval if email fails
        }

        res.json({
            message: 'Officer approved successfully',
            officer: {
                id: officer._id,
                fullName: officer.fullName,
                email: officer.email,
                adminApproved: officer.adminApproved,
            },
        });
    } catch (error) {
        console.error('Approve officer error:', error);
        res.status(500).json({ error: 'Failed to approve officer' });
    }
});

// POST /api/admin/officers/:id/reject - Reject officer
router.post('/officers/:id/reject', auth, adminOnly, async (req, res) => {
    try {
        const { reason } = req.body;
        const officer = await TourismOfficer.findById(req.params.id);
        
        if (!officer) {
            return res.status(404).json({ error: 'Officer not found' });
        }

        // Send rejection email
        try {
            await sendApprovalNotification(
                officer.email,
                officer.fullName,
                'Tourism Officer Account - Approval Status',
                reason || 'Your account application has been rejected. Please contact the administrator for more information.'
            );
        } catch (emailError) {
            console.error('Failed to send rejection email:', emailError);
        }

        // Delete the officer account
        await TourismOfficer.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Officer rejected and removed successfully',
        });
    } catch (error) {
        console.error('Reject officer error:', error);
        res.status(500).json({ error: 'Failed to reject officer' });
    }
});

// GET /api/admin/facilities - Get all facilities for this admin
router.get('/facilities', auth, adminOnly, async (req, res) => {
    try {
        const facilities = await Geofence.find({
            adminId: req.user.id,
        }).sort({ createdAt: -1 });

        res.json({ facilities });
    } catch (error) {
        console.error('Fetch facilities error:', error);
        res.status(500).json({ error: 'Failed to fetch facilities' });
    }
});

// POST /api/admin/facilities - Create new facility
router.post('/facilities', auth, adminOnly, async (req, res) => {
    try {
        const { category, name, ownerName, phone, address, latitude, longitude, isVerified } = req.body;

        if (!category || !name || !ownerName || !phone || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const facility = new Geofence({
            adminId: req.user.id,
            name,
            description: `${category} - ${ownerName}`,
            type: 'facility',
            category,
            ownerName,
            phone,
            address,
            location: {
                type: 'Point',
                coordinates: [longitude || 0, latitude || 0],
            },
            isVerified: isVerified || false,
        });

        await facility.save();

        res.status(201).json({
            message: 'Facility created successfully',
            facility,
        });
    } catch (error) {
        console.error('Create facility error:', error);
        res.status(500).json({ error: 'Failed to create facility' });
    }
});

// PUT /api/admin/facilities/:id - Update facility
router.put('/facilities/:id', auth, adminOnly, async (req, res) => {
    try {
        const { category, name, ownerName, phone, address, latitude, longitude, isVerified } = req.body;

        const facility = await Geofence.findOne({
            _id: req.params.id,
            adminId: req.user.id,
        });

        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        facility.name = name || facility.name;
        facility.description = `${category} - ${ownerName}`;
        facility.category = category || facility.category;
        facility.ownerName = ownerName || facility.ownerName;
        facility.phone = phone || facility.phone;
        facility.address = address || facility.address;
        facility.location = {
            type: 'Point',
            coordinates: [longitude || 0, latitude || 0],
        };
        facility.isVerified = isVerified !== undefined ? isVerified : facility.isVerified;

        await facility.save();

        res.json({
            message: 'Facility updated successfully',
            facility,
        });
    } catch (error) {
        console.error('Update facility error:', error);
        res.status(500).json({ error: 'Failed to update facility' });
    }
});

// DELETE /api/admin/facilities/:id - Delete facility
router.delete('/facilities/:id', auth, adminOnly, async (req, res) => {
    try {
        const facility = await Geofence.findOneAndDelete({
            _id: req.params.id,
            adminId: req.user.id,
        });

        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        res.json({
            message: 'Facility deleted successfully',
        });
    } catch (error) {
        console.error('Delete facility error:', error);
        res.status(500).json({ error: 'Failed to delete facility' });
    }
});

module.exports = router;
