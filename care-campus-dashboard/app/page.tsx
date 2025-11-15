'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from './contexts/AuthContext';
import ConsentScreen from '@/app/components/ConsentScreen';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Check user status on mount
  useEffect(() => {
    async function checkUserStatus() {
      if (authLoading) return;

      // If not authenticated, redirect to signin
      if (!user) {
        router.push('/signin');
        return;
      }

      try {
        // Check user's consent and onboarding status from database
        const { data, error } = await supabase
          .from('users')
          .select('consent_accepted_at, campus_id, goals_json')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          setHasConsent(false);
          setHasCompletedOnboarding(false);
        } else {
          const hasGivenConsent = !!data.consent_accepted_at;
          const hasOnboarded = !!(data.campus_id && data.goals_json);

          setHasConsent(hasGivenConsent);
          setHasCompletedOnboarding(hasOnboarded);
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        setHasConsent(false);
        setHasCompletedOnboarding(false);
      } finally {
        setIsChecking(false);
      }
    }

    checkUserStatus();
  }, [user, authLoading, router]);

  // Redirect to onboarding if consent given but onboarding not completed
  useEffect(() => {
    if (!isChecking && hasConsent && hasCompletedOnboarding === false) {
      router.push('/onboarding');
    }
  }, [hasConsent, hasCompletedOnboarding, isChecking, router]);

  const handleConsentAccepted = async () => {
    if (!user) return;

    try {
      // Save consent to database
      await supabase
        .from('users')
        .update({ consent_accepted_at: new Date().toISOString() })
        .eq('id', user.id);

      setHasConsent(true);
    } catch (error) {
      console.error('Error saving consent:', error);
      throw error; // Re-throw so ConsentScreen can show error
    }
  };

  // Show loading state while checking
  if (authLoading || isChecking) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated (shouldn't reach here, but safety check)
  if (!user) {
    return null;
  }

  // Show consent screen if user hasn't accepted
  if (hasConsent === false) {
    return <ConsentScreen onAccept={handleConsentAccepted} />;
  }

  // Show loading while redirecting to onboarding
  if (hasConsent && hasCompletedOnboarding === false) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Redirecting to onboarding...</p>
        </div>
      </div>
    );
  }

  // Show main dashboard if everything is complete
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