'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapPin, Navigation, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  speed?: number | null;
  heading?: number | null;
}

interface TouristLocationTrackerProps {
  blockchainId: string;
  phoneNumber: string;
}

export default function TouristLocationTracker({ blockchainId, phoneNumber }: TouristLocationTrackerProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string>('');
  const [watchId, setWatchId] = useState<number | null>(null);

  // Send location to backend
  const sendLocationToServer = useCallback(async (loc: LocationData) => {
    try {
      const response = await fetch('http://localhost:5000/api/tracking/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blockchainId,
          phoneNumber,
          latitude: loc.latitude,
          longitude: loc.longitude,
          accuracy: loc.accuracy,
          altitude: loc.altitude,
          speed: loc.speed,
          heading: loc.heading,
          deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      setLastUpdate(new Date());
      setError('');
    } catch (err) {
      console.error('Location update error:', err);
      setError('Failed to send location to server');
    }
  }, [blockchainId, phoneNumber]);

  // Handle location update
  const handleLocationUpdate = useCallback((position: GeolocationPosition) => {
    const locationData: LocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      speed: position.coords.speed,
      heading: position.coords.heading,
    };

    setLocation(locationData);
    sendLocationToServer(locationData);
  }, [sendLocationToServer]);

  // Handle location error
  const handleLocationError = (error: GeolocationPositionError) => {
    let errorMessage = 'Unknown error';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location permission denied. Please enable location access.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable.';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out.';
        break;
    }
    setError(errorMessage);
    setIsTracking(false);
  };

  // Start tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsTracking(true);
    setError('');

    // Options for high accuracy
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    // Watch position for continuous updates
    const id = navigator.geolocation.watchPosition(
      handleLocationUpdate,
      handleLocationError,
      options
    );

    setWatchId(id);
  };

  // Stop tracking
  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Request permission and start tracking on mount
  useEffect(() => {
    if (blockchainId && phoneNumber) {
      startTracking();
    }
  }, [blockchainId, phoneNumber]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          Location Tracking
        </h2>
        
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            isTracking
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isTracking ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Stop Tracking
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              Start Tracking
            </>
          )}
        </button>
      </div>

      {/* Status Card */}
      <div className={`mb-6 p-4 rounded-lg border-2 ${
        isTracking ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
      }`}>
        <div className="flex items-center gap-3">
          {isTracking ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-gray-400" />
          )}
          <div>
            <p className="font-semibold text-gray-800">
              {isTracking ? 'Tracking Active' : 'Tracking Inactive'}
            </p>
            <p className="text-sm text-gray-600">
              {isTracking
                ? 'Your location is being shared for safety monitoring'
                : 'Click "Start Tracking" to begin location sharing'}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Location Info */}
      {location && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Latitude</p>
              <p className="text-lg font-semibold text-gray-800">
                {location.latitude.toFixed(6)}°
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Longitude</p>
              <p className="text-lg font-semibold text-gray-800">
                {location.longitude.toFixed(6)}°
              </p>
            </div>

            {location.accuracy && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                <p className="text-lg font-semibold text-gray-800">
                  ±{location.accuracy.toFixed(1)} m
                </p>
              </div>
            )}

            {location.speed !== null && location.speed !== undefined && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Speed</p>
                <p className="text-lg font-semibold text-gray-800">
                  {(location.speed * 3.6).toFixed(1)} km/h
                </p>
              </div>
            )}
          </div>

          {/* Last Update */}
          {lastUpdate && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Last Updated:</span>{' '}
                {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          )}

          {/* Map Preview (optional - requires Leaflet or Google Maps) */}
          <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-center text-gray-600 text-sm">
              📍 Map view will appear here
              <br />
              <span className="text-xs">(Requires map library integration)</span>
            </p>
          </div>
        </div>
      )}

      {/* Tourist Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Your Safety ID</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Blockchain ID:</span>
            <span className="font-mono font-medium text-gray-800">{blockchainId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone Number:</span>
            <span className="font-medium text-gray-800">{phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-900">
          <strong>Safety Notice:</strong> Your location is shared with the tourism
          board for your safety. Your data is secure and will be deleted after your
          visit ends.
        </p>
      </div>
    </div>
  );
}
