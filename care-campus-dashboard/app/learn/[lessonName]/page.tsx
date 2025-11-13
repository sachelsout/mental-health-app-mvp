'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import modules from '@/assets/sample_modules.json';
import ProtectedRoute from '@/app/components/ProtectedRoute';

interface Lesson {
  lesson_title: string;
  questions: string[];
}

function LessonContent() {
  const router = useRouter();
  const params = useParams();
  const lessonName = decodeURIComponent(params.lessonName as string);
  const [answer, setAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);

  // Find the lesson from the modules
  let lesson: Lesson | null = null;
  for (const module of modules.modules) {
    const found = module.lessons.find((l) => l.lesson_title === lessonName) as Lesson | undefined;
    if (found) {
      lesson = found;
      break;
    }
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ← Back
          </button>
          <div className="text-center py-12">
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Lesson not found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesson) return;

    // Placeholder: record the current answer (could be sent to API or localStorage)
    console.log(`Answer for "${lesson.lesson_title}" (question ${questionIndex + 1}):`, answer);

    const isLast = questionIndex >= lesson.questions.length - 1;
    if (!isLast) {
      // advance to next question
      setQuestionIndex((i) => i + 1);
      setAnswer('');
    } else {
      // final submit — navigate to lesson complete page
      router.push('/learn/complete');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-4">
            {lesson.lesson_title}
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              Question {lesson && questionIndex + 1} of {lesson && lesson.questions.length}
            </h2>

            <div className="mb-6 text-lg text-zinc-700 dark:text-zinc-300">{lesson.questions[questionIndex]}</div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-black dark:text-zinc-50 mb-2"
                >
                  Your Answer
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {questionIndex < (lesson.questions.length - 1) ? 'Next' : 'Submit Answer'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <ProtectedRoute>
      <LessonContent />
    </ProtectedRoute>
  );
}