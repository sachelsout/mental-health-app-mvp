'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import modules from '@/assets/sample_modules.json';
import ProtectedRoute from '@/app/components/ProtectedRoute';

interface Lesson {
  lesson_title: string;
  questions: string[];
}

interface Module {
  module_title: string;
  lessons: Lesson[];
}

function LearnContent() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
          Learn
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
          Select a module to explore different lessons on mental health and well-being.
        </p>

        {!selectedModule ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.modules.map((module, index) => (
              <button
                key={index}
                onClick={() => setSelectedModule(module)}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-left hover:border-blue-500 border-2 border-transparent"
              >
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-3">
                  {module.module_title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {module.lessons.length} lessons
                </p>
                <ul className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className="text-sm text-zinc-500 dark:text-zinc-500"
                    >
                      • {lesson.lesson_title}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
            <button
              onClick={() => setSelectedModule(null)}
              className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ← Back to Modules
            </button>

            <h2 className="text-3xl font-bold text-black dark:text-zinc-50 mb-8">
              {selectedModule.module_title}
            </h2>

            <div className="space-y-6">
              {selectedModule.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-6 py-4"
                >
                  <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                    {lesson.lesson_title}
                  </h3>
                  <button 
                    onClick={() => router.push(`/learn/${encodeURIComponent(lesson.lesson_title)}`)}
                    className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  > 
                    Complete Questions 
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Learn() {
  return (
    <ProtectedRoute>
      <LearnContent />
    </ProtectedRoute>
  );
}