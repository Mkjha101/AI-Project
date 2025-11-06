import { Eye, EyeOff, Type, Zap, Heart, Headphones, FileText, Users } from 'lucide-react'

export default function AccessibilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Accessibility
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're committed to making Smart Tourist Safety accessible to everyone, regardless of ability.
        </p>
      </div>

      {/* Accessibility Commitment */}
      <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 mb-12 border border-primary-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <Heart className="w-12 h-12 text-primary-600 dark:text-primary-400 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Our Commitment to Accessibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Smart Tourist Safety is dedicated to ensuring digital accessibility for people with disabilities. We continuously work to improve the user experience for everyone and apply relevant accessibility standards.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards published by the World Wide Web Consortium (W3C).
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Eye className="w-12 h-12 text-primary-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Screen Reader Support</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Full compatibility with JAWS, NVDA, VoiceOver, and TalkBack for visually impaired users
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Type className="w-12 h-12 text-secondary-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Adjustable Text Size</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Increase or decrease text size up to 200% without loss of functionality
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Zap className="w-12 h-12 text-accent-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Keyboard Navigation</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Complete functionality accessible via keyboard without requiring a mouse
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <EyeOff className="w-12 h-12 text-primary-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">High Contrast Mode</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Enhanced visual contrast for users with low vision or color blindness
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <Headphones className="w-12 h-12 text-secondary-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Audio Descriptions</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Audio guidance for important alerts and notifications
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <FileText className="w-12 h-12 text-accent-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Alternative Text</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Descriptive alt text for all images, icons, and visual elements
          </p>
        </div>
      </div>

      {/* WCAG Compliance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          WCAG 2.1 Level AA Compliance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">P</span>
              Perceivable
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• All non-text content has text alternatives</li>
              <li>• Content can be presented in different ways</li>
              <li>• Content is easier to see and hear</li>
              <li>• Sufficient color contrast ratios (minimum 4.5:1)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">O</span>
              Operable
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• All functionality available from keyboard</li>
              <li>• Users have enough time to read and use content</li>
              <li>• Content doesn't cause seizures or physical reactions</li>
              <li>• Users can navigate and find content easily</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold">U</span>
              Understandable
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Text is readable and understandable</li>
              <li>• Content appears and operates predictably</li>
              <li>• Users are helped to avoid and correct mistakes</li>
              <li>• Clear error messages and instructions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">R</span>
              Robust
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Content compatible with assistive technologies</li>
              <li>• Valid HTML markup for proper interpretation</li>
              <li>• ARIA landmarks and roles properly implemented</li>
              <li>• Works across browsers and devices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Assistive Technologies */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Supported Assistive Technologies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-6 border border-primary-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Screen Readers</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• JAWS (Windows)</li>
              <li>• NVDA (Windows)</li>
              <li>• VoiceOver (Mac, iOS)</li>
              <li>• TalkBack (Android)</li>
              <li>• Narrator (Windows)</li>
            </ul>
          </div>

          <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-6 border border-secondary-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Input Devices</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Keyboard navigation</li>
              <li>• Voice control</li>
              <li>• Switch access</li>
              <li>• Eye tracking</li>
              <li>• Touch alternatives</li>
            </ul>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-6 border border-accent-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Visual Aids</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• Screen magnifiers</li>
              <li>• Color filters</li>
              <li>• High contrast themes</li>
              <li>• Browser zoom</li>
              <li>• Custom stylesheets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How to Use Accessibility Features */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          How to Use Accessibility Features
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Tab</kbd> - Navigate forward
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Shift + Tab</kbd> - Navigate backward
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Enter</kbd> - Activate button/link
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Space</kbd> - Select checkbox
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Esc</kbd> - Close modal/menu
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Arrow Keys</kbd> - Navigate menu items
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Adjust Text Size</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              You can adjust text size in multiple ways:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>Use browser zoom: Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Ctrl/Cmd +</kbd> to increase, <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-xs">Ctrl/Cmd -</kbd> to decrease</li>
              <li>Go to Settings → Accessibility → Text Size to adjust app-specific text sizing</li>
              <li>Use your device's built-in accessibility settings</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Enable High Contrast Mode</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Navigate to Settings → Accessibility → High Contrast Mode, or use your operating system's high contrast settings.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Accessibility */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Mobile Accessibility
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">iOS Features</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• VoiceOver screen reader support</li>
              <li>• Dynamic Type for adjustable text</li>
              <li>• Voice Control for hands-free navigation</li>
              <li>• Reduce Motion option</li>
              <li>• AssistiveTouch for gesture alternatives</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Android Features</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• TalkBack screen reader support</li>
              <li>• Font size and display adjustments</li>
              <li>• Voice Access for voice commands</li>
              <li>• Select to Speak feature</li>
              <li>• Switch Access for external switches</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feedback & Support */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-primary-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Accessibility Feedback</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We welcome your feedback on the accessibility of Smart Tourist Safety. If you encounter accessibility barriers, please let us know:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-50 dark:bg-gray-900 rounded-lg p-4 border border-primary-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">Email</p>
            <a href="mailto:accessibility@smarttouristsafety.com" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              accessibility@smarttouristsafety.com
            </a>
          </div>

          <div className="bg-secondary-50 dark:bg-gray-900 rounded-lg p-4 border border-secondary-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">Phone</p>
            <a href="tel:+919876543210" className="text-sm text-secondary-600 dark:text-secondary-400 hover:underline">
              +91 98765 43210
            </a>
          </div>

          <div className="bg-accent-50 dark:bg-gray-900 rounded-lg p-4 border border-accent-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Within 2 business days
            </p>
          </div>
        </div>

        <div className="mt-6 bg-warning-50 dark:bg-warning-900/20 border border-warning-300 dark:border-warning-700 rounded-lg p-4">
          <p className="text-sm text-warning-800 dark:text-warning-200">
            <strong>Note:</strong> We aim to respond to accessibility feedback within 2 business days and resolve issues within 30 days when feasible.
          </p>
        </div>
      </div>

      {/* Continuous Improvement */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-lg p-12 text-center text-white">
        <Heart className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          Committed to Continuous Improvement
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Accessibility is an ongoing effort. We regularly audit our platform, train our team, and implement improvements based on user feedback and evolving standards.
        </p>
        <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          Share Your Accessibility Feedback
        </button>
      </div>
    </div>
  )
}
