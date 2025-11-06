'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Clock, 
  CheckCircle, 
  XCircle,
  MapPin,
  Calendar,
  AlertCircle,
  LogIn,
  LogOut
} from 'lucide-react';

interface AttendanceRecord {
  date: string;
  checkIn?: string;
  checkOut?: string;
  duration?: string;
  status: 'present' | 'absent' | 'half-day';
  location?: string;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [currentStatus, setCurrentStatus] = useState<'on-duty' | 'off-duty' | 'break'>('off-duty');
  const [lastCheckIn, setLastCheckIn] = useState<string | null>('09:15 AM');
  const [lastCheckOut, setLastCheckOut] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Red Fort, Central Delhi');
  const [loadingAction, setLoadingAction] = useState(false);

  // Mock attendance history
  const attendanceHistory: AttendanceRecord[] = [
    {
      date: '2024-11-06',
      checkIn: '09:15 AM',
      checkOut: 'In Progress',
      status: 'present',
      location: 'Red Fort'
    },
    {
      date: '2024-11-05',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      duration: '8h 30m',
      status: 'present',
      location: 'Red Fort'
    },
    {
      date: '2024-11-04',
      checkIn: '09:10 AM',
      checkOut: '05:20 PM',
      duration: '8h 10m',
      status: 'present',
      location: 'Red Fort'
    },
    {
      date: '2024-11-03',
      checkIn: 'N/A',
      checkOut: 'N/A',
      status: 'absent',
      location: 'N/A'
    },
    {
      date: '2024-11-02',
      checkIn: '09:05 AM',
      checkOut: '01:00 PM',
      duration: '3h 55m',
      status: 'half-day',
      location: 'Red Fort'
    }
  ];

  const handleCheckIn = async () => {
    setLoadingAction(true);
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setLastCheckIn(time);
      setCurrentStatus('on-duty');
      setLoadingAction(false);
    }, 1000);
  };

  const handleCheckOut = async () => {
    setLoadingAction(true);
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setLastCheckOut(time);
      setCurrentStatus('off-duty');
      setLoadingAction(false);
    }, 1000);
  };

  const handleBreak = async () => {
    setLoadingAction(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentStatus('break');
      setLoadingAction(false);
    }, 1000);
  };

  const handleResumeWork = async () => {
    setLoadingAction(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentStatus('on-duty');
      setLoadingAction(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'off-duty': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'break': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'present': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'half-day': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-duty': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'off-duty': return <XCircle className="w-6 h-6 text-gray-600" />;
      case 'break': return <Clock className="w-6 h-6 text-blue-600" />;
      default: return <Clock className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['tourism-officer']}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Duty Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your attendance and duty status
                </p>
              </div>
            </div>
          </div>

          {/* Current Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-4">
                {getStatusIcon(currentStatus)}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Current Status
              </h2>
              <span className={`px-6 py-2 inline-flex text-lg font-semibold rounded-full ${getStatusColor(currentStatus)}`}>
                {currentStatus.toUpperCase().replace('-', ' ')}
              </span>
            </div>

            {/* Time Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LogIn className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Check-In Time</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lastCheckIn || 'Not checked in'}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Check-Out Time</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lastCheckOut || 'Not checked out'}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Location</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{location}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStatus === 'off-duty' && (
                <button
                  onClick={handleCheckIn}
                  disabled={loadingAction}
                  className="col-span-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingAction ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Check In
                    </>
                  )}
                </button>
              )}

              {currentStatus === 'on-duty' && (
                <>
                  <button
                    onClick={handleBreak}
                    disabled={loadingAction}
                    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingAction ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Clock className="w-5 h-5" />
                        Take Break
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCheckOut}
                    disabled={loadingAction}
                    className="col-span-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingAction ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <LogOut className="w-5 h-5" />
                        Check Out
                      </>
                    )}
                  </button>
                </>
              )}

              {currentStatus === 'break' && (
                <button
                  onClick={handleResumeWork}
                  disabled={loadingAction}
                  className="col-span-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingAction ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Resume Work
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Attendance History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Attendance History
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {attendanceHistory.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {record.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {record.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {record.duration || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {record.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Attendance Guidelines
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Check in at your assigned location when you start your duty</li>
                  <li>• Mark breaks when stepping away from your post</li>
                  <li>• Check out only when ending your shift for the day</li>
                  <li>• Your location is automatically captured during check-in</li>
                  <li>• Contact admin if you need to correct any attendance record</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
