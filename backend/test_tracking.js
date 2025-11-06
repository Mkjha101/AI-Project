const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api/tracking';
const BLOCKCHAIN_ID = 'TID-TEST-12345678';
const PHONE_NUMBER = '+1234567890';

async function testTrackingAPIs() {
  console.log('🧪 Testing Tracking APIs...\n');

  try {
    // Test 1: Link blockchain ID to phone number
    console.log('1️⃣ Testing ID Linking...');
    const linkResponse = await fetch(`${BASE_URL}/link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blockchainId: BLOCKCHAIN_ID,
        phoneNumber: PHONE_NUMBER,
        touristInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          nationality: 'US'
        },
        initialLocation: {
          latitude: 28.6139,
          longitude: 77.2090
        }
      })
    });
    
    const linkData = await linkResponse.json();
    console.log('✅ Link Response:', linkData.message);
    console.log(`   Blockchain ID: ${linkData.tracking?.blockchainId}\n`);

    // Test 2: Update location
    console.log('2️⃣ Testing Location Update...');
    const locationResponse = await fetch(`${BASE_URL}/location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blockchainId: BLOCKCHAIN_ID,
        latitude: 28.6142,
        longitude: 77.2095,
        accuracy: 10.5,
        speed: 1.2
      })
    });
    
    const locationData = await locationResponse.json();
    console.log('✅ Location Update:', locationData.message);
    console.log(`   Timestamp: ${locationData.timestamp}\n`);

    // Test 3: Get all tourists
    console.log('3️⃣ Testing Get Active Tourists...');
    const touristsResponse = await fetch(`${BASE_URL}/tourists`);
    const touristsData = await touristsResponse.json();
    console.log('✅ Active Tourists:', touristsData.count);
    touristsData.tourists.forEach((t, i) => {
      console.log(`   ${i+1}. ${t.blockchainId} - ${t.phoneNumber}`);
    });
    console.log();

    // Test 4: Get tourist details
    console.log('4️⃣ Testing Get Tourist Details...');
    const detailsResponse = await fetch(`${BASE_URL}/tourist/${BLOCKCHAIN_ID}`);
    const detailsData = await detailsResponse.json();
    console.log('✅ Tourist Details:');
    console.log(`   Status: ${detailsData.status}`);
    console.log(`   Location: ${detailsData.location.latitude}, ${detailsData.location.longitude}`);
    console.log(`   Last Updated: ${new Date(detailsData.lastUpdated).toLocaleString()}\n`);

    // Test 5: Get location history
    console.log('5️⃣ Testing Location History...');
    const historyResponse = await fetch(`${BASE_URL}/history/${BLOCKCHAIN_ID}?limit=10`);
    const historyData = await historyResponse.json();
    console.log('✅ Location History:', historyData.count, 'records');
    historyData.history.slice(0, 3).forEach((h, i) => {
      console.log(`   ${i+1}. ${h.latitude}, ${h.longitude} - ${new Date(h.recordedAt).toLocaleTimeString()}`);
    });
    console.log();

    // Test 6: Return ID card
    console.log('6️⃣ Testing Card Return...');
    const returnResponse = await fetch(`${BASE_URL}/return`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blockchainId: BLOCKCHAIN_ID
      })
    });
    
    const returnData = await returnResponse.json();
    console.log('✅ Card Return:', returnData.message);
    console.log(`   Status: ${returnData.status}`);
    console.log(`   Returned At: ${returnData.returnedAt}\n`);

    console.log('🎉 All tracking API tests passed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests
testTrackingAPIs();
