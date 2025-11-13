'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user) {
      // Redirect to role-specific dashboard
      switch (user.role) {
        case 'admin':
          router.replace('/admin');
          break;
        case 'tourism-officer':
          router.replace('/officer');
          break;
        case 'tourist':
          router.replace('/tourist');
          break;
        default:
          router.replace('/admin');
      }
    } else {
      // stay on homepage for unauthenticated users
      // no redirect so homepage hero is visible
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading spinner while checking auth status
  // If still loading, show spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Public landing page hero
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">SaarthiAI</h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Guiding Every Journey, Securing Every Step</p>

            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-xl">
              SaarthiAI provides real-time tourist monitoring, digital identity verification and incident management to keep visitors safe and officers informed.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/auth/tourist/login" className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700">Login</Link>
              <Link href="/auth/tourist/signup" className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">Sign Up</Link>
              <Link href="/about" className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Learn more</Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Live Dashboard Preview</h3>
              <div className="h-72 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">Map & Live Data Preview</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
