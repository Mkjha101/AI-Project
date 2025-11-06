import { Smartphone, Shield, MapPin, Bell, Brain, Lock, Users, Zap } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A comprehensive safety ecosystem powered by AI, blockchain, and real-time monitoring to protect tourists across India.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
          <Smartphone className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">Digital ID</h3>
          <p className="text-primary-100">
            Blockchain-verified tourist identification with QR code for instant verification
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-6 text-white">
          <MapPin className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">GPS Tracking</h3>
          <p className="text-secondary-100">
            Real-time location monitoring with geofencing for safety zones
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg p-6 text-white">
          <Bell className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">Instant Alerts</h3>
          <p className="text-accent-100">
            Emergency notifications and incident reporting system
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg shadow-lg p-6 text-white">
          <Brain className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
          <p className="text-primary-100">
            24/7 AI-powered support and safety recommendations
          </p>
        </div>
      </div>

      {/* Step by Step Process */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Getting Started in 4 Easy Steps
        </h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Register & Verify
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create your account using your passport or national ID. Our AI system verifies your documents instantly using OCR technology and facial recognition. Your data is encrypted and stored on the blockchain for maximum security.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  Passport Scan
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  Face Verification
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  Blockchain Storage
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Get Your Digital ID
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Receive your digital tourist ID card with a unique QR code. This blockchain-verified ID can be scanned by authorities, hotels, and tourist sites for instant verification. Access your ID anytime from your phone, even offline.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                  QR Code
                </span>
                <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                  Offline Access
                </span>
                <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                  Instant Verification
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Enable Safety Monitoring
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Turn on location services to activate real-time GPS tracking. Our system monitors your movements, sends alerts when you enter high-risk zones, and provides crowd density information for popular tourist spots. You're always in control of your privacy settings.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
                  GPS Tracking
                </span>
                <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
                  Geofencing
                </span>
                <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
                  Risk Alerts
                </span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                4
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Travel with Confidence
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Explore India worry-free! Our AI assistant provides 24/7 support, answers questions, and helps you navigate safely. In case of emergency, use the panic button to instantly alert authorities and your emergency contacts. Your location and details are shared immediately with nearby police stations and emergency services.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  24/7 AI Support
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  Emergency Button
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                  Instant Response
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 mb-16 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Powered by Advanced Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Lock className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Blockchain</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Immutable records and secure identity verification
            </p>
          </div>
          <div className="text-center">
            <Brain className="w-10 h-10 text-secondary-500 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">AI/ML</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Smart predictions and intelligent assistance
            </p>
          </div>
          <div className="text-center">
            <MapPin className="w-10 h-10 text-accent-500 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">GPS/IoT</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Real-time tracking and geofencing technology
            </p>
          </div>
          <div className="text-center">
            <Zap className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Cloud</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Scalable infrastructure for instant response
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-12 text-center text-white">
        <Shield className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          Ready to Travel Safely?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Join thousands of tourists who are already protected by Smart Tourist Safety.
        </p>
        <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          Get Started Now
        </button>
      </div>
    </div>
  )
}
