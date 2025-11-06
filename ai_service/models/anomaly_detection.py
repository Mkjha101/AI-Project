import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import logging
import random
import time
import os
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class AnomalyDetectionModel:
    """
    Anomaly Detection Model using Isolation Forest
    Detects unusual behavior patterns in tourist areas
    """
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.pca = PCA(n_components=0.95)  # Keep 95% of variance
        self.is_fitted = False
        self.contamination = float(os.getenv('ISOLATION_FOREST_CONTAMINATION', 0.1))
        
        try:
            self._initialize_model()
        except Exception as e:
            logger.error(f"Failed to initialize anomaly detection model: {e}")
    
    def _initialize_model(self):
        """Initialize the Isolation Forest model"""
        self.model = IsolationForest(
            contamination=self.contamination,
            random_state=42,
            n_estimators=100,
            max_samples='auto',
            n_jobs=-1
        )
        
        # Generate and fit with synthetic training data
        self._generate_training_data()
        logger.info("Anomaly detection model initialized successfully")
    
    def _generate_training_data(self):
        """Generate synthetic training data for the model"""
        try:
            # Generate normal behavior patterns
            np.random.seed(42)
            n_samples = 1000
            
            # Features: [crowd_density, movement_speed, noise_level, time_of_day, day_of_week, weather_score]
            normal_data = []
            
            for i in range(n_samples):
                # Normal patterns
                crowd_density = np.random.beta(2, 5)  # Usually lower density
                movement_speed = np.random.normal(3.0, 1.0)  # Average walking speed
                noise_level = np.random.normal(45, 10)  # Normal noise in dB
                time_of_day = np.random.uniform(6, 22)  # 6 AM to 10 PM
                day_of_week = np.random.randint(1, 8)  # 1-7 for days
                weather_score = np.random.beta(3, 2)  # Usually good weather
                
                # Add some correlation patterns
                if 10 <= time_of_day <= 16:  # Peak hours
                    crowd_density *= 1.5
                    noise_level *= 1.2
                
                if day_of_week in [6, 7]:  # Weekends
                    crowd_density *= 1.3
                    movement_speed *= 0.9  # Slower on weekends
                
                normal_data.append([
                    crowd_density, movement_speed, noise_level,
                    time_of_day, day_of_week, weather_score
                ])
            
            # Add some anomalous patterns for training
            anomaly_data = []
            n_anomalies = int(n_samples * self.contamination)
            
            for i in range(n_anomalies):
                # Create anomalous patterns
                crowd_density = np.random.choice([
                    np.random.beta(5, 1),  # Very high density
                    np.random.beta(1, 10)  # Very low density
                ])
                movement_speed = np.random.choice([
                    np.random.normal(8.0, 1.0),  # Very fast movement
                    np.random.normal(0.5, 0.2)   # Very slow movement
                ])
                noise_level = np.random.choice([
                    np.random.normal(80, 5),   # Very loud
                    np.random.normal(20, 3)    # Very quiet
                ])
                time_of_day = np.random.uniform(0, 24)
                day_of_week = np.random.randint(1, 8)
                weather_score = np.random.choice([
                    np.random.beta(1, 5),  # Bad weather
                    np.random.beta(8, 1)   # Perfect weather
                ])
                
                anomaly_data.append([
                    crowd_density, movement_speed, noise_level,
                    time_of_day, day_of_week, weather_score
                ])
            
            # Combine data
            training_data = np.array(normal_data + anomaly_data)
            
            # Fit preprocessing
            training_data_scaled = self.scaler.fit_transform(training_data)
            training_data_pca = self.pca.fit_transform(training_data_scaled)
            
            # Fit the model
            self.model.fit(training_data_pca)
            self.is_fitted = True
            
            logger.info(f"Model fitted with {len(training_data)} samples")
            
        except Exception as e:
            logger.error(f"Failed to generate training data: {e}")
            raise
    
    def predict(self, data, time_window=60):
        """
        Predict anomalies in the provided data
        
        Args:
            data (list): List of data points or behavioral metrics
            time_window (int): Time window in minutes for analysis
            
        Returns:
            dict: Anomaly detection results
        """
        try:
            if not self.is_fitted:
                return self._generate_mock_result()
            
            # Process input data
            processed_data = self._process_input_data(data, time_window)
            
            if len(processed_data) == 0:
                return self._generate_mock_result()
            
            # Scale and transform data
            scaled_data = self.scaler.transform(processed_data)
            pca_data = self.pca.transform(scaled_data)
            
            # Predict anomalies
            anomaly_scores = self.model.decision_function(pca_data)
            anomaly_predictions = self.model.predict(pca_data)
            
            # Analyze results
            anomaly_detected = -1 in anomaly_predictions
            avg_anomaly_score = np.mean(anomaly_scores)
            min_anomaly_score = np.min(anomaly_scores)
            
            # Calculate confidence based on score distribution
            confidence = self._calculate_confidence(anomaly_scores)
            
            # Identify patterns
            patterns = self._identify_patterns(processed_data, anomaly_predictions)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(anomaly_detected, patterns)
            
            return {
                'anomaly_detected': bool(anomaly_detected),
                'anomaly_score': float(abs(min_anomaly_score)),  # Use most anomalous score
                'average_score': float(abs(avg_anomaly_score)),
                'confidence': float(confidence),
                'patterns': patterns,
                'recommendations': recommendations,
                'data_points_analyzed': len(processed_data),
                'time_window_minutes': time_window
            }
            
        except Exception as e:
            logger.error(f"Anomaly prediction error: {e}")
            return self._generate_mock_result()
    
    def _process_input_data(self, data, time_window):
        """Process and normalize input data"""
        try:
            # If data is a simple list of numbers, convert to feature matrix
            if isinstance(data[0], (int, float)):
                # Treat as time series and extract features
                return self._extract_features_from_timeseries(data, time_window)
            
            # If data is already a feature matrix
            elif isinstance(data[0], (list, tuple)):
                return np.array(data)
            
            # If data is dictionary format
            elif isinstance(data[0], dict):
                return self._extract_features_from_dicts(data)
            
            else:
                raise ValueError("Unsupported data format")
                
        except Exception as e:
            logger.error(f"Data processing error: {e}")
            return []
    
    def _extract_features_from_timeseries(self, timeseries, time_window):
        """Extract behavioral features from time series data"""
        try:
            features = []
            current_time = datetime.now()
            
            # Split into windows and extract features
            window_size = max(1, len(timeseries) // 10)  # 10 windows
            
            for i in range(0, len(timeseries), window_size):
                window = timeseries[i:i+window_size]
                if len(window) < 2:
                    continue
                
                # Statistical features
                mean_val = np.mean(window)
                std_val = np.std(window)
                trend = np.polyfit(range(len(window)), window, 1)[0] if len(window) > 1 else 0
                
                # Simulate additional context features
                time_of_day = (current_time.hour + i * 0.1) % 24
                day_of_week = current_time.weekday() + 1
                weather_score = random.uniform(0.4, 0.9)  # Mock weather
                
                features.append([
                    mean_val, std_val, trend,
                    time_of_day, day_of_week, weather_score
                ])
            
            return np.array(features)
            
        except Exception as e:
            logger.error(f"Feature extraction error: {e}")
            return []
    
    def _extract_features_from_dicts(self, data_dicts):
        """Extract features from dictionary format data"""
        try:
            features = []
            
            for data_point in data_dicts:
                feature_vector = [
                    data_point.get('crowd_density', 0.5),
                    data_point.get('movement_speed', 3.0),
                    data_point.get('noise_level', 45.0),
                    data_point.get('time_of_day', 12.0),
                    data_point.get('day_of_week', 3),
                    data_point.get('weather_score', 0.7)
                ]
                features.append(feature_vector)
            
            return np.array(features)
            
        except Exception as e:
            logger.error(f"Dictionary feature extraction error: {e}")
            return []
    
    def _calculate_confidence(self, anomaly_scores):
        """Calculate confidence based on anomaly scores"""
        try:
            # Confidence based on score consistency and magnitude
            score_std = np.std(anomaly_scores)
            score_mean = np.mean(np.abs(anomaly_scores))
            
            # Higher confidence with consistent scores and clear separation
            consistency_factor = max(0, 1 - score_std)
            magnitude_factor = min(1, score_mean * 2)
            
            confidence = (consistency_factor + magnitude_factor) / 2
            return max(0.1, min(0.95, confidence))
            
        except:
            return 0.7  # Default confidence
    
    def _identify_patterns(self, data, predictions):
        """Identify specific anomaly patterns"""
        patterns = []
        
        try:
            if len(data) == 0:
                return patterns
            
            # Analyze data for common patterns
            data_df = pd.DataFrame(data)
            
            # High values pattern
            for col_idx in range(data_df.shape[1]):
                col_data = data_df.iloc[:, col_idx]
                if np.any(col_data > np.mean(col_data) + 2 * np.std(col_data)):
                    patterns.append(f'high_values_feature_{col_idx}')
            
            # Low values pattern
            for col_idx in range(data_df.shape[1]):
                col_data = data_df.iloc[:, col_idx]
                if np.any(col_data < np.mean(col_data) - 2 * np.std(col_data)):
                    patterns.append(f'low_values_feature_{col_idx}')
            
            # Rapid changes
            for col_idx in range(data_df.shape[1]):
                col_data = data_df.iloc[:, col_idx]
                if len(col_data) > 1:
                    changes = np.diff(col_data)
                    if np.any(np.abs(changes) > 2 * np.std(changes)):
                        patterns.append(f'rapid_change_feature_{col_idx}')
            
            # Convert to human-readable patterns
            readable_patterns = []
            for pattern in patterns[:5]:  # Limit to 5 patterns
                if 'feature_0' in pattern:
                    readable_patterns.append('unusual_crowd_density')
                elif 'feature_1' in pattern:
                    readable_patterns.append('unusual_movement_speed')
                elif 'feature_2' in pattern:
                    readable_patterns.append('unusual_noise_level')
                elif 'rapid_change' in pattern:
                    readable_patterns.append('rapid_behavioral_change')
                else:
                    readable_patterns.append('unusual_pattern')
            
            return list(set(readable_patterns))  # Remove duplicates
            
        except Exception as e:
            logger.error(f"Pattern identification error: {e}")
            return ['unknown_pattern']
    
    def _generate_recommendations(self, anomaly_detected, patterns):
        """Generate recommendations based on anomaly detection results"""
        recommendations = []
        
        if not anomaly_detected:
            recommendations = ['continue_monitoring', 'maintain_current_protocols']
        else:
            recommendations.append('increase_surveillance')
            
            if 'unusual_crowd_density' in patterns:
                recommendations.append('deploy_crowd_control_measures')
            
            if 'unusual_movement_speed' in patterns:
                recommendations.append('check_for_emergency_situations')
            
            if 'unusual_noise_level' in patterns:
                recommendations.append('investigate_noise_source')
            
            if 'rapid_behavioral_change' in patterns:
                recommendations.append('alert_security_personnel')
            
            # Default recommendations
            if len(recommendations) == 1:  # Only 'increase_surveillance'
                recommendations.extend([
                    'review_security_footage',
                    'consider_additional_personnel'
                ])
        
        return recommendations[:4]  # Limit to 4 recommendations
    
    def _generate_mock_result(self):
        """Generate mock result when model is unavailable"""
        anomaly_detected = random.random() < 0.3  # 30% chance of anomaly
        
        patterns = []
        if anomaly_detected:
            possible_patterns = [
                'unusual_gathering', 'rapid_movement', 'crowd_surge',
                'suspicious_loitering', 'unusual_noise_pattern'
            ]
            patterns = random.sample(possible_patterns, random.randint(1, 3))
        
        recommendations = self._generate_recommendations(anomaly_detected, patterns)
        
        return {
            'anomaly_detected': anomaly_detected,
            'anomaly_score': random.uniform(0.1, 0.9),
            'average_score': random.uniform(0.2, 0.7),
            'confidence': random.uniform(0.6, 0.9),
            'patterns': patterns,
            'recommendations': recommendations,
            'data_points_analyzed': random.randint(10, 50),
            'time_window_minutes': 60,
            'note': 'Generated mock data due to model unavailability'
        }
    
    def get_model_info(self):
        """Get information about the model"""
        return {
            'model_type': 'Isolation Forest',
            'is_fitted': self.is_fitted,
            'contamination': self.contamination,
            'n_estimators': self.model.n_estimators if self.model else None,
            'features': ['crowd_density', 'movement_speed', 'noise_level', 'time_of_day', 'day_of_week', 'weather_score']
        }
