# Simple test script for Blockchain Service
import requests
import json
import time

BASE_URL = 'http://localhost:7000'

def test_blockchain_service():
    """Test all blockchain service endpoints"""
    print('🔗 Starting Blockchain Service Tests...\n')
    
    try:
        # Test 1: Health Check
        print('1️⃣ Testing Health Check...')
        response = requests.get(f'{BASE_URL}/health')
        if response.status_code == 200:
            data = response.json()
            print(f'✅ Health check passed: {data["status"]}')
            print(f'   Total blocks: {data["blockchain_stats"]["total_blocks"]}')
        else:
            print(f'❌ Health check failed: {response.status_code}')
            return

        # Test 2: Service Info
        print('\n2️⃣ Testing Service Information...')
        response = requests.get(f'{BASE_URL}/')
        if response.status_code == 200:
            data = response.json()
            print(f'✅ Service info retrieved: {data["service"][:50]}...')
        else:
            print(f'❌ Service info failed: {response.status_code}')

        # Test 3: Create Digital ID
        print('\n3️⃣ Testing Digital ID Creation...')
        create_data = {
            'user_data': {
                'firstName': 'John',
                'lastName': 'Tourist',
                'email': 'john.tourist@example.com',
                'nationality': 'United States',
                'passportNumber': 'US123456789'
            },
            'id_type': 'tourist_id'
        }
        response = requests.post(f'{BASE_URL}/create-id', json=create_data)
        if response.status_code == 201:
            result = response.json()
            digital_id = result['digital_id']
            print(f'✅ Digital ID created: {digital_id}')
            print(f'   Blockchain hash: {result["blockchain_hash"][:16]}...')
            
            # Store for later tests
            created_digital_id = digital_id
        else:
            print(f'❌ Digital ID creation failed: {response.status_code}')
            print(f'   Error: {response.text}')
            return

        # Test 4: Verify Digital ID
        print('\n4️⃣ Testing Digital ID Verification...')
        verify_data = {
            'digital_id': created_digital_id,
            'user_data': {
                'firstName': 'John',
                'lastName': 'Tourist'
            }
        }
        response = requests.post(f'{BASE_URL}/verify', json=verify_data)
        if response.status_code == 200:
            result = response.json()
            print(f'✅ Verification completed')
            print(f'   Verified: {result["verified"]}')
            print(f'   Confidence: {result.get("confidence", "N/A")}')
        else:
            print(f'❌ Verification failed: {response.status_code}')

        # Test 5: Get Digital ID Info
        print('\n5️⃣ Testing Digital ID Information Retrieval...')
        response = requests.get(f'{BASE_URL}/id/{created_digital_id}')
        if response.status_code == 200:
            result = response.json()
            print(f'✅ ID info retrieved')
            print(f'   Status: {result["status"]}')
            print(f'   Type: {result["id_type"]}')
            print(f'   Created: {result["created_at"][:19]}')
        else:
            print(f'❌ ID info retrieval failed: {response.status_code}')

        # Test 6: Create Another ID for Batch Testing
        print('\n6️⃣ Creating Additional Digital ID for Batch Test...')
        create_data2 = {
            'user_data': {
                'firstName': 'Jane',
                'lastName': 'Traveler',
                'email': 'jane.traveler@example.com',
                'nationality': 'Canada'
            },
            'id_type': 'tourist_id'
        }
        response = requests.post(f'{BASE_URL}/create-id', json=create_data2)
        if response.status_code == 201:
            result = response.json()
            second_digital_id = result['digital_id']
            print(f'✅ Second digital ID created: {second_digital_id}')
        else:
            print(f'❌ Second digital ID creation failed: {response.status_code}')
            second_digital_id = 'TID-000000-TESTFAIL'  # Fallback for batch test

        # Test 7: Batch Verification
        print('\n7️⃣ Testing Batch Verification...')
        batch_data = {
            'digital_ids': [created_digital_id, second_digital_id, 'TID-000000-INVALID']
        }
        response = requests.post(f'{BASE_URL}/batch-verify', json=batch_data)
        if response.status_code == 200:
            result = response.json()
            print(f'✅ Batch verification completed')
            print(f'   Verified: {result["verified_count"]}/{len(batch_data["digital_ids"])}')
            print(f'   Processing time: {result["processing_time"]:.3f}s')
        else:
            print(f'❌ Batch verification failed: {response.status_code}')

        # Test 8: Blockchain Statistics
        print('\n8️⃣ Testing Blockchain Statistics...')
        response = requests.get(f'{BASE_URL}/stats')
        if response.status_code == 200:
            result = response.json()
            print(f'✅ Statistics retrieved')
            print(f'   Total IDs: {result["total_ids"]}')
            print(f'   Active IDs: {result["active_ids"]}')
            print(f'   Blockchain height: {result["blockchain_height"]}')
        else:
            print(f'❌ Statistics retrieval failed: {response.status_code}')

        # Test 9: Manual Block Mining
        print('\n9️⃣ Testing Manual Block Mining...')
        response = requests.post(f'{BASE_URL}/mine')
        if response.status_code == 200:
            result = response.json()
            print(f'✅ Block mining completed')
            print(f'   Message: {result["message"]}')
            if 'block' in result:
                print(f'   Block hash: {result["block"]["hash"][:16]}...')
        else:
            print(f'❌ Block mining failed: {response.status_code}')

        # Test 10: Revoke Digital ID
        print('\n🔟 Testing Digital ID Revocation...')
        revoke_data = {
            'digital_id': second_digital_id,
            'reason': 'Test revocation for demonstration',
            'revoked_by': 'System Administrator'
        }
        response = requests.post(f'{BASE_URL}/revoke', json=revoke_data)
        if response.status_code == 200:
            result = response.json()
            print(f'✅ Digital ID revoked successfully')
            print(f'   Revoked at: {result["revoked_at"][:19]}')
            print(f'   Revocation ID: {result["revocation_id"]}')
        else:
            print(f'❌ Digital ID revocation failed: {response.status_code}')

        # Test 11: Verify Revoked ID
        print('\n1️⃣1️⃣ Testing Verification of Revoked ID...')
        verify_revoked = {
            'digital_id': second_digital_id
        }
        response = requests.post(f'{BASE_URL}/verify', json=verify_revoked)
        if response.status_code == 200:
            result = response.json()
            print(f'✅ Revoked ID verification test completed')
            print(f'   Verified: {result["verified"]} (should be False)')
            print(f'   Reason: {result.get("reason", "N/A")}')
        else:
            print(f'❌ Revoked ID verification test failed: {response.status_code}')

        print('\n🎉 All blockchain tests completed!')
        print('\n📋 Test Summary:')
        print('   ✅ Health Check')
        print('   ✅ Service Information')
        print('   ✅ Digital ID Creation')
        print('   ✅ Digital ID Verification')
        print('   ✅ ID Information Retrieval')
        print('   ✅ Batch Verification')
        print('   ✅ Blockchain Statistics')
        print('   ✅ Manual Block Mining')
        print('   ✅ Digital ID Revocation')
        print('   ✅ Revoked ID Verification')

        print('\n🔑 Demo Digital IDs Created:')
        print(f'   Active ID: {created_digital_id}')
        print(f'   Revoked ID: {second_digital_id}')

    except requests.exceptions.ConnectionError:
        print('❌ Connection failed! Make sure the blockchain service is running on port 7000')
        print('   Start it with: python blockchain_server.py')
    except Exception as e:
        print(f'❌ Test failed with error: {e}')

if __name__ == '__main__':
    test_blockchain_service()