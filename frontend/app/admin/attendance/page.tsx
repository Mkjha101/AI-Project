'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User
} from 'lucide-react';

interface AttendanceRecord {
  _id: string;
  officerId: string;
  officerName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  duration?: string;
  status: 'present' | 'absent' | 'half-day' | 'on-leave';
  location?: string;
  notes?: string;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'daily' | 'monthly'>('daily');
  const [selectedOfficer, setSelectedOfficer] = useState<string>('all');

  // Mock data for development
  useEffect(() => {
    const mockRecords: AttendanceRecord[] = [
      {
        _id: '1',
        officerId: 'OFF-2024-001',
        officerName: 'Rajesh Kumar',
        date: '2024-11-06',
        checkIn: '09:00 AM',
        checkOut: '05:30 PM',
        duration: '8h 30m',
        status: 'present',
        location: 'Red Fort'
      },
      {
        _id: '2',
        officerId: 'OFF-2024-002',
        officerName: 'Priya Sharma',
        date: '2024-11-06',
        checkIn: '08:45 AM',
        checkOut: '05:15 PM',
        duration: '8h 30m',
        status: 'present',
        location: 'India Gate'
      },
      {
        _id: '3',
        officerId: 'OFF-2024-003',
        officerName: 'Amit Patel',
        date: '2024-11-06',
        status: 'on-leave',
        notes: 'Medical Leave'
      },
      {
        _id: '4',
        officerId: 'OFF-2024-004',
        officerName: 'Sneha Reddy',
        date: '2024-11-06',
        checkIn: '09:15 AM',
        checkOut: '01:00 PM',
        duration: '3h 45m',
        status: 'half-day',
        location: 'Lotus Temple',
        notes: 'Personal work in afternoon'
      },
      {
        _id: '5',
        officerId: 'OFF-2024-005',
        officerName: 'Vikram Singh',
        date: '2024-11-06',
        status: 'absent',
        notes: 'No check-in recorded'
      }
    ];

    setTimeout(() => {
      setAttendanceRecords(mockRecords);
      setLoading(false);
    }, 500);
  }, [selectedDate]);

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    halfDay: attendanceRecords.filter(r => r.status === 'half-day').length,
    onLeave: attendanceRecords.filter(r => r.status === 'on-leave').length,
    total: attendanceRecords.length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'half-day': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'on-leave': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'half-day': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'on-leave': return <Clock className="w-5 h-5 text-blue-600" />;
      default: return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleExportReport = () => {
    console.log('Exporting attendance report...');
    // TODO: Implement CSV/PDF export
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Attendance Tracking
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor officer attendance and duty hours
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.present}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Present</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {((stats.present / stats.total) * 100).toFixed(0)}% of total
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.absent}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Absent</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {((stats.absent / stats.total) * 100).toFixed(0)}% of total
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.halfDay}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Half Day</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {((stats.halfDay / stats.total) * 100).toFixed(0)}% of total
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.onLeave}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On Leave</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {((stats.onLeave / stats.total) * 100).toFixed(0)}% of total
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <User className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Officers</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Active roster
              </p>
            </div>
          </div>

          {/* Date Navigation and Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousDay}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(selectedDate)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={handleNextDay}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('daily')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'daily'
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Daily View
                </button>
                <button
                  onClick={() => setView('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'monthly'
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Monthly View
                </button>
                <button
                  onClick={handleExportReport}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading attendance records...</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Officer
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
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {attendanceRecords.map((record) => (
                      <tr key={record._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {record.officerName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {record.officerName}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {record.officerId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {record.checkIn || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {record.checkOut || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {record.duration || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.location ? (
                            <div className="flex items-center gap-1 text-sm text-gray-900 dark:text-white">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {record.location}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                            {record.notes || '-'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary Card */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Attendance Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {((stats.present / stats.total) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Hours/Officer</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8h 15m</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">On-Time Check-ins</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.present - 1}/{stats.present}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Late Arrivals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
