'use client';

import { useState } from 'react';
import { CreditCard, Phone, User, Mail, Globe, Loader, CheckCircle, XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import QRScanner to avoid SSR issues
const QRScanner = dynamic(() => import('@/components/QRScanner'), { ssr: false });

export default function IssueIDCardPage() {
  const [step, setStep] = useState<'scan' | 'form' | 'processing' | 'success'>('scan');
  const [blockchainId, setBlockchainId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [touristName, setTouristName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [error, setError] = useState('');
  const [issuedData, setIssuedData] = useState<any>(null);

  const handleQRScan = (decodedText: string) => {
    try {
      // Parse QR code data (expecting blockchain ID)
      // Format: TID-XXXXXX-XXXXXXXX
      if (decodedText.startsWith('TID-')) {
        setBlockchainId(decodedText);
        setStep('form');
        setError('');
      } else {
        setError('Invalid QR code format. Expected blockchain ID.');
      }
    } catch (err) {
      setError('Failed to parse QR code data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/tracking/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blockchainId,
          phoneNumber,
          touristInfo: {
            name: touristName,
            email,
            nationality
          },
          initialLocation: {
            latitude: 28.6139,
            longitude: 77.2090 // Default location (can be replaced with actual GPS)
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIssuedData(data);
        setStep('success');
      } else {
        throw new Error(data.error || 'Failed to issue ID card');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to issue ID card');
      setStep('form');
    }
  };

  const resetForm = () => {
    setStep('scan');
    setBlockchainId('');
    setPhoneNumber('');
    setTouristName('');
    setEmail('');
    setNationality('');
    setError('');
    setIssuedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <CreditCard className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            Issue Tourist ID Card
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Scan QR code and register tourist information</p>
        </div>

        {/* Step 1: Scan QR Code */}
        {step === 'scan' && (
          <QRScanner
            onScanSuccess={handleQRScan}
            onScanError={(err) => setError(err)}
          />
        )}

        {/* Step 2: Tourist Information Form */}
        {step === 'form' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Tourist Information</h2>
                <button
                  onClick={resetForm}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Scan Different QR
                </button>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-900">
                  <span className="font-medium">Blockchain ID:</span>{' '}
                  <span className="font-mono">{blockchainId}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input-field"
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={touristName}
                  onChange={(e) => setTouristName(e.target.value)}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="tourist@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Nationality *
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="input-field"
                  placeholder="United States"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-900 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Issue ID Card
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h2>
            <p className="text-gray-600">Issuing ID card and activating tracking</p>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">ID Card Issued Successfully!</h2>
              <p className="text-gray-600">Tourist tracking is now active</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Blockchain ID:</span>
                <span className="font-mono font-medium">{blockchainId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-medium">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tourist Name:</span>
                <span className="font-medium">{touristName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nationality:</span>
                <span className="font-medium">{nationality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Issue Another ID Card
              </button>
              <a
                href="/admin-dashboard"
                className="block w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
              >
                View Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
