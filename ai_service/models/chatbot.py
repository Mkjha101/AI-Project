import logging
import random
import re
import os
from datetime import datetime

logger = logging.getLogger(__name__)

class ChatbotModel:
    """
    Multilingual Chatbot Model for Tourist Assistance
    Uses rule-based NLP with BERT/DistilBERT integration when available
    """
    
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.model_loaded = False
        self.supported_languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ar']
        
        # Intent patterns and responses
        self.intent_patterns = {
            'greeting': {
                'patterns': [
                    r'\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b',
                    r'\b(hola|bonjour|guten tag|ciao|olá)\b'
                ],
                'responses': {
                    'en': [
                        "Hello! I'm here to help you with tourist safety information. How can I assist you today?",
                        "Hi there! Welcome to our tourist safety assistance. What would you like to know?",
                        "Greetings! I can help you with safety information, directions, and emergency contacts. How may I help?"
                    ],
                    'es': [
                        "¡Hola! Estoy aquí para ayudarte con información de seguridad turística. ¿Cómo puedo asistirte hoy?",
                        "¡Hola! Bienvenido a nuestra asistencia de seguridad turística. ¿Qué te gustaría saber?",
                        "¡Saludos! Puedo ayudarte con información de seguridad, direcciones y contactos de emergencia. ¿Cómo puedo ayudar?"
                    ],
                    'fr': [
                        "Bonjour! Je suis là pour vous aider avec les informations de sécurité touristique. Comment puis-je vous aider aujourd'hui?",
                        "Salut! Bienvenue à notre assistance de sécurité touristique. Que souhaitez-vous savoir?",
                        "Salutations! Je peux vous aider avec les informations de sécurité, les directions et les contacts d'urgence. Comment puis-je aider?"
                    ]
                }
            },
            'emergency': {
                'patterns': [
                    r'\b(emergency|help|urgent|police|ambulance|fire|danger|attack|theft|lost)\b',
                    r'\b(emergencia|ayuda|policía|ambulancia|fuego|peligro|robo|perdido)\b',
                    r'\b(urgence|aide|police|ambulance|feu|danger|vol|perdu)\b'
                ],
                'responses': {
                    'en': [
                        "This is an emergency situation. Please call 911 immediately or go to the nearest police station.",
                        "For immediate help: Police: 911, Medical: 911, Fire: 911. Stay calm and seek help from nearby authorities.",
                        "Emergency contacts: Police: 911, Tourist Police: (555) 123-4567. Your location will be shared with authorities."
                    ],
                    'es': [
                        "Esta es una situación de emergencia. Por favor llama al 911 inmediatamente o ve a la estación de policía más cercana.",
                        "Para ayuda inmediata: Policía: 911, Médica: 911, Bomberos: 911. Mantén la calma y busca ayuda de las autoridades cercanas.",
                        "Contactos de emergencia: Policía: 911, Policía Turística: (555) 123-4567. Tu ubicación será compartida con las autoridades."
                    ],
                    'fr': [
                        "Il s'agit d'une situation d'urgence. Veuillez appeler le 911 immédiatement ou vous rendre au poste de police le plus proche.",
                        "Pour une aide immédiate: Police: 911, Médical: 911, Pompiers: 911. Restez calme et cherchez l'aide des autorités à proximité.",
                        "Contacts d'urgence: Police: 911, Police Touristique: (555) 123-4567. Votre emplacement sera partagé avec les autorités."
                    ]
                }
            },
            'safety_tips': {
                'patterns': [
                    r'\b(safety|safe|secure|tips|advice|precautions|protect|avoid)\b',
                    r'\b(seguridad|seguro|consejos|precauciones|proteger|evitar)\b',
                    r'\b(sécurité|sûr|conseils|précautions|protéger|éviter)\b'
                ],
                'responses': {
                    'en': [
                        "Here are key safety tips: 1) Stay in well-lit areas 2) Keep valuables secure 3) Stay with your group 4) Know emergency numbers 5) Trust your instincts",
                        "Safety advice: Avoid displaying expensive items, stay aware of your surroundings, use registered transportation, and keep copies of important documents.",
                        "Tourist safety tips: Stay in tourist-friendly areas, inform someone of your plans, carry emergency contacts, and avoid isolated areas at night."
                    ],
                    'es': [
                        "Aquí tienes consejos clave de seguridad: 1) Mantente en áreas bien iluminadas 2) Mantén seguros tus objetos de valor 3) Quédate con tu grupo 4) Conoce los números de emergencia 5) Confía en tus instintos",
                        "Consejos de seguridad: Evita mostrar artículos costosos, mantente alerta de tu entorno, usa transporte registrado y guarda copias de documentos importantes.",
                        "Consejos de seguridad turística: Mantente en áreas amigables para turistas, informa a alguien de tus planes, lleva contactos de emergencia y evita áreas aisladas por la noche."
                    ],
                    'fr': [
                        "Voici les conseils clés de sécurité: 1) Restez dans des zones bien éclairées 2) Gardez vos objets de valeur en sécurité 3) Restez avec votre groupe 4) Connaissez les numéros d'urgence 5) Faites confiance à votre instinct",
                        "Conseils de sécurité: Évitez d'afficher des articles coûteux, restez conscient de votre environnement, utilisez des transports enregistrés et gardez des copies de documents importants.",
                        "Conseils de sécurité touristique: Restez dans des zones touristiques, informez quelqu'un de vos plans, portez des contacts d'urgence et évitez les zones isolées la nuit."
                    ]
                }
            },
            'directions': {
                'patterns': [
                    r'\b(where|direction|location|find|map|address|way|how to get)\b',
                    r'\b(donde|dirección|ubicación|encontrar|mapa|cómo llegar)\b',
                    r'\b(où|direction|emplacement|trouver|carte|comment aller)\b'
                ],
                'responses': {
                    'en': [
                        "I can help with directions! For specific locations, I recommend using GPS navigation. Popular tourist areas include: Downtown Square, Heritage Museum, Central Park.",
                        "For directions: Use official city maps, ask at tourist information centers, or use trusted navigation apps. Avoid following strangers who offer directions.",
                        "Getting around safely: Use official taxis or public transport, stick to main roads, and always have a backup route planned."
                    ],
                    'es': [
                        "¡Puedo ayudar con direcciones! Para ubicaciones específicas, recomiendo usar navegación GPS. Las áreas turísticas populares incluyen: Plaza del Centro, Museo del Patrimonio, Parque Central.",
                        "Para direcciones: Usa mapas oficiales de la ciudad, pregunta en centros de información turística, o usa aplicaciones de navegación confiables. Evita seguir a extraños que ofrecen direcciones.",
                        "Moverse de forma segura: Usa taxis oficiales o transporte público, mantente en calles principales, y siempre ten una ruta de respaldo planificada."
                    ],
                    'fr': [
                        "Je peux aider avec les directions! Pour des emplacements spécifiques, je recommande d'utiliser la navigation GPS. Les zones touristiques populaires incluent: Place du Centre, Musée du Patrimoine, Parc Central.",
                        "Pour les directions: Utilisez des cartes officielles de la ville, demandez aux centres d'information touristique, ou utilisez des applications de navigation fiables. Évitez de suivre des inconnus qui offrent des directions.",
                        "Se déplacer en sécurité: Utilisez des taxis officiels ou les transports publics, restez sur les routes principales, et ayez toujours un itinéraire de secours planifié."
                    ]
                }
            },
            'weather': {
                'patterns': [
                    r'\b(weather|rain|sunny|temperature|climate|forecast)\b',
                    r'\b(tiempo|lluvia|soleado|temperatura|clima|pronóstico)\b',
                    r'\b(météo|pluie|ensoleillé|température|climat|prévision)\b'
                ],
                'responses': {
                    'en': [
                        "Current weather conditions can affect safety. In case of severe weather, seek shelter immediately. Check local weather forecasts regularly.",
                        "Weather safety: Carry appropriate clothing, stay hydrated in hot weather, seek shelter during storms, and avoid outdoor activities in severe conditions.",
                        "Weather updates are available at tourist centers and through local weather apps. Always be prepared for weather changes."
                    ],
                    'es': [
                        "Las condiciones climáticas actuales pueden afectar la seguridad. En caso de clima severo, busca refugio inmediatamente. Revisa los pronósticos del tiempo locales regularmente.",
                        "Seguridad climática: Lleva ropa apropiada, mantente hidratado en clima caluroso, busca refugio durante tormentas, y evita actividades al aire libre en condiciones severas.",
                        "Las actualizaciones del tiempo están disponibles en centros turísticos y a través de aplicaciones locales del clima. Siempre está preparado para cambios climáticos."
                    ],
                    'fr': [
                        "Les conditions météorologiques actuelles peuvent affecter la sécurité. En cas de temps sévère, cherchez un abri immédiatement. Vérifiez régulièrement les prévisions météorologiques locales.",
                        "Sécurité météorologique: Portez des vêtements appropriés, restez hydraté par temps chaud, cherchez un abri pendant les orages, et évitez les activités extérieures par conditions sévères.",
                        "Les mises à jour météo sont disponibles dans les centres touristiques et via les applications météo locales. Soyez toujours prêt pour les changements météorologiques."
                    ]
                }
            },
            'transportation': {
                'patterns': [
                    r'\b(transport|taxi|bus|train|metro|uber|ride|airport|station)\b',
                    r'\b(transporte|taxi|autobús|tren|metro|aeropuerto|estación)\b',
                    r'\b(transport|taxi|bus|train|métro|aéroport|gare)\b'
                ],
                'responses': {
                    'en': [
                        "Safe transportation options: Use licensed taxis, official ride-sharing apps, or public transport. Always verify the vehicle and driver before entering.",
                        "Transportation safety: Keep your belongings secure, share your trip details with someone, use well-lit pickup points, and trust your instincts.",
                        "Getting to/from airport: Use official airport shuttles, pre-booked taxis, or registered transport services. Avoid unlicensed vehicles."
                    ],
                    'es': [
                        "Opciones de transporte seguro: Usa taxis con licencia, aplicaciones oficiales de viajes compartidos, o transporte público. Siempre verifica el vehículo y conductor antes de entrar.",
                        "Seguridad en transporte: Mantén tus pertenencias seguras, comparte los detalles de tu viaje con alguien, usa puntos de recogida bien iluminados, y confía en tus instintos.",
                        "Para ir/venir del aeropuerto: Usa servicios oficiales del aeropuerto, taxis reservados previamente, o servicios de transporte registrados. Evita vehículos sin licencia."
                    ],
                    'fr': [
                        "Options de transport sûres: Utilisez des taxis licenciés, des applications officielles de covoiturage, ou les transports publics. Vérifiez toujours le véhicule et le conducteur avant d'entrer.",
                        "Sécurité des transports: Gardez vos affaires en sécurité, partagez les détails de votre voyage avec quelqu'un, utilisez des points de prise en charge bien éclairés, et faites confiance à votre instinct.",
                        "Pour aller/venir de l'aéroport: Utilisez les navettes officielles de l'aéroport, des taxis pré-réservés, ou des services de transport enregistrés. Évitez les véhicules non licenciés."
                    ]
                }
            }
        }
        
        try:
            self._load_nlp_model()
        except Exception as e:
            logger.warning(f"NLP model loading failed, using rule-based fallback: {e}")
            self.model_loaded = False
    
    def _load_nlp_model(self):
        """Load BERT/DistilBERT model if available"""
        try:
            from transformers import AutoTokenizer, AutoModel
            
            model_name = os.getenv('BERT_MODEL_NAME', 'distilbert-base-uncased')
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModel.from_pretrained(model_name)
            self.model_loaded = True
            
            logger.info(f"NLP model {model_name} loaded successfully")
            
        except ImportError:
            logger.warning("Transformers library not available")
            raise
        except Exception as e:
            logger.error(f"Failed to load NLP model: {e}")
            raise
    
    def generate_response(self, message, language='en', context=None):
        """
        Generate chatbot response for user message
        
        Args:
            message (str): User's message
            language (str): Language code (en, es, fr, etc.)
            context (dict): Additional context information
            
        Returns:
            dict: Response with message, confidence, and metadata
        """
        try:
            if not message or not message.strip():
                return self._get_default_response(language)
            
            # Clean and normalize message
            message = message.strip().lower()
            
            # Detect intent
            detected_intent = self._detect_intent(message, language)
            
            # Generate response based on intent
            if detected_intent:
                response_text = self._get_intent_response(detected_intent, language)
                confidence = 0.85
            else:
                response_text = self._get_fallback_response(message, language)
                confidence = 0.6
            
            # Get suggested actions
            suggested_actions = self._get_suggested_actions(detected_intent, language)
            
            return {
                'response': response_text,
                'confidence': confidence,
                'intent': detected_intent or 'unknown',
                'language': language,
                'suggested_actions': suggested_actions,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Response generation error: {e}")
            return {
                'response': self._get_error_response(language),
                'confidence': 0.3,
                'intent': 'error',
                'language': language,
                'suggested_actions': ['try_again', 'contact_support'],
                'timestamp': datetime.now().isoformat(),
                'error': str(e)
            }
    
    def _detect_intent(self, message, language):
        """Detect user intent from message"""
        try:
            # Check each intent pattern
            for intent, data in self.intent_patterns.items():
                for pattern in data['patterns']:
                    if re.search(pattern, message, re.IGNORECASE):
                        return intent
            
            # Additional keyword-based detection
            emergency_keywords = ['help', 'emergency', 'police', 'urgent', 'danger', 'lost', 'theft', 'attack']
            safety_keywords = ['safe', 'safety', 'secure', 'protect', 'avoid', 'tips', 'advice']
            direction_keywords = ['where', 'how', 'direction', 'location', 'find', 'map', 'way']
            
            if any(keyword in message for keyword in emergency_keywords):
                return 'emergency'
            elif any(keyword in message for keyword in safety_keywords):
                return 'safety_tips'
            elif any(keyword in message for keyword in direction_keywords):
                return 'directions'
            
            return None
            
        except Exception as e:
            logger.error(f"Intent detection error: {e}")
            return None
    
    def _get_intent_response(self, intent, language):
        """Get response for detected intent"""
        try:
            intent_data = self.intent_patterns.get(intent, {})
            responses = intent_data.get('responses', {})
            
            # Get responses in the requested language, fallback to English
            language_responses = responses.get(language, responses.get('en', []))
            
            if language_responses:
                return random.choice(language_responses)
            else:
                return self._get_fallback_response("", language)
                
        except Exception as e:
            logger.error(f"Intent response error: {e}")
            return self._get_fallback_response("", language)
    
    def _get_fallback_response(self, message, language):
        """Generate fallback response"""
        fallback_responses = {
            'en': [
                "I'm here to help with tourist safety information. Could you please be more specific about what you need?",
                "I can assist with safety tips, emergency contacts, directions, and general tourist information. How can I help?",
                "For immediate emergencies, call 911. For other assistance, please let me know what specific information you need."
            ],
            'es': [
                "Estoy aquí para ayudar con información de seguridad turística. ¿Podrías ser más específico sobre lo que necesitas?",
                "Puedo ayudar con consejos de seguridad, contactos de emergencia, direcciones e información turística general. ¿Cómo puedo ayudar?",
                "Para emergencias inmediatas, llama al 911. Para otra asistencia, por favor hazme saber qué información específica necesitas."
            ],
            'fr': [
                "Je suis là pour aider avec les informations de sécurité touristique. Pourriez-vous être plus spécifique sur ce dont vous avez besoin?",
                "Je peux aider avec des conseils de sécurité, des contacts d'urgence, des directions et des informations touristiques générales. Comment puis-je aider?",
                "Pour les urgences immédiates, appelez le 911. Pour d'autres assistance, veuillez me dire quelles informations spécifiques vous avez besoin."
            ]
        }
        
        responses = fallback_responses.get(language, fallback_responses['en'])
        return random.choice(responses)
    
    def _get_default_response(self, language):
        """Get default response for empty messages"""
        default_responses = {
            'en': "Hello! I'm your tourist safety assistant. How can I help you today?",
            'es': "¡Hola! Soy tu asistente de seguridad turística. ¿Cómo puedo ayudarte hoy?",
            'fr': "Bonjour! Je suis votre assistant de sécurité touristique. Comment puis-je vous aider aujourd'hui?"
        }
        
        response_text = default_responses.get(language, default_responses['en'])
        
        return {
            'response': response_text,
            'confidence': 0.9,
            'intent': 'greeting',
            'language': language,
            'suggested_actions': ['ask_safety_tips', 'get_directions', 'emergency_contacts'],
            'timestamp': datetime.now().isoformat()
        }
    
    def _get_error_response(self, language):
        """Get error response"""
        error_responses = {
            'en': "I apologize, but I'm having trouble processing your request. Please try again or contact our support team.",
            'es': "Me disculpo, pero estoy teniendo problemas para procesar tu solicitud. Por favor intenta de nuevo o contacta a nuestro equipo de soporte.",
            'fr': "Je m'excuse, mais j'ai des difficultés à traiter votre demande. Veuillez réessayer ou contacter notre équipe de support."
        }
        
        return error_responses.get(language, error_responses['en'])
    
    def _get_suggested_actions(self, intent, language):
        """Get suggested actions based on intent"""
        action_mappings = {
            'en': {
                'greeting': ['ask_safety_tips', 'get_directions', 'emergency_contacts'],
                'emergency': ['call_police', 'find_help', 'share_location'],
                'safety_tips': ['get_more_tips', 'emergency_contacts', 'ask_directions'],
                'directions': ['use_gps', 'ask_locals', 'find_landmarks'],
                'weather': ['check_forecast', 'prepare_clothing', 'plan_indoor_activities'],
                'transportation': ['book_taxi', 'find_public_transport', 'check_routes']
            },
            'es': {
                'greeting': ['pedir_consejos_seguridad', 'obtener_direcciones', 'contactos_emergencia'],
                'emergency': ['llamar_policia', 'buscar_ayuda', 'compartir_ubicacion'],
                'safety_tips': ['obtener_mas_consejos', 'contactos_emergencia', 'pedir_direcciones'],
                'directions': ['usar_gps', 'preguntar_locales', 'buscar_puntos_referencia'],
                'weather': ['revisar_pronostico', 'preparar_ropa', 'planear_actividades_interiores'],
                'transportation': ['reservar_taxi', 'encontrar_transporte_publico', 'revisar_rutas']
            },
            'fr': {
                'greeting': ['demander_conseils_securite', 'obtenir_directions', 'contacts_urgence'],
                'emergency': ['appeler_police', 'chercher_aide', 'partager_emplacement'],
                'safety_tips': ['obtenir_plus_conseils', 'contacts_urgence', 'demander_directions'],
                'directions': ['utiliser_gps', 'demander_locaux', 'trouver_reperes'],
                'weather': ['verifier_previsions', 'preparer_vetements', 'planifier_activites_interieures'],
                'transportation': ['reserver_taxi', 'trouver_transport_public', 'verifier_itineraires']
            }
        }
        
        language_actions = action_mappings.get(language, action_mappings['en'])
        return language_actions.get(intent, ['ask_question', 'get_help', 'contact_support'])
    
    def get_model_info(self):
        """Get information about the chatbot model"""
        return {
            'model_type': 'BERT/DistilBERT' if self.model_loaded else 'Rule-based',
            'model_loaded': self.model_loaded,
            'supported_languages': self.supported_languages,
            'available_intents': list(self.intent_patterns.keys()),
            'total_patterns': sum(len(intent['patterns']) for intent in self.intent_patterns.values())
        }
