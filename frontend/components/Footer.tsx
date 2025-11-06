'use client'

import Link from 'next/link'
import { Shield, Phone, Mail, MapPin, Twitter, Facebook, Instagram, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Safety Guidelines', href: '/safety-guidelines' },
    { name: 'Community Standards', href: '/community-standards' },
  ]

  const support = [
    { name: 'Help Center', href: '/help-center' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Trust & Safety', href: '/trust-safety' },
    { name: 'Accessibility', href: '/accessibility' },
  ]

  const legal = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Data Protection', href: '/data-protection' },
  ]

  const resources = [
    { name: 'Tourist Resources', href: '/tourist-resources' },
    { name: 'Authority Portal', href: '/authority-portal' },
    { name: 'Emergency Services', href: '/emergency-services' },
    { name: 'Community Forum', href: '/community-forum' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4 group">
              <Shield className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
              <span className="ml-2 text-lg font-bold text-white">
                Smart Tourist Safety
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered safety monitoring and incident response system protecting tourists across India with real-time tracking and blockchain technology.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-primary-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-primary-400" />
                <span>hello@smarttouristsafety.com</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                <span>Digital India Initiative</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 dark:border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center text-sm text-gray-400">
              <span>© {currentYear} Smart Tourist Safety. Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" />
              <span>for Safe India</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
