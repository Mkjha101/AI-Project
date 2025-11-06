import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Support
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're here to help 24/7. Reach out to us through any of these channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <Phone className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Phone Support</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Available 24/7 for emergencies</p>
          <a href="tel:+919876543210" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            +91 98765 43210
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <Mail className="w-12 h-12 text-secondary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Response within 24 hours</p>
          <a href="mailto:hello@smarttouristsafety.com" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            hello@smarttouristsafety.com
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
          <MessageSquare className="w-12 h-12 text-accent-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Instant support via AI assistant</p>
          <button className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Start Chat →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Subject *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Message *
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <MapPin className="w-8 h-8 text-primary-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Office Address</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Digital India Tower<br />
              Connaught Place<br />
              New Delhi - 110001<br />
              India
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <Clock className="w-8 h-8 text-secondary-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Business Hours</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p><strong>Emergency Support:</strong> 24/7</p>
              <p><strong>General Inquiries:</strong><br />Mon-Fri: 9:00 AM - 6:00 PM IST<br />Sat: 10:00 AM - 4:00 PM IST</p>
            </div>
          </div>

          <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-6 border border-primary-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Emergency?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For immediate assistance during emergencies, please call our 24/7 hotline or use the emergency alert feature in the app.
            </p>
            <button className="px-6 py-3 bg-danger-500 hover:bg-danger-600 text-white font-bold rounded-lg transition-colors">
              Emergency Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
