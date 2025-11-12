'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  /** Simple homepage with a welcome message(Welcome to the Care Campus Dashboard) 
   * and an image representing mental health logo(XFoundry Logo.jpeg from public folder)
   * Include a brief description of the app's purpose and navigation buttons to access different features.
   * Buttons will include "Go to Learn", "View Resources", and "Chat with Terry the Terp".
  */

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
