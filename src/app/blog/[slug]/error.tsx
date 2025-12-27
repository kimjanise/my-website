'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className={`text-[32px] font-semibold mb-4 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        Something went wrong
      </h1>
      <p className={`mb-8 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        Failed to load the blog post. Please try again.
      </p>
      <button
        onClick={reset}
        className={`px-6 py-3 rounded-lg transition-colors ${isDark ? 'bg-[#2f2f2f] text-[#ececec] hover:bg-[#424242]' : 'bg-[#e5e5e5] text-[#0d0d0d] hover:bg-[#d5d5d5]'}`}
      >
        Try again
      </button>
    </div>
  );
}
