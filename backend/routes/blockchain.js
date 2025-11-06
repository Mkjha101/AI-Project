const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const DigitalId = require('../models/DigitalId');
const User = require('../models/User');
const Tourist = require('../models/Tourist');
const TourismOfficer = require('../models/TourismOfficer');
const Admin = require('../models/Admin');

// Verify Digital ID
router.post('/verify-id', [
    body('digitalId').notEmpty().trim(),
    body('userData').optional().isObject()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { digitalId, userData } = req.body;
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';

        try {
            const blockchainResponse = await axios.post(`${blockchainServiceUrl}/verify`, {
                digital_id: digitalId,
                user_data: userData || {}
            }, { timeout: 10000 });

            res.json({
                success: true,
                message: 'Digital ID verification completed',
                data: {
                    digitalId: digitalId,
                    verified: blockchainResponse.data.verified || false,
                    confidence: blockchainResponse.data.confidence || 0.9,
                    blockchainHash: blockchainResponse.data.blockchain_hash || null,
                    timestamp: blockchainResponse.data.timestamp || new Date().toISOString(),
                    metadata: blockchainResponse.data.metadata || {},
                    verificationLevel: blockchainResponse.data.verification_level || 'basic'
                }
            });

        } catch (blockchainError) {
            console.error('Blockchain Service Error:', blockchainError.message);
            
            // Fallback verification with mock data
            const mockVerification = {
                digitalId: digitalId,
                verified: Math.random() > 0.2, // 80% success rate for demo
                confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
                blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                timestamp: new Date().toISOString(),
                metadata: {
                    issuer: 'Demo Authority',
                    issuedAt: new Date(Date.now() - Math.random() * 31536000000).toISOString(), // Random date within last year
                    expiresAt: new Date(Date.now() + 31536000000).toISOString(), // Expires in 1 year
                    type: 'tourist_id'
                },
                verificationLevel: 'basic',
                note: 'Blockchain service unavailable - using mock verification'
            };

            res.json({
                success: true,
                message: 'Digital ID verification completed (mock data)',
                data: mockVerification
            });
        }

    } catch (error) {
        console.error('Digital ID verification error:', error);
        res.status(500).json({ error: 'Failed to verify digital ID' });
    }
});

// Create New Digital ID
router.post('/create-id', [
    body('userData').isObject(),
    body('userData.firstName').notEmpty().trim().escape(),
    body('userData.lastName').notEmpty().trim().escape(),
    body('userData.email').isEmail().normalizeEmail(),
    body('idType').optional().isIn(['tourist_id', 'resident_id', 'authority_id', 'emergency_id'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userData, idType, biometricData, documents } = req.body;
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';

        try {
            const blockchainResponse = await axios.post(`${blockchainServiceUrl}/create-id`, {
                user_data: userData,
                id_type: idType || 'tourist_id',
                biometric_data: biometricData || {},
                documents: documents || []
            }, { timeout: 15000 });

            // Persist to DB
            try {
                const payload = blockchainResponse.data || {};
                const digitalIdValue = payload.digital_id || payload.digitalId || payload.digitalId;
                const record = await DigitalId.create({
                    digitalId: digitalIdValue,
                    blockchainHash: payload.blockchain_hash || payload.blockchainHash || null,
                    idType: idType || 'tourist_id',
                    status: 'active',
                    qrCode: payload.qr_code || null,
                    publicKey: payload.public_key || null,
                    createdAt: payload.created_at || new Date().toISOString(),
                    expiresAt: payload.expires_at || null,
                    metadata: payload.metadata || {}
                });

                // Try linking to an existing owner by email if provided
                if (userData && userData.email) {
                    const email = userData.email.toLowerCase();
                    const ownerCandidates = await Promise.all([
                        User.findOne({ email }),
                        Tourist.findOne({ email }),
                        TourismOfficer.findOne({ email }),
                        Admin.findOne({ email })
                    ]);

                    const owner = ownerCandidates.find(o => !!o);
                    if (owner) {
                        record.ownerType = owner.constructor.modelName || 'Unknown';
                        record.ownerRef = owner._id;
                        await record.save();

                        // Update owner record with reference
                        if (record.ownerType === 'User') {
                            owner.digitalId = { blockchainId: record.digitalId, verified: true, verifiedAt: new Date() };
                            await owner.save();
                        } else if (record.ownerType === 'Tourist') {
                            owner.blockchainId = record.digitalId;
                            await owner.save();
                        } else if (record.ownerType === 'TourismOfficer' || record.ownerType === 'Admin') {
                            owner.blockchainId = record.digitalId;
                            await owner.save();
                        }
                    }
                }

                res.status(201).json({
                    success: true,
                    message: 'Digital ID created successfully',
                    data: {
                        digitalId: record.digitalId,
                        blockchainHash: record.blockchainHash,
                        qrCode: record.qrCode,
                        publicKey: record.publicKey,
                        createdAt: record.createdAt,
                        expiresAt: record.expiresAt,
                        idType: record.idType,
                        status: record.status
                    }
                });

                // Emit real-time event
                try {
                    const io = req.app.get('io');
                    if (io) io.emit('blockchain:idCreated', { digitalId: record.digitalId, ownerType: record.ownerType, ownerRef: record.ownerRef });
                } catch (e) {
                    console.warn('Socket emit failed (blockchain:idCreated):', e.message);
                }

            } catch (dbErr) {
                console.error('Failed to persist Digital ID:', dbErr);
                return res.status(500).json({ error: 'Failed to persist digital ID' });
            }

        } catch (blockchainError) {
            console.error('Blockchain Service Error:', blockchainError.message);
            
            // Fallback ID creation with mock data
            const mockId = `TID-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            const mockCreation = {
                digitalId: mockId,
                blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                qrCode: `data:image/png;base64,${Buffer.from(mockId).toString('base64')}`, // Mock QR code
                publicKey: `pk_${Math.random().toString(36).substr(2, 20)}`,
                createdAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
                idType: idType || 'tourist_id',
                status: 'active',
                verificationLevel: 'verified',
                note: 'Blockchain service unavailable - using mock ID creation'
            };

            // Persist mock to DB
            try {
                const record = await DigitalId.create({
                    digitalId: mockId,
                    blockchainHash: mockCreation.blockchainHash,
                    idType: mockCreation.idType,
                    status: mockCreation.status,
                    qrCode: mockCreation.qrCode,
                    publicKey: mockCreation.publicKey,
                    createdAt: mockCreation.createdAt,
                    expiresAt: mockCreation.expiresAt,
                    metadata: mockCreation.metadata || {}
                });

                // Attempt owner link by email
                if (userData && userData.email) {
                    const email = userData.email.toLowerCase();
                    const ownerCandidates = await Promise.all([
                        User.findOne({ email }),
                        Tourist.findOne({ email }),
                        TourismOfficer.findOne({ email }),
                        Admin.findOne({ email })
                    ]);
                    const owner = ownerCandidates.find(o => !!o);
                    if (owner) {
                        record.ownerType = owner.constructor.modelName || 'Unknown';
                        record.ownerRef = owner._id;
                        await record.save();

                        if (record.ownerType === 'User') {
                            owner.digitalId = { blockchainId: record.digitalId, verified: true, verifiedAt: new Date() };
                            await owner.save();
                        } else if (record.ownerType === 'Tourist') {
                            owner.blockchainId = record.digitalId;
                            await owner.save();
                        } else if (record.ownerType === 'TourismOfficer' || record.ownerType === 'Admin') {
                            owner.blockchainId = record.digitalId;
                            await owner.save();
                        }
                    }
                }

                res.status(201).json({
                    success: true,
                    message: 'Digital ID created successfully (mock data)',
                    data: {
                        digitalId: record.digitalId,
                        blockchainHash: record.blockchainHash,
                        qrCode: record.qrCode,
                        publicKey: record.publicKey,
                        createdAt: record.createdAt,
                        expiresAt: record.expiresAt,
                        idType: record.idType,
                        status: record.status,
                        note: mockCreation.note
                    }
                });

                try {
                    const io = req.app.get('io');
                    if (io) io.emit('blockchain:idCreated', { digitalId: record.digitalId, ownerType: record.ownerType, ownerRef: record.ownerRef });
                } catch (e) {
                    console.warn('Socket emit failed (blockchain:idCreated):', e.message);
                }

            } catch (dbErr) {
                console.error('Failed to persist mock Digital ID:', dbErr);
                return res.status(500).json({ error: 'Failed to persist digital ID' });
            }
        }

    } catch (error) {
        console.error('Create digital ID error:', error);
        res.status(500).json({ error: 'Failed to create digital ID' });
    }
});

// Get Digital ID Information
router.get('/id/:digitalId', async (req, res) => {
    try {
        const { digitalId } = req.params;
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';

        try {
            const blockchainResponse = await axios.get(`${blockchainServiceUrl}/id/${digitalId}`, {
                timeout: 10000
            });

            res.json({
                success: true,
                message: 'Digital ID information retrieved',
                data: {
                    digitalId: digitalId,
                    exists: blockchainResponse.data.exists || true,
                    status: blockchainResponse.data.status || 'active',
                    idType: blockchainResponse.data.id_type || 'tourist_id',
                    createdAt: blockchainResponse.data.created_at,
                    expiresAt: blockchainResponse.data.expires_at,
                    verificationLevel: blockchainResponse.data.verification_level || 'verified',
                    blockchainHash: blockchainResponse.data.blockchain_hash,
                    metadata: blockchainResponse.data.metadata || {}
                }
            });

        } catch (blockchainError) {
            console.error('Blockchain Service Error:', blockchainError.message);
            
            // Mock ID information
            const mockIdInfo = {
                digitalId: digitalId,
                exists: true,
                status: Math.random() > 0.1 ? 'active' : 'expired', // 90% active
                idType: 'tourist_id',
                createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                verificationLevel: 'verified',
                blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                metadata: {
                    issuer: 'Demo Tourism Authority',
                    country: 'Demo Country',
                    region: 'Demo Region'
                },
                note: 'Blockchain service unavailable - using mock data'
            };

            res.json({
                success: true,
                message: 'Digital ID information retrieved (mock data)',
                data: mockIdInfo
            });
        }

    } catch (error) {
        console.error('Get digital ID error:', error);
        res.status(500).json({ error: 'Failed to retrieve digital ID information' });
    }
});

// Batch Verify Multiple Digital IDs
router.post('/batch-verify', [
    body('digitalIds').isArray({ min: 1, max: 10 }),
    body('digitalIds.*').notEmpty().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { digitalIds } = req.body;
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';

        try {
            const blockchainResponse = await axios.post(`${blockchainServiceUrl}/batch-verify`, {
                digital_ids: digitalIds
            }, { timeout: 20000 });

            res.json({
                success: true,
                message: 'Batch verification completed',
                data: {
                    results: blockchainResponse.data.results || [],
                    totalProcessed: digitalIds.length,
                    verified: blockchainResponse.data.verified_count || 0,
                    failed: blockchainResponse.data.failed_count || 0,
                    processingTime: blockchainResponse.data.processing_time || 0
                }
            });

        } catch (blockchainError) {
            console.error('Blockchain Service Error:', blockchainError.message);
            
            // Mock batch verification
            const mockResults = digitalIds.map(id => ({
                digitalId: id,
                verified: Math.random() > 0.2, // 80% success rate
                confidence: Math.random() * 0.3 + 0.7,
                timestamp: new Date().toISOString(),
                status: Math.random() > 0.1 ? 'active' : 'expired'
            }));

            const verifiedCount = mockResults.filter(r => r.verified).length;

            res.json({
                success: true,
                message: 'Batch verification completed (mock data)',
                data: {
                    results: mockResults,
                    totalProcessed: digitalIds.length,
                    verified: verifiedCount,
                    failed: digitalIds.length - verifiedCount,
                    processingTime: digitalIds.length * 0.5,
                    note: 'Blockchain service unavailable - using mock data'
                }
            });
        }

    } catch (error) {
        console.error('Batch verification error:', error);
        res.status(500).json({ error: 'Failed to perform batch verification' });
    }
});

// Revoke Digital ID
router.post('/revoke/:digitalId', [
    body('reason').notEmpty().trim(),
    body('revokedBy').notEmpty().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { digitalId } = req.params;
        const { reason, revokedBy } = req.body;
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';

        try {
            const blockchainResponse = await axios.post(`${blockchainServiceUrl}/revoke`, {
                digital_id: digitalId,
                reason: reason,
                revoked_by: revokedBy
            }, { timeout: 15000 });

            res.json({
                success: true,
                message: 'Digital ID revoked successfully',
                data: {
                    digitalId: digitalId,
                    revoked: blockchainResponse.data.revoked || true,
                    reason: reason,
                    revokedBy: revokedBy,
                    revokedAt: blockchainResponse.data.revoked_at || new Date().toISOString(),
                    blockchainHash: blockchainResponse.data.blockchain_hash,
                    revocationId: blockchainResponse.data.revocation_id
                }
            });

            // Update DB record if exists
            try {
                const record = await DigitalId.findOne({ digitalId });
                if (record) {
                    record.status = 'revoked';
                    record.metadata = record.metadata || {};
                    record.metadata.revokedBy = revokedBy;
                    record.metadata.revokeReason = reason;
                    record.metadata.revokedAt = blockchainResponse.data.revoked_at || new Date().toISOString();
                    await record.save();

                    try {
                        const io = req.app.get('io');
                        if (io) io.emit('blockchain:idRevoked', { digitalId: record.digitalId, revokedBy });
                    } catch (e) {
                        console.warn('Socket emit failed (blockchain:idRevoked):', e.message);
                    }
                }
            } catch (dbErr) {
                console.warn('Failed to update DigitalId record on revoke:', dbErr.message);
            }

        } catch (blockchainError) {
            console.error('Blockchain Service Error:', blockchainError.message);
            
            // Mock revocation
            res.json({
                success: true,
                message: 'Digital ID revoked successfully (mock data)',
                data: {
                    digitalId: digitalId,
                    revoked: true,
                    reason: reason,
                    revokedBy: revokedBy,
                    revokedAt: new Date().toISOString(),
                    blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                    revocationId: `REV-${Date.now()}`,
                    note: 'Blockchain service unavailable - using mock data'
                }
            });
            // Update DB record if exists (mock path)
            try {
                const record = await DigitalId.findOne({ digitalId });
                if (record) {
                    record.status = 'revoked';
                    record.metadata = record.metadata || {};
                    record.metadata.revokedBy = revokedBy;
                    record.metadata.revokeReason = reason;
                    record.metadata.revokedAt = new Date().toISOString();
                    await record.save();

                    try {
                        const io = req.app.get('io');
                        if (io) io.emit('blockchain:idRevoked', { digitalId: record.digitalId, revokedBy });
                    } catch (e) {
                        console.warn('Socket emit failed (blockchain:idRevoked):', e.message);
                    }
                }
            } catch (dbErr) {
                console.warn('Failed to update DigitalId record on revoke (mock path):', dbErr.message);
            }
        }

    } catch (error) {
        console.error('Revoke digital ID error:', error);
        res.status(500).json({ error: 'Failed to revoke digital ID' });
    }
});

// Get Blockchain Statistics
router.get('/stats', async (req, res) => {
    try {
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';

        try {
            const blockchainResponse = await axios.get(`${blockchainServiceUrl}/stats`, {
                timeout: 10000
            });

            res.json({
                success: true,
                message: 'Blockchain statistics retrieved',
                data: blockchainResponse.data
            });

        } catch (blockchainError) {
            console.error('Blockchain Service Error:', blockchainError.message);
            
            // Mock blockchain statistics
            const mockStats = {
                totalIds: Math.floor(Math.random() * 10000) + 1000,
                activeIds: Math.floor(Math.random() * 8000) + 800,
                revokedIds: Math.floor(Math.random() * 200) + 20,
                verificationsToday: Math.floor(Math.random() * 500) + 50,
                blockchainHeight: Math.floor(Math.random() * 100000) + 10000,
                lastBlockTime: new Date(Date.now() - Math.random() * 600000).toISOString(),
                networkStatus: 'healthy',
                avgVerificationTime: Math.random() * 2 + 0.5,
                note: 'Blockchain service unavailable - using mock data'
            };

            res.json({
                success: true,
                message: 'Blockchain statistics retrieved (mock data)',
                data: mockStats
            });
        }

    } catch (error) {
        console.error('Get blockchain stats error:', error);
        res.status(500).json({ error: 'Failed to retrieve blockchain statistics' });
    }
});

// Test Blockchain Service Connection
router.get('/test', async (req, res) => {
    try {
        const blockchainServiceUrl = process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000';
        
        try {
            const response = await axios.get(`${blockchainServiceUrl}/health`, { timeout: 5000 });
            res.json({
                message: 'Blockchain service connection test',
                blockchainService: {
                    status: 'connected',
                    url: blockchainServiceUrl,
                    response: response.data
                },
                endpoints: {
                    'POST /verify-id': 'Verify digital ID',
                    'POST /create-id': 'Create new digital ID',
                    'GET /id/:digitalId': 'Get digital ID info',
                    'POST /batch-verify': 'Batch verify multiple IDs',
                    'POST /revoke/:digitalId': 'Revoke digital ID',
                    'GET /stats': 'Get blockchain statistics'
                },
                timestamp: new Date().toISOString()
            });
        } catch (blockchainError) {
            res.json({
                message: 'Blockchain service connection test',
                blockchainService: {
                    status: 'disconnected',
                    url: blockchainServiceUrl,
                    error: blockchainError.message
                },
                endpoints: {
                    'POST /verify-id': 'Verify digital ID (with fallback)',
                    'POST /create-id': 'Create new digital ID (with fallback)',
                    'GET /id/:digitalId': 'Get digital ID info (with fallback)',
                    'POST /batch-verify': 'Batch verify multiple IDs (with fallback)',
                    'POST /revoke/:digitalId': 'Revoke digital ID (with fallback)',
                    'GET /stats': 'Get blockchain statistics (with fallback)'
                },
                note: 'Service unavailable - all endpoints will use mock data',
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('Blockchain test error:', error);
        res.status(500).json({ error: 'Failed to test blockchain service' });
    }
});

module.exports = router;