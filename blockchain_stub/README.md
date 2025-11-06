# Blockchain Digital ID Service

## Overview
This service simulates a blockchain-based digital identity verification system for tourists. It provides secure digital ID creation, verification, and management capabilities using cryptographic techniques and a simplified blockchain structure.

## Features

### 🔐 Core Blockchain Features
- **Proof of Work Mining**: Simple blockchain with configurable difficulty
- **Cryptographic Security**: RSA key pair generation for secure IDs
- **Block Chain Integrity**: Linked blocks with hash verification
- **Transaction Management**: Track all ID operations with timestamps

### 🆔 Digital ID Management
- **ID Creation**: Generate unique tourist digital IDs with QR codes
- **Verification**: Validate digital IDs against blockchain records
- **Revocation**: Secure ID revocation with audit trails
- **Batch Operations**: Verify multiple IDs efficiently

### 📊 Monitoring & Analytics
- **Real-time Statistics**: Track total IDs, active IDs, and blockchain metrics
- **Health Monitoring**: Service health checks and status reporting
- **Audit Trails**: Complete history of ID operations

## API Endpoints

### Health & Info
```
GET  /              # Service information
GET  /health        # Health check with blockchain stats
```

### Digital ID Operations
```
POST /create-id     # Create new digital ID
POST /verify        # Verify digital ID
POST /batch-verify  # Verify multiple IDs
GET  /id/{id}       # Get digital ID information
POST /revoke        # Revoke digital ID
```

### Blockchain Operations
```
POST /mine          # Mine a new block manually
GET  /stats         # Get blockchain statistics
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Dependencies
```bash
pip install flask flask-cors cryptography qrcode[pil] pillow
```

### Alternative Installation (if some packages fail)
```bash
# Core dependencies only (blockchain will work with reduced features)
pip install flask flask-cors

# Optional: For full QR code and crypto features
pip install cryptography qrcode[pil] pillow
```

## Running the Service

### Start the Server
```bash
cd blockchain_stub
python blockchain_server.py
```

The service will start on `http://localhost:7000`

### Expected Output
```
🔗 Blockchain Digital ID Service Starting...
 * Running on http://127.0.0.1:7000
 * Debug mode: on
📋 Service ready - Blockchain initialized with genesis block
🔑 Cryptographic features: Enabled/Disabled (based on dependencies)
📱 QR Code generation: Enabled/Disabled (based on dependencies)
```

## Testing

### Run Comprehensive Tests
```bash
# Make sure the service is running first
python test_blockchain.py
```

### Manual API Testing

#### 1. Create Digital ID
```bash
curl -X POST http://localhost:7000/create-id \
  -H "Content-Type: application/json" \
  -d '{
    "user_data": {
      "firstName": "John",
      "lastName": "Tourist",
      "email": "john@example.com",
      "nationality": "USA"
    },
    "id_type": "tourist_id"
  }'
```

Response:
```json
{
  "message": "Digital ID created successfully",
  "digital_id": "TID-20241201-ABC123",
  "blockchain_hash": "000abc123...",
  "qr_code": "data:image/png;base64,iVBOR..."
}
```

#### 2. Verify Digital ID
```bash
curl -X POST http://localhost:7000/verify \
  -H "Content-Type: application/json" \
  -d '{
    "digital_id": "TID-20241201-ABC123",
    "user_data": {
      "firstName": "John",
      "lastName": "Tourist"
    }
  }'
```

Response:
```json
{
  "verified": true,
  "confidence": 0.95,
  "status": "active",
  "message": "Digital ID verified successfully"
}
```

#### 3. Get Statistics
```bash
curl http://localhost:7000/stats
```

Response:
```json
{
  "total_ids": 5,
  "active_ids": 4,
  "revoked_ids": 1,
  "blockchain_height": 3,
  "last_block_time": "2024-12-01T10:30:00Z"
}
```

## Digital ID Format

### ID Structure
- **Format**: `TID-YYYYMMDD-XXXXXX`
- **TID**: Tourist ID prefix
- **YYYYMMDD**: Creation date
- **XXXXXX**: Random 6-character suffix

### Example IDs
```
TID-20241201-A1B2C3  # Tourist ID created on Dec 1, 2024
TID-20241201-X9Y8Z7  # Another ID from same day
```

## Blockchain Structure

### Block Format
```json
{
  "index": 1,
  "timestamp": "2024-12-01T10:30:00Z",
  "transactions": [...],
  "previous_hash": "000abc123...",
  "nonce": 12345,
  "hash": "000def456..."
}
```

### Transaction Format
```json
{
  "type": "create_id",
  "digital_id": "TID-20241201-ABC123",
  "user_hash": "sha256_hash_of_user_data",
  "timestamp": "2024-12-01T10:30:00Z",
  "metadata": {...}
}
```

## Security Features

### Cryptographic Protection
- **RSA Key Pairs**: 2048-bit keys for each digital ID
- **Hash Functions**: SHA-256 for data integrity
- **Proof of Work**: Mining difficulty prevents tampering
- **Digital Signatures**: Secure transaction signing

### Data Privacy
- **Hash Storage**: Only hashed user data stored on blockchain
- **Minimal Data**: Store only necessary verification information
- **Revocation Support**: Secure ID invalidation process

## Integration with Main Backend

### Environment Variables (in backend .env)
```env
BLOCKCHAIN_SERVICE_URL=http://localhost:7000
BLOCKCHAIN_SERVICE_TIMEOUT=30000
```

### Backend Integration Example
```javascript
// In backend/routes/blockchain.js
const blockchainService = axios.create({
  baseURL: process.env.BLOCKCHAIN_SERVICE_URL || 'http://localhost:7000',
  timeout: 30000
});

// Create digital ID
const response = await blockchainService.post('/create-id', {
  user_data: userData,
  id_type: 'tourist_id'
});
```

## Troubleshooting

### Common Issues

#### 1. ImportError: No module named 'cryptography'
```bash
# Install cryptography
pip install cryptography

# OR run with reduced features (no RSA keys)
# Service will work but with simplified security
```

#### 2. Service won't start on port 7000
```bash
# Check if port is in use
netstat -an | findstr :7000

# Kill process using port (Windows)
netstat -ano | findstr :7000
taskkill /PID <PID> /F

# Or change port in blockchain_server.py
app.run(host='0.0.0.0', port=7001, debug=True)
```

#### 3. Connection refused from backend
```bash
# Make sure blockchain service is running
python blockchain_server.py

# Check firewall/antivirus isn't blocking port 7000
# Verify backend BLOCKCHAIN_SERVICE_URL is correct
```

### Performance Considerations

#### Mining Difficulty
- **Default**: Difficulty 2 (fast for demo)
- **Adjust**: Change `difficulty` in blockchain_server.py
- **Production**: Increase difficulty for security

#### Memory Usage
- **Blockchain Growth**: Stores all blocks in memory
- **ID Limits**: Consider database for production
- **Cleanup**: Implement block pruning if needed

## Production Deployment Notes

### Security Enhancements Needed
- [ ] Database persistence (replace in-memory storage)
- [ ] Advanced cryptographic schemes
- [ ] Network security (HTTPS, API keys)
- [ ] Rate limiting and DDoS protection
- [ ] Audit logging and monitoring

### Scalability Improvements
- [ ] Distributed blockchain network
- [ ] Database sharding for large ID volumes
- [ ] Caching layer for frequent verifications
- [ ] Load balancing for high availability

## Development & Customization

### Adding New ID Types
```python
# In blockchain_server.py
ID_TYPES = {
    'tourist_id': 'TID',
    'guide_id': 'GID',      # Add new ID type
    'vendor_id': 'VID'      # Add another type
}
```

### Custom Verification Logic
```python
# Extend verify_digital_id method
def custom_verification(self, digital_id, user_data):
    # Add custom business logic
    # Return verification result
    pass
```

### Monitoring Integration
```python
# Add metrics collection
from prometheus_client import Counter, Histogram

id_created_counter = Counter('digital_ids_created_total')
verification_histogram = Histogram('id_verification_duration_seconds')
```

## API Response Examples

### Success Responses
All successful API calls return appropriate HTTP status codes (200, 201) with JSON responses containing the requested data and relevant metadata.

### Error Responses
```json
{
  "error": "Digital ID not found",
  "digital_id": "TID-20241201-INVALID",
  "timestamp": "2024-12-01T10:30:00Z"
}
```

## License & Usage

This blockchain service is part of the Smart Tourist Safety System demo project. It's designed for educational and demonstration purposes. For production use, implement proper security measures and consider regulatory compliance requirements.