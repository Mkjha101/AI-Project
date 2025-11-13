'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AdminMapViewProps {
  adminData: any;
}

export default function AdminMapView({ adminData }: AdminMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [tourists, setTourists] = useState<any[]>([]);
  const [officers, setOfficers] = useState<any[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Get admin location (center of their region)
    const adminLocation = adminData?.regionData?.center || [28.6139, 77.2090]; // Default to Delhi

    // Initialize map
    const map = L.map(mapContainerRef.current).setView(adminLocation, 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create custom icons
    const adminIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background-color: #dc2626;
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-center: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        ">🏛️</div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    // Add admin marker
    const adminMarker = L.marker(adminLocation, { icon: adminIcon }).addTo(map);
    adminMarker.bindPopup(`
      <div style="padding: 8px;">
        <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #dc2626;">Admin Location</h3>
        <p style="margin: 0; font-size: 14px;"><strong>${adminData?.touristPlaceName || 'Tourist Place'}</strong></p>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Administrator: ${adminData?.name}</p>
      </div>
    `);

    // Draw region polygon if available
    if (adminData?.regionData?.boundaries && adminData.regionData.boundaries.length > 0) {
      const polygon = L.polygon(adminData.regionData.boundaries, {
        color: '#9333ea',
        fillColor: '#9333ea',
        fillOpacity: 0.1,
        weight: 2,
      }).addTo(map);

      polygon.bindPopup(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">Region Boundary</h3>
          <p style="margin: 0; font-size: 12px;">Area: ${adminData.regionData.area?.toLocaleString()} sq m</p>
          <p style="margin: 4px 0 0 0; font-size: 12px;">Capacity: ${adminData.regionData.maxCapacity?.toLocaleString()}</p>
        </div>
      `);
    }

    // TODO: Fetch and display tourists (blue dots)
    // TODO: Fetch and display officers (yellow markers)
    // TODO: Set up Socket.IO for real-time updates

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [adminData]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="absolute inset-0" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Map Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow"></div>
            <span className="text-xs text-gray-700">Admin Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow"></div>
            <span className="text-xs text-gray-700">Tourism Officers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Active Tourists</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-purple-600"></div>
            <span className="text-xs text-gray-700">Region Boundary</span>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 z-[1000] flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-gray-700">Live Tracking</span>
      </div>
    </div>
  );
}
