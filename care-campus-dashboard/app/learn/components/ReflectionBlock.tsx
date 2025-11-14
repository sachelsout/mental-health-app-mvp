// care-campus-dashboard/app/learn/components/ReflectionBlock.tsx
'use client';

import { useState, useMemo } from 'react';
import { ReflectionBlock } from '@/app/learn/types';

interface ReflectionBlockProps {
  block: ReflectionBlock;
  onComplete: (reflectionText: string) => void; // Pass the actual text content
}

/**
 * Renders a textarea for reflection and enforces a minimum character count.
 */
export default function ReflectionBlockComponent({ block, onComplete }: ReflectionBlockProps) {
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const charCount = reflectionText.length;
  const charsRemaining = block.minCharacters - charCount;
  const isMinimumMet = charCount >= block.minCharacters;

  const handleSubmit = () => {
    if (isMinimumMet) {
      setIsSubmitted(true);
      onComplete(reflectionText);
    }
  };

  // Only show the reflection text when submitted (to fulfill the "save locally" criteria)
  const displayContent = useMemo(() => {
    if (isSubmitted) {
      return (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg">
            <p className="font-semibold text-green-800 dark:text-green-300">Reflection Saved!</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{reflectionText}</p>
        </div>
      );
    }
    return null;
  }, [isSubmitted, reflectionText]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{block.title}</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">{block.prompt}</p>

      {displayContent || (
        <>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            rows={6}
            className="w-full p-4 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-shadow"
            placeholder="Type your reflection here..."
            aria-invalid={!isMinimumMet && charCount > 0}
            aria-label="Daily Reflection Input"
          />
          
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p className={charsRemaining <= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
              {isMinimumMet ? 'Minimum met.' : `${charsRemaining} characters required`}
            </p>
            <p>Total: {charCount}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isMinimumMet}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isMinimumMet
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-400'
            }`}
          >
            Submit Reflection
          </button>
        </>
      )}
    </div>
  );
}