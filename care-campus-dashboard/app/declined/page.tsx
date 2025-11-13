'use client';

import { useRouter } from 'next/navigation';

export default function DeclinedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 md:p-12">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-4">
            Thank You for Visiting
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            You must accept the terms and disclaimer to use Care Campus. If you have concerns about our terms, please contact us or review them again.
          </p>
          
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-800 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
              Mental Health Resources
            </h2>
            <div className="space-y-3 text-left">
              <p className="text-zinc-700 dark:text-zinc-300">
                If you need mental health support, here are some resources available to you:
              </p>
              <ul className="space-y-2 ml-4">
                <li>
                  <strong className="text-zinc-800 dark:text-zinc-200">988 Suicide & Crisis Lifeline:</strong>{' '}
                  <a href="tel:988" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Call or text 988
                  </a>
                </li>
                <li>
                  <strong className="text-zinc-800 dark:text-zinc-200">Crisis Text Line:</strong>{' '}
                  <a href="sms:741741" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Text HOME to 741741
                  </a>
                </li>
                <li>
                  <strong className="text-zinc-800 dark:text-zinc-200">Emergency Services:</strong>{' '}
                  <a href="tel:911" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Call 911
                  </a>
                </li>
                <li>
                  <strong className="text-zinc-800 dark:text-zinc-200">SAMHSA National Helpline:</strong>{' '}
                  <a href="tel:1-800-662-4357" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    1-800-662-4357
                  </a>
                </li>
                <li>
                  <strong className="text-zinc-800 dark:text-zinc-200">Campus Counseling:</strong>{' '}
                  <span className="text-zinc-700 dark:text-zinc-300">
                    Contact your university's counseling center
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Review Terms Again
            </button>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Questions? Contact us at support@carecampus.edu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}