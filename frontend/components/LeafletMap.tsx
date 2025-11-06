'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tourist } from '@/types/tracking';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  tourists: Tourist[];
  selectedTourist?: Tourist | null;
  onMarkerClick?: (tourist: Tourist) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  tourists,
  selectedTourist,
  onMarkerClick,
  center = [28.6139, 77.2090], // New Delhi coordinates
  zoom = 12,
  height = '600px',
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  // Update markers when tourists change
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const currentMarkers = markersRef.current;

    // Remove markers for tourists that no longer exist
    Object.keys(currentMarkers).forEach((blockchainId) => {
      if (!tourists.find((t) => t.blockchainId === blockchainId)) {
        currentMarkers[blockchainId].remove();
        delete currentMarkers[blockchainId];
      }
    });

    // Add or update markers
    tourists.forEach((tourist) => {
      const { blockchainId, location, status, touristInfo } = tourist;
      const { latitude, longitude } = location;

      // Create custom icon based on status
      const iconColor = 
        status === 'emergency' ? '#dc2626' :
        status === 'suspicious' ? '#f59e0b' :
        status === 'active' ? '#16a34a' :
        '#9ca3af';

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background-color: ${iconColor};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
          ">
            ${status === 'emergency' ? '!' : status === 'suspicious' ? '?' : '✓'}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      if (currentMarkers[blockchainId]) {
        // Update existing marker
        currentMarkers[blockchainId].setLatLng([latitude, longitude]);
        currentMarkers[blockchainId].setIcon(customIcon);
      } else {
        // Create new marker
        const marker = L.marker([latitude, longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px;">
              <strong>${touristInfo?.name || 'Tourist'}</strong><br/>
              <span style="color: #666; font-size: 12px;">${blockchainId}</span><br/>
              <span style="color: ${iconColor}; font-weight: bold; text-transform: uppercase; font-size: 11px;">
                ${status}
              </span><br/>
              <span style="color: #999; font-size: 11px;">
                Last Updated: ${new Date(tourist.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          `);

        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(tourist));
        }

        currentMarkers[blockchainId] = marker;
      }
    });

    // Fit bounds if there are tourists
    if (tourists.length > 0) {
      const bounds = tourists.map((t) => [t.location.latitude, t.location.longitude] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [tourists, onMarkerClick]);

  // Highlight selected tourist
  useEffect(() => {
    if (!mapRef.current || !selectedTourist) return;

    const marker = markersRef.current[selectedTourist.blockchainId];
    if (marker) {
      marker.openPopup();
      mapRef.current.setView(
        [selectedTourist.location.latitude, selectedTourist.location.longitude],
        16,
        { animate: true }
      );
    }
  }, [selectedTourist]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: '100%', borderRadius: '8px' }}
      className="shadow-md border border-gray-200"
    />
  );
};

export default LeafletMap;
