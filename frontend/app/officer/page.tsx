'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Users, MapPin, Phone, LogOut, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OfficerDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['tourism-officer']}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Officer Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user?.name}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ID Card Status */}
          {user?.blockchainId && (
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-sm p-6 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Your ID Card</h2>
                  <p className="text-lg font-mono">{user.blockchainId}</p>
                  <p className="text-sm opacity-90 mt-1">Officer ID: {user.officerId}</p>
                </div>
                <CheckCircle className="w-16 h-16 opacity-80" />
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Tourists</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">156</p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Colleagues On-Duty</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">28</p>
                </div>
                <Briefcase className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alerts Today</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">7</p>
                </div>
                <MapPin className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/officer/tourists"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors group"
            >
              <MapPin className="w-10 h-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tourist Map</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View active tourists with blockchain IDs</p>
            </Link>

            <Link
              href="/officer/colleagues"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors group"
            >
              <Users className="w-10 h-10 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Colleague Directory</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contact fellow officers</p>
            </Link>

            <Link
              href="/officer/attendance"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors group"
            >
              <CheckCircle className="w-10 h-10 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Duty Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check-in/out and view history</p>
            </Link>
          </div>

          {/* Attendance Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Attendance</h2>
            <div className="space-y-4">
              <Link 
                href="/officer/attendance"
                className="inline-flex w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Manage Attendance
              </Link>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">Status:</span> Off Duty
                </div>
                <div>
                  <span className="font-medium">Last Check-in:</span> N/A
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
