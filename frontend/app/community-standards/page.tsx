import { Users, Heart, MessageCircle, ThumbsUp, Flag, Shield, Award, TrendingUp } from 'lucide-react'

export default function CommunityStandardsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Community Standards
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Guidelines for building a respectful, safe, and supportive community for tourists across India.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-lg font-bold">Respect</h3>
          <p className="text-sm text-primary-100 mt-2">Treat everyone with dignity and kindness</p>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-6 text-white text-center">
          <Shield className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-lg font-bold">Safety</h3>
          <p className="text-sm text-secondary-100 mt-2">Prioritize the wellbeing of all users</p>
        </div>

        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg p-6 text-white text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-lg font-bold">Honesty</h3>
          <p className="text-sm text-accent-100 mt-2">Provide accurate and truthful information</p>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg shadow-lg p-6 text-white text-center">
          <Users className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-lg font-bold">Inclusion</h3>
          <p className="text-sm text-white/80 mt-2">Welcome diversity and different perspectives</p>
        </div>
      </div>

      {/* Expected Behavior */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <ThumbsUp className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Expected Behavior</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We expect all community members to:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Be Respectful</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Treat others with courtesy regardless of nationality, culture, religion, or background
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Communicate Clearly</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Express yourself politely and constructively in all interactions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Share Responsibly</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Provide accurate information and helpful feedback to the community
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Respect Privacy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Don't share others' personal information without explicit consent
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-secondary-600 dark:text-secondary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Report Issues</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Alert authorities about safety concerns or violations promptly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-secondary-600 dark:text-secondary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Follow Local Customs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Respect Indian culture, traditions, and local regulations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-secondary-600 dark:text-secondary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Support Others</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Help fellow tourists with advice, guidance, and encouragement
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-secondary-600 dark:text-secondary-400 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Be Accountable</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Take responsibility for your actions and their impact on others
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prohibited Conduct */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Flag className="w-8 h-8 text-danger-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Prohibited Conduct</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The following behaviors are not tolerated in our community:
        </p>

        <div className="space-y-4">
          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-danger-800">
            <h4 className="font-bold text-danger-800 dark:text-danger-300 mb-2">❌ Harassment & Bullying</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Threatening, intimidating, or demeaning behavior towards any user, including stalking, trolling, or persistent unwanted contact
            </p>
          </div>

          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-danger-800">
            <h4 className="font-bold text-danger-800 dark:text-danger-300 mb-2">❌ Hate Speech & Discrimination</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Content or behavior that promotes hatred, violence, or discrimination based on race, ethnicity, religion, nationality, gender, sexual orientation, or disability
            </p>
          </div>

          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-danger-800">
            <h4 className="font-bold text-danger-800 dark:text-danger-300 mb-2">❌ False Information</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Deliberately spreading misinformation, fake incidents, or fraudulent claims that could endanger others or undermine the platform
            </p>
          </div>

          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-danger-800">
            <h4 className="font-bold text-danger-800 dark:text-danger-300 mb-2">❌ Privacy Violations</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Sharing others' personal information, Digital IDs, location data, or private communications without consent
            </p>
          </div>

          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-danger-800">
            <h4 className="font-bold text-danger-800 dark:text-danger-300 mb-2">❌ Abuse of Platform</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Misusing emergency features, spamming, creating fake accounts, or attempting to manipulate the system
            </p>
          </div>

          <div className="bg-danger-50 dark:bg-gray-900 rounded-lg p-4 border border-danger-200 dark:border-danger-800">
            <h4 className="font-bold text-danger-800 dark:text-danger-300 mb-2">❌ Illegal Activities</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Using the platform for any illegal purposes, including fraud, trafficking, or solicitation of illegal goods/services
            </p>
          </div>
        </div>
      </div>

      {/* Reporting Violations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Flag className="w-8 h-8 text-warning-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reporting Violations</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you witness or experience a violation of community standards:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-warning-600 dark:text-warning-400">1</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Identify the Issue</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Document what happened, when, and who was involved (if known)
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-warning-600 dark:text-warning-400">2</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Submit Report</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use the "Report" feature in the app or contact support directly
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-warning-600 dark:text-warning-400">3</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">We Investigate</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our team reviews all reports within 24 hours and takes appropriate action
            </p>
          </div>
        </div>

        <div className="mt-8 bg-primary-50 dark:bg-gray-900 rounded-lg p-6 border border-primary-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Confidentiality:</strong> All reports are handled confidentially. Your identity will be protected, and we will not share your report with the accused party unless required by law.
          </p>
        </div>
      </div>

      {/* Enforcement & Consequences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-accent-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Enforcement & Consequences</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Violations of community standards may result in:
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-warning-600 dark:text-warning-400 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Warning</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                First-time minor violations typically result in a formal warning and education about standards
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-warning-600 dark:text-warning-400 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Temporary Suspension</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Repeated or moderate violations may lead to temporary account suspension (7-30 days)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-danger-100 dark:bg-danger-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-danger-600 dark:text-danger-400 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Permanent Ban</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Severe or repeated violations result in permanent account termination and potential legal action
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Positive Contributions */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-12 mb-12 text-white">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Recognize Positive Contributions</h2>
          <p className="text-xl text-white/90">
            We celebrate community members who exemplify our standards and help others
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Community Badges</h3>
            <p className="text-sm text-white/80">Earn recognition for helpful contributions</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
            <Users className="w-10 h-10 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Featured Stories</h3>
            <p className="text-sm text-white/80">Share your positive experiences with the community</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
            <Heart className="w-10 h-10 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Thank You Notes</h3>
            <p className="text-sm text-white/80">Appreciate others who helped you feel safe</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-primary-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Questions About Community Standards?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our community team is here to clarify any questions about expected behavior and reporting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            Contact Community Team
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-300 dark:border-gray-600">
            Report Violation
          </button>
        </div>
      </div>
    </div>
  )
}
