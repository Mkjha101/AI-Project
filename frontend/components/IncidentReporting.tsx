'use client'

import { useState } from 'react'
import { AlertTriangle, MapPin, Camera, FileText, Calendar } from 'lucide-react'
import { useNotification } from '@/contexts/NotificationContext'

interface Incident {
  id: string
  type: string
  description: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'resolved'
  timestamp: Date
}

const INCIDENT_TYPES = [
  'Medical Emergency',
  'Security Threat', 
  'Crowd Control',
  'Lost Tourist',
  'Accident',
  'Suspicious Activity',
  'Other'
]

export default function IncidentReporting() {
  const [showForm, setShowForm] = useState(false)
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'Medical Emergency',
      description: 'Tourist collapsed near fountain area',
      location: 'Tourist Zone A - Central Fountain',
      severity: 'high',
      status: 'investigating',
      timestamp: new Date(Date.now() - 1800000) // 30 min ago
    },
    {
      id: '2',
      type: 'Lost Tourist',
      description: 'Child separated from family group',
      location: 'Tourist Zone B - Market Area',
      severity: 'medium',
      status: 'resolved',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    }
  ])

  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    severity: 'medium' as const
  })

  const { addNotification } = useNotification()

  const submitIncident = async () => {
    if (!formData.type || !formData.description || !formData.location) {
      addNotification('error', 'Missing Information', 'Please fill in all required fields')
      return
    }

    const newIncident: Incident = {
      id: Date.now().toString(),
      type: formData.type,
      description: formData.description,
      location: formData.location,
      severity: formData.severity,
      status: 'open',
      timestamp: new Date()
    }

    setIncidents(prev => [newIncident, ...prev])
    setFormData({ type: '', description: '', location: '', severity: 'medium' })
    setShowForm(false)
    
    addNotification('success', 'Incident Reported', 'Incident has been submitted successfully')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50'
      case 'high': return 'text-orange-600 bg-orange-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-50'
      case 'investigating': return 'text-blue-600 bg-blue-50'
      case 'resolved': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-danger-600 dark:text-danger-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Incident Reporting</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg text-sm transition-colors"
          >
            {showForm ? 'Cancel' : 'Report Incident'}
          </button>
        </div>
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Report New Incident</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Incident Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select incident type...</option>
                {INCIDENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what happened..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Where did this occur?"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Severity Level
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="low">Low - Minor issue</option>
                <option value="medium">Medium - Requires attention</option>
                <option value="high">High - Urgent response needed</option>
                <option value="critical">Critical - Emergency</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={submitIncident} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors">
                Submit Report
              </button>
              <button 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Incidents */}
      <div>
        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Recent Incidents</h3>
        
        {incidents.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p>No incidents reported yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {incidents.map((incident) => (
              <div key={incident.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{incident.type}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{incident.description}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {incident.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {incident.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Emergency Contacts</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Emergency: 911
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Security: (555) 123-4567
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Medical: (555) 987-6543
          </div>
        </div>
      </div>
    </div>
  )
}