// care-campus-dashboard/app/learn/components/PracticeTimer.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { PracticeTimerBlock } from '@/app/learn/types';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

interface PracticeTimerProps {
  block: PracticeTimerBlock;
  onComplete: () => void;
}

/**
 * Renders a simple timer for practice exercises (like breathing).
 */
export default function PracticeTimerComponent({ block, onComplete }: PracticeTimerProps) {
  const { durationSeconds, instructions } = block;
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const resetTimer = useCallback(() => {
    setTimeLeft(durationSeconds);
    setIsActive(false);
    setIsDone(false);
  }, [durationSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isDone) {
      setIsActive(false);
      setIsDone(true);
      onComplete();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isDone, onComplete]);

  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = ((durationSeconds - timeLeft) / durationSeconds) * 100;

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{block.title}</h2>

      <div className="relative mx-auto h-48 w-48 flex items-center justify-center">
        {/* Progress Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-200 dark:text-zinc-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="80"
            cx="96"
            cy="96"
          />
          <circle
            className="text-blue-500 transition-all duration-1000 ease-linear"
            strokeWidth="10"
            strokeDasharray={80 * 2 * Math.PI}
            strokeDashoffset={(80 * 2 * Math.PI) * (1 - progress / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="80"
            cx="96"
            cy="96"
          />
        </svg>

        {/* Time Display */}
        <div className="absolute flex flex-col items-center justify-center">
          {isDone ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : (
            <>
              <div className="text-4xl font-mono font-extrabold text-gray-900 dark:text-gray-100">
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">of {formatTime(durationSeconds)}</p>
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">{instructions}</p>

      {/* Controls */}
      <div className="flex justify-center space-x-4 pt-4">
        {isDone ? (
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center font-medium"
          >
            <RotateCcw className="w-5 h-5 mr-2" /> Restart
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsActive(!isActive)}
              disabled={timeLeft === 0}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center ${
                isActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isActive ? 'Pause' : 'Start Practice'}
            </button>
            <button
              onClick={resetTimer}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center font-medium dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}