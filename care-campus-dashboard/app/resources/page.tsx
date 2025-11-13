/**
 * Resources Page
 * Renders resources from `assets/resources.json`.
 * The JSON is structured as an object with sections (e.g. "Crisis_Resources").
 */
'use client';

import ProtectedRoute from '@/app/components/ProtectedRoute';
import resources from '@/assets/resources.json';

function humanizeKey(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function ResourcesContent() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4 text-center">
          Mental Health Resources
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center">
          Find a variety of campus and crisis resources to support your well-being.
        </p>

        <div className="space-y-8">
          {Object.entries(resources).map(([sectionKey, sectionValue]) => (
            <section key={sectionKey} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
                {humanizeKey(sectionKey)}
              </h2>

              <ul className="space-y-3">
                {Object.entries(sectionValue as Record<string, string>).map(([name, phone]) => (
                  <li key={name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-base font-medium text-black dark:text-zinc-50">{humanizeKey(name)}</div>
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">{phone}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <ResourcesContent />
    </ProtectedRoute>
  );
}