'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import ConsentScreen from '@/app/components/ConsentScreen';

export default function Home() {
  const router = useRouter();

  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  // --- 1. On first load, read consent + onboarding flags safely ---
  useEffect(() => {
    const consentGiven = sessionStorage.getItem('consent_given') === 'true';
    const onboardingFlag = sessionStorage.getItem('is_onboarding_complete') === 'true';

    setHasConsent(consentGiven);
    setOnboardingComplete(onboardingFlag);
  }, []);

  // --- 2. Handle redirect logic inside effect (NOT during render) ---
  useEffect(() => {
    if (hasConsent === true && onboardingComplete === false) {
      router.replace('/onboarding');
    }
  }, [hasConsent, onboardingComplete, router]);

  // --- EVENT HANDLERS ---
  const handleConsentAccepted = () => {
    sessionStorage.setItem('consent_given', 'true');
    setHasConsent(true);
    router.replace('/onboarding');
  };

  // --- RENDER FLOW ---

  // (A) Still loading state
  if (hasConsent === null || onboardingComplete === null) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // (B) No consent? Show consent screen
  if (!hasConsent) {
    return <ConsentScreen onAccept={handleConsentAccepted} />;
  }

  // (C) If consent is given but onboarding not complete, show nothing (redirect handled in useEffect)
  if (hasConsent && onboardingComplete === false) {
    return null;
  }

  // (D) Show Dashboard — consent given + onboarding complete
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
