import DashboardOverview from '@/components/DashboardOverview'
import CrowdAnalysis from '@/components/CrowdAnalysis'
import IncidentReporting from '@/components/IncidentReporting'
import DigitalIDVerification from '@/components/DigitalIDVerification'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Smart Tourist Safety Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          AI-powered monitoring and incident response system for tourist safety
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dashboard Overview */}
        <div className="lg:col-span-2">
          <DashboardOverview />
        </div>

        {/* Crowd Analysis */}
        <div className="lg:col-span-1">
          <CrowdAnalysis />
        </div>

        {/* Incident Reporting */}
        <div className="lg:col-span-1">
          <IncidentReporting />
        </div>

        {/* Digital ID Verification */}
        <div className="lg:col-span-2">
          <DigitalIDVerification />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            Emergency Alert
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            Report Incident
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            View Analytics
          </button>
          <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}
