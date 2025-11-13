'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, Mail, Phone, MapPin, User, Search, ArrowLeft } from 'lucide-react';

interface Officer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  employeeId: string;
  department: string;
  touristPlace: string;
  adminApproved: boolean;
  createdAt: string;
}

export default function OfficerApprovalsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingOfficer, setRejectingOfficer] = useState<Officer | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOfficers();
    }
  }, [user, filter]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/admin/login-v2');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.type !== 'admin') {
        router.push('/auth/admin/login-v2');
        return;
      }
      setUser(parsedUser);
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/auth/admin/login-v2');
    }
  };

  const fetchOfficers = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = filter === 'pending' 
        ? 'http://localhost:5000/api/admin/officers/pending'
        : 'http://localhost:5000/api/admin/officers/all';
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOfficers(data.officers || []);
      }
    } catch (error) {
      console.error('Fetch officers error:', error);
    }
  };

  const handleApprove = async (officerId: string) => {
    if (!confirm('Are you sure you want to approve this officer?')) {
      return;
    }

    setProcessingId(officerId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/officers/${officerId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchOfficers();
      } else {
        alert('Failed to approve officer');
      }
    } catch (error) {
      console.error('Approve error:', error);
      alert('Failed to approve officer');
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (officer: Officer) => {
    setRejectingOfficer(officer);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectingOfficer) return;

    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setProcessingId(rejectingOfficer._id);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/officers/${rejectingOfficer._id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: rejectReason }),
      });

      if (response.ok) {
        setShowRejectModal(false);
        setRejectingOfficer(null);
        setRejectReason('');
        fetchOfficers();
      } else {
        alert('Failed to reject officer');
      }
    } catch (error) {
      console.error('Reject error:', error);
      alert('Failed to reject officer');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch = 
      officer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pendingCount = officers.filter(o => !o.adminApproved).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-purple-600">Officer Approvals</h1>
              <p className="text-sm text-gray-600 mt-1">Review and approve tourism officer registrations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats & Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Stats */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-amber-600">{pendingCount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-xl font-bold text-green-600">{officers.length - pendingCount}</p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Officers ({officers.length})
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search officers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Officers List */}
      <div className="p-6">
        {filteredOfficers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'pending' ? 'No pending approvals' : 'No officers found'}
            </h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search query' : 'All officers have been approved'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOfficers.map((officer) => (
              <div
                key={officer._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{officer.fullName}</h3>
                    <p className="text-sm text-gray-600">{officer.designation}</p>
                  </div>
                  {officer.adminApproved ? (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approved</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="break-all">{officer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{officer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{officer.touristPlace}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Employee ID</p>
                    <p className="text-sm font-medium text-gray-900">{officer.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-900">{officer.department}</p>
                  </div>
                </div>

                {!officer.adminApproved && (
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleApprove(officer._id)}
                      disabled={processingId === officer._id}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{processingId === officer._id ? 'Approving...' : 'Approve'}</span>
                    </button>
                    <button
                      onClick={() => openRejectModal(officer)}
                      disabled={processingId === officer._id}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && rejectingOfficer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Reject Officer Application</h2>
              <p className="text-sm text-gray-600 mt-1">{rejectingOfficer.fullName}</p>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                placeholder="Explain why this application is being rejected..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500">
                This reason will be sent to the officer via email.
              </p>
            </div>

            <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectingOfficer(null);
                  setRejectReason('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim() || processingId === rejectingOfficer._id}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {processingId === rejectingOfficer._id ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
