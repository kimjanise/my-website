'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-[32px] font-semibold text-[#ececec] mb-4">
        Something went wrong
      </h1>
      <p className="text-[#9a9a9a] mb-8">
        Failed to load the blog post. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#2f2f2f] text-[#ececec] rounded-lg hover:bg-[#424242] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
