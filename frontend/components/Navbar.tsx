'use client'

import { useState } from 'react'
import { Menu, X, Shield, AlertTriangle, Users, MapPin, Navigation, LayoutDashboard, QrCode } from 'lucide-react'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Shield },
    { name: 'Issue\u00A0ID', href: '/issue-id', icon: QrCode },
    { name: 'Tracking', href: '/tourist-tracking', icon: Navigation },
    { name: 'Admin', href: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
    { name: 'Crowd', href: '/crowd', icon: Users },
    { name: 'Geofences', href: '/geofences', icon: MapPin },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 shadow-lg border-b-2 border-primary-600 dark:border-accent-600 backdrop-blur-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <Shield className="h-7 w-7 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-xl font-bold text-white drop-shadow-md group-hover:text-white/90 transition-colors">
                Smart Tourist Safety
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-2 md:items-center">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="w-5 h-5 flex items-center justify-center mr-1.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="hidden lg:inline">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Status indicator & Theme Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/geofences"
              className="group inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <MapPin className="w-5 h-5 mr-1.5" />
              <span>Geofence</span>
            </Link>
            
            <ThemeSwitcher />
            
            <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="ml-2 text-xs text-white font-medium">Online</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-purple-800 border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              )
            })}
            
            <div className="px-3 py-2 border-t border-white/20 mt-2">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="ml-2 text-sm text-white">Systems Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}