'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, Users, AlertTriangle, TrendingUp } from 'lucide-react'
import { useNotification } from '@/contexts/NotificationContext'

interface CrowdAnalysisResult {
  count: number
  density: string
  riskLevel: string
  recommendations: string[]
}

export default function CrowdAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<CrowdAnalysisResult | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addNotification } = useNotification()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setResult(null)
      } else {
        addNotification('error', 'Invalid File', 'Please select an image file (PNG, JPG, etc.)')
      }
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setResult(null)
    } else {
      addNotification('error', 'Invalid File', 'Please drop an image file')
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const analyzeCrowd = async () => {
    if (!selectedFile) {
      addNotification('warning', 'No Image', 'Please select an image first')
      return
    }

    setIsAnalyzing(true)
    
    try {
      // Simulate API call to AI service
      const formData = new FormData()
      formData.append('image', selectedFile)

      // Mock analysis result (in real app, call backend API)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult: CrowdAnalysisResult = {
        count: Math.floor(Math.random() * 100) + 10,
        density: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        riskLevel: ['Safe', 'Caution', 'Alert'][Math.floor(Math.random() * 3)],
        recommendations: [
          'Monitor crowd movement patterns',
          'Deploy additional security if needed',
          'Consider crowd control measures',
          'Maintain emergency response readiness'
        ].slice(0, Math.floor(Math.random() * 3) + 2)
      }

      setResult(mockResult)
      addNotification('success', 'Analysis Complete', `Detected ${mockResult.count} people in the image`)

    } catch (error) {
      console.error('Analysis failed:', error)
      addNotification('error', 'Analysis Failed', 'Could not analyze the image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Crowd Analysis</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Upload an image to analyze crowd density and safety
        </p>
      </div>

      {/* File Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700/50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Selected image"
              className="max-h-48 mx-auto rounded-lg shadow-md"
            />
            <div className="flex space-x-2 justify-center">
              <button
                onClick={analyzeCrowd}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    <span>Analyze Crowd</span>
                  </>
                )}
              </button>
              <button
                onClick={clearImage}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isAnalyzing}
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-2">Drop an image here or click to select</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {result && (
        <div className="mt-6 space-y-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg border border-primary-200 dark:border-primary-800">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{result.count}</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">People Detected</div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              result.density === 'Low' ? 'bg-success-50 dark:bg-success-900/30 border-success-200 dark:border-success-800' :
              result.density === 'Medium' ? 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800' : 
              'bg-danger-50 dark:bg-danger-900/30 border-danger-200 dark:border-danger-800'
            }`}>
              <div className={`text-lg font-semibold ${
                result.density === 'Low' ? 'text-success-600 dark:text-success-400' :
                result.density === 'Medium' ? 'text-warning-600 dark:text-warning-400' : 
                'text-danger-600 dark:text-danger-400'
              }`}>
                {result.density}
              </div>
              <div className={`text-sm ${
                result.density === 'Low' ? 'text-success-700 dark:text-success-300' :
                result.density === 'Medium' ? 'text-warning-700 dark:text-warning-300' : 
                'text-danger-700 dark:text-danger-300'
              }`}>
                Crowd Density
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              result.riskLevel === 'Safe' ? 'bg-success-50 dark:bg-success-900/30 border-success-200 dark:border-success-800' :
              result.riskLevel === 'Caution' ? 'bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800' : 
              'bg-danger-50 dark:bg-danger-900/30 border-danger-200 dark:border-danger-800'
            }`}>
              <div className={`text-lg font-semibold ${
                result.riskLevel === 'Safe' ? 'text-success-600 dark:text-success-400' :
                result.riskLevel === 'Caution' ? 'text-warning-600 dark:text-warning-400' : 
                'text-danger-600 dark:text-danger-400'
              }`}>
                {result.riskLevel}
              </div>
              <div className={`text-sm ${
                result.riskLevel === 'Safe' ? 'text-success-700 dark:text-success-300' :
                result.riskLevel === 'Caution' ? 'text-warning-700 dark:text-warning-300' : 
                'text-danger-700 dark:text-danger-300'
              }`}>
                Risk Level
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
            <ul className="space-y-1">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Live Analysis Status */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="h-2 w-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
            Live AI monitoring active
          </div>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            View Live Feed →
          </button>
        </div>
      </div>
    </div>
  )
}