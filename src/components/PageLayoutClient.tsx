'use client';

import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { ModelSelector } from './ModelSelector';
import type { BlogPostSummary } from '@/types/blog';
import { useTheme } from '@/context/ThemeContext';

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

interface PageLayoutClientProps {
  posts: BlogPostSummary[];
  children: React.ReactNode;
}

export function PageLayoutClient({ posts, children }: PageLayoutClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen w-full ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Sidebar posts={posts} />
      <main className={`flex-1 flex flex-col overflow-hidden ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
        <header className="flex items-center justify-between px-3 py-1.5 relative z-10">
          <div className="flex items-center">
            <ModelSelector />
          </div>
          <div className="flex items-center gap-1">
            <div className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-[#9a9a9a] hover:bg-[#2f2f2f]' : 'text-[#6b6b6b] hover:bg-[#f0f0f0]'}`}>
              <HelpIcon />
            </div>
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 w-full overflow-y-auto flex justify-center pb-16">
          {children}
        </div>
      </main>
    </div>
  );
}
