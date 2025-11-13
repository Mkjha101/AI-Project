'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, MapPin, MessageCircle, Bell, LogOut, Menu, X, Globe } from 'lucide-react';

export default function TouristDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/tourist/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.type !== 'tourist') {
        router.push('/auth/tourist/login');
        return;
      }
      setUser(parsedUser);
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/auth/tourist/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/tourist/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'trips', label: 'Previous Trips', icon: MapPin },
    { id: 'places', label: 'Tourist Places', icon: Globe },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-2xl font-bold text-blue-600">SaarthiAI</h1>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                Tourist
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
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
              {activeTab === 'profile' && <ProfileSection user={user} />}
              {activeTab === 'trips' && <TripsSection />}
              {activeTab === 'places' && <PlacesSection />}
              {activeTab === 'chat' && <ChatSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ user }: { user: any }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <input
              type="text"
              value={user?.gender || ''}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
            <input
              type="text"
              value={user?.nationality || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="text"
              value={user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {user?.blockchainId && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">Blockchain ID</p>
            <p className="text-sm font-mono text-blue-700">{user.blockchainId}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function TripsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Trips</h2>
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No previous trips yet</p>
        <p className="text-sm text-gray-500">Your trip history will appear here</p>
      </div>
    </div>
  );
}

function PlacesSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tourist Places</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tourist places..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No tourist places found</p>
        <p className="text-sm text-gray-500">Browse and discover amazing destinations</p>
      </div>
    </div>
  );
}

function ChatSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat with Friends</h2>
      <div className="text-center py-12">
        <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No conversations yet</p>
        <p className="text-sm text-gray-500">Start chatting with other tourists</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Find Friends
        </button>
      </div>
    </div>
  );
}
