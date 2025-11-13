'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Clock, RefreshCw, CheckCircle, AlertCircle, Shield } from 'lucide-react';

export default function OfficerVerificationPendingPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResend = async () => {
    setResending(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/v2/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'officer' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend email');
      }

      setMessage('Verification email sent successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Pending
          </h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              Your account is pending verification. Please complete the following steps:
            </p>
            <ol className="text-sm text-gray-700 text-left list-decimal list-inside space-y-1">
              <li>Verify your email address</li>
              <li>Wait for admin approval</li>
            </ol>
          </div>

          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Verification email sent to:</p>
                <p className="text-sm text-green-600 break-all">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  You have <span className="font-semibold">3 days</span> to verify your email.
                  After that, your registration will be removed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  After email verification, an admin will review and approve your account.
                </p>
              </div>
            </div>
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {resending ? 'Sending...' : 'Resend Verification Email'}
          </button>

          <div className="mt-6 text-sm text-gray-600">
            <p>Check your spam folder if you don't see the email.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help? Contact support at{' '}
              <a href="mailto:support@saarthiai.com" className="text-green-600 hover:underline">
                support@saarthiai.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
