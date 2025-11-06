import Link from 'next/link';
import { MessageSquare, Zap, Shield, TrendingUp } from 'lucide-react';

export default function AssistantPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Get intelligent insights and assistance powered by AI
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI-Powered Assistance</h2>
            <p className="text-blue-100">Available 24/7 for all your queries</p>
          </div>
        </div>
        <p className="text-lg">
          Our AI assistant can help you with tourist safety analysis, incident predictions, 
          crowd management suggestions, and more. Click the floating chat button at the 
          bottom-right corner of any page to start a conversation!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <Zap className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Instant Responses</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get immediate answers to your questions about tourist safety and system operations.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <Shield className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Safety Insights</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Receive AI-powered safety recommendations and risk assessments in real-time.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Predictive Analysis</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Leverage machine learning to predict potential incidents and optimize resources.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Common Questions</h2>
        <div className="space-y-3">
          {[
            'How can I check the current crowd density at popular tourist spots?',
            'What should I do if I encounter a safety incident?',
            'How do I report a lost tourist?',
            'What are the current high-risk areas?',
            'How can I view real-time tourist tracking data?',
          ].map((question, index) => (
            <button
              key={index}
              className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <p className="text-gray-900 dark:text-white font-medium">{question}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
              💡 Pro Tip: Use the Floating Chat
            </h3>
            <p className="text-blue-800 dark:text-blue-200">
              Look for the circular AI assistant button at the bottom-right corner of your screen. 
              You can drag it anywhere, minimize it, or click to start a conversation from any page!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
