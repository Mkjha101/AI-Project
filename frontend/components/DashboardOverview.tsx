'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Activity, AlertTriangle, Users, Shield, TrendingUp } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ElementType
  color: string
}

function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-xl">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change && (
            <p className="text-xs text-success-600 dark:text-success-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const mockData = {
  incidents: [
    { hour: '00:00', count: 2 },
    { hour: '04:00', count: 1 },
    { hour: '08:00', count: 5 },
    { hour: '12:00', count: 8 },
    { hour: '16:00', count: 12 },
    { hour: '20:00', count: 6 },
  ],
  crowdDensity: [
    { area: 'Tourist Zone A', density: 85 },
    { area: 'Tourist Zone B', density: 67 },
    { area: 'Tourist Zone C', density: 42 },
    { area: 'Tourist Zone D', density: 29 },
  ],
  riskLevels: [
    { name: 'Low', value: 60, color: '#22c55e' },
    { name: 'Medium', value: 30, color: '#f59e0b' },
    { name: 'High', value: 10, color: '#ef4444' },
  ]
}

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalIncidents: 0,
    activeAlerts: 0,
    crowdCount: 0,
    systemStatus: 'Online'
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalIncidents: 23,
        activeAlerts: 3,
        crowdCount: 1247,
        systemStatus: 'Online'
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">System Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Incidents"
            value={stats.totalIncidents}
            change="+12% vs last week"
            icon={AlertTriangle}
            color="bg-danger-500"
          />
          <StatsCard
            title="Active Alerts"
            value={stats.activeAlerts}
            change="-5% vs last week"
            icon={Activity}
            color="bg-warning-500"
          />
          <StatsCard
            title="People Monitored"
            value={stats.crowdCount.toLocaleString()}
            change="+8% vs last week"
            icon={Users}
            color="bg-primary-500"
          />
          <StatsCard
            title="System Status"
            value={stats.systemStatus}
            icon={Shield}
            color="bg-success-500"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incidents Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Incidents Today</h3>
          </div>
          <div className="chart-container" style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.incidents}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                  labelStyle={{ color: '#f3f4f6', fontWeight: 'bold' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Bar dataKey="count" fill="#ff9933" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Risk Distribution</h3>
          </div>
          <div className="chart-container" style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.riskLevels}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry: { name?: string; percent?: number }) => {
                    const n = entry?.name ?? ''
                    const p = typeof entry?.percent === 'number' ? entry.percent : 0
                    return `${n} ${(p * 100).toFixed(0)}%`
                  }}
                >
                  {mockData.riskLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Crowd Density */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">Crowd Density by Area</h3>
        </div>
        <div className="chart-container" style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.crowdDensity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="area" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6'
                }}
                labelStyle={{ color: '#f3f4f6', fontWeight: 'bold' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Line type="monotone" dataKey="density" stroke="#138808" strokeWidth={3} dot={{ fill: '#138808', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {[
            { time: '2 min ago', event: 'Crowd density alert in Tourist Zone A', type: 'warning' },
            { time: '15 min ago', event: 'Emergency response deployed to incident #1247', type: 'info' },
            { time: '32 min ago', event: 'New digital ID verified successfully', type: 'success' },
            { time: '45 min ago', event: 'Geofence breach detected in restricted area', type: 'danger' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success-500' :
                  activity.type === 'warning' ? 'bg-warning-500' :
                  activity.type === 'danger' ? 'bg-danger-500' : 'bg-primary-500'
                }`}></div>
                <span className="text-sm text-gray-900 dark:text-white">{activity.event}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}