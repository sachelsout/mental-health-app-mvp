'use client';

// import { useState } from 'react';
import { useRouter } from 'next/navigation';
import modules from '@/assets/sample_modules.json';

export default function LessonCompletePage() {
  const router = useRouter();

    // Format a congratulatory message with a "Back to Learn" button
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Lesson Complete
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Congratulations! You have completed the lesson.
          </p>
          <button
            onClick={() => router.push('/learn')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Back to Learn
          </button>
        </div>
      </div>
    );
}