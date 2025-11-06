import { Cookie, Settings, Eye, EyeOff, Shield, Info, CheckCircle, XCircle } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Cookie Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Last updated: November 6, 2025
        </p>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-primary-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <Cookie className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              About Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              This Cookie Policy explains how Smart Tourist Safety uses cookies and similar technologies to recognize you when you visit our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Are Cookies?</h2>
          </div>
          <p className="mb-4">
            Cookies are small text files that are placed on your device when you visit our website or use our app. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
          </p>
          <p>
            Similar technologies include web beacons, pixels, and local storage, which serve similar purposes to cookies.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Types of Cookies We Use</h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-500" />
                Essential Cookies (Required)
              </h3>
              <p className="mb-2">
                These cookies are necessary for the platform to function and cannot be disabled.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Authentication and security</li>
                <li>Session management</li>
                <li>Digital ID verification</li>
                <li>Load balancing</li>
              </ul>
            </div>

            <div className="border-l-4 border-secondary-500 pl-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary-500" />
                Functional Cookies
              </h3>
              <p className="mb-2">
                These cookies enable enhanced functionality and personalization.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Language preferences</li>
                <li>Theme settings (light/dark mode)</li>
                <li>Location preferences</li>
                <li>Notification settings</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-500" />
                Analytics Cookies
              </h3>
              <p className="mb-2">
                These cookies help us understand how visitors interact with our platform.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Page views and navigation patterns</li>
                <li>Feature usage statistics</li>
                <li>Performance monitoring</li>
                <li>Error tracking</li>
              </ul>
            </div>

            <div className="border-l-4 border-warning-500 pl-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-warning-500" />
                Marketing Cookies (Optional)
              </h3>
              <p className="mb-2">
                These cookies track your activity to deliver relevant advertisements.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Advertising preferences</li>
                <li>Social media integration</li>
                <li>Campaign tracking</li>
                <li>Retargeting</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Specific Cookies We Use</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Cookie Name</th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Purpose</th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">auth_token</td>
                  <td className="px-4 py-3">User authentication</td>
                  <td className="px-4 py-3">7 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">session_id</td>
                  <td className="px-4 py-3">Session management</td>
                  <td className="px-4 py-3">Session</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">theme_preference</td>
                  <td className="px-4 py-3">Dark/light mode setting</td>
                  <td className="px-4 py-3">1 year</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">language</td>
                  <td className="px-4 py-3">Language preference</td>
                  <td className="px-4 py-3">1 year</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">_ga</td>
                  <td className="px-4 py-3">Google Analytics</td>
                  <td className="px-4 py-3">2 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">_gid</td>
                  <td className="px-4 py-3">Google Analytics</td>
                  <td className="px-4 py-3">24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Managing Your Cookie Preferences</h2>
          </div>
          <p className="mb-4">
            You have several options for managing cookies:
          </p>
          
          <div className="space-y-4">
            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Browser Settings</h3>
              <p className="text-sm">
                Most browsers allow you to control cookies through their settings. You can typically find cookie controls in the "Privacy" or "Security" section of your browser settings.
              </p>
            </div>

            <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie Consent Tool</h3>
              <p className="text-sm">
                When you first visit our platform, you'll see a cookie consent banner where you can choose which types of cookies to accept.
              </p>
            </div>

            <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Settings</h3>
              <p className="text-sm">
                Logged-in users can manage cookie preferences in their account settings under Privacy & Data.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-warning-50 dark:bg-warning-900/20 border border-warning-300 dark:border-warning-700 rounded-lg p-4">
            <div className="flex gap-2">
              <XCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-warning-800 dark:text-warning-300 mb-1">Important Note</h4>
                <p className="text-sm text-warning-700 dark:text-warning-200">
                  Blocking or deleting essential cookies may prevent certain features of our platform from working properly, including Digital ID verification and emergency services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Cookies</h2>
          </div>
          <p className="mb-4">
            We use some third-party services that may set their own cookies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google Analytics:</strong> To understand how users interact with our platform
            </li>
            <li>
              <strong>Cloudflare:</strong> For security and performance optimization
            </li>
            <li>
              <strong>Social Media Platforms:</strong> For social sharing features
            </li>
          </ul>
          <p className="mt-4">
            These third parties have their own privacy policies governing their use of cookies.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Updates to This Policy</h2>
          </div>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make significant changes, we will notify you through the platform or via email.
          </p>
        </section>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 mt-12 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Questions About Cookies?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you have questions about our use of cookies, please contact our privacy team.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          Manage Cookie Preferences
        </button>
      </div>
    </div>
  )
}
