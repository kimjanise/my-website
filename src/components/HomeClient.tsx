'use client';

import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import type { BlogPostSummary } from '@/types/blog';

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

interface HomeClientProps {
  posts: BlogPostSummary[];
}

export function HomeClient({ posts }: HomeClientProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#212121]">
      <Sidebar posts={posts} />

      <main className="flex-1 flex flex-col bg-[#212121]">
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

        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-32">
          <h1 className="text-[32px] font-normal text-[#ececec] mb-8 tracking-tight">
            hi! i&apos;m janise :)
          </h1>

          <div className="w-full max-w-[760px]">
            <div className="flex items-center bg-[#2f2f2f] rounded-[26px] px-4 py-3 gap-2">
              <button className="text-[#9a9a9a] hover:text-[#ececec] transition-colors p-1.5 hover:bg-[#424242] rounded-full">
                <PlusIcon />
              </button>

              <input
                ref={inputRef}
                type="text"
                placeholder="ask me about myself"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[#ececec] text-[15px] placeholder:text-[#8e8e8e]"
              />

              <button className="text-[#9a9a9a] hover:text-[#ececec] transition-colors p-1.5 hover:bg-[#424242] rounded-full">
                <MicrophoneIcon />
              </button>

              <button className="bg-white text-black p-2.5 rounded-full hover:bg-gray-100 transition-colors ml-1">
                <VoiceIcon />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
