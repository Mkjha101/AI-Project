'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, MapPin, MessageCircle, Bell, LogOut, Menu, X, AlertCircle, Map } from 'lucide-react';

export default function OfficerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/officer/login-v2');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.type !== 'officer') {
        router.push('/auth/officer/login-v2');
        return;
      }
      setUser(parsedUser);
      setIsApproved(parsedUser.adminApproved === true);
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/auth/officer/login-v2');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/officer/login-v2');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, disabled: false },
    { id: 'visits', label: 'Previous Visits', icon: MapPin, disabled: false },
    { id: 'chat', label: 'Chat', icon: MessageCircle, disabled: !isApproved },
    { id: 'heatmaps', label: 'Heat Maps', icon: Map, disabled: !isApproved },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pending Approval Banner */}
      {!isApproved && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">Pending Admin Approval</p>
                <p className="text-xs text-yellow-700">
                  Your account is awaiting administrator approval. Some features are currently disabled.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-amber-600">SaarthiAI</h1>
              <span className="ml-3 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                Tourism Officer
              </span>
              {isApproved && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  ✓ Approved
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button 
                className={`relative p-2 text-gray-600 rounded-full ${
                  isApproved ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isApproved}
              >
                <Bell className="w-6 h-6" />
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.officerId}</p>
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className={`lg:w-64 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (!tab.disabled) {
                        setActiveTab(tab.id);
                        setSidebarOpen(false);
                      }
                    }}
                    disabled={tab.disabled}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-amber-50 text-amber-600 font-medium'
                        : tab.disabled
                        ? 'text-gray-400 cursor-not-allowed opacity-60'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {tab.disabled && (
                      <span className="ml-auto text-xs text-gray-400">🔒</span>
                    )}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200 lg:hidden">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'profile' && <ProfileSection user={user} isApproved={isApproved} />}
              {activeTab === 'visits' && <VisitsSection />}
              {activeTab === 'chat' && <ChatSection />}
              {activeTab === 'heatmaps' && <HeatMapsSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ user, isApproved }: { user: any; isApproved: boolean }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Officer Profile</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {!isApproved && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">Approval Required</p>
                <p className="text-xs text-yellow-700">
                  An administrator needs to approve your account before you can access all features.
                  You'll receive an email notification once your account is approved.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Officer ID</label>
            <input
              type="text"
              value={user?.officerId || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={user?.phone || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <input
              type="text"
              value={user?.designation || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isApproved 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isApproved ? '✓ Approved' : '⏳ Pending Approval'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function VisitsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Visits</h2>
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No previous visits recorded</p>
        <p className="text-sm text-gray-500">Your visit history will appear here</p>
      </div>
    </div>
  );
}

function ChatSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat with Admin</h2>
      <div className="text-center py-12">
        <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No conversations yet</p>
        <p className="text-sm text-gray-500">Chat with administrators and other officers</p>
      </div>
    </div>
  );
}

function HeatMapsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tourist Heat Maps</h2>
      <div className="text-center py-12">
        <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Heat map view</p>
        <p className="text-sm text-gray-500">View tourist density across your region</p>
      </div>
    </div>
  );
}
