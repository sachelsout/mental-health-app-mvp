'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import CampusSelect from './CampusSelect';
import GoalsChips from './GoalsChips';

function OnboardingPageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [campus, setCampus] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    // Check if user has selected required fields before proceeding
    if (!campus || goals.length === 0) {
        setError("Please select a campus and at least one goal to continue.");
        return;
    }

    if (!user) {
        setError("User not authenticated.");
        return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Save onboarding data to Supabase users table
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          campus_id: campus,
          goals_json: goals
        })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Redirect to home page (dashboard)
      router.push('/');
    } catch (err: any) {
      console.error('Error saving onboarding data:', err);
      setError(err.message || "Failed to save onboarding data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          Tell us about yourself
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            This information helps us personalize your Care Campus experience.
        </p>

        <CampusSelect value={campus} onChange={setCampus} />
        <GoalsChips value={goals} onChange={setGoals} />

        {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg border border-red-300 dark:border-red-700">
                <p className="font-medium">Error: {error}</p>
            </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!campus || goals.length === 0 || loading}
          className="w-full mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? 'Saving and Continuing...' : 'Start My Journey'}
        </button>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingPageContent />
    </ProtectedRoute>
  );
}