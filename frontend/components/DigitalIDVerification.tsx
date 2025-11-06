'use client'

import { useState } from 'react'
import { Shield, QrCode, CheckCircle, XCircle, User, Calendar } from 'lucide-react'
import { useNotification } from '@/contexts/NotificationContext'

interface DigitalID {
  id: string
  firstName: string
  lastName: string
  nationality: string
  status: 'active' | 'revoked'
  createdAt: Date
  qrCode?: string
}

export default function DigitalIDVerification() {
  const [verificationMode, setVerificationMode] = useState<'create' | 'verify'>('verify')
  const [digitalIdInput, setDigitalIdInput] = useState('')
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newIdData, setNewIdData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nationality: ''
  })
  const { addNotification } = useNotification()

  const verifyDigitalId = async () => {
    if (!digitalIdInput.trim()) {
      addNotification('warning', 'Missing ID', 'Please enter a digital ID to verify')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock verification result
      const mockResult = {
        verified: Math.random() > 0.3, // 70% success rate
        digitalId: digitalIdInput,
        status: Math.random() > 0.1 ? 'active' : 'revoked',
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        details: {
          firstName: 'John',
          lastName: 'Tourist',
          nationality: 'United States',
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          lastVerified: new Date()
        }
      }

      setVerificationResult(mockResult)
      
      if (mockResult.verified) {
        addNotification('success', 'ID Verified', 'Digital ID is valid and active')
      } else {
        addNotification('error', 'Verification Failed', 'Digital ID could not be verified')
      }

    } catch (error) {
      console.error('Verification failed:', error)
      addNotification('error', 'Verification Error', 'Failed to verify digital ID')
    } finally {
      setIsLoading(false)
    }
  }

  const createDigitalId = async () => {
    if (!newIdData.firstName || !newIdData.lastName || !newIdData.email) {
      addNotification('error', 'Missing Information', 'Please fill in all required fields')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newId = `TID-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      
      addNotification('success', 'Digital ID Created', `New ID: ${newId}`)
      
      // Reset form
      setNewIdData({ firstName: '', lastName: '', email: '', nationality: '' })
      
      // Show verification result
      setVerificationResult({
        verified: true,
        digitalId: newId,
        status: 'active',
        confidence: '1.00',
        details: {
          firstName: newIdData.firstName,
          lastName: newIdData.lastName,
          nationality: newIdData.nationality,
          createdAt: new Date(),
          lastVerified: new Date()
        }
      })

    } catch (error) {
      console.error('ID creation failed:', error)
      addNotification('error', 'Creation Error', 'Failed to create digital ID')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Digital ID Management</h2>
        </div>
        
        {/* Mode Selector */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mt-3">
          <button
            onClick={() => setVerificationMode('verify')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              verificationMode === 'verify'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Verify ID
          </button>
          <button
            onClick={() => setVerificationMode('create')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              verificationMode === 'create'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Create ID
          </button>
        </div>
      </div>

      {/* Verify Mode */}
      {verificationMode === 'verify' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Digital ID Number
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={digitalIdInput}
                onChange={(e) => setDigitalIdInput(e.target.value)}
                placeholder="TID-20241201-ABC123"
                className="flex-1 w-full px-3 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
                disabled={isLoading}
              />
              <button
                onClick={verifyDigitalId}
                disabled={isLoading || !digitalIdInput.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Verify</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Scanner Placeholder */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-700/50">
            <QrCode className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Or scan QR code</p>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-1">
              Enable Camera →
            </button>
          </div>
        </div>
      )}

      {/* Create Mode */}
      {verificationMode === 'create' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={newIdData.firstName}
                onChange={(e) => setNewIdData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={newIdData.lastName}
                onChange={(e) => setNewIdData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={newIdData.email}
              onChange={(e) => setNewIdData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nationality
            </label>
            <input
              type="text"
              value={newIdData.nationality}
              onChange={(e) => setNewIdData(prev => ({ ...prev, nationality: e.target.value }))}
              placeholder="e.g., United States, Canada, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={createDigitalId}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Digital ID...</span>
              </div>
            ) : (
              'Create Digital ID'
            )}
          </button>
        </div>
      )}

      {/* Verification Results */}
      {verificationResult && (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Verification Result</h3>
            {verificationResult.verified ? (
              <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400" />
            ) : (
              <XCircle className="h-6 w-6 text-danger-600 dark:text-danger-400" />
            )}
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Digital ID:</span>
                <p className="font-mono text-gray-900 dark:text-white">{verificationResult.digitalId}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <p className={`font-medium ${
                  verificationResult.status === 'active' ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
                }`}>
                  {verificationResult.status.toUpperCase()}
                </p>
              </div>
            </div>

            {verificationResult.verified && verificationResult.details && (
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span>{verificationResult.details.firstName} {verificationResult.details.lastName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span>Created: {new Date(verificationResult.details.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {verificationResult.details.nationality && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Nationality:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{verificationResult.details.nationality}</span>
                  </div>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Confidence Score:</span>
                <span className="font-medium text-gray-900 dark:text-white">{(parseFloat(verificationResult.confidence) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">1,247</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Active IDs</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">156</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Verified Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">99.8%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}