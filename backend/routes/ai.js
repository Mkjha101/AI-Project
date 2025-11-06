const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
    },
    fileFilter: (req, file, cb) => {
        const allowedExtensions = (process.env.ALLOWED_EXTENSIONS || 'jpg,jpeg,png,gif').split(',');
        const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
        
        if (allowedExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type. Allowed: ${allowedExtensions.join(', ')}`));
        }
    }
});

// Crowd Analysis Endpoint
router.post('/analyze-crowd', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const { location, geofenceId } = req.body;

        // Call AI Service for crowd analysis
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
        
        try {
            // Prepare form data for AI service
            const FormData = require('form-data');
            const form = new FormData();
            form.append('image', fs.createReadStream(req.file.path));
            
            const aiResponse = await axios.post(`${aiServiceUrl}/predict/crowd-detection`, form, {
                headers: {
                    ...form.getHeaders()
                },
                timeout: 30000 // 30 second timeout
            });

            const analysisResult = {
                crowdDensity: aiResponse.data.crowd_density || 0.5,
                crowdCount: aiResponse.data.crowd_count || 0,
                riskScore: aiResponse.data.risk_score || 0.3,
                detectedObjects: aiResponse.data.detected_objects || [],
                confidence: aiResponse.data.confidence || 0.8,
                processing_time: aiResponse.data.processing_time || 0
            };

            res.json({
                success: true,
                message: 'Crowd analysis completed',
                data: {
                    imageInfo: {
                        filename: req.file.filename,
                        originalName: req.file.originalname,
                        size: req.file.size,
                        path: `/uploads/${req.file.filename}`
                    },
                    analysis: analysisResult,
                    location: location ? JSON.parse(location) : null,
                    geofenceId: geofenceId || null,
                    timestamp: new Date().toISOString(),
                    analyzedBy: req.user.id
                }
            });

        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            
            // Fallback with mock data if AI service is not available
            const mockAnalysis = {
                crowdDensity: Math.random() * 0.8 + 0.1, // 0.1 to 0.9
                crowdCount: Math.floor(Math.random() * 100) + 10,
                riskScore: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
                detectedObjects: [
                    { class: 'person', confidence: 0.85, bbox: [100, 100, 50, 150] },
                    { class: 'person', confidence: 0.92, bbox: [200, 120, 45, 140] }
                ],
                confidence: 0.75,
                processing_time: 1.2,
                note: 'AI service unavailable - using mock data'
            };

            res.json({
                success: true,
                message: 'Crowd analysis completed (mock data)',
                data: {
                    imageInfo: {
                        filename: req.file.filename,
                        originalName: req.file.originalname,
                        size: req.file.size,
                        path: `/uploads/${req.file.filename}`
                    },
                    analysis: mockAnalysis,
                    location: location ? JSON.parse(location) : null,
                    geofenceId: geofenceId || null,
                    timestamp: new Date().toISOString(),
                    analyzedBy: req.user.id
                }
            });
        }

    } catch (error) {
        console.error('Crowd analysis error:', error);
        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Failed to analyze crowd' });
    }
});

// Behavior Anomaly Detection
router.post('/detect-anomaly', authenticateToken, [
    body('data').isArray().withMessage('Data must be an array'),
    body('location').optional().isObject()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { data, location, timeWindow } = req.body;
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

        try {
            const aiResponse = await axios.post(`${aiServiceUrl}/predict/anomaly-detection`, {
                data: data,
                time_window: timeWindow || 60
            }, { timeout: 15000 });

            res.json({
                success: true,
                message: 'Anomaly detection completed',
                data: {
                    anomalyDetected: aiResponse.data.anomaly_detected || false,
                    anomalyScore: aiResponse.data.anomaly_score || 0,
                    confidence: aiResponse.data.confidence || 0,
                    patterns: aiResponse.data.patterns || [],
                    recommendations: aiResponse.data.recommendations || [],
                    location: location || null,
                    timestamp: new Date().toISOString(),
                    analyzedBy: req.user.id
                }
            });

        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            
            // Mock anomaly detection
            const mockResult = {
                anomalyDetected: Math.random() > 0.7,
                anomalyScore: Math.random(),
                confidence: Math.random() * 0.4 + 0.6,
                patterns: ['unusual_gathering', 'rapid_movement'],
                recommendations: ['increase_monitoring', 'deploy_additional_security'],
                note: 'AI service unavailable - using mock data'
            };

            res.json({
                success: true,
                message: 'Anomaly detection completed (mock data)',
                data: {
                    ...mockResult,
                    location: location || null,
                    timestamp: new Date().toISOString(),
                    analyzedBy: req.user.id
                }
            });
        }

    } catch (error) {
        console.error('Anomaly detection error:', error);
        res.status(500).json({ error: 'Failed to detect anomalies' });
    }
});

// Risk Prediction
router.post('/predict-risk', authenticateToken, [
    body('historicalData').optional().isArray(),
    body('currentConditions').isObject()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { historicalData, currentConditions, predictionWindow } = req.body;
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

        try {
            const aiResponse = await axios.post(`${aiServiceUrl}/predict/risk-prediction`, {
                historical_data: historicalData || [],
                current_conditions: currentConditions,
                prediction_window: predictionWindow || 24
            }, { timeout: 20000 });

            res.json({
                success: true,
                message: 'Risk prediction completed',
                data: {
                    riskLevel: aiResponse.data.risk_level || 'medium',
                    riskScore: aiResponse.data.risk_score || 0.5,
                    confidence: aiResponse.data.confidence || 0.7,
                    factors: aiResponse.data.risk_factors || [],
                    predictions: aiResponse.data.predictions || [],
                    recommendations: aiResponse.data.recommendations || [],
                    timeframe: predictionWindow || 24,
                    timestamp: new Date().toISOString(),
                    analyzedBy: req.user.id
                }
            });

        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            
            // Mock risk prediction
            const riskLevels = ['low', 'medium', 'high'];
            const mockResult = {
                riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
                riskScore: Math.random(),
                confidence: Math.random() * 0.3 + 0.7,
                factors: ['crowd_density', 'time_of_day', 'weather_conditions'],
                predictions: [
                    { time: '+1h', risk_score: Math.random() },
                    { time: '+4h', risk_score: Math.random() },
                    { time: '+12h', risk_score: Math.random() }
                ],
                recommendations: ['monitor_closely', 'prepare_resources'],
                note: 'AI service unavailable - using mock data'
            };

            res.json({
                success: true,
                message: 'Risk prediction completed (mock data)',
                data: {
                    ...mockResult,
                    timeframe: predictionWindow || 24,
                    timestamp: new Date().toISOString(),
                    analyzedBy: req.user.id
                }
            });
        }

    } catch (error) {
        console.error('Risk prediction error:', error);
        res.status(500).json({ error: 'Failed to predict risk' });
    }
});

// Chatbot Interaction
router.post('/chatbot', [
    body('message').notEmpty().trim().escape(),
    body('language').optional().isIn(['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ar'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { message, language, context } = req.body;
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

        try {
            const aiResponse = await axios.post(`${aiServiceUrl}/predict/chatbot`, {
                message: message,
                language: language || 'en',
                context: context || {}
            }, { timeout: 10000 });

            res.json({
                success: true,
                message: 'Chatbot response generated',
                data: {
                    response: aiResponse.data.response || 'I apologize, but I cannot process your request right now.',
                    confidence: aiResponse.data.confidence || 0.8,
                    intent: aiResponse.data.intent || 'general_inquiry',
                    language: language || 'en',
                    suggestedActions: aiResponse.data.suggested_actions || [],
                    timestamp: new Date().toISOString()
                }
            });

        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            
            // Mock chatbot responses
            const mockResponses = {
                en: "Hello! I'm here to help you with tourist safety information. How can I assist you today?",
                es: "¡Hola! Estoy aquí para ayudarte con información de seguridad turística. ¿Cómo puedo asistirte hoy?",
                fr: "Bonjour! Je suis là pour vous aider avec les informations de sécurité touristique. Comment puis-je vous aider aujourd'hui?",
                de: "Hallo! Ich bin hier, um Ihnen mit Informationen zur Touristensicherheit zu helfen. Wie kann ich Ihnen heute helfen?"
            };

            const responseLanguage = language || 'en';
            const mockResponse = mockResponses[responseLanguage] || mockResponses.en;

            res.json({
                success: true,
                message: 'Chatbot response generated (mock data)',
                data: {
                    response: mockResponse,
                    confidence: 0.85,
                    intent: 'greeting',
                    language: responseLanguage,
                    suggestedActions: ['ask_directions', 'emergency_contacts', 'safety_tips'],
                    timestamp: new Date().toISOString(),
                    note: 'AI service unavailable - using mock data'
                }
            });
        }

    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ error: 'Failed to process chatbot request' });
    }
});

// Test AI Service Connection
router.get('/test', async (req, res) => {
    try {
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
        
        try {
            const response = await axios.get(`${aiServiceUrl}/health`, { timeout: 5000 });
            res.json({
                message: 'AI service connection test',
                aiService: {
                    status: 'connected',
                    url: aiServiceUrl,
                    response: response.data
                },
                timestamp: new Date().toISOString()
            });
        } catch (aiError) {
            res.json({
                message: 'AI service connection test',
                aiService: {
                    status: 'disconnected',
                    url: aiServiceUrl,
                    error: aiError.message
                },
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('AI test error:', error);
        res.status(500).json({ error: 'Failed to test AI service' });
    }
});

module.exports = router;