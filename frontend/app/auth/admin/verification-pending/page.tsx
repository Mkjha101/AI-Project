'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

export default function AdminVerificationPendingPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const username = searchParams.get('username') || '';

  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleResendVerification = async () => {
    setResending(true);
    setError('');
    setResendSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/auth/v2/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'admin' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email');
      }

      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to resend email. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">Admin account verification</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">Verification email sent to:</p>
                <p className="font-mono bg-white px-2 py-1 rounded">{email}</p>
                {username && (
                  <>
                    <p className="font-semibold mt-3 mb-1">Your username:</p>
                    <p className="font-mono bg-white px-2 py-1 rounded">{username}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Your verification link will expire in <strong>3 days</strong>.
              Please verify your email before the deadline to activate your admin account.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-purple-600">1</span>
              </div>
              <p className="text-sm text-gray-700">Check your email inbox (and spam folder)</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-purple-600">2</span>
              </div>
              <p className="text-sm text-gray-700">Click the verification link in the email</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-purple-600">3</span>
              </div>
              <p className="text-sm text-gray-700">Log in and set up your tourist place region on the map</p>
            </div>
          </div>

          {resendSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-sm text-green-800 font-medium">
                Verification email resent successfully!
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            onClick={handleResendVerification}
            disabled={resending}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {resending ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Resending...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Resend Verification Email
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Already verified your email?
            </p>
            <Link
              href="/auth/admin/login"
              className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
