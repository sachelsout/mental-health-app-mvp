'use client';

import { useState } from 'react';

interface GoalsChipsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function GoalsChips({ value, onChange }: GoalsChipsProps) {
  const goals = [
    'Reduce stress',
    'Improve sleep',
    'Boost focus',
    'Build resilience',
    'Feel more connected',
    "Other",
  ];

  const handleToggle = (goal: string) => {
    // If already selected, remove it
    if (value.includes(goal)) {
      onChange(value.filter((g) => g !== goal));
    } else {
      // Only allow up to 2 selected
      if (value.length < 2) {
        onChange([...value, goal]);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-3">
        Choose up to two goals
      </label>

      <div className="flex flex-wrap gap-3">
        {goals.map((goal) => {
          const isSelected = value.includes(goal);
          const disabled = !isSelected && value.length >= 2;

          return (
            <button
              key={goal}
              type="button"
              onClick={() => handleToggle(goal)}
              disabled={disabled}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                ${
                  isSelected
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 border-zinc-300 dark:border-zinc-700'
                }
                ${
                  disabled && !isSelected
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-100 dark:hover:bg-zinc-800'
                }`}
            >
              {goal}
            </button>
          );
        })}
      </div>

      {value.length === 2 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          You’ve selected the maximum number of goals.
        </p>
      )}
    </div>
  );
}
