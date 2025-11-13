'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { MapPin, Save, AlertCircle } from 'lucide-react';

export default function RegionSetupPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const polygonRef = useRef<L.Polygon | null>(null);
  
  const [regionData, setRegionData] = useState({
    boundaries: [] as [number, number][],
    center: [28.6139, 77.2090] as [number, number],
    area: 0,
    maxCapacity: 1000,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && mapContainerRef.current && !mapRef.current) {
      initMap();
    }
  }, [user]);

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

  const initMap = () => {
    if (!mapContainerRef.current) return;

    // Initialize map centered on India
    const map = L.map(mapContainerRef.current).setView([28.6139, 77.2090], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add Geoman controls for drawing
    map.pm.addControls({
      position: 'topleft',
      drawCircle: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawMarker: false,
      drawText: false,
      cutPolygon: false,
      editMode: true,
      dragMode: false,
      removalMode: true,
    });

    // Handle polygon creation
    map.on('pm:create', (e: any) => {
      if (e.shape === 'Polygon') {
        // Remove previous polygon if exists
        if (polygonRef.current) {
          polygonRef.current.remove();
        }

        const layer = e.layer as L.Polygon;
        polygonRef.current = layer;

        // Get coordinates
        const latlngs = layer.getLatLngs()[0] as L.LatLng[];
        const boundaries = latlngs.map(ll => [ll.lat, ll.lng] as [number, number]);

        // Calculate center
        const bounds = layer.getBounds();
        const center = bounds.getCenter();

        // Calculate area in square meters
        const area = calculateArea(latlngs);

        setRegionData({
          boundaries,
          center: [center.lat, center.lng],
          area: Math.round(area),
          maxCapacity: regionData.maxCapacity,
        });
      }
    });

    // Handle polygon edit
    map.on('pm:edit', (e: any) => {
      if (polygonRef.current) {
        const latlngs = polygonRef.current.getLatLngs()[0] as L.LatLng[];
        const boundaries = latlngs.map(ll => [ll.lat, ll.lng] as [number, number]);
        
        const bounds = polygonRef.current.getBounds();
        const center = bounds.getCenter();
        
        const area = calculateArea(latlngs);

        setRegionData({
          boundaries,
          center: [center.lat, center.lng],
          area: Math.round(area),
          maxCapacity: regionData.maxCapacity,
        });
      }
    });

    // Handle polygon removal
    map.on('pm:remove', () => {
      polygonRef.current = null;
      setRegionData({
        boundaries: [],
        center: [28.6139, 77.2090],
        area: 0,
        maxCapacity: regionData.maxCapacity,
      });
    });

    mapRef.current = map;

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
          
          // Add marker at user's location
          const marker = L.marker([latitude, longitude]).addTo(map);
          marker.bindPopup('<b>Your Location</b>').openPopup();
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  };

  const calculateArea = (latlngs: L.LatLng[]): number => {
    // Convert to turf.js format and calculate area
    // Simple approximation using spherical excess
    let area = 0;
    if (latlngs.length > 2) {
      for (let i = 0; i < latlngs.length; i++) {
        const j = (i + 1) % latlngs.length;
        area += latlngs[i].lng * latlngs[j].lat;
        area -= latlngs[j].lng * latlngs[i].lat;
      }
      area = Math.abs(area / 2);
      
      // Convert to square meters (rough approximation)
      area = area * 111319.5 * 111319.5; // degrees to meters
    }
    return area;
  };

  const handleSave = async () => {
    if (regionData.boundaries.length < 3) {
      setError('Please draw a polygon on the map to mark your region');
      return;
    }

    if (regionData.maxCapacity < 1) {
      setError('Max capacity must be at least 1');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/region-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          regionData: {
            ...regionData,
            isSetup: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save region data');
      }

      // Update user data in localStorage
      const updatedUser = { ...user, regionData: { ...regionData, isSetup: true } };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to save region setup');
    } finally {
      setSaving(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-600">Region Setup</h1>
            <p className="text-sm text-gray-600 mt-1">Mark your tourist place boundaries on the map</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || regionData.boundaries.length === 0}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Region'}</span>
          </button>
        </div>
      </header>

      {/* Instructions */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">How to mark your region:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Click the polygon tool in the top-left corner of the map</li>
              <li>Click on the map to add points and create your region boundary</li>
              <li>Double-click to finish drawing the polygon</li>
              <li>Set the maximum tourist capacity below</li>
              <li>Click "Save Region" when you're done</li>
            </ol>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 text-green-600 flex-shrink-0">✓</div>
            <p className="text-sm text-green-800">Region saved successfully! Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Map and Info */}
      <div className="flex-1 flex">
        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapContainerRef} className="absolute inset-0" />
        </div>

        {/* Side Panel */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Region Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tourist Place</label>
              <input
                type="text"
                value={user?.touristPlaceName || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq meters)</label>
              <input
                type="text"
                value={regionData.area.toLocaleString()}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              {regionData.area > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  ≈ {(regionData.area / 10000).toFixed(2)} hectares
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Tourist Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={regionData.maxCapacity}
                onChange={(e) => setRegionData({ ...regionData, maxCapacity: parseInt(e.target.value) || 0 })}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Estimated safe capacity for your tourist area
              </p>
            </div>

            {regionData.boundaries.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Polygon Points</h3>
                <p className="text-xs text-gray-600">{regionData.boundaries.length} points defined</p>
                <p className="text-xs text-gray-500 mt-1">
                  Center: {regionData.center[0].toFixed(4)}, {regionData.center[1].toFixed(4)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
