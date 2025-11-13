'use client';

import ProtectedRoute from '@/app/components/ProtectedRoute';

function ChatContent() {
  // Your existing chat page code goes here
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
          Chat with Terry the Terp
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Your AI mental health companion
        </p>
        {/* Add your chat interface here */}
      </div>
    </div>
  );
}

export default function Chat() {
  return (
    <ProtectedRoute>
      <ChatContent />
    </ProtectedRoute>
  );
}