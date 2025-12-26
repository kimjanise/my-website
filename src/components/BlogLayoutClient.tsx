'use client';

import { Sidebar } from './Sidebar';
import type { BlogPostSummary } from '@/types/blog';

// Header Icons
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

const FullScreenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface BlogLayoutClientProps {
  posts: BlogPostSummary[];
  children: React.ReactNode;
}

export function BlogLayoutClient({ posts, children }: BlogLayoutClientProps) {
  return (
    <div className="flex h-screen w-full bg-[#212121]">
      <Sidebar posts={posts} />
      <main className="flex-1 flex flex-col bg-[#212121] overflow-hidden">
        <header className="flex items-center justify-between px-3 py-1.5">
          <div className="flex items-center">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-[#2f2f2f] px-3 py-2 rounded-lg transition-colors">
              <span className="text-[#ececec] font-normal text-[18px]">janiseGPT 5.2</span>
              <ChevronDownIcon />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-[#9a9a9a] cursor-pointer hover:bg-[#2f2f2f] p-2 rounded-lg transition-colors">
              <UserIcon />
            </div>
            <div className="text-[#9a9a9a] cursor-pointer hover:bg-[#2f2f2f] p-2 rounded-lg transition-colors">
              <FullScreenIcon />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
