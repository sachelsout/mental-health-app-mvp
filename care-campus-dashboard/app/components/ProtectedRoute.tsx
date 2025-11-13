'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasUserConsent } from '@/app/utils/consent';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConsent = () => {
      const hasConsent = hasUserConsent();
      
      if (!hasConsent) {
        // Redirect to home page which will show consent screen
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
    };

    checkConsent();
  }, [router]);

  // Show loading state while checking
  if (isAuthorized === null) {
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