import { Shield, Lock, Eye, FileText, UserCheck, Database, Globe, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Last updated: November 6, 2025
        </p>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-primary-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Your Privacy Matters
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Smart Tourist Safety is committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, phone number</li>
                <li>Nationality and passport information</li>
                <li>Digital ID and blockchain identifiers</li>
                <li>Emergency contact details</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location Data:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Real-time GPS coordinates for safety monitoring</li>
                <li>Historical location data for incident analysis</li>
                <li>Geofence entry/exit records</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Usage Data:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>App usage patterns and interactions</li>
                <li>Device information and IP addresses</li>
                <li>Incident reports and safety alerts</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Monitor tourist safety and provide real-time protection</li>
            <li>Respond to emergencies and security incidents</li>
            <li>Generate safety analytics and crowd density reports</li>
            <li>Improve our services and AI algorithms</li>
            <li>Communicate important safety alerts and updates</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
          </div>
          <p className="mb-4">
            We employ industry-standard security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>End-to-end encryption for sensitive data</li>
            <li>Blockchain technology for tamper-proof records</li>
            <li>Regular security audits and penetration testing</li>
            <li>Strict access controls and authentication protocols</li>
            <li>Secure data centers with 24/7 monitoring</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Sharing</h2>
          </div>
          <p className="mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Tourism Authorities:</strong> For safety monitoring and incident response</li>
            <li><strong>Emergency Services:</strong> During emergencies requiring immediate assistance</li>
            <li><strong>Law Enforcement:</strong> When legally required or to prevent harm</li>
            <li><strong>Service Providers:</strong> Third-party vendors who help us operate our services</li>
          </ul>
          <p className="mt-4">
            We never sell your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
          </div>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of non-essential data collection</li>
            <li>Export your data in a portable format</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at privacy@smarttouristsafety.com
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Retention</h2>
          </div>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy. Location data is typically retained for 90 days, while account information is kept until you request deletion or close your account.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-warning-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to This Policy</h2>
          </div>
          <p>
            We may update this privacy policy from time to time. We will notify you of any significant changes via email or through the app. Your continued use of our services after such modifications constitutes acceptance of the updated policy.
          </p>
        </section>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 mt-12 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Questions About Privacy?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you have any questions or concerns about our privacy practices, we're here to help.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          Contact Privacy Team
        </button>
      </div>
    </div>
  )
}
