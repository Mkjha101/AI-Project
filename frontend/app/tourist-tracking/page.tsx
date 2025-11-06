'use client';

import TouristLocationTracker from '@/components/TouristLocationTracker';

export default function TouristTrackingPage() {
  // Demo values - in production, these would come from auth/blockchain
  const demoBlockchainId = 'TID-369226-DEMO001';
  const demoPhoneNumber = '+1234567890';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tourist Safety Tracking
          </h1>
          <p className="text-gray-600">
            Your location is monitored for your safety during your visit
          </p>
        </div>

        <TouristLocationTracker 
          blockchainId={demoBlockchainId}
          phoneNumber={demoPhoneNumber}
        />

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>When you receive your tourist ID card, your phone number is linked to a blockchain ID</li>
            <li>Your device shares location every 30 seconds with our secure system</li>
            <li>Tourism board monitors all visitors for safety</li>
            <li>In case of emergency or suspicious activity, authorities can respond quickly</li>
            <li>When you return your ID card, tracking stops and data is archived</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
