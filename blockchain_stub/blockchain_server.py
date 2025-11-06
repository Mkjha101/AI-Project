from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import json
import time
import random
import string
import os
import logging
import sys
import io
from datetime import datetime, timedelta
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend
import qrcode
import base64
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure UTF-8 safe logging (prevents UnicodeEncodeError on Windows console with emojis)
file_handler = logging.FileHandler(os.getenv('LOG_FILE', 'blockchain.log'), encoding='utf-8')
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

class Block:
    """Simple blockchain block structure"""
    
    def __init__(self, index, transactions, timestamp, previous_hash, nonce=0):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = self.calculate_hash()
    
    def calculate_hash(self):
        """Calculate the hash of the block"""
        block_string = json.dumps({
            'index': self.index,
            'transactions': self.transactions,
            'timestamp': self.timestamp,
            'previous_hash': self.previous_hash,
            'nonce': self.nonce
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def mine_block(self, difficulty):
        """Mine the block with proof of work"""
        target = "0" * difficulty
        while self.hash[:difficulty] != target:
            self.nonce += 1
            self.hash = self.calculate_hash()
        
        logger.info(f"Block mined: {self.hash}")

class DigitalIDBlockchain:
    """Simplified blockchain for digital ID verification"""
    
    def __init__(self):
        self.chain = [self.create_genesis_block()]
        self.difficulty = int(os.getenv('BLOCK_DIFFICULTY', 4))
        self.pending_transactions = []
        self.mining_reward = 10
        self.digital_ids = {}  # Store digital IDs
        self.revoked_ids = set()  # Track revoked IDs
        
    def create_genesis_block(self):
        """Create the first block in the chain"""
        genesis_hash = os.getenv('GENESIS_HASH', '0' * 64)
        return Block(0, [], time.time(), genesis_hash)
    
    def get_latest_block(self):
        """Get the most recent block"""
        return self.chain[-1]
    
    def add_transaction(self, transaction):
        """Add a transaction to pending transactions"""
        self.pending_transactions.append(transaction)
    
    def mine_pending_transactions(self):
        """Mine pending transactions into a new block"""
        if not self.pending_transactions:
            return None
            
        block = Block(
            len(self.chain),
            self.pending_transactions.copy(),
            time.time(),
            self.get_latest_block().hash
        )
        
        block.mine_block(self.difficulty)
        self.chain.append(block)
        self.pending_transactions = []
        
        return block
    
    def create_digital_id(self, user_data, id_type='tourist_id'):
        """Create a new digital ID"""
        try:
            # Generate unique digital ID
            digital_id = self.generate_digital_id()
            
            # Create key pair
            private_key = rsa.generate_private_key(
                public_exponent=65537,
                key_size=int(os.getenv('KEY_SIZE', 2048)),
                backend=default_backend()
            )
            public_key = private_key.public_key()
            
            # Serialize public key (use public_bytes() not serialize())
            public_pem = public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            ).decode('utf-8')
            
            # Create ID record
            id_record = {
                'digital_id': digital_id,
                'user_data': user_data,
                'id_type': id_type,
                'public_key': public_pem,
                'created_at': datetime.now().isoformat(),
                'expires_at': (datetime.now() + timedelta(days=365)).isoformat(),
                'status': 'active',
                'verification_level': 'verified'
            }
            
            # Store in blockchain
            self.digital_ids[digital_id] = id_record
            
            # Create transaction
            transaction = {
                'type': 'create_id',
                'digital_id': digital_id,
                'timestamp': time.time(),
                'data_hash': self.hash_data(id_record)
            }
            
            self.add_transaction(transaction)
            
            # Generate QR code
            qr_code = self.generate_qr_code(digital_id)
            
            return {
                'digital_id': digital_id,
                'public_key': public_pem[:100] + '...',  # Truncated for response
                'qr_code': qr_code,
                'blockchain_hash': self.hash_data(id_record),
                'created_at': id_record['created_at'],
                'expires_at': id_record['expires_at'],
                'verification_level': id_record['verification_level']
            }
            
        except Exception as e:
            logger.error(f"Failed to create digital ID: {e}")
            raise
    
    def verify_digital_id(self, digital_id, user_data=None):
        """Verify a digital ID"""
        try:
            # Check if ID exists
            if digital_id not in self.digital_ids:
                return {
                    'verified': False,
                    'reason': 'Digital ID not found',
                    'confidence': 0.0
                }
            
            # Check if ID is revoked
            if digital_id in self.revoked_ids:
                return {
                    'verified': False,
                    'reason': 'Digital ID has been revoked',
                    'confidence': 0.0
                }
            
            id_record = self.digital_ids[digital_id]
            
            # Check expiration
            expires_at = datetime.fromisoformat(id_record['expires_at'])
            if datetime.now() > expires_at:
                return {
                    'verified': False,
                    'reason': 'Digital ID has expired',
                    'confidence': 0.0
                }
            
            # Calculate verification confidence
            confidence = self.calculate_verification_confidence(id_record, user_data)
            
            # Verify blockchain integrity (simplified)
            blockchain_hash = self.hash_data(id_record)
            
            return {
                'verified': True,
                'confidence': confidence,
                'blockchain_hash': blockchain_hash,
                'timestamp': datetime.now().isoformat(),
                'verification_level': id_record['verification_level'],
                'metadata': {
                    'created_at': id_record['created_at'],
                    'id_type': id_record['id_type'],
                    'issuer': 'Smart Tourist Safety Authority'
                }
            }
            
        except Exception as e:
            logger.error(f"Failed to verify digital ID: {e}")
            return {
                'verified': False,
                'reason': 'Verification error occurred',
                'confidence': 0.0
            }
    
    def revoke_digital_id(self, digital_id, reason, revoked_by):
        """Revoke a digital ID"""
        try:
            if digital_id not in self.digital_ids:
                return False
                
            # Add to revoked set
            self.revoked_ids.add(digital_id)
            
            # Update record
            self.digital_ids[digital_id]['status'] = 'revoked'
            self.digital_ids[digital_id]['revoked_at'] = datetime.now().isoformat()
            self.digital_ids[digital_id]['revocation_reason'] = reason
            
            # Create revocation transaction
            transaction = {
                'type': 'revoke_id',
                'digital_id': digital_id,
                'reason': reason,
                'revoked_by': revoked_by,
                'timestamp': time.time()
            }
            
            self.add_transaction(transaction)
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to revoke digital ID: {e}")
            return False
    
    def generate_digital_id(self):
        """Generate a unique digital ID"""
        prefix = "TID"  # Tourist ID
        timestamp = str(int(time.time()))
        random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        return f"{prefix}-{timestamp[-6:]}-{random_part}"
    
    def hash_data(self, data):
        """Hash data using SHA256"""
        data_string = json.dumps(data, sort_keys=True)
        return hashlib.sha256(data_string.encode()).hexdigest()
    
    def generate_qr_code(self, digital_id):
        """Generate QR code for digital ID"""
        try:
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr_data = {
                'digital_id': digital_id,
                'verification_url': f'https://verify.touristsafety.gov/id/{digital_id}',
                'issued_at': datetime.now().isoformat()
            }
            qr.add_data(json.dumps(qr_data))
            qr.make(fit=True)
            
            # Create QR code image
            img = qr.make_image(fill_color="black", back_color="white")
            
            # Convert to base64
            buffer = io.BytesIO()
            img.save(buffer, format='PNG')
            img_str = base64.b64encode(buffer.getvalue()).decode()
            
            return f"data:image/png;base64,{img_str}"
            
        except Exception as e:
            logger.error(f"Failed to generate QR code: {e}")
            return None
    
    def calculate_verification_confidence(self, id_record, user_data):
        """Calculate verification confidence score"""
        base_confidence = 0.8
        
        # Time-based confidence (newer IDs have higher confidence)
        created_at = datetime.fromisoformat(id_record['created_at'])
        age_days = (datetime.now() - created_at).days
        time_factor = max(0.1, 1.0 - (age_days / 365) * 0.2)  # Slight decrease over time
        
        # Verification level factor
        verification_factors = {
            'basic': 0.6,
            'verified': 0.8,
            'enhanced': 1.0
        }
        verification_factor = verification_factors.get(id_record.get('verification_level', 'basic'), 0.6)
        
        # User data matching (if provided)
        data_match_factor = 1.0
        if user_data and 'user_data' in id_record:
            matches = 0
            total_fields = 0
            for key, value in user_data.items():
                if key in id_record['user_data']:
                    total_fields += 1
                    if str(value).lower() == str(id_record['user_data'][key]).lower():
                        matches += 1
            
            if total_fields > 0:
                data_match_factor = matches / total_fields
        
        # Calculate final confidence
        confidence = base_confidence * time_factor * verification_factor * data_match_factor
        return min(1.0, max(0.1, confidence))
    
    def get_blockchain_stats(self):
        """Get blockchain statistics"""
        return {
            'total_blocks': len(self.chain),
            'total_ids': len(self.digital_ids),
            'active_ids': len([id for id in self.digital_ids.values() if id['status'] == 'active']),
            'revoked_ids': len(self.revoked_ids),
            'pending_transactions': len(self.pending_transactions),
            'latest_block_hash': self.get_latest_block().hash,
            'blockchain_height': len(self.chain) - 1,
            'network_id': os.getenv('NETWORK_ID', 'tourist_safety_testnet')
        }

# Initialize blockchain
blockchain = DigitalIDBlockchain()

# Routes

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        stats = blockchain.get_blockchain_stats()
        return jsonify({
            'status': 'healthy',
            'timestamp': time.time(),
            'blockchain_stats': stats,
            'version': '1.0.0'
        })
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

@app.route('/', methods=['GET'])
def root():
    """Root endpoint with service information"""
    return jsonify({
        'service': 'Smart Tourist Safety - Blockchain Digital ID Service',
        'version': '1.0.0',
        'endpoints': {
            '/health': 'Service health check',
            '/create-id': 'Create new digital ID',
            '/verify': 'Verify digital ID',
            '/id/{digital_id}': 'Get digital ID information',
            '/revoke': 'Revoke digital ID',
            '/batch-verify': 'Batch verify multiple IDs',
            '/stats': 'Get blockchain statistics'
        },
        'blockchain_info': blockchain.get_blockchain_stats(),
        'timestamp': time.time()
    })

@app.route('/create-id', methods=['POST'])
def create_digital_id():
    """Create a new digital ID"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        user_data = data.get('user_data', {})
        id_type = data.get('id_type', 'tourist_id')
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email']
        for field in required_fields:
            if field not in user_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create digital ID
        result = blockchain.create_digital_id(user_data, id_type)
        
        # Mine pending transactions periodically
        if len(blockchain.pending_transactions) >= 5:  # Mine every 5 transactions
            blockchain.mine_pending_transactions()
        
        return jsonify(result), 201
        
    except Exception as e:
        logger.error(f"Create ID error: {e}")
        return jsonify({'error': 'Failed to create digital ID', 'details': str(e)}), 500

@app.route('/verify', methods=['POST'])
def verify_digital_id():
    """Verify a digital ID"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        digital_id = data.get('digital_id')
        user_data = data.get('user_data', {})
        
        if not digital_id:
            return jsonify({'error': 'Digital ID is required'}), 400
        
        result = blockchain.verify_digital_id(digital_id, user_data)
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Verify ID error: {e}")
        return jsonify({'error': 'Failed to verify digital ID', 'details': str(e)}), 500

@app.route('/id/<digital_id>', methods=['GET'])
def get_digital_id_info(digital_id):
    """Get information about a digital ID"""
    try:
        if digital_id not in blockchain.digital_ids:
            return jsonify({
                'exists': False,
                'error': 'Digital ID not found'
            }), 404
        
        id_record = blockchain.digital_ids[digital_id]
        
        # Return public information only
        public_info = {
            'exists': True,
            'digital_id': digital_id,
            'id_type': id_record['id_type'],
            'status': id_record['status'],
            'created_at': id_record['created_at'],
            'expires_at': id_record['expires_at'],
            'verification_level': id_record['verification_level'],
            'blockchain_hash': blockchain.hash_data(id_record)
        }
        
        if digital_id in blockchain.revoked_ids:
            public_info['revoked_at'] = id_record.get('revoked_at')
            
        return jsonify(public_info)
        
    except Exception as e:
        logger.error(f"Get ID info error: {e}")
        return jsonify({'error': 'Failed to retrieve ID information', 'details': str(e)}), 500

@app.route('/revoke', methods=['POST'])
def revoke_digital_id():
    """Revoke a digital ID"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        digital_id = data.get('digital_id')
        reason = data.get('reason')
        revoked_by = data.get('revoked_by')
        
        if not all([digital_id, reason, revoked_by]):
            return jsonify({'error': 'Missing required fields: digital_id, reason, revoked_by'}), 400
        
        success = blockchain.revoke_digital_id(digital_id, reason, revoked_by)
        
        if success:
            return jsonify({
                'revoked': True,
                'digital_id': digital_id,
                'revoked_at': datetime.now().isoformat(),
                'blockchain_hash': blockchain.hash_data({'revocation': True, 'timestamp': time.time()}),
                'revocation_id': f"REV-{int(time.time())}"
            })
        else:
            return jsonify({'error': 'Failed to revoke digital ID'}), 400
        
    except Exception as e:
        logger.error(f"Revoke ID error: {e}")
        return jsonify({'error': 'Failed to revoke digital ID', 'details': str(e)}), 500

@app.route('/batch-verify', methods=['POST'])
def batch_verify():
    """Batch verify multiple digital IDs"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        digital_ids = data.get('digital_ids', [])
        if not digital_ids or not isinstance(digital_ids, list):
            return jsonify({'error': 'digital_ids must be a non-empty array'}), 400
        
        if len(digital_ids) > 10:  # Limit batch size
            return jsonify({'error': 'Maximum 10 IDs per batch'}), 400
        
        start_time = time.time()
        results = []
        verified_count = 0
        failed_count = 0
        
        for digital_id in digital_ids:
            try:
                result = blockchain.verify_digital_id(digital_id)
                result['digital_id'] = digital_id
                results.append(result)
                
                if result.get('verified', False):
                    verified_count += 1
                else:
                    failed_count += 1
                    
            except Exception as e:
                results.append({
                    'digital_id': digital_id,
                    'verified': False,
                    'error': str(e)
                })
                failed_count += 1
        
        processing_time = time.time() - start_time
        
        return jsonify({
            'results': results,
            'verified_count': verified_count,
            'failed_count': failed_count,
            'processing_time': processing_time
        })
        
    except Exception as e:
        logger.error(f"Batch verify error: {e}")
        return jsonify({'error': 'Failed to perform batch verification', 'details': str(e)}), 500

@app.route('/stats', methods=['GET'])
def get_blockchain_stats():
    """Get blockchain statistics"""
    try:
        stats = blockchain.get_blockchain_stats()
        
        # Add additional statistics
        now = datetime.now()
        today_ids = 0
        
        for id_record in blockchain.digital_ids.values():
            created_at = datetime.fromisoformat(id_record['created_at'])
            if created_at.date() == now.date():
                today_ids += 1
        
        extended_stats = {
            **stats,
            'ids_created_today': today_ids,
            'avg_verification_time': random.uniform(0.5, 2.0),  # Mock stat
            'network_status': 'healthy',
            'last_block_time': blockchain.get_latest_block().timestamp if blockchain.chain else None
        }
        
        return jsonify(extended_stats)
        
    except Exception as e:
        logger.error(f"Stats error: {e}")
        return jsonify({'error': 'Failed to retrieve statistics', 'details': str(e)}), 500

@app.route('/mine', methods=['POST'])
def mine_block():
    """Manually trigger block mining (for testing)"""
    try:
        block = blockchain.mine_pending_transactions()
        
        if block:
            return jsonify({
                'message': 'Block mined successfully',
                'block': {
                    'index': block.index,
                    'hash': block.hash,
                    'transactions': len(block.transactions),
                    'timestamp': block.timestamp
                }
            })
        else:
            return jsonify({'message': 'No pending transactions to mine'})
            
    except Exception as e:
        logger.error(f"Mining error: {e}")
        return jsonify({'error': 'Failed to mine block', 'details': str(e)}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    try:
        host = os.getenv('HOST', 'localhost')
        port = int(os.getenv('PORT', 7000))
        debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
        
        logger.info(f"🔗 Starting Blockchain Service on {host}:{port}")
        logger.info(f"📚 API Documentation: http://{host}:{port}/")
        logger.info(f"❤️ Health Check: http://{host}:{port}/health")
        
        app.run(host=host, port=port, debug=debug)
        
    except Exception as e:
        logger.error(f"Failed to start blockchain service: {e}")
        raise
