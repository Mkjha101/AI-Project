'use client';

import { Shield, Briefcase, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelectionPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'tourism-officer') {
        router.push('/officer');
      } else {
        router.push('/tourist');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Tourist Safety System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AI-powered monitoring and safety platform for tourists, tourism officers, and administrators
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Tourist Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-primary-500 transition-all group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Tourist</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Travel safely with real-time tracking, group features, and emergency services
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Get blockchain-based ID card</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Create/join travel groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Group chat & video calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Emergency services access</span>
                </li>
              </ul>
              <div className="space-y-3">
                <Link
                  href="/auth/tourist/login"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all"
                >
                  Login as Tourist
                </Link>
                <Link
                  href="/auth/tourist/signup"
                  className="block w-full px-6 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Tourism Officer Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-green-500 transition-all group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Tourism Officer</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Monitor tourists, manage attendance, and coordinate with colleagues
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>View tourist locations & IDs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Colleague directory & contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Mark attendance & duty status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Report incidents & alerts</span>
                </li>
              </ul>
              <div className="space-y-3">
                <Link
                  href="/auth/officer/login"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  Officer Login
                </Link>
              </div>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-red-500 transition-all group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Administrator</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Full control over location-specific monitoring and management
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-8 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Monitor all tourists & officers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Manage officer attendance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Issue & revoke ID cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Handle incidents & alerts</span>
                </li>
              </ul>
              <div className="space-y-3">
                <Link
                  href="/auth/admin/login"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-600 transition-all"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Blockchain Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure, tamper-proof ID cards for tourists and officers
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg mb-4">
                <User className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Live location monitoring for safety and coordination
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg mb-4">
                <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intelligent alerts, crowd analysis, and incident detection
              </p>
            </div>
          </div>
        </div>

        {/* Existing Dashboard Link */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          >
            View Public Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
