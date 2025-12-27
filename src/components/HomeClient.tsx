'use client';

import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { ModelSelector } from './ModelSelector';
import type { BlogPostSummary } from '@/types/blog';
import { useTheme } from '@/context/ThemeContext';

// Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MicrophoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4v16M8 7v10M4 9v6M16 7v10M20 9v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

interface HomeClientProps {
  posts: BlogPostSummary[];
}

export function HomeClient({ posts }: HomeClientProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen w-full ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Sidebar posts={posts} />

      <main className={`flex-1 flex flex-col ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
        <header className="flex items-center justify-between px-3 py-1.5 relative z-10">
          <div className="flex items-center">
            <ModelSelector />
          </div>

          <div className="flex items-center gap-1">
            <div className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-[#9a9a9a] hover:bg-[#2f2f2f]' : 'text-[#6b6b6b] hover:bg-[#f0f0f0]'}`}>
              <UserIcon />
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-32">
          <h1 className={`text-[32px] font-normal mb-8 tracking-tight ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
            hi! i&apos;m janise :)
          </h1>

          <div className="w-full max-w-[760px]">
            <div className={`flex items-center rounded-[26px] px-4 py-3 gap-2 ${isDark ? 'bg-[#2f2f2f]' : 'bg-[#f4f4f4] border border-[#e5e5e5]'}`}>
              <button className={`transition-colors p-1.5 rounded-full ${isDark ? 'text-[#9a9a9a] hover:text-[#ececec] hover:bg-[#424242]' : 'text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-[#e5e5e5]'}`}>
                <PlusIcon />
              </button>

              <input
                ref={inputRef}
                type="text"
                placeholder="ask about what i'm up to"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-1 bg-transparent border-none outline-none text-[15px] ${isDark ? 'text-[#ececec] placeholder:text-[#8e8e8e]' : 'text-[#0d0d0d] placeholder:text-[#9a9a9a]'}`}
              />

              <button className={`transition-colors p-1.5 rounded-full ${isDark ? 'text-[#9a9a9a] hover:text-[#ececec] hover:bg-[#424242]' : 'text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-[#e5e5e5]'}`}>
                <MicrophoneIcon />
              </button>

              <button className={`p-2.5 rounded-full transition-colors ml-1 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#0d0d0d] text-white hover:bg-[#2f2f2f]'}`}>
                <VoiceIcon />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
