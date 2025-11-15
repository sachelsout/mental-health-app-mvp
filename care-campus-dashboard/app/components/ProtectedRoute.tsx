'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthorization = () => {
      if (authLoading) return;

      // First check: Is user authenticated?
      if (!user) {
        router.push('/signin');
        return;
      }

      // User is authenticated, allow access
      // The home page will handle consent/onboarding checks
      setIsAuthorized(true);
    };

    checkAuthorization();
  }, [user, authLoading, router]);

  // Show loading state while checking
  if (authLoading || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
}