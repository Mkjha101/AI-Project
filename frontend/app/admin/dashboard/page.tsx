'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { User, Building2, Users, Shield, MessageCircle, Bell, LogOut, Menu, X, MapPin } from 'lucide-react';

// Dynamically import Leaflet map to avoid SSR issues
const MapView = dynamic(() => import('@/components/AdminMapView'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('map');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [needsRegionSetup, setNeedsRegionSetup] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

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
      
      // Check if region setup is needed
      if (!parsedUser.regionData?.isSetup) {
        setNeedsRegionSetup(true);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/auth/admin/login-v2');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/admin/login-v2');
  };

  const tabs = [
    { id: 'map', label: 'Live Map', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'facilities', label: 'Facilities', icon: Building2 },
    { id: 'officers', label: 'Officers', icon: Shield },
    { id: 'tourists', label: 'Active Tourists', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Region setup required
  if (needsRegionSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Region Setup Required</h1>
          <p className="text-gray-600 mb-6">
            Before accessing your dashboard, you need to mark your tourist place region on the map.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Tourist Place: <strong>{user?.touristPlaceName}</strong>
          </p>
          <button
            onClick={() => router.push('/admin/region-setup')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Set Up Region Now
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-40">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-purple-600">SaarthiAI</h1>
              <span className="ml-3 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                Admin
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.touristPlaceName}</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
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

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden lg:block'} lg:w-64 bg-white border-r border-gray-200 overflow-y-auto`}>
          <nav className="p-4 space-y-2">
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
                      ? 'bg-purple-50 text-purple-600 font-medium'
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
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && <MapSection user={user} />}
          {activeTab === 'profile' && <ProfileSection user={user} />}
          {activeTab === 'facilities' && <FacilitiesSection />}
          {activeTab === 'officers' && <OfficersSection />}
          {activeTab === 'tourists' && <TouristsSection />}
          {activeTab === 'chat' && <ChatSection />}
        </div>
      </div>
    </div>
  );
}

function MapSection({ user }: { user: any }) {
  return (
    <div className="h-full">
      <MapView adminData={user} />
    </div>
  );
}

function ProfileSection({ user }: { user: any }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Profile</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={user?.username || ''}
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tourist Place</label>
              <input
                type="text"
                value={user?.touristPlaceName || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {user?.regionData && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-900 mb-2">Region Data</p>
              <div className="text-sm text-purple-700 space-y-1">
                <p>Area: {user.regionData.area?.toLocaleString()} sq meters</p>
                <p>Max Capacity: {user.regionData.maxCapacity?.toLocaleString()} tourists</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Facilities Management</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Add Facility
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No facilities added yet</p>
          <p className="text-sm text-gray-500">Start by adding facilities for your tourist place</p>
        </div>
      </div>
    </div>
  );
}

function OfficersSection() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tourism Officers</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No pending officer approvals</p>
          <p className="text-sm text-gray-500">Officer approval requests will appear here</p>
        </div>
      </div>
    </div>
  );
}

function TouristsSection() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Tourists</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No active tourists</p>
          <p className="text-sm text-gray-500">Active tourists in your region will appear here</p>
        </div>
      </div>
    </div>
  );
}

function ChatSection() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No conversations yet</p>
          <p className="text-sm text-gray-500">Chat with officers and manage communications</p>
        </div>
      </div>
    </div>
  );
}
