'use client';

import { useState, useEffect } from 'react';
import { Users, MapPin, AlertCircle, Clock, Activity, RefreshCw } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Tourist } from '@/types/tracking';
import GeofenceAlertPanel from './GeofenceAlertPanel';

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export default function TourismBoardDashboard() {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch active tourists
  const fetchTourists = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tracking/tourists?status=active');
      if (!response.ok) throw new Error('Failed to fetch tourists');
      
      const data = await response.json();
      setTourists(data.tourists || []);
      setLastRefresh(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Fetch tourists error:', error);
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchTourists();
    
    if (autoRefresh) {
      const interval = setInterval(fetchTourists, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Stats
  const stats = {
    totalActive: tourists.length,
    statusActive: tourists.filter(t => t.status === 'active').length,
    statusSuspicious: tourists.filter(t => t.status === 'suspicious').length,
    statusEmergency: tourists.filter(t => t.status === 'emergency').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tourism Board Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time tourist location monitoring</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                autoRefresh
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              Auto-Refresh {autoRefresh ? 'ON' : 'OFF'}
            </button>
            
            <button
              onClick={fetchTourists}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Now
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Active</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalActive}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.statusActive}</p>
              </div>
              <Activity className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Suspicious</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.statusSuspicious}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Emergency</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.statusEmergency}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Main Content - Map + List */}
        <div className="grid grid-cols-3 gap-6">
          {/* Live Map */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Live Tourist Tracking Map
            </h2>
            
            {loading ? (
              <div className="h-[600px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
                </div>
              </div>
            ) : (
              <LeafletMap
                tourists={tourists}
                selectedTourist={selectedTourist}
                onMarkerClick={(tourist) => setSelectedTourist(tourist)}
                height="600px"
              />
            )}

            {/* Last Update Info */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              Last updated: {lastRefresh.toLocaleTimeString()}
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
                Tracking {tourists.length} active tourist{tourists.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Tourist List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Active Tourists</h2>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading...</p>
              ) : tourists.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No active tourists</p>
              ) : (
                tourists.map((tourist) => (
                  <div
                    key={tourist.blockchainId}
                    onClick={() => setSelectedTourist(tourist)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTourist?.blockchainId === tourist.blockchainId
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    } ${
                      tourist.status === 'suspicious'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20'
                        : tourist.status === 'emergency'
                        ? 'bg-red-50 dark:bg-red-900/20'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {tourist.touristInfo?.name || 'Tourist'}
                        </p>
                        <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">
                          {tourist.blockchainId}
                        </p>
                      </div>
                      
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          tourist.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : tourist.status === 'suspicious'
                            ? 'bg-yellow-100 text-yellow-800'
                            : tourist.status === 'emergency'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tourist.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {tourist.location.latitude.toFixed(4)}, {tourist.location.longitude.toFixed(4)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(tourist.lastUpdated).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Selected Tourist Details */}
        {selectedTourist && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tourist Details</h2>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Basic Info</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Blockchain ID:</span>
                    <p className="font-mono font-medium text-gray-900 dark:text-white">{selectedTourist.blockchainId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTourist.phoneNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <p className="font-medium capitalize text-gray-900 dark:text-white">{selectedTourist.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Location</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Latitude:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTourist.location.latitude.toFixed(6)}°</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Longitude:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTourist.location.longitude.toFixed(6)}°</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(selectedTourist.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    View History
                  </button>
                  <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
                    Mark Suspicious
                  </button>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Send Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Geofence Alerts Section */}
        <div className="mt-6">
          <GeofenceAlertPanel />
        </div>
      </div>
    </div>
  );
}
