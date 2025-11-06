'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { User, Users, Phone, MapPin, AlertCircle, LogOut, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function TouristDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['tourist']}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tourist Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hello, {user?.name}! {user?.username && `(@${user.username})`}</p>
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
          {/* Blockchain ID Card */}
          {user?.blockchainId ? (
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-sm p-6 text-white mb-8">
              <h2 className="text-xl font-bold mb-2">Your Tourist ID Card</h2>
              <p className="text-lg font-mono">{user.blockchainId}</p>
              <p className="text-sm opacity-90 mt-1">Active Visit - Keep this safe!</p>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">No Active Visit</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Visit the tourism office to get your ID card and start your journey!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/tourist/groups"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors group"
            >
              <Users className="w-10 h-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">My Groups</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create or join travel groups</p>
            </Link>

            <Link
              href="/tourist/chat"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors group"
            >
              <MessageCircle className="w-10 h-10 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Group Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Chat with group members</p>
            </Link>

            <Link
              href="/tourist/map"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors group"
            >
              <MapPin className="w-10 h-10 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Group Map</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track group members</p>
            </Link>

            <Link
              href="/tourist/emergency"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors group"
            >
              <Phone className="w-10 h-10 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Emergency</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Quick call & report</p>
            </Link>
          </div>

          {/* Emergency Services */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Emergency Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-500 transition-colors">
                <Phone className="w-6 h-6 text-red-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Police</p>
                <p className="text-xs text-gray-500">Emergency Call</p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-500 transition-colors">
                <Phone className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Hospital</p>
                <p className="text-xs text-gray-500">Medical Help</p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-500 transition-colors">
                <Phone className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Tourism</p>
                <p className="text-xs text-gray-500">Board Office</p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:border-orange-500 transition-colors">
                <AlertCircle className="w-6 h-6 text-orange-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Report</p>
                <p className="text-xs text-gray-500">Issue/Help</p>
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Profile</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                <span className="font-medium text-gray-900 dark:text-white">{user?.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Username:</span>
                <span className="font-medium text-gray-900 dark:text-white">{user?.username}</span>
              </div>
              <div className="pt-4">
                <Link
                  href="/tourist/profile/edit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-block"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
