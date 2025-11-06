import { Shield, UserCheck, Lock, Eye, AlertTriangle, CheckCircle, FileText, Users } from 'lucide-react'

export default function TrustSafetyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Trust & Safety
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Building a secure platform where tourists can travel confidently and safely across India.
        </p>
      </div>

      {/* Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Security First</h3>
          <p className="text-primary-100">
            Military-grade encryption and blockchain technology protect your data and identity
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-8 text-white text-center">
          <UserCheck className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Verified Users</h3>
          <p className="text-secondary-100">
            Every user undergoes identity verification before receiving a Digital ID
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Eye className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">24/7 Monitoring</h3>
          <p className="text-accent-100">
            Continuous oversight by authorities and AI systems for rapid response
          </p>
        </div>
      </div>

      {/* Security Measures */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Security Measures</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technical Security</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">End-to-End Encryption</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AES-256 encryption for all sensitive data transmission</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Blockchain Verification</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Immutable identity records on distributed ledger</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Multi-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Additional verification layers for account access</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Regular Security Audits</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quarterly penetration testing and vulnerability assessments</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Intrusion Detection</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Real-time monitoring for suspicious activities</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Operational Security</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Identity Verification</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered document and facial recognition</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Access Controls</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Role-based permissions for authority personnel</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Data Minimization</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Collect only essential information for safety</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Compliance Standards</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ISO 27001, GDPR, and Indian data protection laws</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Incident Response Team</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">24/7 security team ready to respond to threats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Guidelines for Users */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-secondary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Role in Safety</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          While we provide comprehensive security measures, your cooperation helps maintain a safe environment for everyone:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-6 border border-primary-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">✓ Do</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Keep your Digital ID secure and confidential</li>
              <li>• Use strong, unique passwords</li>
              <li>• Enable two-factor authentication</li>
              <li>• Report suspicious activities immediately</li>
              <li>• Keep your emergency contacts updated</li>
              <li>• Review your privacy settings regularly</li>
              <li>• Log out from shared devices</li>
            </ul>
          </div>

          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-6 border border-danger-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">✗ Don't</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Share your account credentials with anyone</li>
              <li>• Click on suspicious links or emails</li>
              <li>• Disable security features for convenience</li>
              <li>• Use public WiFi without VPN</li>
              <li>• Share your QR code publicly</li>
              <li>• Ignore security alerts or notifications</li>
              <li>• Post sensitive information on social media</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Incident Response */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-8 h-8 text-warning-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reporting & Response</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Report Issue</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use the app to report any safety concern, suspicious activity, or security incident immediately
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">2</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Rapid Assessment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our AI and security team analyze the report within minutes and determine appropriate action
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">3</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Swift Action</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Authorities are notified, response teams deployed, and you're kept informed throughout the process
            </p>
          </div>
        </div>
      </div>

      {/* Community Standards */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-accent-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Community Standards</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our community is built on mutual respect and safety. We expect all users to:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Respect Others</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Treat all users, authorities, and service providers with courtesy and respect
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Accurate Information</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Provide truthful information and report incidents honestly
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Follow Local Laws</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Comply with Indian laws, regulations, and local customs
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Protect Privacy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Respect the privacy of other users and don't share their information without consent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Security Certifications & Compliance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <FileText className="w-12 h-12 text-primary-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900 dark:text-white">ISO 27001</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Information Security</p>
          </div>
          <div>
            <Shield className="w-12 h-12 text-secondary-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900 dark:text-white">GDPR</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Data Protection</p>
          </div>
          <div>
            <Lock className="w-12 h-12 text-accent-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900 dark:text-white">SOC 2 Type II</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Security Controls</p>
          </div>
          <div>
            <FileText className="w-12 h-12 text-primary-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-900 dark:text-white">DPDP Act</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Indian Compliance</p>
          </div>
        </div>
      </div>

      {/* Contact Security Team */}
      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Security Concerns or Questions?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our security team is available 24/7 to address your trust and safety concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            Contact Security Team
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-300 dark:border-gray-600">
            Report Security Issue
          </button>
        </div>
      </div>
    </div>
  )
}
