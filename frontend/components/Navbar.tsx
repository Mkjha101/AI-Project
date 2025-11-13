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
    { name: 'Grievances', href: '/grievances', icon: AlertTriangle },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 shadow-lg border-b-2 border-primary-600 dark:border-accent-600 backdrop-blur-sm transition-all duration-200">
      <div className="w-full px-2 sm:px-3">
        <div className="flex items-center h-16 w-full">
          {/* Left: Logo + Name (extreme left with small padding) */}
          <div className="flex items-center flex-shrink-0 pl-2 pr-2">
            <Link href="/" className="flex items-center">
              <Shield className="h-7 w-7 text-white drop-shadow-lg" />
              <div className="ml-2">
                <div className="text-lg font-bold text-white">SaarthiAI</div>
                <div className="text-[11px] text-white/90">Guiding Every Journey, Securing Every Step</div>
              </div>
            </Link>
          </div>

          {/* Center: Navigation (flexible, will scroll horizontally if overflow) */}
          <div className="flex-1 hidden md:flex justify-center px-1">
            <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-md transition-all duration-150 whitespace-nowrap mx-0.5"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 pr-2">
            <ThemeSwitcher />
            <Link href="/auth/tourist/login" className="hidden md:inline-flex items-center px-2 py-1 text-sm font-medium text-white border border-white/20 bg-white/5 rounded-md">Login</Link>
            <Link href="/auth/tourist/signup" className="hidden md:inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-white/20 rounded-md">Sign Up</Link>
            <div className="flex items-center bg-white/10 px-2 py-1 rounded-md backdrop-blur-sm">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="ml-2 text-xs text-white font-medium">Online</span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-1.5 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-purple-800 border-t border-white/20">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}

            <div className="pt-3 border-t border-white/10">
              <Link href="/auth/tourist/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/auth/tourist/signup" className="mt-2 block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>

            <div className="px-3 py-3">
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