'use client';

import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import type { BlogPostSummary } from '@/types/blog';
import { useTheme } from '@/context/ThemeContext';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <header className="flex items-center justify-between px-3 py-1.5">
          <div className="flex items-center">
            <div className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2f2f2f]' : 'hover:bg-[#f0f0f0]'}`}>
              <span className={`font-normal text-[18px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>janiseGPT 5.2</span>
              <ChevronDownIcon />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-[#9a9a9a] hover:bg-[#2f2f2f]' : 'text-[#6b6b6b] hover:bg-[#f0f0f0]'}`}>
              <UserIcon />
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
