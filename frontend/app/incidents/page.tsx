import Link from 'next/link';
import { AlertTriangle, Plus, TrendingDown, Clock } from 'lucide-react';

export default function IncidentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Incident Management</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Monitor and respond to tourist safety incidents
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Report Incident
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Incidents</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">47</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">42</p>
            </div>
            <TrendingDown className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">5</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Incidents</h2>
        <p className="text-gray-600 dark:text-gray-400">Coming soon: Full incident management system with reporting, tracking, and resolution workflows.</p>
      </div>
    </div>
  );
}
