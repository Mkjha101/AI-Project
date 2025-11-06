import { HelpCircle, Search, Book, MessageCircle, Video, FileText, Phone, AlertCircle } from 'lucide-react'

export default function HelpCenterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Help Center
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Find answers to common questions and learn how to make the most of Smart Tourist Safety.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles, guides, FAQs..."
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
          />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <Book className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Getting Started</h3>
          <p className="text-primary-100 text-sm">Learn the basics of using the platform</p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <Video className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
          <p className="text-secondary-100 text-sm">Step-by-step video guides</p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <FileText className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Documentation</h3>
          <p className="text-accent-100 text-sm">Comprehensive guides and docs</p>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform">
          <MessageCircle className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-bold mb-2">Live Support</h3>
          <p className="text-primary-100 text-sm">Chat with our support team</p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {/* Digital ID Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-primary-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-500" />
                Digital ID & Registration
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How do I register for a Digital ID?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Click on "Issue Tourist ID Card" in the dashboard, upload your passport or national ID, provide your photo, and follow the verification steps. Your Digital ID will be issued within 24 hours after verification.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What if I lose my Digital ID?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Your Digital ID is stored securely on the blockchain and in your account. Simply log in to your account to access it again. You can also download a backup PDF from your profile settings.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Can I use my Digital ID offline?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes! Your Digital ID with QR code is available offline in the app. Make sure to download it to your device before traveling to areas with limited connectivity.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Features Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-secondary-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-secondary-500" />
                Safety & Tracking
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How does GPS tracking work?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Once enabled, our system monitors your real-time location and sends alerts if you enter high-risk zones. Tourism authorities can also access your location in case of emergencies. You can disable tracking anytime from settings.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What happens when I press the emergency button?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Your exact location, Digital ID, and emergency details are instantly shared with local police, emergency services, and your emergency contacts. Response teams are dispatched to your location immediately.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Who can see my location data?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Only authorized tourism authorities and emergency services can access your location, and only for safety purposes. Your location data is encrypted and not shared with third parties. You can view access logs in your account.
                </p>
              </div>
            </div>
          </div>

          {/* Account & Privacy Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-accent-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-accent-500" />
                Account & Privacy
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How do I change my password?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Go to Settings → Security → Change Password. Enter your current password and your new password twice. We recommend using a strong password with at least 12 characters.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How do I delete my account?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Go to Settings → Account → Delete Account. Note that this action is permanent and will remove all your data, including your Digital ID. For safety records, some data may be retained as required by law.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Is my data secure?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes, we use AES-256 encryption, blockchain technology, and follow international security standards (ISO 27001). Read our Data Protection policy for more details on how we protect your information.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Issues Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-primary-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-500" />
                Technical Issues
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The app is not loading. What should I do?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Try clearing your browser cache or app cache, check your internet connection, and ensure you're using the latest version. If the problem persists, contact support at hello@smarttouristsafety.com
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GPS is not working properly</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ensure location permissions are enabled in your device settings. Go to Settings → Location Services and enable for Smart Tourist Safety. If outdoors, ensure you have clear sky visibility for better GPS signal.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">I'm not receiving notifications</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Check your device notification settings and ensure notifications are enabled for our app. Also verify your notification preferences in the app settings under Settings → Notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
          <Phone className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Phone Support</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Call us for immediate assistance
          </p>
          <a href="tel:+919876543210" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            +91 98765 43210
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
          <MessageCircle className="w-12 h-12 text-secondary-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Chat with AI or human support
          </p>
          <button className="text-secondary-600 dark:text-secondary-400 font-medium hover:underline">
            Start Chat
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
          <AlertCircle className="w-12 h-12 text-accent-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report Issue</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Submit a bug or feature request
          </p>
          <button className="text-accent-600 dark:text-accent-400 font-medium hover:underline">
            Submit Report
          </button>
        </div>
      </div>

      {/* Still Need Help */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Still Need Help?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Our support team is available 24/7 to assist you with any questions or issues.
        </p>
        <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          Contact Support Team
        </button>
      </div>
    </div>
  )
}
