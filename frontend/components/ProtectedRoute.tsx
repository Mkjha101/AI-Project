'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export default function ProtectedRoute({ children, allowedRoles, redirectTo }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Not logged in, redirect to appropriate login
        const loginPath = allowedRoles[0] === 'admin' 
          ? '/auth/admin/login'
          : allowedRoles[0] === 'tourism-officer'
          ? '/auth/officer/login'
          : '/auth/tourist/login';
        
        router.push(redirectTo || loginPath);
      } else if (user && !allowedRoles.includes(user.role)) {
        // Wrong role, redirect to their dashboard
        const dashboardPath = user.role === 'admin'
          ? '/admin'
          : user.role === 'tourism-officer'
          ? '/officer'
          : '/tourist';
        
        router.push(dashboardPath);
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
