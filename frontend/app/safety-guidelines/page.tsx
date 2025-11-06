import { Shield, AlertTriangle, Phone, MapPin, Users, Camera, Lock, Heart, CheckCircle } from 'lucide-react'

export default function SafetyGuidelinesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Safety Guidelines
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Essential safety tips and best practices for traveling safely across India.
        </p>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-danger-50 dark:bg-danger-900/20 border-2 border-danger-500 rounded-lg p-6 mb-12">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-danger-600 dark:text-danger-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-danger-800 dark:text-danger-300 mb-2">
              Emergency Numbers - Save These!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-danger-700 dark:text-danger-200">
              <div><strong>Police:</strong> 100</div>
              <div><strong>Ambulance:</strong> 102</div>
              <div><strong>Tourist Helpline:</strong> 1363</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Before You Travel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Before You Travel</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Register with Smart Tourist Safety and obtain your Digital ID</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Share your travel itinerary with family or friends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Purchase comprehensive travel insurance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Research your destinations and local customs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Keep copies of important documents (passport, visa)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Set up emergency contacts in the app</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">✓</span>
              <span>Download offline maps of your destinations</span>
            </li>
          </ul>
        </div>

        {/* Personal Safety */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Safety</h2>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Always keep your Digital ID accessible on your phone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Stay in well-lit, populated areas, especially at night</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Use authorized taxis and rideshare services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Dress modestly and respect local customs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Avoid displaying expensive jewelry or electronics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Trust your instincts - if something feels wrong, leave</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">✓</span>
              <span>Keep GPS tracking enabled for real-time monitoring</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Scenario-Based Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-primary-200 dark:border-gray-600">
          <Users className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">In Crowded Places</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Keep valuables secure and close to your body</li>
            <li>• Check crowd density alerts in the app</li>
            <li>• Stay with your group</li>
            <li>• Know emergency exits</li>
            <li>• Avoid pickpocket hotspots</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-secondary-200 dark:border-gray-600">
          <Camera className="w-10 h-10 text-secondary-600 dark:text-secondary-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Photography Etiquette</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Ask permission before photographing people</li>
            <li>• Respect no-photography signs at religious sites</li>
            <li>• Don't photograph military installations</li>
            <li>• Be mindful in sensitive areas</li>
            <li>• Secure your camera equipment</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-accent-200 dark:border-gray-600">
          <MapPin className="w-10 h-10 text-accent-600 dark:text-accent-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Remote Areas</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Inform someone of your plans</li>
            <li>• Carry extra water and supplies</li>
            <li>• Download offline maps</li>
            <li>• Keep phone charged with power bank</li>
            <li>• Travel during daylight hours</li>
          </ul>
        </div>
      </div>

      {/* Health & Wellness */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-danger-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health & Wellness</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Food & Water Safety</h3>
            <ul className="space-y-2">
              <li>• Drink only bottled or purified water</li>
              <li>• Eat at reputable, busy restaurants</li>
              <li>• Avoid street food if you have a sensitive stomach</li>
              <li>• Wash hands frequently or use sanitizer</li>
              <li>• Carry basic medications for common ailments</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Medical Preparedness</h3>
            <ul className="space-y-2">
              <li>• Know location of nearest hospitals</li>
              <li>• Carry prescription medications with doctor's note</li>
              <li>• Get necessary vaccinations before travel</li>
              <li>• Purchase travel health insurance</li>
              <li>• Use the app's emergency services locator</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Digital Safety */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8 text-accent-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Safety</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span>Use VPN on public WiFi networks</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span>Enable two-factor authentication</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span>Don't share personal info with strangers</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span>Keep your Digital ID confidential</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span>Back up important photos and documents</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent-500 mt-1">✓</span>
            <span>Be cautious of phishing attempts</span>
          </div>
        </div>
      </div>

      {/* Using the App Features */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-8 mb-12 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Maximize Your Safety with App Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <Phone className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Emergency Button</h3>
            <p className="text-white/90">
              Press and hold the emergency button for 3 seconds to instantly alert authorities and your emergency contacts with your exact location.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <MapPin className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Geofence Alerts</h3>
            <p className="text-white/90">
              Receive automatic notifications when entering or exiting designated safety zones, high-risk areas, or tourist-only regions.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <Users className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Crowd Analysis</h3>
            <p className="text-white/90">
              Check real-time crowd density at popular tourist spots before you visit. Plan your visits during less crowded times for a better experience.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <Shield className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Incident Reporting</h3>
            <p className="text-white/90">
              Report any incidents, suspicious activities, or safety concerns directly through the app. Help keep other tourists safe.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need More Help?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our 24/7 AI assistant is always available to answer your safety questions and provide real-time guidance.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          Chat with AI Assistant
        </button>
      </div>
    </div>
  )
}
