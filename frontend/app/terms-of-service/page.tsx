import { FileText, CheckCircle, AlertCircle, Scale, Ban, Shield } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Last updated: November 6, 2025
        </p>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-primary-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Agreement to Terms
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing or using Smart Tourist Safety services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acceptance of Terms</h2>
          </div>
          <p className="mb-4">
            These Terms of Service constitute a legally binding agreement between you and Smart Tourist Safety. By creating an account, registering for a Digital ID, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
          <p>
            If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Provided</h2>
          </div>
          <p className="mb-4">
            Smart Tourist Safety provides the following services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real-time GPS tracking and safety monitoring</li>
            <li>Digital ID card issuance with blockchain verification</li>
            <li>Incident reporting and emergency alert systems</li>
            <li>Crowd density analysis and geofencing</li>
            <li>AI-powered safety assistance</li>
            <li>Communication with tourism authorities and emergency services</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Responsibilities</h2>
          </div>
          <p className="mb-4">
            As a user of Smart Tourist Safety, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and truthful information during registration</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the service only for lawful purposes</li>
            <li>Report incidents honestly and accurately</li>
            <li>Keep your Digital ID secure and not share it with others</li>
            <li>Enable location services for safety monitoring when traveling</li>
            <li>Comply with local laws and regulations</li>
            <li>Respect the privacy and safety of other users</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Ban className="w-6 h-6 text-danger-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prohibited Conduct</h2>
          </div>
          <p className="mb-4">
            You must not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submit false or misleading information</li>
            <li>Attempt to bypass security measures or access unauthorized areas</li>
            <li>Use the service to harass, threaten, or harm others</li>
            <li>Interfere with the proper functioning of the platform</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Use automated systems to access the service without permission</li>
            <li>Share your Digital ID or account with others</li>
            <li>Abuse the emergency alert system for non-emergency situations</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
          </div>
          <p className="mb-4">
            While we strive to provide reliable safety services, Smart Tourist Safety:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cannot guarantee absolute safety or prevention of all incidents</li>
            <li>Is not liable for damages arising from service interruptions</li>
            <li>Is not responsible for the actions of third parties</li>
            <li>Makes no warranties about the accuracy of crowd density predictions</li>
            <li>Is not liable for incidents beyond our reasonable control</li>
          </ul>
          <p className="mt-4">
            Our total liability shall not exceed the amount paid by you for the services in the past 12 months.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Usage and Privacy</h2>
          </div>
          <p>
            Your use of our services is also governed by our Privacy Policy. We collect and use your location data, personal information, and usage patterns as described in our Privacy Policy to provide safety monitoring services. By agreeing to these Terms, you also consent to our data practices as outlined in the Privacy Policy.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Termination</h2>
          </div>
          <p className="mb-4">
            We reserve the right to suspend or terminate your account if:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You violate these Terms of Service</li>
            <li>You engage in fraudulent or illegal activities</li>
            <li>You abuse the platform or harass other users</li>
            <li>Your account poses a security risk</li>
          </ul>
          <p className="mt-4">
            You may also terminate your account at any time by contacting our support team.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Modifications to Terms</h2>
          </div>
          <p>
            We may modify these Terms of Service at any time. We will notify you of material changes via email or through the app. Your continued use of the service after such notification constitutes acceptance of the modified terms. If you do not agree to the changes, you must discontinue using our services.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law</h2>
          </div>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
          </p>
        </section>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 mt-12 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Questions About Our Terms?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you have any questions about these Terms of Service, please contact our legal team.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          Contact Legal Team
        </button>
      </div>
    </div>
  )
}
