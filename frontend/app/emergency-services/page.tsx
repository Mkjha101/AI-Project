import { Phone, MapPin, Heart, Shield, AlertTriangle, Clock, Navigation, Radio } from 'lucide-react'

export default function EmergencyServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Emergency Services
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive directory of emergency contacts and services across India for your safety.
        </p>
      </div>

      {/* Critical Emergency Numbers - Top Banner */}
      <div className="bg-danger-600 text-white rounded-lg shadow-2xl p-8 mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <AlertTriangle className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Critical Emergency Numbers</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <a href="tel:100" className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-6 transition-all">
            <Phone className="w-10 h-10 mx-auto mb-3" />
            <div className="text-4xl font-bold mb-2">100</div>
            <p className="text-sm">Police Emergency</p>
          </a>

          <a href="tel:102" className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-6 transition-all">
            <Heart className="w-10 h-10 mx-auto mb-3" />
            <div className="text-4xl font-bold mb-2">102</div>
            <p className="text-sm">Ambulance</p>
          </a>

          <a href="tel:101" className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-6 transition-all">
            <AlertTriangle className="w-10 h-10 mx-auto mb-3" />
            <div className="text-4xl font-bold mb-2">101</div>
            <p className="text-sm">Fire Brigade</p>
          </a>

          <a href="tel:1363" className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-6 transition-all">
            <Shield className="w-10 h-10 mx-auto mb-3" />
            <div className="text-4xl font-bold mb-2">1363</div>
            <p className="text-sm">Tourist Helpline</p>
          </a>
        </div>
      </div>

      {/* All Emergency Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Police Services */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Police Services</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Police Emergency</h3>
                <a href="tel:100" className="text-2xl font-bold text-primary-600 dark:text-primary-400">100</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">For all emergency police assistance - available 24/7</p>
            </div>

            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Women Helpline</h3>
                <a href="tel:1091" className="text-2xl font-bold text-primary-600 dark:text-primary-400">1091</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">24/7 helpline for women in distress</p>
            </div>

            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Women Safety (Universal)</h3>
                <a href="tel:181" className="text-2xl font-bold text-primary-600 dark:text-primary-400">181</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">National helpline for women - available in multiple languages</p>
            </div>

            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Senior Citizen Helpline</h3>
                <a href="tel:1291" className="text-2xl font-bold text-primary-600 dark:text-primary-400">1291</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Dedicated helpline for senior citizens</p>
            </div>

            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Crime Stoppers</h3>
                <a href="tel:1090" className="text-2xl font-bold text-primary-600 dark:text-primary-400">1090</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Report crimes anonymously</p>
            </div>
          </div>
        </div>

        {/* Medical Emergency Services */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-danger-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Emergency</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Ambulance Service</h3>
                <a href="tel:102" className="text-2xl font-bold text-danger-600 dark:text-danger-400">102</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">National Ambulance Service - free service</p>
            </div>

            <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Medical Emergency</h3>
                <a href="tel:108" className="text-2xl font-bold text-danger-600 dark:text-danger-400">108</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Emergency medical response - available in most states</p>
            </div>

            <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Blood Bank</h3>
                <a href="tel:104" className="text-2xl font-bold text-danger-600 dark:text-danger-400">104</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">National blood bank helpline</p>
            </div>

            <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">AIDS Helpline</h3>
                <a href="tel:1097" className="text-2xl font-bold text-danger-600 dark:text-danger-400">1097</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">HIV/AIDS information and counseling</p>
            </div>

            <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Mental Health</h3>
                <a href="tel:1800599019" className="text-xl font-bold text-danger-600 dark:text-danger-400">1800 599 019</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">NIMHANS mental health helpline</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Disaster & Safety */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-warning-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disaster & Safety</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-warning-50 dark:bg-gray-900 rounded-lg p-4 border border-warning-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Fire Emergency</h3>
                <a href="tel:101" className="text-2xl font-bold text-warning-600 dark:text-warning-400">101</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Fire brigade - available 24/7</p>
            </div>

            <div className="bg-warning-50 dark:bg-gray-900 rounded-lg p-4 border border-warning-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Disaster Management</h3>
                <a href="tel:108" className="text-2xl font-bold text-warning-600 dark:text-warning-400">108</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">National disaster response</p>
            </div>

            <div className="bg-warning-50 dark:bg-gray-900 rounded-lg p-4 border border-warning-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Road Accident Emergency</h3>
                <a href="tel:1073" className="text-2xl font-bold text-warning-600 dark:text-warning-400">1073</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Highway emergency response</p>
            </div>

            <div className="bg-warning-50 dark:bg-gray-900 rounded-lg p-4 border border-warning-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Railway Accident Emergency</h3>
                <a href="tel:1072" className="text-2xl font-bold text-warning-600 dark:text-warning-400">1072</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Railway emergency services</p>
            </div>
          </div>
        </div>

        {/* Tourist & Travel Services */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Navigation className="w-8 h-8 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tourist Services</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Tourism Helpline (24x7)</h3>
                <a href="tel:1363" className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">1363</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Ministry of Tourism - multilingual support</p>
            </div>

            <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Railway Enquiry</h3>
                <a href="tel:139" className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">139</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Indian Railways general enquiry</p>
            </div>

            <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Consumer Helpline</h3>
                <a href="tel:1915" className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">1915</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">For consumer complaints and disputes</p>
            </div>

            <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Cyber Crime</h3>
                <a href="tel:1930" className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">1930</a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Report cyber fraud and online scams</p>
            </div>
          </div>
        </div>
      </div>

      {/* Major Cities Emergency Numbers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-8 h-8 text-accent-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">City-Specific Control Rooms</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Delhi</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Police Control Room:</span>
                <a href="tel:01123344444" className="text-accent-600 dark:text-accent-400 font-bold">011-2334 4444</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tourist Police:</span>
                <a href="tel:01123434200" className="text-accent-600 dark:text-accent-400 font-bold">011-2343 4200</a>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Mumbai</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Police Control Room:</span>
                <a href="tel:02222633333" className="text-accent-600 dark:text-accent-400 font-bold">022-2263 3333</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tourist Police:</span>
                <a href="tel:02222620111" className="text-accent-600 dark:text-accent-400 font-bold">022-2262 0111</a>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Bangalore</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Police Control Room:</span>
                <a href="tel:08022943333" className="text-accent-600 dark:text-accent-400 font-bold">080-2294 3333</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tourist Police:</span>
                <a href="tel:08022215020" className="text-accent-600 dark:text-accent-400 font-bold">080-2221 5020</a>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Chennai</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Police Control Room:</span>
                <a href="tel:04423452314" className="text-accent-600 dark:text-accent-400 font-bold">044-2345 2314</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tourist Police:</span>
                <a href="tel:04425361206" className="text-accent-600 dark:text-accent-400 font-bold">044-2536 1206</a>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Kolkata</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Police Control Room:</span>
                <a href="tel:03322143010" className="text-accent-600 dark:text-accent-400 font-bold">033-2214 3010</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tourist Police:</span>
                <a href="tel:03322256111" className="text-accent-600 dark:text-accent-400 font-bold">033-2225 6111</a>
              </div>
            </div>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Hyderabad</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Police Control Room:</span>
                <a href="tel:04027853505" className="text-accent-600 dark:text-accent-400 font-bold">040-2785 3505</a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tourist Police:</span>
                <a href="tel:04023452339" className="text-accent-600 dark:text-accent-400 font-bold">040-2345 2339</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embassy Contacts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Radio className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">International Support</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you need to contact your embassy or consulate in India, here are some key contacts:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">US Embassy (Delhi)</h4>
            <a href="tel:01124198000" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">011-2419 8000</a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">UK High Commission (Delhi)</h4>
            <a href="tel:01124192100" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">011-2419 2100</a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Australian High Commission</h4>
            <a href="tel:01141394100" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">011-4139 4100</a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Canadian High Commission</h4>
            <a href="tel:01141782000" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">011-4178 2000</a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">German Embassy (Delhi)</h4>
            <a href="tel:01144195199" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">011-4419 5199</a>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">French Embassy (Delhi)</h4>
            <a href="tel:01143196100" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">011-4319 6100</a>
          </div>
        </div>
      </div>

      {/* Using Emergency Services */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-8 h-8 text-secondary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">When Calling Emergency Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Information to Provide:</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Your exact location (use app's GPS coordinates)</li>
              <li>✓ Your Digital ID number</li>
              <li>✓ Nature of emergency</li>
              <li>✓ Number of people involved</li>
              <li>✓ Any immediate dangers</li>
              <li>✓ Your contact number</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Stay Calm and:</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Speak clearly and slowly</li>
              <li>✓ Follow instructions from the operator</li>
              <li>✓ Don't hang up until told to do so</li>
              <li>✓ Keep your phone charged and accessible</li>
              <li>✓ Use the app's emergency button for instant alerts</li>
              <li>✓ Stay where you are if safe to do so</li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Emergency Features */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-12 text-center text-white">
        <Shield className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          Use Smart Tourist Safety Emergency Features
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Press and hold the emergency button in the app for 3 seconds to instantly alert authorities with your exact location and Digital ID.
        </p>
        <button className="px-8 py-4 bg-white text-danger-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          Learn More About Emergency Features
        </button>
      </div>
    </div>
  )
}
