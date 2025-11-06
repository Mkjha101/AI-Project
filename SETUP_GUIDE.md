# Smart Tourist Safety System - Complete Installation & Setup Guide

## 🏗️ System Architecture

This is a complete full-stack AI-powered tourist safety monitoring system with the following components:

### Backend Services
- **Main Backend** (Node.js + Express + MongoDB) - Port 5000
- **AI Service** (Python + Flask) - Port 8000  
- **Blockchain Service** (Python + Flask) - Port 7000

### Frontend
- **Dashboard** (Next.js + React + TypeScript) - Port 3000

### Features
- 🤖 AI-powered crowd detection and analysis
- 📊 Real-time incident reporting and tracking
- 🔒 Blockchain-based digital ID verification
- 💬 Multilingual AI safety assistant
- 🗺️ Geofencing and location monitoring
- 📈 Analytics dashboard with charts and metrics

---

## 🚀 Quick Start (Step by Step)

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip
- MongoDB (local or cloud)
- Git

### 1️⃣ Setup All Services

Open **Windows PowerShell** as Administrator and run:

```powershell
# Navigate to your project directory
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system"

# Install backend dependencies
cd backend
npm install
cd ..

# Install AI service dependencies (with fallbacks)
cd ai_service
pip install flask flask-cors pillow opencv-python scikit-learn requests numpy
# Optional advanced ML (may take time to install)
pip install ultralytics tensorflow transformers torch
cd ..

# Install blockchain service dependencies  
cd blockchain_stub
pip install flask flask-cors cryptography qrcode[pil] pillow
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2️⃣ Create Environment Files

**Backend Environment (.env)**
```powershell
cd backend
echo 'NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tourist-safety
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
AI_SERVICE_URL=http://localhost:8000
BLOCKCHAIN_SERVICE_URL=http://localhost:7000' > .env
cd ..
```

**Frontend Environment (.env.local)**
```powershell
cd frontend
echo 'NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
NEXT_PUBLIC_BLOCKCHAIN_URL=http://localhost:7000' > .env.local
cd ..
```

### 3️⃣ Start All Services (5 Terminals)

**Terminal 1 - Start MongoDB**
```powershell
# Start MongoDB (make sure it's installed)
mongod
# Or if installed as service: net start MongoDB
```

**Terminal 2 - Start Backend**
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\backend"
npm run dev
```

**Terminal 3 - Start AI Service**
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\ai_service"
python app.py
```

**Terminal 4 - Start Blockchain Service**
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\blockchain_stub"
python blockchain_server.py
```

**Terminal 5 - Start Frontend**
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\frontend"
npm run dev
```

### 4️⃣ Access the System

After all services are running:
- 🌐 **Main Dashboard**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5000/api/health
- 🤖 **AI Service**: http://localhost:8000/health
- ⛓️ **Blockchain Service**: http://localhost:7000/health

---

## 🧪 Testing Each Component

### Test Backend (Terminal 6)
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\backend"
npm test
```

### Test AI Service (Terminal 7)
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\ai_service"
python test_ai_service.py
```

### Test Blockchain Service (Terminal 8)
```powershell
cd "d:\MALAY\GITHUB\AI LAB PROJECT\smart-tourist-safety-system\blockchain_stub"
python test_blockchain.py
```

### Manual Integration Test
1. Open http://localhost:3000 in your browser
2. Try uploading an image for crowd analysis
3. Chat with the AI assistant in different languages
4. Create a test incident report
5. Create and verify a digital ID

---

## 📚 System Features & Usage

### 🤖 AI Crowd Analysis
- Upload images to analyze crowd density
- Get real-time people count and risk assessment
- Receive safety recommendations
- View crowd analytics on dashboard

### 🚨 Incident Reporting
- Report safety incidents with details
- Track incident status and resolution
- View incident history and analytics
- Emergency contact integration

### 💬 Multilingual AI Assistant
- Chat in multiple languages (English, Spanish, French, etc.)
- Get safety tips and emergency information
- Ask about nearby facilities and services
- Voice output support (text-to-speech)

### 🔐 Digital ID Management
- Create blockchain-based digital IDs for tourists
- Verify identity using QR codes or ID numbers
- Secure cryptographic verification
- Revoke IDs if necessary

### 📊 Dashboard Analytics
- Real-time system status monitoring
- Incident trends and statistics
- Crowd density analytics
- Risk assessment metrics

---

## 🛠️ Troubleshooting Guide

### Common Issues & Solutions

#### 1. Port Already in Use Error
```powershell
# Check which process is using the port
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

#### 2. MongoDB Connection Failed
```powershell
# Check if MongoDB is running
mongosh

# If not installed, install MongoDB Community Server
# Start MongoDB service
net start MongoDB
```

#### 3. Python Module Import Errors
```powershell
# Install missing modules individually
pip install flask
pip install flask-cors
pip install pillow
pip install opencv-python
pip install scikit-learn
pip install numpy

# For advanced AI features (optional)
pip install ultralytics
pip install tensorflow
pip install transformers
```

#### 4. Frontend Build Issues
```powershell
cd frontend
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

#### 5. AI Models Not Loading
- The system has fallback mechanisms
- AI services will work with basic OpenCV even if advanced models fail
- Check console logs for specific model loading errors

### Expected Console Outputs

**Backend Success:**
```
🚀 Server running on port 5000
📊 Connected to MongoDB: tourist-safety
🔗 AI Service: Connected (http://localhost:8000)
⛓️ Blockchain Service: Connected (http://localhost:7000)
✅ All systems operational
```

**AI Service Success:**
```
🤖 AI Service Starting...
✅ Crowd Detection: Ready (YOLOv8/OpenCV fallback)
✅ Anomaly Detection: Ready (Isolation Forest)
✅ Risk Prediction: Ready (LSTM/Statistical fallback)
✅ Chatbot: Ready (Multilingual support enabled)
 * Running on http://127.0.0.1:8000
```

**Blockchain Service Success:**
```
🔗 Blockchain Digital ID Service Starting...
📋 Genesis block created
🔑 Cryptographic features: Enabled
📱 QR Code generation: Enabled
 * Running on http://127.0.0.1:7000
```

**Frontend Success:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000

✓ Ready in 2.1s
```

---

## 🎯 Demo Walkthrough

### Complete System Test (10 minutes)

1. **Start All Services** (5 terminals as shown above)

2. **Open Dashboard** 
   - Go to http://localhost:3000
   - You should see the main dashboard with multiple panels

3. **Test Crowd Analysis**
   - Find an image with people (or download from internet)
   - Upload in the "Crowd Analysis" section
   - Click "Analyze Crowd"
   - Review results: people count, density, risk level

4. **Test AI Assistant**
   - Use the chat interface in "AI Assistant" panel
   - Try different languages from dropdown
   - Ask questions like:
     - "What are some safety tips?"
     - "Emergency contacts"
     - "Where is the nearest hospital?"

5. **Test Incident Reporting**
   - Click "Report Incident" 
   - Fill out the form with test data:
     - Type: "Medical Emergency"
     - Description: "Tourist needs assistance"
     - Location: "Central Square"
     - Severity: "Medium"
   - Submit and see it appear in recent incidents

6. **Test Digital ID System**
   - Switch to "Create ID" tab in Digital ID panel
   - Fill out tourist information:
     - First Name: "John"
     - Last Name: "Tourist"  
     - Email: "john@example.com"
     - Nationality: "United States"
   - Click "Create Digital ID"
   - Copy the generated ID (e.g., TID-20241201-ABC123)
   - Switch to "Verify ID" tab
   - Paste the ID and click "Verify"
   - See verification results

7. **Check System Status**
   - All panels should show "Online" status
   - Green indicators for all services
   - Real-time data updates

---

## 📋 API Reference

### Backend Endpoints

**Health & Status**
```
GET  /api/health                    → System health check
GET  /api/dashboard/stats           → Dashboard statistics
```

**Authentication**
```
POST /api/auth/register             → Register new user
POST /api/auth/login                → User login
GET  /api/auth/profile              → Get user profile
```

**Incidents**
```
GET  /api/incidents                 → List all incidents
POST /api/incidents                 → Create new incident
GET  /api/incidents/:id             → Get specific incident
PUT  /api/incidents/:id             → Update incident
DELETE /api/incidents/:id           → Delete incident
```

**AI Integration**
```
POST /api/ai/crowd-detection        → Analyze crowd in image
POST /api/ai/anomaly-detection      → Detect anomalies
POST /api/ai/risk-assessment        → Assess risk levels
POST /api/ai/chat                   → Chat with AI assistant
```

**Blockchain**
```
POST /api/blockchain/create-id      → Create digital ID
POST /api/blockchain/verify         → Verify digital ID
GET  /api/blockchain/stats          → Blockchain statistics
```

**Geofencing**
```
GET  /api/geofences                 → List geofences
POST /api/geofences                 → Create geofence
POST /api/geofences/check           → Check location
```

### AI Service Endpoints

```
GET  /health                        → AI service health
POST /crowd-detection              → Analyze crowd in image
POST /anomaly-detection            → Detect behavioral anomalies
POST /risk-prediction              → Predict safety risks
POST /chat                         → Multilingual chat
```

### Blockchain Service Endpoints

```
GET  /health                        → Blockchain health
POST /create-id                    → Create new digital ID
POST /verify                       → Verify digital ID
POST /revoke                       → Revoke digital ID
POST /batch-verify                 → Verify multiple IDs
GET  /stats                        → Blockchain statistics
POST /mine                         → Mine new block
```

---

## 🔧 Production Deployment

### Security Checklist
- [ ] Change all JWT secrets and passwords
- [ ] Enable HTTPS (SSL certificates)
- [ ] Configure proper CORS settings
- [ ] Set up authentication and authorization
- [ ] Enable rate limiting and DDoS protection
- [ ] Configure logging and monitoring
- [ ] Set up automated backups
- [ ] Configure firewall rules

### Environment Variables for Production
```env
# Backend Production
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db/tourist-safety
JWT_SECRET=your-super-secure-production-jwt-secret
AI_SERVICE_URL=https://your-ai-service.com
BLOCKCHAIN_SERVICE_URL=https://your-blockchain-service.com

# Frontend Production  
NEXT_PUBLIC_BACKEND_URL=https://your-api.com
NEXT_PUBLIC_AI_SERVICE_URL=https://your-ai-service.com
NEXT_PUBLIC_BLOCKCHAIN_URL=https://your-blockchain-service.com
```

---

## 🆘 Getting Help

### If Something Goes Wrong

1. **Check Service Status**
   - Backend: http://localhost:5000/api/health
   - AI Service: http://localhost:8000/health
   - Blockchain: http://localhost:7000/health
   - Frontend: http://localhost:3000

2. **Check Terminal Logs**
   - Look for error messages in each terminal
   - Most errors will show specific solutions

3. **Common Solutions**
   - Restart the failing service
   - Check if MongoDB is running
   - Verify environment variables
   - Clear browser cache
   - Reinstall dependencies if needed

4. **System Requirements**
   - Windows 10/11
   - 8GB+ RAM recommended
   - 5GB+ free disk space
   - Stable internet connection

---

## 🎉 Success! You're Ready to Go

Once all 5 terminals show success messages and http://localhost:3000 loads the dashboard, you have successfully set up:

✅ **Complete AI-powered tourist safety monitoring system**  
✅ **Real-time crowd analysis with image upload**  
✅ **Incident reporting and tracking system**  
✅ **Multilingual AI safety assistant**  
✅ **Blockchain digital ID verification**  
✅ **Interactive analytics dashboard**  
✅ **Full API integration between all services**

### Next Steps
- Customize AI models for your specific requirements
- Add real camera feeds for live monitoring
- Integrate with actual emergency services APIs
- Deploy to cloud for production use
- Add mobile app interfaces
- Extend blockchain functionality

**Enjoy your Smart Tourist Safety System! 🚀**