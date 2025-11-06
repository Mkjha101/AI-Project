'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Users, Briefcase, MapPin, Activity, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user?.name}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Tourists</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">248</p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On-Duty Officers</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">42</p>
                </div>
                <Briefcase className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Geofence Alerts</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12</p>
                </div>
                <MapPin className="w-12 h-12 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Incidents</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">3</p>
                </div>
                <Activity className="w-12 h-12 text-red-500" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                href="/admin/tourists"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors group"
              >
                <Users className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Manage Tourists</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and track active tourists</p>
              </Link>

              <Link
                href="/admin/officers"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors group"
              >
                <Briefcase className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Manage Officers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Officer management & IDs</p>
              </Link>

              <Link
                href="/admin/attendance"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors group"
              >
                <Activity className="w-8 h-8 text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Attendance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track officer attendance</p>
              </Link>

              <Link
                href="/admin-dashboard"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors group"
              >
                <MapPin className="w-8 h-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Live Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Real-time location monitoring</p>
              </Link>
            </div>
          </div>

          {/* Location Info */}
          {user?.assignedLocation && (
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Your Assigned Location</h2>
              <p className="text-lg">{user.assignedLocation.name}</p>
              <p className="text-sm opacity-90">{user.assignedLocation.region}, {user.assignedLocation.state}</p>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
