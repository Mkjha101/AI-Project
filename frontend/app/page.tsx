'use client';

import { useEffect } from 'react';
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
          router.replace('/select-role');
      }
    } else {
      // Redirect to role selection page
      router.replace('/select-role');
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading spinner while checking auth status
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
