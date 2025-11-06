'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';

interface GeofenceAlert {
  id: string;
  blockchainId: string;
  geofenceName: string;
  alertType: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  location: {
    latitude: number;
    longitude: number;
  };
  acknowledged: boolean;
  acknowledgedBy?: string;
  metadata?: {
    touristName?: string;
    phoneNumber?: string;
    nationality?: string;
  };
  createdAt: string;
}

export default function GeofenceAlertPanel() {
  const [alerts, setAlerts] = useState<GeofenceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unacknowledged' | 'critical'>('unacknowledged');

  const fetchAlerts = async () => {
    try {
      let url = 'http://localhost:5000/api/tracking/alerts?';
      if (filter === 'unacknowledged') {
        url += 'acknowledged=false';
      } else if (filter === 'critical') {
        url = 'http://localhost:5000/api/tracking/alerts/critical/recent';
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      
      const data = await response.json();
      setAlerts(data.alerts || []);
      setLoading(false);
    } catch (error) {
      console.error('Fetch alerts error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [filter]);

  const acknowledgeAlert = async (alertId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tracking/alerts/${alertId}/acknowledge`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ acknowledgedBy: 'Admin' })
        }
      );

      if (response.ok) {
        fetchAlerts(); // Refresh alerts
      }
    } catch (error) {
      console.error('Acknowledge error:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-900';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-900';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-900';
      default: return 'bg-gray-100 border-gray-500 text-gray-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          Geofence Alerts
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unacknowledged')}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${
              filter === 'unacknowledged'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Unacknowledged
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${
              filter === 'critical'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Critical
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No alerts found</p>
          <p className="text-sm text-gray-500 mt-2">All tourists are safe</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm uppercase">
                        {alert.severity}
                      </span>
                      <span className="text-xs text-gray-600">
                        • {new Date(alert.createdAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="font-semibold text-base mb-2">{alert.message}</p>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{alert.geofenceName}</span>
                      </div>
                      
                      {alert.metadata?.touristName && (
                        <div className="text-gray-700">
                          Tourist: <span className="font-medium">{alert.metadata.touristName}</span>
                        </div>
                      )}
                      
                      <div className="text-xs font-mono text-gray-600">
                        ID: {alert.blockchainId}
                      </div>
                      
                      <div className="text-xs text-gray-600">
                        Location: {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
                      </div>
                    </div>

                    {alert.acknowledged && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Acknowledged by {alert.acknowledgedBy}</span>
                      </div>
                    )}
                  </div>
                </div>

                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="ml-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Auto-refreshing every 30 seconds</span>
        </div>
        <button
          onClick={fetchAlerts}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Refresh Now
        </button>
      </div>
    </div>
  );
}
