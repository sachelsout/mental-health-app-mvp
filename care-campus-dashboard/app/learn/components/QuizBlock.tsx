// care-campus-dashboard/app/learn/components/QuizBlock.tsx
'use client';

import { useState } from 'react';
import { QuizBlock } from '@/app/learn/types';
import { Check, X, Info } from 'lucide-react';

interface QuizBlockProps {
  block: QuizBlock;
  onComplete: (isCorrect: boolean) => void; // Pass completion status (and potentially score/xp)
}

/**
 * Renders a multiple-choice quiz block, handles checking answers, and displays rationale.
 */
export default function QuizBlockComponent({ block, onComplete }: QuizBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const isCorrect = isAnswered && selectedId === block.correctAnswerId;

  const handleSelect = (id: string) => {
    if (!isAnswered) {
      setSelectedId(id);
    }
  };

  const handleSubmit = () => {
    if (selectedId) {
      setIsAnswered(true);
      // Immediately report completion status to the parent
      onComplete(selectedId === block.correctAnswerId);
    }
  };

  const getOptionClasses = (id: string) => {
    if (!isAnswered) {
      // Before answering: highlight selected option
      return id === selectedId
        ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500'
        : 'hover:bg-gray-50 dark:hover:bg-zinc-800';
    }

    // After answering: highlight correct/incorrect
    if (id === block.correctAnswerId) {
      return 'bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500 font-semibold';
    }
    if (id === selectedId && id !== block.correctAnswerId) {
      return 'bg-red-100 dark:bg-red-900/50 ring-2 ring-red-500 font-semibold';
    }

    return 'bg-gray-50 dark:bg-zinc-800 opacity-60';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{block.title}</h2>
      <p className="text-xl font-medium text-gray-700 dark:text-gray-300">{block.question}</p>

      <div className="space-y-3">
        {block.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg text-left transition-all duration-200 border border-gray-200 dark:border-zinc-700 flex items-center gap-4 ${getOptionClasses(option.id)}`}
          >
            <span className="font-mono text-sm uppercase w-6 h-6 flex items-center justify-center rounded-full border border-current">
              {option.id}
            </span>
            <span className="flex-1">{option.text}</span>
            {isAnswered && option.id === block.correctAnswerId && <Check className="w-5 h-5 text-green-600" />}
            {isAnswered && option.id === selectedId && option.id !== block.correctAnswerId && <X className="w-5 h-5 text-red-600" />}
          </button>
        ))}
      </div>

      {!isAnswered && selectedId && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answer
        </button>
      )}

      {isAnswered && (
        <div className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-400 dark:text-green-300' : 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-400 dark:text-red-300'}`}>
          <div className="flex items-center font-bold mb-2">
            {isCorrect ? <Check className="w-5 h-5 mr-2" /> : <X className="w-5 h-5 mr-2" />}
            {isCorrect ? 'Correct!' : 'Incorrect. Try to remember this for next time.'}
          </div>
          <div className="flex items-start text-sm pt-2 border-t border-current/30">
            <Info className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
            <p className="flex-1">
              <span className="font-semibold">Rationale:</span> {block.rationale}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}