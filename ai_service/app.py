from flask import Flask, request, jsonify
import os
import logging

# Optional/extra imports: guard them so the app can run in a minimal dev environment
try:
    from flask_cors import CORS
except Exception as e:
    # Provide a no-op CORS function so the rest of the app can run without the package
    logging.warning("Optional dependency 'flask_cors' not available: %s. CORS will be a no-op.", e)
    def CORS(app, **kwargs):
        return None

try:
    from dotenv import load_dotenv
except Exception as e:
    logging.warning("Optional dependency 'python-dotenv' not available: %s. Environment variables from .env will not be loaded.", e)
    def load_dotenv(*args, **kwargs):
        return False
import time
import traceback
from werkzeug.utils import secure_filename
import sys
import io

# Load environment variables
load_dotenv()

# Import AI models
from models.crowd_detection import CrowdDetectionModel
from models.anomaly_detection import AnomalyDetectionModel
from models.risk_prediction import RiskPredictionModel
from models.chatbot import ChatbotModel

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
# Use UTF-8 safe stream wrapper for console output to avoid UnicodeEncodeError on Windows consoles
file_handler = logging.FileHandler(os.getenv('LOG_FILE', 'ai_service.log'), encoding='utf-8')
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

# Wrap stdout with a TextIOWrapper encoded as UTF-8; replace characters that cannot be encoded
stream_wrapper = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
stream_handler = logging.StreamHandler(stream_wrapper)
stream_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO')),
    handlers=[file_handler, stream_handler]
)
logger = logging.getLogger(__name__)

# Global model instances
models = {}

def initialize_models():
    """Initialize all AI models"""
    try:
        logger.info("Initializing AI models...")
        
        # Initialize models with error handling
        try:
            models['crowd_detection'] = CrowdDetectionModel()
            logger.info("✅ Crowd Detection model initialized")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Crowd Detection: {e}")
            models['crowd_detection'] = None

        try:
            models['anomaly_detection'] = AnomalyDetectionModel()
            logger.info("✅ Anomaly Detection model initialized")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Anomaly Detection: {e}")
            models['anomaly_detection'] = None

        try:
            models['risk_prediction'] = RiskPredictionModel()
            logger.info("✅ Risk Prediction model initialized")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Risk Prediction: {e}")
            models['risk_prediction'] = None

        try:
            models['chatbot'] = ChatbotModel()
            logger.info("✅ Chatbot model initialized")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Chatbot: {e}")
            models['chatbot'] = None

        logger.info("Model initialization completed")
        
    except Exception as e:
        logger.error(f"Failed to initialize models: {e}")
        raise

# Configure upload settings
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    model_status = {
        'crowd_detection': models.get('crowd_detection') is not None,
        'anomaly_detection': models.get('anomaly_detection') is not None,
        'risk_prediction': models.get('risk_prediction') is not None,
        'chatbot': models.get('chatbot') is not None
    }
    
    return jsonify({
        'status': 'healthy',
        'timestamp': time.time(),
        'models': model_status,
        'total_models': len([m for m in model_status.values() if m]),
        'version': '1.0.0'
    })

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    """Root endpoint with API information"""
    return jsonify({
        'service': 'Smart Tourist Safety AI Service',
        'version': '1.0.0',
        'endpoints': {
            '/health': 'Health check',
            '/predict/crowd-detection': 'Analyze crowd in image',
            '/predict/anomaly-detection': 'Detect behavioral anomalies',
            '/predict/risk-prediction': 'Predict risk levels',
            '/predict/chatbot': 'Chatbot conversation'
        },
        'status': 'running',
        'timestamp': time.time()
    })

# Crowd Detection Endpoint
@app.route('/predict/crowd-detection', methods=['POST'])
def predict_crowd():
    """Analyze crowd density and count in uploaded image"""
    start_time = time.time()
    
    try:
        # Check if model is available
        if not models.get('crowd_detection'):
            return jsonify({
                'error': 'Crowd detection model not available',
                'crowd_density': 0.5,  # Fallback value
                'crowd_count': 25,
                'confidence': 0.3,
                'note': 'Using fallback values'
            }), 503

        # Check if image file is provided
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = str(int(time.time()))
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            # Perform crowd detection
            result = models['crowd_detection'].predict(filepath)
            
            # Clean up uploaded file
            os.remove(filepath)
            
            processing_time = time.time() - start_time
            
            return jsonify({
                'crowd_density': result.get('crowd_density', 0.5),
                'crowd_count': result.get('crowd_count', 0),
                'detected_objects': result.get('detected_objects', []),
                'confidence': result.get('confidence', 0.8),
                'risk_score': result.get('risk_score', 0.3),
                'processing_time': processing_time,
                'timestamp': time.time()
            })

        except Exception as e:
            # Clean up file on error
            if os.path.exists(filepath):
                os.remove(filepath)
            raise e

    except Exception as e:
        logger.error(f"Crowd detection error: {e}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': 'Failed to analyze crowd',
            'details': str(e),
            'crowd_density': 0.4,  # Fallback
            'crowd_count': 15,
            'confidence': 0.2
        }), 500

# Anomaly Detection Endpoint
@app.route('/predict/anomaly-detection', methods=['POST'])
def predict_anomaly():
    """Detect behavioral anomalies in provided data"""
    start_time = time.time()
    
    try:
        # Check if model is available
        if not models.get('anomaly_detection'):
            return jsonify({
                'error': 'Anomaly detection model not available',
                'anomaly_detected': False,
                'anomaly_score': 0.3,
                'confidence': 0.3,
                'note': 'Using fallback values'
            }), 503

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        input_data = data.get('data', [])
        time_window = data.get('time_window', 60)

        if not input_data:
            return jsonify({'error': 'No data array provided'}), 400

        # Perform anomaly detection
        result = models['anomaly_detection'].predict(input_data, time_window)
        
        processing_time = time.time() - start_time
        
        return jsonify({
            'anomaly_detected': result.get('anomaly_detected', False),
            'anomaly_score': result.get('anomaly_score', 0.0),
            'confidence': result.get('confidence', 0.8),
            'patterns': result.get('patterns', []),
            'recommendations': result.get('recommendations', []),
            'processing_time': processing_time,
            'timestamp': time.time()
        })

    except Exception as e:
        logger.error(f"Anomaly detection error: {e}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': 'Failed to detect anomalies',
            'details': str(e),
            'anomaly_detected': False,
            'anomaly_score': 0.0,
            'confidence': 0.2
        }), 500

# Risk Prediction Endpoint
@app.route('/predict/risk-prediction', methods=['POST'])
def predict_risk():
    """Predict risk levels based on historical and current data"""
    start_time = time.time()
    
    try:
        # Check if model is available
        if not models.get('risk_prediction'):
            return jsonify({
                'error': 'Risk prediction model not available',
                'risk_level': 'medium',
                'risk_score': 0.5,
                'confidence': 0.3,
                'note': 'Using fallback values'
            }), 503

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        historical_data = data.get('historical_data', [])
        current_conditions = data.get('current_conditions', {})
        prediction_window = data.get('prediction_window', 24)

        # Perform risk prediction
        result = models['risk_prediction'].predict(
            historical_data, 
            current_conditions, 
            prediction_window
        )
        
        processing_time = time.time() - start_time
        
        return jsonify({
            'risk_level': result.get('risk_level', 'medium'),
            'risk_score': result.get('risk_score', 0.5),
            'confidence': result.get('confidence', 0.8),
            'risk_factors': result.get('risk_factors', []),
            'predictions': result.get('predictions', []),
            'recommendations': result.get('recommendations', []),
            'processing_time': processing_time,
            'timestamp': time.time()
        })

    except Exception as e:
        logger.error(f"Risk prediction error: {e}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': 'Failed to predict risk',
            'details': str(e),
            'risk_level': 'medium',
            'risk_score': 0.5,
            'confidence': 0.2
        }), 500

# Chatbot Endpoint
@app.route('/predict/chatbot', methods=['POST'])
def chatbot_response():
    """Generate chatbot response for tourist queries"""
    start_time = time.time()
    
    try:
        # Check if model is available
        if not models.get('chatbot'):
            return jsonify({
                'error': 'Chatbot model not available',
                'response': 'I apologize, but I cannot process your request right now. Please try again later.',
                'confidence': 0.3,
                'note': 'Using fallback response'
            }), 503

        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        message = data.get('message', '').strip()
        language = data.get('language', 'en')
        context = data.get('context', {})

        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Generate chatbot response
        result = models['chatbot'].generate_response(message, language, context)
        
        processing_time = time.time() - start_time
        
        return jsonify({
            'response': result.get('response', 'I apologize, but I cannot help with that right now.'),
            'confidence': result.get('confidence', 0.8),
            'intent': result.get('intent', 'general_inquiry'),
            'language': language,
            'suggested_actions': result.get('suggested_actions', []),
            'processing_time': processing_time,
            'timestamp': time.time()
        })

    except Exception as e:
        logger.error(f"Chatbot error: {e}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': 'Failed to generate response',
            'details': str(e),
            'response': 'I apologize, but I encountered an error. Please try again.',
            'confidence': 0.2
        }), 500

# Test endpoint for all models
@app.route('/test', methods=['GET'])
def test_models():
    """Test all AI models with sample data"""
    results = {}
    
    # Test each model
    for model_name, model in models.items():
        if model:
            try:
                if model_name == 'crowd_detection':
                    # Would need a test image for real testing
                    results[model_name] = {'status': 'available', 'note': 'Requires image upload for testing'}
                elif model_name == 'anomaly_detection':
                    test_data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
                    result = model.predict(test_data, 60)
                    results[model_name] = {'status': 'working', 'sample_result': result}
                elif model_name == 'risk_prediction':
                    test_historical = [0.1, 0.2, 0.3, 0.4, 0.5]
                    test_current = {'temperature': 25, 'humidity': 60}
                    result = model.predict(test_historical, test_current, 24)
                    results[model_name] = {'status': 'working', 'sample_result': result}
                elif model_name == 'chatbot':
                    result = model.generate_response('Hello', 'en', {})
                    results[model_name] = {'status': 'working', 'sample_result': result}
                    
            except Exception as e:
                results[model_name] = {'status': 'error', 'error': str(e)}
        else:
            results[model_name] = {'status': 'not_available'}
    
    return jsonify({
        'service': 'AI Service Test',
        'models': results,
        'timestamp': time.time()
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(413)
def too_large(error):
    return jsonify({'error': 'File too large'}), 413

if __name__ == '__main__':
    try:
        # Initialize models
        initialize_models()
        
        # Start server
        host = os.getenv('HOST', 'localhost')
        port = int(os.getenv('PORT', 8000))
        debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
        
        logger.info(f"🚀 Starting AI Service on {host}:{port}")
        logger.info(f"📚 API Documentation: http://{host}:{port}/")
        logger.info(f"❤️ Health Check: http://{host}:{port}/health")
        
        app.run(host=host, port=port, debug=debug)
        
    except Exception as e:
        logger.error(f"Failed to start AI service: {e}")
        raise