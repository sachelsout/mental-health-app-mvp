'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';

function LessonCompleteContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-12">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <svg 
              className="w-12 h-12 text-green-600 dark:text-green-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Lesson Complete! 🎉
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Congratulations! You have successfully completed the lesson. Keep up the great work on your mental health journey.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/learn')}
              className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Back to Learn
            </button>
            <div>
              <button
                onClick={() => router.push('/')}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LessonCompletePage() {
  return (
    <ProtectedRoute>
      <LessonCompleteContent />
    </ProtectedRoute>
  );
}