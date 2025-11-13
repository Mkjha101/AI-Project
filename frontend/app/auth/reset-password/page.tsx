'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const type = searchParams.get('type') || 'tourist';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.password) {
      setError('Password is required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/v2/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: formData.password,
          type
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        const loginPaths: { [key: string]: string } = {
          tourist: '/auth/tourist/login',
          officer: '/auth/officer/login',
          admin: '/auth/admin/login'
        };
        router.push(loginPaths[type] || '/auth/tourist/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getColorScheme = () => {
    switch (type) {
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

  if (success) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center px-4`}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center px-4`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 ${colors.icon} rounded-full flex items-center justify-center mb-4`}>
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your new password</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!token ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">Invalid or missing reset token. Please request a new password reset link.</p>
            <Link
              href="/auth/forgot-password"
              className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Forgot Password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setError('');
                }}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${colors.ring} focus:border-transparent`}
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  setError('');
                }}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${colors.ring} focus:border-transparent`}
                placeholder="Re-enter your new password"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                Password must be at least 8 characters long. Use a mix of letters, numbers, and special characters for better security.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
