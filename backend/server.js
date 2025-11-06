const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Compression and logging
app.use(compression());
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Static file serving
app.use('/uploads', express.static(uploadsDir));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_tourist_safety', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    // Don't exit in development, allow testing without DB
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

// Import routes
const authRoutes = require('./routes/auth');
const multiRoleAuthRoutes = require('./routes/multiRoleAuth');
const incidentRoutes = require('./routes/incidents');
const aiRoutes = require('./routes/ai');
const geofenceRoutes = require('./routes/geofence');
const blockchainRoutes = require('./routes/blockchain');
const dashboardRoutes = require('./routes/dashboard');
const trackingRoutes = require('./routes/tracking');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/multi-auth', multiRoleAuthRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/geofence', geofenceRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tracking', trackingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: '1.0.0',
        services: {
            database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            ai_service: 'Checking...',
            blockchain_service: 'Checking...'
        }
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Smart Tourist Safety Monitoring System - Backend API',
        version: '1.0.0',
        documentation: '/api/docs',
        health: '/api/health'
    });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Smart Tourist Safety System API',
        version: '1.0.0',
        endpoints: {
            auth: {
                'POST /api/auth/register': 'Register new user',
                'POST /api/auth/login': 'User login',
                'GET /api/auth/profile': 'Get user profile'
            },
            ai: {
                'POST /api/ai/analyze-crowd': 'Analyze crowd in uploaded image',
                'POST /api/ai/detect-anomaly': 'Detect behavior anomalies',
                'POST /api/ai/predict-risk': 'Predict risk levels',
                'POST /api/ai/chatbot': 'Chatbot conversation'
            },
            incidents: {
                'GET /api/incidents': 'Get all incidents',
                'POST /api/incidents': 'Create new incident',
                'GET /api/incidents/:id': 'Get incident by ID',
                'PUT /api/incidents/:id': 'Update incident'
            },
            geofence: {
                'POST /api/geofence/check': 'Check geofence status',
                'POST /api/geofence/alert': 'Create geofence alert'
            },
            blockchain: {
                'POST /api/blockchain/verify-id': 'Verify digital ID',
                'POST /api/blockchain/create-id': 'Create new digital ID'
            },
            dashboard: {
                'GET /api/dashboard/stats': 'Get dashboard statistics',
                'GET /api/dashboard/alerts': 'Get active alerts'
            }
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.originalUrl,
        method: req.method
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
    console.log(`❤️ Health Check: http://localhost:${PORT}/api/health`);
});