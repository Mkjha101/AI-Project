'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  CreditCard,
  Filter
} from 'lucide-react';

interface Colleague {
  _id: string;
  name: string;
  email: string;
  phone: string;
  officerId: string;
  designation: string;
  blockchainId?: string;
  dutyStatus: 'on-duty' | 'off-duty' | 'on-leave' | 'break';
  lastCheckIn?: string;
  assignedLocation?: {
    name: string;
    region: string;
  };
}

export default function ColleaguesPage() {
  const { user } = useAuth();
  const [colleagues, setColleagues] = useState<Colleague[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);

  // Mock data for development
  useEffect(() => {
    const mockColleagues: Colleague[] = [
      {
        _id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@tourism.gov.in',
        phone: '+91 98765 43210',
        officerId: 'OFF-2024-001',
        designation: 'Senior Officer',
        blockchainId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
        dutyStatus: 'on-duty',
        lastCheckIn: '09:00 AM',
        assignedLocation: {
          name: 'Red Fort',
          region: 'Central Delhi'
        }
      },
      {
        _id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@tourism.gov.in',
        phone: '+91 98765 43211',
        officerId: 'OFF-2024-002',
        designation: 'Field Officer',
        blockchainId: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        dutyStatus: 'on-duty',
        lastCheckIn: '08:45 AM',
        assignedLocation: {
          name: 'India Gate',
          region: 'Central Delhi'
        }
      },
      {
        _id: '3',
        name: 'Amit Patel',
        email: 'amit.patel@tourism.gov.in',
        phone: '+91 98765 43212',
        officerId: 'OFF-2024-003',
        designation: 'Inspector',
        dutyStatus: 'on-leave',
        assignedLocation: {
          name: 'Qutub Minar',
          region: 'South Delhi'
        }
      },
      {
        _id: '4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@tourism.gov.in',
        phone: '+91 98765 43213',
        officerId: 'OFF-2024-004',
        designation: 'Field Officer',
        blockchainId: '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB',
        dutyStatus: 'break',
        lastCheckIn: '09:15 AM',
        assignedLocation: {
          name: 'Lotus Temple',
          region: 'South Delhi'
        }
      },
      {
        _id: '5',
        name: 'Vikram Singh',
        email: 'vikram.singh@tourism.gov.in',
        phone: '+91 98765 43214',
        officerId: 'OFF-2024-005',
        designation: 'Senior Officer',
        blockchainId: '0x583031D1113aD414F02576BD6afaBfb302140225',
        dutyStatus: 'off-duty',
        assignedLocation: {
          name: 'Humayun Tomb',
          region: 'South Delhi'
        }
      }
    ];

    setTimeout(() => {
      setColleagues(mockColleagues);
      setLoading(false);
    }, 500);
  }, []);

  const filteredColleagues = colleagues.filter(colleague => {
    const matchesSearch = 
      colleague.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.officerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      colleague.dutyStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: colleagues.length,
    onDuty: colleagues.filter(c => c.dutyStatus === 'on-duty').length,
    offDuty: colleagues.filter(c => c.dutyStatus === 'off-duty').length,
    onLeave: colleagues.filter(c => c.dutyStatus === 'on-leave').length,
    onBreak: colleagues.filter(c => c.dutyStatus === 'break').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'off-duty': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'break': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-duty': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'off-duty': return <XCircle className="w-5 h-5 text-gray-600" />;
      case 'on-leave': return <XCircle className="w-5 h-5 text-yellow-600" />;
      case 'break': return <Clock className="w-5 h-5 text-blue-600" />;
      default: return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <ProtectedRoute allowedRoles={['tourism-officer']}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Colleague Directory
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with fellow tourism officers
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Officers</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.onDuty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On Duty</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-8 h-8 text-gray-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.offDuty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Off Duty</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.onBreak}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On Break</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.onLeave}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On Leave</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, officer ID, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="on-duty">On Duty</option>
                  <option value="off-duty">Off Duty</option>
                  <option value="break">On Break</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Colleagues Grid */}
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading colleagues...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleagues.map((colleague) => (
                <div key={colleague._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Card Header with Status */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                          {colleague.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(colleague.dutyStatus)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{colleague.name}</h3>
                    <p className="text-green-100 text-sm">{colleague.designation}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Officer ID */}
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">ID:</span>
                      <span className="font-mono text-gray-900 dark:text-white">{colleague.officerId}</span>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(colleague.dutyStatus)}`}>
                        {colleague.dutyStatus}
                      </span>
                      {colleague.lastCheckIn && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Last check-in: {colleague.lastCheckIn}
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    {colleague.assignedLocation && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {colleague.assignedLocation.name}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">
                            {colleague.assignedLocation.region}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Blockchain ID */}
                    {colleague.blockchainId && (
                      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Blockchain ID</span>
                        </div>
                        <p className="text-xs font-mono text-gray-900 dark:text-white break-all">
                          {colleague.blockchainId.substring(0, 20)}...
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleCall(colleague.phone)}
                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </button>
                      <button
                        onClick={() => handleEmail(colleague.email)}
                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedColleague(colleague)}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Details Modal */}
          {selectedColleague && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Officer Details
                    </h3>
                    <button
                      onClick={() => setSelectedColleague(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
                      <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {selectedColleague.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {selectedColleague.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">{selectedColleague.designation}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Officer ID</label>
                        <p className="text-gray-900 dark:text-white font-mono">{selectedColleague.officerId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedColleague.dutyStatus)}`}>
                          {selectedColleague.dutyStatus}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Phone className="w-4 h-4" /> Phone
                        </label>
                        <p className="text-gray-900 dark:text-white">{selectedColleague.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Email
                        </label>
                        <p className="text-gray-900 dark:text-white text-sm break-all">{selectedColleague.email}</p>
                      </div>
                    </div>

                    {selectedColleague.assignedLocation && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                          <MapPin className="w-4 h-4" /> Assigned Location
                        </label>
                        <p className="text-gray-900 dark:text-white font-semibold">{selectedColleague.assignedLocation.name}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{selectedColleague.assignedLocation.region}</p>
                      </div>
                    )}

                    {selectedColleague.blockchainId && (
                      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                          <CreditCard className="w-4 h-4" /> Blockchain ID
                        </label>
                        <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                          {selectedColleague.blockchainId}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handleCall(selectedColleague.phone)}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleEmail(selectedColleague.email)}
                      className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
