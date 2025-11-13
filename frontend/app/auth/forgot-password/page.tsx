'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userType, setUserType] = useState(searchParams.get('type') || 'tourist');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      setError('Captcha answer is incorrect');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/v2/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
      setEmail('');
      setCaptchaAnswer('');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getLoginLink = () => {
    switch (userType) {
      case 'tourist':
        return '/auth/tourist/login';
      case 'officer':
        return '/auth/officer/login';
      case 'admin':
        return '/auth/admin/login';
      default:
        return '/auth/tourist/login';
    }
  };

  const getColorScheme = () => {
    switch (userType) {
      case 'tourist':
        return { bg: 'from-blue-50 to-cyan-100', button: 'bg-blue-600 hover:bg-blue-700', ring: 'focus:ring-blue-500', icon: 'bg-blue-100 text-blue-600' };
      case 'officer':
        return { bg: 'from-amber-50 to-orange-100', button: 'bg-amber-600 hover:bg-amber-700', ring: 'focus:ring-amber-500', icon: 'bg-amber-100 text-amber-600' };
      case 'admin':
        return { bg: 'from-purple-50 to-pink-100', button: 'bg-purple-600 hover:bg-purple-700', ring: 'focus:ring-purple-500', icon: 'bg-purple-100 text-purple-600' };
      default:
        return { bg: 'from-blue-50 to-cyan-100', button: 'bg-blue-600 hover:bg-blue-700', ring: 'focus:ring-blue-500', icon: 'bg-blue-100 text-blue-600' };
    }
  };

  const colors = getColorScheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center px-4`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 ${colors.icon} rounded-full flex items-center justify-center mb-4`}>
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to reset your password</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="tourist">Tourist</option>
            <option value="officer">Tourism Officer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">Reset link sent!</p>
              <p>Check your email for instructions to reset your password. The link will expire in 1 hour.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${colors.ring} focus:border-transparent`}
              placeholder="Enter your registered email"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Security Check <span className="text-red-500">*</span>
            </label>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              What is {num1} + {num2}?
            </p>
            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => {
                setCaptchaAnswer(e.target.value);
                setError('');
              }}
              className={`w-32 px-4 py-2 border border-gray-300 rounded-lg ${colors.ring} focus:border-transparent`}
              placeholder="Answer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Remember your password?</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href={getLoginLink()}
              className="inline-block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {userType === 'admin' && (
          <div className="mt-6 text-center">
            <Link
              href="/auth/admin/forgot-username"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot username? Click here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
