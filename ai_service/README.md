# Smart Tourist Safety System - AI Service

This is the AI service component that provides machine learning capabilities for crowd detection, anomaly detection, risk prediction, and multilingual chatbot functionality.

## 🤖 Features

- **Crowd Detection**: YOLOv8-based person detection and crowd density analysis
- **Anomaly Detection**: Isolation Forest for behavioral anomaly detection  
- **Risk Prediction**: LSTM/Statistical models for risk forecasting
- **Multilingual Chatbot**: Rule-based NLP with BERT integration (when available)
- **Real-time Processing**: Fast inference with fallback mechanisms
- **Robust Error Handling**: Graceful degradation when models unavailable

## 📦 Installation

```powershell
# Navigate to ai_service directory
cd ai_service

# Install Python dependencies
pip install -r requirements.txt

# Set up environment
copy .env.example .env
# Edit .env file with your settings

# Start the service
python app.py
```

## 🛠️ Dependencies

### Core Libraries
- **Flask**: Web framework for API endpoints
- **OpenCV**: Computer vision for image processing
- **scikit-learn**: Machine learning algorithms
- **NumPy/Pandas**: Data processing

### Optional (Enhanced Performance)
- **ultralytics**: YOLOv8 for advanced object detection
- **TensorFlow**: LSTM neural networks for time series
- **Transformers**: BERT/DistilBERT for NLP

### Installation Notes
```powershell
# Basic installation (required)
pip install flask opencv-python scikit-learn numpy pandas

# Enhanced installation (recommended)
pip install ultralytics torch torchvision
pip install tensorflow transformers

# If you get errors, install individually:
pip install flask flask-cors requests python-multipart python-dotenv
pip install opencv-python numpy pandas scikit-learn pillow
```

## 🚀 API Endpoints

### Health & Info
- `GET /health` - Service health check and model status
- `GET /` - Service information and available endpoints
- `GET /test` - Test all models with sample data

### AI Models
- `POST /predict/crowd-detection` - Analyze crowd in uploaded image
- `POST /predict/anomaly-detection` - Detect behavioral anomalies
- `POST /predict/risk-prediction` - Predict future risk levels
- `POST /predict/chatbot` - Generate chatbot responses

## 📊 Model Details

### 1. Crowd Detection Model
```python
# Uses YOLOv8 (preferred) or OpenCV Haar Cascades (fallback)
# Input: Image file (JPG, PNG, etc.)
# Output: Crowd count, density, risk score, detected objects
```

**Features:**
- Person detection and counting
- Crowd density calculation
- Risk score assessment
- Bounding box coordinates
- Confidence scores

### 2. Anomaly Detection Model
```python
# Uses Isolation Forest algorithm
# Input: Behavioral data points or time series
# Output: Anomaly detection with confidence and patterns
```

**Features:**
- Statistical anomaly detection
- Pattern identification
- Confidence scoring
- Behavioral recommendations

### 3. Risk Prediction Model
```python
# Uses LSTM (preferred) or Statistical methods (fallback)
# Input: Historical data + current conditions
# Output: Risk levels and future predictions
```

**Features:**
- Time series forecasting
- Multi-factor risk assessment
- Risk level classification (low/medium/high/critical)
- Actionable recommendations

### 4. Multilingual Chatbot
```python
# Uses BERT/DistilBERT (preferred) or Rule-based (fallback)
# Input: User message in multiple languages
# Output: Contextual response with suggested actions
```

**Supported Languages:**
- English (en)
- Spanish (es)  
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Chinese (zh)
- Japanese (ja)
- Arabic (ar)

## 🧪 Testing

```powershell
# Run comprehensive tests
python test_ai.py

# Test specific endpoint
curl -X GET http://localhost:8000/health

# Test chatbot
curl -X POST http://localhost:8000/predict/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need safety tips", "language": "en"}'

# Test anomaly detection  
curl -X POST http://localhost:8000/predict/anomaly-detection \
  -H "Content-Type: application/json" \
  -d '{"data": [[1,2,3], [4,5,6], [100,200,300]], "time_window": 60}'
```

## 🔧 Configuration

### Environment Variables (.env)
```env
FLASK_ENV=development
HOST=localhost
PORT=8000
YOLO_MODEL_PATH=models/yolov8n.pt
BERT_MODEL_NAME=distilbert-base-uncased
MAX_IMAGE_SIZE=2048
DEVICE=cpu
LOG_LEVEL=INFO
```

### Performance Tuning
- **CPU Mode**: Set `DEVICE=cpu` for CPU-only inference
- **GPU Mode**: Set `DEVICE=cuda` if CUDA is available
- **Batch Size**: Adjust `BATCH_SIZE` for memory optimization
- **Model Caching**: Enable `ENABLE_MODEL_CACHING=True`

## 📁 Project Structure

```
ai_service/
├── models/              # AI model implementations
│   ├── __init__.py
│   ├── crowd_detection.py
│   ├── anomaly_detection.py
│   ├── risk_prediction.py
│   └── chatbot.py
├── uploads/             # Temporary file storage
├── .env                 # Environment configuration
├── app.py              # Main Flask application
├── requirements.txt     # Python dependencies
├── test_ai.py          # Test suite
└── README.md           # This file
```

## 🎯 Usage Examples

### Crowd Detection
```python
import requests

# Upload image for analysis
with open('crowd_image.jpg', 'rb') as f:
    files = {'image': f}
    response = requests.post('http://localhost:8000/predict/crowd-detection', files=files)
    result = response.json()
    
print(f"Crowd count: {result['crowd_count']}")
print(f"Crowd density: {result['crowd_density']}")
print(f"Risk score: {result['risk_score']}")
```

### Risk Prediction
```python
import requests

data = {
    'historical_data': [0.2, 0.3, 0.4, 0.5, 0.6],
    'current_conditions': {
        'crowd_density': 0.8,
        'weather_score': 0.7,
        'is_weekend': True
    },
    'prediction_window': 24
}

response = requests.post('http://localhost:8000/predict/risk-prediction', json=data)
result = response.json()

print(f"Risk level: {result['risk_level']}")
print(f"Risk score: {result['risk_score']}")
```

### Multilingual Chatbot
```python
import requests

# English
response = requests.post('http://localhost:8000/predict/chatbot', json={
    'message': 'I need emergency help!',
    'language': 'en'
})

# Spanish  
response = requests.post('http://localhost:8000/predict/chatbot', json={
    'message': 'Necesito ayuda de emergencia!',
    'language': 'es'
})
```

## 🚨 Error Handling

The AI service includes robust error handling:

1. **Model Unavailable**: Falls back to mock/statistical methods
2. **Invalid Input**: Returns detailed error messages
3. **Processing Errors**: Graceful degradation with logging
4. **Resource Limits**: Automatic cleanup and memory management

## 🔍 Monitoring

- **Health Endpoints**: Real-time model status
- **Performance Metrics**: Processing time tracking
- **Error Logging**: Comprehensive error tracking
- **Resource Usage**: Memory and CPU monitoring

## 🚀 Production Deployment

1. **Install Production Dependencies**:
   ```powershell
   pip install gunicorn
   ```

2. **Production Configuration**:
   ```env
   FLASK_ENV=production
   LOG_LEVEL=WARNING
   DEVICE=cuda  # If GPU available
   ```

3. **Start with Gunicorn**:
   ```powershell
   gunicorn -w 4 -b 0.0.0.0:8000 app:app
   ```

## 📈 Performance

- **Crowd Detection**: ~1-3 seconds per image
- **Anomaly Detection**: ~0.1-0.5 seconds
- **Risk Prediction**: ~0.2-1.0 seconds  
- **Chatbot**: ~0.1-0.3 seconds

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new models
4. Update documentation
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.
