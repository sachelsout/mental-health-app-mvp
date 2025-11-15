'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { getCampusNameById } from '@/app/utils/campusUtils';

function SettingsContent() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('users')
          .select('campus_id, goals_json')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user]);

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') {
        alert('Please type DELETE to confirm account deletion');
        return;
    }

    if (!user) return;

    setIsDeleting(true);

    try {
        // Call API route to delete account (uses admin privileges)
        const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
        }

        // Sign out the user
        await signOut();

        // Redirect to signup page
        router.push('/signup');
    
        alert('Your account has been successfully deleted.');
    }   catch (error: any) {
        console.error('Error deleting account:', error);
        alert(error.message || 'Failed to delete account. Please try again or contact support.');
        setIsDeleting(false);
    }
};

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8">
          Account Settings
        </h1>

        {/* Account Info */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
            Account Information
          </h2>
          
          {loading ? (
            <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Email</p>
                <p className="text-base font-medium text-black dark:text-zinc-50">
                  {user?.email}
                </p>
              </div>
              
              {userProfile?.campus_id && (
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Campus</p>
                  <p className="text-base font-medium text-black dark:text-zinc-50">
                    {getCampusNameById(userProfile.campus_id)}
                  </p>
                </div>
              )}
              
              {userProfile?.goals_json && userProfile.goals_json.length > 0 && (
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.goals_json.map((goal: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Danger Zone - same as before */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 border-2 border-red-300 dark:border-red-800">
          <h2 className="text-2xl font-semibold text-red-900 dark:text-red-200 mb-4">
            Danger Zone
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            Once you delete your account, there is no going back. This will permanently delete:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-zinc-700 dark:text-zinc-300">
            <li>Your profile and account information</li>
            <li>Your learning progress and completed lessons</li>
            <li>Your check-ins and assessments</li>
            <li>All associated data</li>
          </ul>

          {!showConfirmDialog ? (
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-300 dark:border-red-800">
              <p className="font-semibold text-red-900 dark:text-red-200">
                Are you absolutely sure?
              </p>
              <p className="text-sm text-red-800 dark:text-red-300">
                Type <span className="font-mono font-bold">DELETE</span> to confirm account deletion
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isDeleting}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || confirmText !== 'DELETE'}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                </button>
                <button
                  onClick={() => {
                    setShowConfirmDialog(false);
                    setConfirmText('');
                  }}
                  disabled={isDeleting}
                  className="px-6 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}