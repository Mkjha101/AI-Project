import { Shield, Target, Users, Zap, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About Smart Tourist Safety
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Pioneering AI-powered safety solutions for tourists across India, combining blockchain technology with real-time monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <Shield className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">
            To make India the safest destination for tourists through innovative technology and real-time monitoring.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <Target className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-300">
            A future where every tourist feels secure, connected, and empowered during their journey through India.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <Users className="w-16 h-16 text-accent-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Values</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Safety first, innovation-driven, privacy-focused, and committed to serving tourists and authorities.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 border border-gray-200 dark:border-gray-700 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
          <p>
            Smart Tourist Safety was born from a vision to transform tourist safety in India. As part of the Digital India initiative, we recognized the need for a comprehensive, technology-driven approach to ensure the wellbeing of millions of tourists visiting India each year.
          </p>
          <p>
            Our platform combines cutting-edge technologies including artificial intelligence, blockchain, real-time GPS tracking, and geofencing to create an unprecedented safety net for tourists. We work closely with tourism authorities, local communities, and emergency services to provide 24/7 monitoring and rapid response capabilities.
          </p>
          <p>
            With features like digital ID cards, crowd analysis, incident reporting, and AI-powered assistance, we're setting new standards in tourist safety management. Our commitment to privacy and security ensures that tourists can explore India with confidence while authorities have the tools they need to respond swiftly to any situation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <div className="text-4xl font-bold mb-2">1M+</div>
          <p className="text-primary-100">Tourists Protected</p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Globe className="w-12 h-12 mx-auto mb-4" />
          <div className="text-4xl font-bold mb-2">50+</div>
          <p className="text-secondary-100">Cities Covered</p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <div className="text-4xl font-bold mb-2">99.8%</div>
          <p className="text-accent-100">Response Success Rate</p>
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-12 text-center border border-primary-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Join Us in Making India Safer
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you're a tourist planning your visit or an authority looking to enhance safety measures, we're here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-300 dark:border-gray-600">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}
