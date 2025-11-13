'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ConsentScreen from '@/app/components/ConsentScreen';

export default function Home() {
  const router = useRouter();
  // State to track flow status
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already given consent on initial load.
    const consentGiven = sessionStorage.getItem('consent_given') === 'true';
    setHasConsent(consentGiven);
  }, []);

  const handleConsentAccepted = () => {
    // 1. Mark consent as accepted locally
    sessionStorage.setItem('consent_given', 'true');
    setHasConsent(true);
    
    // 2. IMMEDIATELY redirect to the dedicated onboarding route.
    router.replace('/onboarding');
  };
  
  // We no longer need handleOnboardingComplete or the isOnboarding state
  // because the actual Onboarding page at /onboarding will handle setting the flag 
  // and redirecting to the dashboard (i.e., this home page) when it's done.

  // --- RENDERING FLOW ---

  // 1. Show loading state while checking initial consent
  if (hasConsent === null) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // 2. Show consent screen if user hasn't accepted
  if (!hasConsent) {
    return <ConsentScreen onAccept={handleConsentAccepted} />;
  }

  // 3. Check if onboarding is complete.
  const onboardingIsComplete = sessionStorage.getItem('is_onboarding_complete') === 'true';

  // 4. Redirect to Onboarding if consent is given but onboarding is NOT complete.
  if (!onboardingIsComplete) {
    // This handles users who navigate directly to / or refresh the page after consent
    // but before completing onboarding.
    router.replace('/onboarding');
    return null; // Return nothing while redirecting
  }
  
  // 5. Show main dashboard only if consent is given AND onboarding is complete.
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <Image
          src="/XFoundry Logo.jpeg"
          alt="Mental Health Logo"
          width={150}
          height={150}
          className="mx-auto mb-6 rounded-full"
        />
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
          Welcome to the Care Campus Dashboard
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Your hub for mental health resources, learning modules, and support.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/learn')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Go to Learn
          </button>
          <button
            onClick={() => router.push('/resources')}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            View Resources
          </button>
          <button
            onClick={() => router.push('/chat')}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            Chat with Terry the Terp
          </button>
        </div>
      </div>
    </div>
  );
}