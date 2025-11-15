'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function HeaderContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <header className="w-full bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/XFoundry Logo.jpeg"
            alt="Home"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-black dark:text-zinc-50">Home</span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-400 hidden sm:block">
              {user.email}
            </span>
            <Link
              href="/settings"
              className="px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium"
            >
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors font-medium"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}