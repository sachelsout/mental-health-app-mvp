'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_LESSON, LessonContentBlock } from '@/app/learn/types';
import TextBlockComponent from '@/app/learn/components/TextBlock';
import QuizBlockComponent from '@/app/learn/components/QuizBlock';
import PracticeTimerComponent from '@/app/learn/components/PracticeTimer';
import ReflectionBlockComponent from '@/app/learn/components/ReflectionBlock';
import { ChevronRight, Check } from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Mock function to simulate saving progress via a database API (e.g., /api/progress)
// This will track completion of the entire lesson or a single block.
const mockSaveProgress = (
  lessonId: string,
  blockId: string,
  status: 'completed' | 'started' | 'quiz_correct' | 'quiz_incorrect',
  data: any = {}
) => {
  const key = `progress_${lessonId}_${blockId}`;
  const progressData = {
    blockId,
    status,
    timestamp: new Date().toISOString(),
    data,
  };

  console.log(`[MOCK PROGRESS SAVE] Saving ${status} for ${blockId}:`, progressData);
  
  // Using sessionStorage for persistence across navigation in this demo
  sessionStorage.setItem(key, JSON.stringify(progressData));
  
  // In a real app, this would be:
  // await fetch('/api/progress', { method: 'POST', body: JSON.stringify({ lessonId, blockId, status, data }) });
};

function LessonContent({ params }: { params: { lessonName: string } }) {
  const router = useRouter();
  
  // NOTE: In a real app, you would fetch the lesson data based on params.lessonName here.
  // For the MVP, we use the mock data.
  const lesson = MOCK_LESSON;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [blockCompleted, setBlockCompleted] = useState(true); // Start as true to allow 'Next' on first text block
  
  const totalSteps = lesson.content.length;
  const currentBlock = lesson.content[currentStep];

  const handleBlockCompletion = useCallback((statusData?: any) => {
    if (currentBlock) {
      // 1. Log progress for the current block
      let status: 'completed' | 'quiz_correct' | 'quiz_incorrect' = 'completed';
      if (currentBlock.type === 'quiz') {
        status = statusData.isCorrect ? 'quiz_correct' : 'quiz_incorrect';
      }
      
      mockSaveProgress(
        lesson.id,
        currentBlock.id,
        status,
        statusData
      );
    }
    // 2. Enable the main navigation button
    setBlockCompleted(true);
  }, [currentBlock, lesson.id]);
  
  // Callback specifically for the Next button click
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      
      // Reset completion status for the *next* block, unless it's a simple TextBlock
      const nextBlock = lesson.content[currentStep + 1];
      if (nextBlock && (nextBlock.type === 'quiz' || nextBlock.type === 'reflection' || nextBlock.type === 'exercise:breathing')) {
        setBlockCompleted(false);
      } else {
        setBlockCompleted(true);
      }
    } else {
      // Final step: Complete the lesson
      mockSaveProgress(lesson.id, 'lesson', 'completed', { xp_earned: 100 });
      router.push('/learn/complete'); // Redirect to the completion page
    }
  };

  const currentComponent = useMemo(() => {
    if (!currentBlock) return null;

    switch (currentBlock.type) {
      case 'text':
        // Text blocks are marked complete implicitly when the user clicks 'Next'
        return <TextBlockComponent block={currentBlock} onComplete={() => setBlockCompleted(true)} />;
      case 'quiz':
        // Quiz blocks handle internal state and report completion (correct/incorrect)
        return <QuizBlockComponent block={currentBlock} onComplete={(isCorrect) => handleBlockCompletion({ isCorrect })} />;
      case 'exercise:breathing':
        // Practice blocks handle the timer and report completion when time runs out
        return <PracticeTimerComponent block={currentBlock} onComplete={() => handleBlockCompletion()} />;
      case 'reflection':
        // Reflection blocks enforce min chars and report completion with the text
        return <ReflectionBlockComponent block={currentBlock} onComplete={(text) => handleBlockCompletion({ text })} />;
      default:
        return <p className="text-red-500">Error: Unknown block type.</p>;
    }
  }, [currentStep, currentBlock, handleBlockCompletion]);
  
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  const isFinalStep = currentStep === totalSteps - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Lesson Header and Progress */}
      <div className="mb-8 p-4 bg-white dark:bg-zinc-900 shadow rounded-xl">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{lesson.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Step {currentStep + 1} of {totalSteps}: {currentBlock?.title || 'Loading...'}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Content Block Renderer */}
      <div className="bg-white dark:bg-zinc-900 p-8 shadow-xl rounded-xl min-h-[400px]">
        {currentComponent}
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!blockCompleted}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center shadow-lg ${
            blockCompleted
              ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-400'
          }`}
        >
          {isFinalStep ? (
            <>
              <Check className="w-5 h-5 mr-2" /> Finish Lesson
            </>
          ) : (
            <>
              Next Step <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Wrap the LessonContent in ProtectedRoute
export default function LessonPage({ params }: { params: { lessonName: string } }) {
  return (
    <ProtectedRoute>
      <LessonContent params={params} />
    </ProtectedRoute>
  );
}