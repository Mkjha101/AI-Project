// Simple test script for the Smart Tourist Safety Backend
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function runTests() {
    console.log('🧪 Starting Backend Tests...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Health Check...');
        const healthResponse = await axios.get(`${BASE_URL}/api/health`);
        console.log('✅ Health check passed:', healthResponse.data.status);

        // Test 2: API Documentation
        console.log('\n2️⃣ Testing API Documentation...');
        const docsResponse = await axios.get(`${BASE_URL}/api/docs`);
        console.log('✅ API docs available:', docsResponse.data.title);

        // Test 3: Auth Test
        console.log('\n3️⃣ Testing Auth Service...');
        const authTestResponse = await axios.get(`${BASE_URL}/api/auth/test`);
        console.log('✅ Auth service:', authTestResponse.data.message);

        // Test 4: User Registration
        console.log('\n4️⃣ Testing User Registration...');
        const userData = {
            username: `testuser_${Date.now()}`,
            email: `test_${Date.now()}@example.com`,
            password: 'testpassword123',
            role: 'operator',
            profile: {
                firstName: 'Test',
                lastName: 'User'
            }
        };

        const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, userData);
        const authToken = registerResponse.data.token;
        console.log('✅ User registered:', registerResponse.data.user.username);

        // Test 5: User Login
        console.log('\n5️⃣ Testing User Login...');
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
            email: userData.email,
            password: userData.password
        });
        console.log('✅ User login successful:', loginResponse.data.user.username);

        // Test 6: AI Service Test
        console.log('\n6️⃣ Testing AI Service Connection...');
        const aiTestResponse = await axios.get(`${BASE_URL}/api/ai/test`);
        console.log('✅ AI service test:', aiTestResponse.data.aiService.status);

        // Test 7: Blockchain Service Test
        console.log('\n7️⃣ Testing Blockchain Service Connection...');
        const blockchainTestResponse = await axios.get(`${BASE_URL}/api/blockchain/test`);
        console.log('✅ Blockchain service test:', blockchainTestResponse.data.blockchainService.status);

        // Test 8: Create Incident
        console.log('\n8️⃣ Testing Incident Creation...');
        const incidentData = {
            title: 'Test Incident',
            description: 'This is a test incident for system validation',
            type: 'crowd_overcrowding',
            severity: 'medium',
            location: {
                coordinates: [-74.006, 40.7128], // New York coordinates
                address: '123 Test Street, Test City'
            }
        };

        const incidentResponse = await axios.post(`${BASE_URL}/api/incidents`, incidentData, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Incident created:', incidentResponse.data.data.incident.title);

        // Test 9: Dashboard Stats
        console.log('\n9️⃣ Testing Dashboard Statistics...');
        const statsResponse = await axios.get(`${BASE_URL}/api/dashboard/stats`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Dashboard stats retrieved:', `${statsResponse.data.data.overview.totalIncidents} incidents`);

        // Test 10: Geofence Check
        console.log('\n🔟 Testing Geofence Check...');
        const geofenceResponse = await axios.post(`${BASE_URL}/api/geofence/check`, {
            latitude: 40.7128,
            longitude: -74.006
        });
        console.log('✅ Geofence check completed:', geofenceResponse.data.data.inGeofence ? 'Inside geofence' : 'Outside geofences');

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📋 Test Summary:');
        console.log('   ✅ Health Check');
        console.log('   ✅ API Documentation');
        console.log('   ✅ Authentication Service');
        console.log('   ✅ User Registration');
        console.log('   ✅ User Login');
        console.log('   ✅ AI Service Connection');
        console.log('   ✅ Blockchain Service Connection');
        console.log('   ✅ Incident Management');
        console.log('   ✅ Dashboard Statistics');
        console.log('   ✅ Geofence Operations');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        if (error.response) {
            console.error('   Response status:', error.response.status);
            console.error('   Response data:', error.response.data);
        }
        console.error('\n💡 Make sure the backend server is running on port 5000');
        console.error('   Start it with: npm start');
    }
}

// Run tests if script is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { runTests };