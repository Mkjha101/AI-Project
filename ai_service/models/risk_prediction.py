import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import logging
import random
import os
from datetime import datetime, timedelta
import math

logger = logging.getLogger(__name__)

class RiskPredictionModel:
    """
    Risk Prediction Model using LSTM-like approach
    Predicts risk levels based on historical patterns and current conditions
    """
    
    def __init__(self):
        self.scaler = MinMaxScaler()
        self.sequence_length = int(os.getenv('LSTM_SEQUENCE_LENGTH', 10))
        self.is_fitted = False
        self.risk_thresholds = {
            'low': 0.3,
            'medium': 0.6,
            'high': 0.8,
            'critical': 1.0
        }
        
        try:
            self._initialize_model()
        except Exception as e:
            logger.error(f"Failed to initialize risk prediction model: {e}")
    
    def _initialize_model(self):
        """Initialize the risk prediction model"""
        try:
            # Try to use TensorFlow/Keras for LSTM
            import tensorflow as tf
            from tensorflow.keras.models import Sequential
            from tensorflow.keras.layers import LSTM, Dense, Dropout
            
            # Create a simple LSTM model
            self.model = Sequential([
                LSTM(50, return_sequences=True, input_shape=(self.sequence_length, 6)),
                Dropout(0.2),
                LSTM(50, return_sequences=False),
                Dropout(0.2),
                Dense(25),
                Dense(1, activation='sigmoid')  # Output between 0 and 1
            ])
            
            self.model.compile(optimizer='adam', loss='mse', metrics=['mae'])
            
            # Train with synthetic data
            self._generate_and_train_model()
            self.is_fitted = True
            
            logger.info("LSTM risk prediction model initialized successfully")
            
        except ImportError:
            logger.warning("TensorFlow not available, using statistical fallback")
            self._initialize_statistical_model()
        except Exception as e:
            logger.error(f"Failed to initialize LSTM model: {e}")
            self._initialize_statistical_model()
    
    def _initialize_statistical_model(self):
        """Initialize statistical fallback model"""
        try:
            # Use weighted moving averages and trend analysis
            self.model_type = 'statistical'
            self.weights = {
                'historical_trend': 0.3,
                'current_conditions': 0.4,
                'seasonal_factors': 0.2,
                'external_factors': 0.1
            }
            self.is_fitted = True
            logger.info("Statistical risk prediction model initialized")
            
        except Exception as e:
            logger.error(f"Failed to initialize statistical model: {e}")
            raise
    
    def _generate_and_train_model(self):
        """Generate synthetic training data and train the model"""
        try:
            # Generate synthetic time series data
            n_sequences = 1000
            X_train, y_train = self._generate_training_sequences(n_sequences)
            
            # Train the model
            self.model.fit(
                X_train, y_train,
                epochs=50,
                batch_size=32,
                validation_split=0.2,
                verbose=0
            )
            
            logger.info(f"LSTM model trained with {n_sequences} sequences")
            
        except Exception as e:
            logger.error(f"Model training error: {e}")
            raise
    
    def _generate_training_sequences(self, n_sequences):
        """Generate synthetic training sequences"""
        try:
            X, y = [], []
            
            for _ in range(n_sequences):
                # Generate base time series with trends
                base_trend = np.random.choice(['increasing', 'decreasing', 'stable'])
                noise_level = np.random.uniform(0.1, 0.3)
                
                sequence = []
                risk_progression = []
                
                for t in range(self.sequence_length + 5):  # Extra points for prediction
                    # Base features: [crowd_density, incident_count, weather_score, time_factor, day_type, external_events]
                    
                    # Crowd density with trend
                    if base_trend == 'increasing':
                        crowd_density = min(1.0, 0.3 + t * 0.05 + np.random.normal(0, noise_level))
                    elif base_trend == 'decreasing':
                        crowd_density = max(0.0, 0.8 - t * 0.05 + np.random.normal(0, noise_level))
                    else:
                        crowd_density = 0.5 + np.random.normal(0, noise_level)
                    
                    # Incident count (related to crowd density)
                    incident_count = np.random.poisson(crowd_density * 5) / 10.0
                    
                    # Weather score (affects risk)
                    weather_score = np.random.beta(3, 2)  # Usually good weather
                    
                    # Time factor (hour of day effect)
                    hour = (t + 8) % 24  # Start at 8 AM
                    time_factor = self._time_risk_factor(hour)
                    
                    # Day type (weekday vs weekend)
                    day_type = np.random.choice([0.7, 1.0])  # 0.7 for weekday, 1.0 for weekend
                    
                    # External events
                    external_events = np.random.choice([0.0, 0.5, 1.0], p=[0.8, 0.15, 0.05])
                    
                    features = [
                        crowd_density, incident_count, weather_score,
                        time_factor, day_type, external_events
                    ]
                    
                    # Calculate risk score
                    risk_score = self._calculate_synthetic_risk(features)
                    
                    if t < self.sequence_length:
                        sequence.append(features)
                    else:
                        # These are the target values we want to predict
                        risk_progression.append(risk_score)
                
                # Use the average risk of the next few time steps as target
                target_risk = np.mean(risk_progression)
                
                X.append(sequence)
                y.append(target_risk)
            
            return np.array(X), np.array(y)
            
        except Exception as e:
            logger.error(f"Training sequence generation error: {e}")
            raise
    
    def _time_risk_factor(self, hour):
        """Calculate risk factor based on time of day"""
        # Higher risk during peak hours (10-12, 14-18)
        if 10 <= hour <= 12 or 14 <= hour <= 18:
            return 1.0
        elif 8 <= hour <= 20:
            return 0.7
        else:
            return 0.3
    
    def _calculate_synthetic_risk(self, features):
        """Calculate synthetic risk score from features"""
        crowd_density, incident_count, weather_score, time_factor, day_type, external_events = features
        
        # Risk calculation formula
        base_risk = crowd_density * 0.4 + incident_count * 0.3
        time_risk = time_factor * 0.1
        weather_risk = (1 - weather_score) * 0.1
        day_risk = (day_type - 0.7) * 0.05  # Weekend adds risk
        external_risk = external_events * 0.05
        
        total_risk = base_risk + time_risk + weather_risk + day_risk + external_risk
        return min(1.0, max(0.0, total_risk))
    
    def predict(self, historical_data, current_conditions, prediction_window=24):
        """
        Predict risk levels for the specified time window
        
        Args:
            historical_data (list): Historical risk/incident data
            current_conditions (dict): Current environmental conditions
            prediction_window (int): Hours to predict ahead
            
        Returns:
            dict: Risk prediction results
        """
        try:
            if not self.is_fitted:
                return self._generate_mock_result(prediction_window)
            
            # Process inputs
            processed_historical = self._process_historical_data(historical_data)
            processed_current = self._process_current_conditions(current_conditions)
            
            if hasattr(self, 'model') and hasattr(self.model, 'predict'):
                return self._predict_with_lstm(processed_historical, processed_current, prediction_window)
            else:
                return self._predict_statistical(processed_historical, processed_current, prediction_window)
                
        except Exception as e:
            logger.error(f"Risk prediction error: {e}")
            return self._generate_mock_result(prediction_window)
    
    def _process_historical_data(self, historical_data):
        """Process and normalize historical data"""
        try:
            if not historical_data:
                # Generate mock historical data
                historical_data = [random.uniform(0.2, 0.7) for _ in range(self.sequence_length)]
            
            # Ensure we have enough data points
            while len(historical_data) < self.sequence_length:
                historical_data = [historical_data[0]] + historical_data
            
            # Take the last sequence_length points
            historical_data = historical_data[-self.sequence_length:]
            
            return np.array(historical_data)
            
        except Exception as e:
            logger.error(f"Historical data processing error: {e}")
            return np.array([0.4] * self.sequence_length)
    
    def _process_current_conditions(self, current_conditions):
        """Process current conditions into feature vector"""
        try:
            # Extract or set default values
            crowd_density = current_conditions.get('crowd_density', 0.5)
            incident_count = current_conditions.get('incident_count', 0)
            weather_score = current_conditions.get('weather_score', 0.7)
            temperature = current_conditions.get('temperature', 20)
            humidity = current_conditions.get('humidity', 50)
            is_weekend = current_conditions.get('is_weekend', False)
            special_event = current_conditions.get('special_event', False)
            
            # Normalize and calculate derived features
            hour = datetime.now().hour
            time_factor = self._time_risk_factor(hour)
            day_type = 1.0 if is_weekend else 0.7
            external_events = 1.0 if special_event else 0.0
            
            # Weather impact
            weather_impact = weather_score * (1 - abs(temperature - 22) / 30) * (1 - abs(humidity - 50) / 50)
            weather_impact = max(0, min(1, weather_impact))
            
            return {
                'crowd_density': crowd_density,
                'incident_count': min(1.0, incident_count / 10),  # Normalize
                'weather_score': weather_impact,
                'time_factor': time_factor,
                'day_type': day_type,
                'external_events': external_events
            }
            
        except Exception as e:
            logger.error(f"Current conditions processing error: {e}")
            return {
                'crowd_density': 0.5,
                'incident_count': 0.1,
                'weather_score': 0.7,
                'time_factor': 0.7,
                'day_type': 0.7,
                'external_events': 0.0
            }
    
    def _predict_with_lstm(self, historical_data, current_conditions, prediction_window):
        """Make predictions using LSTM model"""
        try:
            # Prepare input sequence
            current_features = [
                current_conditions['crowd_density'],
                current_conditions['incident_count'],
                current_conditions['weather_score'],
                current_conditions['time_factor'],
                current_conditions['day_type'],
                current_conditions['external_events']
            ]
            
            # Create sequence for prediction
            input_sequence = []
            for i in range(self.sequence_length):
                if i < len(historical_data):
                    # Use historical risk score as base and estimate other features
                    risk = historical_data[i]
                    estimated_features = [
                        risk * 0.8,  # Estimated crowd density from risk
                        risk * 0.5,  # Estimated incidents
                        0.7,  # Default weather
                        self._time_risk_factor((datetime.now().hour - self.sequence_length + i) % 24),
                        current_conditions['day_type'],
                        0.0  # No external events in history
                    ]
                    input_sequence.append(estimated_features)
                else:
                    input_sequence.append(current_features)
            
            # Reshape for LSTM input
            input_array = np.array(input_sequence).reshape(1, self.sequence_length, 6)
            
            # Make prediction
            risk_prediction = float(self.model.predict(input_array)[0][0])
            
            # Generate predictions for different time horizons
            predictions = []
            base_risk = risk_prediction
            
            for h in [1, 4, 12, 24]:
                if h <= prediction_window:
                    # Add some variation based on time
                    time_variation = math.sin(h * math.pi / 12) * 0.1  # Daily cycle
                    predicted_risk = base_risk + time_variation + np.random.normal(0, 0.05)
                    predicted_risk = max(0, min(1, predicted_risk))
                    
                    predictions.append({
                        'time': f'+{h}h',
                        'risk_score': round(predicted_risk, 3),
                        'risk_level': self._get_risk_level(predicted_risk)
                    })
            
            # Determine overall risk level and factors
            risk_level = self._get_risk_level(risk_prediction)
            risk_factors = self._identify_risk_factors(current_conditions, risk_prediction)
            recommendations = self._generate_risk_recommendations(risk_level, risk_factors)
            
            return {
                'risk_level': risk_level,
                'risk_score': round(risk_prediction, 3),
                'confidence': 0.85,
                'risk_factors': risk_factors,
                'predictions': predictions,
                'recommendations': recommendations,
                'model_used': 'LSTM'
            }
            
        except Exception as e:
            logger.error(f"LSTM prediction error: {e}")
            return self._predict_statistical(historical_data, current_conditions, prediction_window)
    
    def _predict_statistical(self, historical_data, current_conditions, prediction_window):
        """Make predictions using statistical methods"""
        try:
            # Calculate trend from historical data
            if len(historical_data) >= 3:
                trend = np.polyfit(range(len(historical_data)), historical_data, 1)[0]
            else:
                trend = 0
            
            # Calculate base risk from current conditions
            base_risk = (
                current_conditions['crowd_density'] * 0.4 +
                current_conditions['incident_count'] * 0.3 +
                (1 - current_conditions['weather_score']) * 0.1 +
                current_conditions['time_factor'] * 0.1 +
                (current_conditions['day_type'] - 0.7) * 0.05 +
                current_conditions['external_events'] * 0.05
            )
            
            # Apply trend
            predicted_risk = base_risk + trend * 0.2
            predicted_risk = max(0, min(1, predicted_risk))
            
            # Generate time-based predictions
            predictions = []
            for h in [1, 4, 12, 24]:
                if h <= prediction_window:
                    # Time decay and variation
                    time_factor = math.exp(-h * 0.05)  # Decay over time
                    hourly_variation = math.sin((datetime.now().hour + h) * math.pi / 12) * 0.1
                    
                    future_risk = predicted_risk * time_factor + hourly_variation
                    future_risk = max(0, min(1, future_risk))
                    
                    predictions.append({
                        'time': f'+{h}h',
                        'risk_score': round(future_risk, 3),
                        'risk_level': self._get_risk_level(future_risk)
                    })
            
            # Analysis
            risk_level = self._get_risk_level(predicted_risk)
            risk_factors = self._identify_risk_factors(current_conditions, predicted_risk)
            recommendations = self._generate_risk_recommendations(risk_level, risk_factors)
            
            return {
                'risk_level': risk_level,
                'risk_score': round(predicted_risk, 3),
                'confidence': 0.75,
                'risk_factors': risk_factors,
                'predictions': predictions,
                'recommendations': recommendations,
                'model_used': 'Statistical'
            }
            
        except Exception as e:
            logger.error(f"Statistical prediction error: {e}")
            return self._generate_mock_result(prediction_window)
    
    def _get_risk_level(self, risk_score):
        """Convert risk score to risk level"""
        if risk_score >= self.risk_thresholds['critical']:
            return 'critical'
        elif risk_score >= self.risk_thresholds['high']:
            return 'high'
        elif risk_score >= self.risk_thresholds['medium']:
            return 'medium'
        else:
            return 'low'
    
    def _identify_risk_factors(self, current_conditions, risk_score):
        """Identify main contributing risk factors"""
        factors = []
        
        if current_conditions['crowd_density'] > 0.7:
            factors.append('high_crowd_density')
        
        if current_conditions['incident_count'] > 0.3:
            factors.append('recent_incidents')
        
        if current_conditions['weather_score'] < 0.4:
            factors.append('adverse_weather')
        
        if current_conditions['time_factor'] > 0.8:
            factors.append('peak_hours')
        
        if current_conditions['day_type'] > 0.9:
            factors.append('weekend_effect')
        
        if current_conditions['external_events'] > 0.5:
            factors.append('special_events')
        
        if not factors and risk_score > 0.5:
            factors.append('general_elevated_risk')
        
        return factors[:4]  # Limit to top 4 factors
    
    def _generate_risk_recommendations(self, risk_level, risk_factors):
        """Generate recommendations based on risk level and factors"""
        recommendations = []
        
        if risk_level == 'low':
            recommendations = ['continue_normal_operations', 'maintain_monitoring']
        elif risk_level == 'medium':
            recommendations = ['increase_monitoring_frequency', 'prepare_response_teams']
        elif risk_level == 'high':
            recommendations = ['activate_enhanced_security', 'consider_crowd_control', 'alert_emergency_services']
        else:  # critical
            recommendations = ['immediate_action_required', 'deploy_all_resources', 'consider_area_closure']
        
        # Add specific recommendations based on risk factors
        if 'high_crowd_density' in risk_factors:
            recommendations.append('implement_crowd_dispersal_measures')
        
        if 'adverse_weather' in risk_factors:
            recommendations.append('weather_safety_protocols')
        
        if 'special_events' in risk_factors:
            recommendations.append('event_specific_security_measures')
        
        return recommendations[:5]  # Limit to 5 recommendations
    
    def _generate_mock_result(self, prediction_window):
        """Generate mock result when model is unavailable"""
        risk_levels = ['low', 'medium', 'high']
        risk_level = random.choice(risk_levels)
        risk_score = random.uniform(0.2, 0.8)
        
        predictions = []
        for h in [1, 4, 12, 24]:
            if h <= prediction_window:
                pred_risk = max(0, min(1, risk_score + random.uniform(-0.2, 0.2)))
                predictions.append({
                    'time': f'+{h}h',
                    'risk_score': round(pred_risk, 3),
                    'risk_level': self._get_risk_level(pred_risk)
                })
        
        mock_factors = ['crowd_density', 'time_of_day', 'weather_conditions']
        risk_factors = random.sample(mock_factors, random.randint(1, 2))
        
        recommendations = self._generate_risk_recommendations(risk_level, risk_factors)
        
        return {
            'risk_level': risk_level,
            'risk_score': round(risk_score, 3),
            'confidence': random.uniform(0.6, 0.8),
            'risk_factors': risk_factors,
            'predictions': predictions,
            'recommendations': recommendations,
            'model_used': 'Mock_Data',
            'note': 'Generated mock data due to model unavailability'
        }
    
    def get_model_info(self):
        """Get information about the model"""
        return {
            'model_type': 'LSTM' if hasattr(self, 'model') and hasattr(self.model, 'predict') else 'Statistical',
            'is_fitted': self.is_fitted,
            'sequence_length': self.sequence_length,
            'risk_thresholds': self.risk_thresholds,
            'features': ['crowd_density', 'incident_count', 'weather_score', 'time_factor', 'day_type', 'external_events']
        }
