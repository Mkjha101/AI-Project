'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Briefcase, 
  Users, 
  Search, 
  Filter,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Plus
} from 'lucide-react';

interface Officer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  officerId: string;
  designation: string;
  employmentStatus: 'active' | 'on-leave' | 'retired' | 'resigned' | 'suspended';
  blockchainId?: string;
  idCardStatus: 'not-issued' | 'active' | 'expired' | 'revoked';
  idCardIssueDate?: string;
  idCardExpiryDate?: string;
  assignedLocation?: {
    name: string;
    region: string;
    state: string;
  };
  lastCheckIn?: string;
  dutyStatus?: 'on-duty' | 'off-duty' | 'on-leave' | 'break';
}

export default function OfficerManagementPage() {
  const { user } = useAuth();
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Mock data for development - replace with API call
  useEffect(() => {
    const mockOfficers: Officer[] = [
      {
        _id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@tourism.gov.in',
        phone: '+91 98765 43210',
        officerId: 'OFF-2024-001',
        designation: 'Senior Officer',
        employmentStatus: 'active',
        blockchainId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
        idCardStatus: 'active',
        idCardIssueDate: '2024-01-15',
        idCardExpiryDate: '2029-01-15',
        assignedLocation: {
          name: 'Red Fort',
          region: 'Central Delhi',
          state: 'Delhi'
        },
        lastCheckIn: '2024-11-06T09:00:00Z',
        dutyStatus: 'on-duty'
      },
      {
        _id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@tourism.gov.in',
        phone: '+91 98765 43211',
        officerId: 'OFF-2024-002',
        designation: 'Field Officer',
        employmentStatus: 'active',
        blockchainId: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        idCardStatus: 'active',
        idCardIssueDate: '2024-02-10',
        idCardExpiryDate: '2029-02-10',
        assignedLocation: {
          name: 'India Gate',
          region: 'Central Delhi',
          state: 'Delhi'
        },
        lastCheckIn: '2024-11-06T08:45:00Z',
        dutyStatus: 'on-duty'
      },
      {
        _id: '3',
        name: 'Amit Patel',
        email: 'amit.patel@tourism.gov.in',
        phone: '+91 98765 43212',
        officerId: 'OFF-2024-003',
        designation: 'Inspector',
        employmentStatus: 'on-leave',
        idCardStatus: 'not-issued',
        assignedLocation: {
          name: 'Qutub Minar',
          region: 'South Delhi',
          state: 'Delhi'
        },
        dutyStatus: 'on-leave'
      },
      {
        _id: '4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@tourism.gov.in',
        phone: '+91 98765 43213',
        officerId: 'OFF-2024-004',
        designation: 'Field Officer',
        employmentStatus: 'active',
        blockchainId: '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB',
        idCardStatus: 'expired',
        idCardIssueDate: '2019-03-20',
        idCardExpiryDate: '2024-03-20',
        assignedLocation: {
          name: 'Lotus Temple',
          region: 'South Delhi',
          state: 'Delhi'
        },
        lastCheckIn: '2024-11-05T17:30:00Z',
        dutyStatus: 'off-duty'
      }
    ];

    setTimeout(() => {
      setOfficers(mockOfficers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = 
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.officerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      officer.employmentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'retired': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getIdCardStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'revoked': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'not-issued': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDutyStatusIcon = (status?: string) => {
    switch (status) {
      case 'on-duty': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'off-duty': return <XCircle className="w-4 h-4 text-gray-600" />;
      case 'on-leave': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'break': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleIssueId = (officer: Officer) => {
    console.log('Issue ID for:', officer.officerId);
    // TODO: Implement blockchain ID issuance
  };

  const handleRevokeId = (officer: Officer) => {
    console.log('Revoke ID for:', officer.officerId);
    // TODO: Implement ID revocation
  };

  const handleUpdateStatus = (officer: Officer, newStatus: string) => {
    console.log('Update status for:', officer.officerId, 'to:', newStatus);
    // TODO: Implement status update
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Officer Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Manage tourism officers and their blockchain IDs
                    </p>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Officer
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {officers.length}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Officers</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {officers.filter(o => o.dutyStatus === 'on-duty').length}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">On Duty</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {officers.filter(o => o.idCardStatus === 'active').length}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active IDs</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {officers.filter(o => o.employmentStatus === 'on-leave').length}
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
                  placeholder="Search by name, officer ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="suspended">Suspended</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
            </div>
          </div>

          {/* Officers List */}
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading officers...</p>
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
                        Designation
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        ID Card
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Duty
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredOfficers.map((officer) => (
                      <tr key={officer._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {officer.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {officer.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {officer.officerId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{officer.designation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {officer.assignedLocation?.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {officer.assignedLocation?.region}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(officer.employmentStatus)}`}>
                            {officer.employmentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getIdCardStatusColor(officer.idCardStatus)}`}>
                            {officer.idCardStatus}
                          </span>
                          {officer.blockchainId && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                              {officer.blockchainId.substring(0, 10)}...
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getDutyStatusIcon(officer.dutyStatus)}
                            <span className="text-sm text-gray-900 dark:text-white capitalize">
                              {officer.dutyStatus || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative inline-block">
                            <button
                              onClick={() => setShowActionMenu(showActionMenu === officer._id ? null : officer._id)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            {showActionMenu === officer._id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl z-10 py-1">
                                <button
                                  onClick={() => setSelectedOfficer(officer)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  View Details
                                </button>
                                {officer.idCardStatus === 'not-issued' && (
                                  <button
                                    onClick={() => handleIssueId(officer)}
                                    className="block w-full text-left px-4 py-2 text-sm text-green-700 dark:text-green-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    Issue ID Card
                                  </button>
                                )}
                                {officer.idCardStatus === 'active' && (
                                  <button
                                    onClick={() => handleRevokeId(officer)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    Revoke ID Card
                                  </button>
                                )}
                                <button
                                  onClick={() => handleUpdateStatus(officer, 'suspended')}
                                  className="block w-full text-left px-4 py-2 text-sm text-orange-700 dark:text-orange-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  Update Status
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Officer Details Modal */}
          {selectedOfficer && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Officer Details
                    </h3>
                    <button
                      onClick={() => setSelectedOfficer(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
                      <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {selectedOfficer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {selectedOfficer.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">{selectedOfficer.designation}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Officer ID</label>
                        <p className="text-gray-900 dark:text-white font-mono">{selectedOfficer.officerId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employment Status</label>
                        <p className="text-gray-900 dark:text-white capitalize">{selectedOfficer.employmentStatus}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Email
                        </label>
                        <p className="text-gray-900 dark:text-white">{selectedOfficer.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Phone className="w-4 h-4" /> Phone
                        </label>
                        <p className="text-gray-900 dark:text-white">{selectedOfficer.phone}</p>
                      </div>
                    </div>

                    {selectedOfficer.assignedLocation && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                          <MapPin className="w-4 h-4" /> Assigned Location
                        </label>
                        <p className="text-gray-900 dark:text-white font-semibold">{selectedOfficer.assignedLocation.name}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {selectedOfficer.assignedLocation.region}, {selectedOfficer.assignedLocation.state}
                        </p>
                      </div>
                    )}

                    {selectedOfficer.blockchainId && (
                      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                          <CreditCard className="w-4 h-4" /> Blockchain ID
                        </label>
                        <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                          {selectedOfficer.blockchainId}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
                          <span>Issued: {selectedOfficer.idCardIssueDate}</span>
                          <span>Expires: {selectedOfficer.idCardExpiryDate}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedOfficer(null)}
                      className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                    {selectedOfficer.idCardStatus === 'not-issued' && (
                      <button
                        onClick={() => handleIssueId(selectedOfficer)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-colors"
                      >
                        Issue Blockchain ID
                      </button>
                    )}
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
