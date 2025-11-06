import { Shield, Lock, Database, Eye, UserCheck, FileText, Globe, AlertTriangle } from 'lucide-react'

export default function DataProtectionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Data Protection
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          How we protect and manage your personal data with the highest security standards
        </p>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-primary-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Your Data, Our Priority
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Smart Tourist Safety is committed to protecting your personal data in compliance with international data protection regulations, including GDPR and India's Digital Personal Data Protection Act.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security Measures</h2>
          </div>
          <p className="mb-4">
            We employ comprehensive technical and organizational measures to protect your data:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Technical Safeguards</h3>
              <ul className="space-y-1 text-sm">
                <li>• End-to-end encryption (AES-256)</li>
                <li>• Blockchain for immutable records</li>
                <li>• Multi-factor authentication</li>
                <li>• Regular security audits</li>
                <li>• Intrusion detection systems</li>
                <li>• Secure data centers (ISO 27001)</li>
              </ul>
            </div>

            <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Organizational Safeguards</h3>
              <ul className="space-y-1 text-sm">
                <li>• Strict access controls</li>
                <li>• Employee training programs</li>
                <li>• Data minimization practices</li>
                <li>• Regular compliance reviews</li>
                <li>• Incident response procedures</li>
                <li>• Third-party audits</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Processing Principles</h2>
          </div>
          <p className="mb-4">
            We process your personal data in accordance with these fundamental principles:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Lawfulness & Transparency</h4>
                <p className="text-sm">We process data only for legitimate purposes and keep you informed about how we use your data.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-secondary-600 dark:text-secondary-400 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Purpose Limitation</h4>
                <p className="text-sm">Data is collected for specific, explicit purposes and not used for incompatible purposes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-600 dark:text-accent-400 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Data Minimization</h4>
                <p className="text-sm">We collect only data that is necessary and relevant for providing our services.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Accuracy</h4>
                <p className="text-sm">We take steps to ensure data is accurate and up-to-date, with mechanisms for correction.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-secondary-600 dark:text-secondary-400 font-bold">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Storage Limitation</h4>
                <p className="text-sm">Data is retained only as long as necessary for the purposes for which it was collected.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-600 dark:text-accent-400 font-bold">6</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Integrity & Confidentiality</h4>
                <p className="text-sm">Data is protected against unauthorized access, loss, or damage through appropriate security.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Data Rights</h2>
          </div>
          <p className="mb-4">
            Under data protection laws, you have the following rights:
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Access</h4>
              <p className="text-sm">Request a copy of all personal data we hold about you.</p>
            </div>

            <div className="border-l-4 border-secondary-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Rectification</h4>
              <p className="text-sm">Correct inaccurate or incomplete personal data.</p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Erasure ("Right to be Forgotten")</h4>
              <p className="text-sm">Request deletion of your personal data under certain conditions.</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Restrict Processing</h4>
              <p className="text-sm">Limit how we use your personal data in specific situations.</p>
            </div>

            <div className="border-l-4 border-secondary-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Data Portability</h4>
              <p className="text-sm">Receive your data in a structured, machine-readable format.</p>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Object</h4>
              <p className="text-sm">Object to processing of your data for specific purposes.</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Right to Withdraw Consent</h4>
              <p className="text-sm">Withdraw your consent for data processing at any time.</p>
            </div>
          </div>

          <div className="mt-6 bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
            <p className="text-sm">
              <strong>To exercise your rights:</strong> Email us at dataprotection@smarttouristsafety.com or use the Data Rights request form in your account settings. We will respond within 30 days.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">International Data Transfers</h2>
          </div>
          <p className="mb-4">
            Your data may be transferred to and processed in countries outside of India for service delivery. When we transfer data internationally, we ensure:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Adequate level of protection as required by law</li>
            <li>Standard contractual clauses approved by regulatory authorities</li>
            <li>Compliance with both Indian and international data protection laws</li>
            <li>Additional security measures for cross-border transfers</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-secondary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Processing Activities</h2>
          </div>
          <p className="mb-4">
            We maintain a record of all data processing activities:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Processing Activity</th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Legal Basis</th>
                  <th className="px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Retention Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3">Account Management</td>
                  <td className="px-4 py-3">Contract</td>
                  <td className="px-4 py-3">Account lifetime</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">GPS Tracking</td>
                  <td className="px-4 py-3">Consent & Legitimate Interest</td>
                  <td className="px-4 py-3">90 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Digital ID Issuance</td>
                  <td className="px-4 py-3">Legal Obligation</td>
                  <td className="px-4 py-3">5 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Incident Reports</td>
                  <td className="px-4 py-3">Legal Obligation</td>
                  <td className="px-4 py-3">7 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Marketing Communications</td>
                  <td className="px-4 py-3">Consent</td>
                  <td className="px-4 py-3">Until withdrawal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-warning-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Breach Notification</h2>
          </div>
          <p className="mb-4">
            In the unlikely event of a data breach that poses a risk to your rights and freedoms, we will:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Notify relevant supervisory authorities within 72 hours</li>
            <li>Inform affected individuals without undue delay</li>
            <li>Provide clear information about the breach and remedial actions</li>
            <li>Take immediate steps to mitigate the impact</li>
            <li>Conduct a thorough investigation and implement preventive measures</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection Officer</h2>
          </div>
          <p className="mb-4">
            Our Data Protection Officer oversees compliance with data protection laws and handles data protection inquiries.
          </p>
          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <p><strong>Contact the DPO:</strong></p>
            <p className="mt-2">
              Email: dpo@smarttouristsafety.com<br />
              Address: Data Protection Officer, Smart Tourist Safety, Digital India Tower, New Delhi - 110001
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Supervisory Authority</h2>
          </div>
          <p className="mb-4">
            You have the right to lodge a complaint with your local data protection supervisory authority if you believe we have not complied with data protection laws.
          </p>
          <p>
            In India, you can contact the Data Protection Board of India once it is constituted under the Digital Personal Data Protection Act, 2023.
          </p>
        </section>
      </div>

      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 mt-12 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Data Protection Questions?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our data protection team is here to answer your questions and help you exercise your rights.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          Contact Data Protection Team
        </button>
      </div>
    </div>
  )
}
