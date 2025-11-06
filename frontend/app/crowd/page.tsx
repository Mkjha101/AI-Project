import Link from 'next/link';
import { Users, TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function CrowdPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Crowd Analysis</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Real-time crowd density monitoring and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Tourists</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,247</p>
            </div>
            <Users className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hotspots</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">8</p>
            </div>
            <MapPin className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Density</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">63%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alerts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">3</p>
            </div>
            <AlertCircle className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Crowd Heatmap</h2>
        <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Map visualization coming soon...</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Popular Locations</h2>
        <div className="space-y-4">
          {[
            { name: 'Gateway of India', count: 342, density: 'High', color: 'red' },
            { name: 'Marine Drive', count: 289, density: 'Medium', color: 'yellow' },
            { name: 'Colaba Causeway', count: 156, density: 'Medium', color: 'yellow' },
            { name: 'Juhu Beach', count: 124, density: 'Low', color: 'green' },
          ].map((location, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{location.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{location.count} tourists</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                location.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                location.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {location.density}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
