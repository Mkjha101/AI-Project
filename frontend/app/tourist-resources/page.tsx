import { Map, Compass, BookOpen, Phone, AlertCircle, Camera, Utensils, Hotel, Car } from 'lucide-react'

export default function TouristResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Tourist Resources
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need for a safe and memorable journey across incredible India.
        </p>
      </div>

      {/* Quick Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <Phone className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Emergency Numbers</h3>
          <p className="text-primary-100 text-sm">Police, medical, tourist helpline</p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <Map className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Travel Guides</h3>
          <p className="text-secondary-100 text-sm">Destinations, itineraries, tips</p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <BookOpen className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Cultural Guide</h3>
          <p className="text-accent-100 text-sm">Customs, etiquette, traditions</p>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <AlertCircle className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Travel Advisories</h3>
          <p className="text-white/80 text-sm">Real-time safety updates</p>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-danger-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border-2 border-danger-500">
        <div className="flex items-center gap-3 mb-6">
          <Phone className="w-8 h-8 text-danger-600 dark:text-danger-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Emergency Contacts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-danger-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Emergency Services</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Police Emergency</p>
                <a href="tel:100" className="text-danger-600 dark:text-danger-400 text-xl font-bold">100</a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Ambulance</p>
                <a href="tel:102" className="text-danger-600 dark:text-danger-400 text-xl font-bold">102</a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Fire Brigade</p>
                <a href="tel:101" className="text-danger-600 dark:text-danger-400 text-xl font-bold">101</a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-danger-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Tourist Helpline</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Toll-Free Helpline</p>
                <a href="tel:1363" className="text-primary-600 dark:text-primary-400 text-xl font-bold">1363</a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">WhatsApp Support</p>
                <a href="https://wa.me/911363" className="text-secondary-600 dark:text-secondary-400 text-xl font-bold">+91 1363</a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Email Support</p>
                <a href="mailto:help@tourism.gov.in" className="text-accent-600 dark:text-accent-400 text-sm hover:underline">help@tourism.gov.in</a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-danger-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Women's Safety</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Women Helpline</p>
                <a href="tel:1091" className="text-danger-600 dark:text-danger-400 text-xl font-bold">1091</a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Women in Distress</p>
                <a href="tel:181" className="text-danger-600 dark:text-danger-400 text-xl font-bold">181</a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Domestic Violence</p>
                <a href="tel:181" className="text-danger-600 dark:text-danger-400 text-xl font-bold">181</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Camera className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Destinations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-6 border border-primary-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">North India</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Delhi</strong> - Historical monuments, vibrant markets</li>
              <li>• <strong>Agra</strong> - Taj Mahal, Mughal architecture</li>
              <li>• <strong>Jaipur</strong> - Pink city, forts & palaces</li>
              <li>• <strong>Varanasi</strong> - Spiritual capital, Ganges river</li>
              <li>• <strong>Shimla</strong> - Hill station, colonial charm</li>
            </ul>
          </div>

          <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-6 border border-secondary-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">South India</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Kerala</strong> - Backwaters, beaches, culture</li>
              <li>• <strong>Goa</strong> - Beaches, nightlife, Portuguese heritage</li>
              <li>• <strong>Bangalore</strong> - Tech hub, gardens, cosmopolitan</li>
              <li>• <strong>Chennai</strong> - Temples, Marina beach, culture</li>
              <li>• <strong>Hyderabad</strong> - Charminar, biryani, IT hub</li>
            </ul>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-6 border border-accent-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">West & East India</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Mumbai</strong> - Bollywood, Gateway of India</li>
              <li>• <strong>Udaipur</strong> - City of lakes, palaces</li>
              <li>• <strong>Kolkata</strong> - Culture capital, Victoria Memorial</li>
              <li>• <strong>Darjeeling</strong> - Tea gardens, Himalayas</li>
              <li>• <strong>Rann of Kutch</strong> - White desert, festivals</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Essential Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Hotel className="w-8 h-8 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Accommodation</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Government Tourist Lodges:</strong> Affordable, safe options across India</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Heritage Hotels:</strong> Experience royal palaces and havelis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Homestays:</strong> Authentic cultural experiences with local families</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Budget Hostels:</strong> Backpacker-friendly, social atmosphere</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Luxury Resorts:</strong> Premium accommodations with world-class amenities</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Car className="w-8 h-8 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transportation</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">•</span>
              <span><strong>Indian Railways:</strong> Extensive network, various classes available</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">•</span>
              <span><strong>Metro Systems:</strong> Delhi, Mumbai, Bangalore, Chennai, Kolkata</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">•</span>
              <span><strong>Domestic Flights:</strong> Quick connections between major cities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">•</span>
              <span><strong>App-Based Taxis:</strong> Ola, Uber for safe, metered rides</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-500 mt-1">•</span>
              <span><strong>Tourist Buses:</strong> Hop-on-hop-off services in major cities</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Cultural Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-accent-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cultural Insights</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Do's</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Remove shoes before entering temples and homes</li>
              <li>✓ Dress modestly, especially at religious sites</li>
              <li>✓ Use your right hand for eating and greeting</li>
              <li>✓ Seek permission before photographing people</li>
              <li>✓ Respect local customs and traditions</li>
              <li>✓ Bargain politely at markets (it's expected!)</li>
              <li>✓ Try local cuisine - it's amazing!</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Don'ts</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✗ Don't touch religious idols or artifacts</li>
              <li>✗ Avoid public displays of affection</li>
              <li>✗ Don't point feet at people or deities</li>
              <li>✗ Avoid wearing leather in Hindu temples</li>
              <li>✗ Don't enter temples during menstruation (some places)</li>
              <li>✗ Avoid drinking tap water - use bottled water</li>
              <li>✗ Don't photograph military installations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Food & Dining */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Food & Dining Guide</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-6 border border-primary-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Must-Try Dishes</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Butter Chicken (North)</li>
              <li>• Dosa & Idli (South)</li>
              <li>• Biryani (Hyderabad)</li>
              <li>• Goan Fish Curry</li>
              <li>• Street Chaat (Delhi)</li>
              <li>• Thali (Pan-India)</li>
              <li>• Masala Chai (Tea)</li>
            </ul>
          </div>

          <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-6 border border-secondary-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Dietary Options</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Vegetarian:</strong> Widely available everywhere</li>
              <li>• <strong>Vegan:</strong> Inform "No ghee/butter"</li>
              <li>• <strong>Jain:</strong> No root vegetables, onion, garlic</li>
              <li>• <strong>Halal:</strong> Available in Muslim areas</li>
              <li>• <strong>Gluten-Free:</strong> Rice-based options</li>
            </ul>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-6 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Food Safety</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Drink only bottled water</li>
              <li>• Eat at busy restaurants</li>
              <li>• Avoid raw salads initially</li>
              <li>• Choose cooked, hot food</li>
              <li>• Carry hand sanitizer</li>
              <li>• Try street food carefully</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Useful Apps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Compass className="w-8 h-8 text-secondary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Useful Apps for Travelers</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Transportation</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Ola/Uber - Taxis</li>
              <li>• IRCTC - Train bookings</li>
              <li>• MakeMyTrip - Travel</li>
              <li>• Google Maps - Navigation</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Food & Dining</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Zomato - Restaurant reviews</li>
              <li>• Swiggy - Food delivery</li>
              <li>• Dineout - Reservations</li>
              <li>• EatSure - Hygiene-rated food</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Payment & Money</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Paytm - Digital wallet</li>
              <li>• Google Pay - UPI payments</li>
              <li>• PhonePe - Money transfer</li>
              <li>• Wise - Currency exchange</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Communication</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Google Translate - Languages</li>
              <li>• WhatsApp - Messaging</li>
              <li>• Airtel/Jio - SIM cards</li>
              <li>• Tourist Helpline App</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-12 text-center text-white">
        <Map className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          Plan Your Perfect Indian Adventure
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Use Smart Tourist Safety to stay protected while exploring the incredible diversity of India.
        </p>
        <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          Get Your Digital ID Now
        </button>
      </div>
    </div>
  )
}
