'use client';

import { useState } from 'react';
import { CAMPUSES, CampusOption } from '@/app/utils/campusUtils';

interface CampusSelectProps {
    value: string;
    onChange: (value:string) => void;
}

export default function CampusSelect({ value, onChange }: CampusSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedCampus = CAMPUSES.find((c) => c.id === value);

    return (
        <div className="w-full max-w-md mx-auto">
        <label
            htmlFor="campus"
            className="block text-sm font-medium text-black dark:text-zinc-50 mb-2"
        >
            Select Your Campus
        </label>

        <div className="relative">
            <button
            id="campus"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
            >
            <span className="text-black dark:text-zinc-50">
                {selectedCampus ? selectedCampus.name : 'Choose a campus...'}
            </span>
            <svg
                className={`w-5 h-5 text-zinc-500 transform transition-transform ${
                isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            </button>

            {isOpen && (
            <ul className="absolute z-10 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {CAMPUSES.map((campus) => (
                <li
                    key={campus.id}
                    onClick={() => {
                    onChange(campus.id);
                    setIsOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-800 ${
                    value === campus.id
                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                        : 'text-black dark:text-zinc-50'
                    }`}
                >
                    {campus.name}
                </li>
                ))}
            </ul>
            )}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            This helps us show you local resources and support options.
        </p>
        </div>
    );
}