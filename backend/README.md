# Smart Tourist Safety System - Backend

This is the backend service for the Smart Tourist Safety Monitoring System, built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **RESTful API** for all system components
- **Authentication & Authorization** with JWT tokens
- **Database Integration** with MongoDB and Mongoose
- **File Upload Support** for images and evidence
- **AI Service Integration** for crowd analysis and predictions
- **Blockchain Integration** for digital ID verification
- **Geofencing** for location-based monitoring
- **Real-time Dashboard** statistics and alerts
- **Comprehensive Error Handling** and validation
- **Rate Limiting** and security middleware

## 📦 Installation

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file and configure
copy .env.example .env
# Edit .env file with your settings

# Start the server
npm start

# For development (with auto-restart)
npm run dev

# Run tests
npm test
```

## 🛠️ Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart_tourist_safety
JWT_SECRET=your_super_secret_jwt_key_here
AI_SERVICE_URL=http://localhost:8000
BLOCKCHAIN_SERVICE_URL=http://localhost:7000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### AI Services
- `POST /api/ai/analyze-crowd` - Analyze crowd in uploaded image
- `POST /api/ai/detect-anomaly` - Detect behavior anomalies
- `POST /api/ai/predict-risk` - Predict risk levels
- `POST /api/ai/chatbot` - Chatbot conversation

### Incident Management
- `GET /api/incidents` - Get all incidents (with filtering)
- `POST /api/incidents` - Create new incident
- `GET /api/incidents/:id` - Get incident by ID
- `PUT /api/incidents/:id` - Update incident
- `POST /api/incidents/:id/actions` - Add response action
- `POST /api/incidents/:id/evidence` - Upload evidence
- `GET /api/incidents/stats/summary` - Get incident statistics

### Geofencing
- `POST /api/geofence/check` - Check if point is in geofence
- `POST /api/geofence/alert` - Create geofence alert
- `GET /api/geofence` - Get all geofences
- `POST /api/geofence` - Create new geofence
- `PUT /api/geofence/:id/stats` - Update geofence statistics
- `GET /api/geofence/:id/analytics` - Get geofence analytics

### Blockchain
- `POST /api/blockchain/verify-id` - Verify digital ID
- `POST /api/blockchain/create-id` - Create new digital ID
- `GET /api/blockchain/id/:digitalId` - Get digital ID info
- `POST /api/blockchain/batch-verify` - Batch verify multiple IDs
- `GET /api/blockchain/stats` - Get blockchain statistics

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/alerts` - Get active alerts  
- `GET /api/dashboard/monitoring` - Get real-time monitoring data

### System
- `GET /api/health` - System health check
- `GET /api/docs` - API documentation
- `GET /` - Service information

## 🧪 Testing

The backend includes comprehensive testing:

```powershell
# Run all tests
npm test

# Test specific endpoints manually
node test.js
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Rate limiting** to prevent abuse
- **Input validation** with express-validator
- **JWT authentication** for protected routes
- **Password hashing** with bcryptjs
- **File upload restrictions** and validation

## 📁 Project Structure

```
backend/
├── models/          # MongoDB models (User, Incident, Geofence)
├── routes/          # API route handlers
├── uploads/         # File upload storage
├── .env            # Environment configuration
├── server.js       # Main server file
├── test.js         # Test suite
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## 🔌 Database Models

### User Model
- Authentication and profile information
- Role-based access control
- Digital ID integration

### Incident Model
- Incident reporting and tracking
- AI analysis integration
- Evidence and response management

### Geofence Model
- Geographic boundary definitions
- Monitoring and alerting rules
- Statistics and analytics

## 🚦 Error Handling

The API uses consistent error responses:

```json
{
  "error": "Error message",
  "stack": "Error stack (development only)"
}
```

## 📊 Monitoring

- Real-time statistics and metrics
- Performance monitoring
- Error tracking and logging
- Health check endpoints

## 🔧 Development

```powershell
# Install development dependencies
npm install --include=dev

# Start with nodemon for auto-restart
npm run dev

# Run tests in watch mode
npm run test:watch
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production` in environment
2. Configure production MongoDB URI
3. Set secure JWT secret
4. Enable HTTPS
5. Configure reverse proxy (nginx)
6. Set up process monitoring (PM2)

## 📝 API Documentation

Visit `/api/docs` when the server is running for interactive API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details.