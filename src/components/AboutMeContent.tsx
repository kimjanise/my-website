'use client';

import { useTheme } from '@/context/ThemeContext';

export function AboutMeContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-3xl py-8 px-6 mx-auto">
      <h1 className={`text-[32px] font-semibold mb-6 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        about me
      </h1>
      <div className="flex justify-center">
        <div className="max-w-xlg w-full">
          <img
            src="/about-me.jpg"
            alt="Janise as a child with laptop"
            className="w-full rounded-sm"
          />
          <p className={`text-[16px] mt-2 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
            locked in since day one
          </p>
        </div>
      </div>

      <div className={`mt-6 text-[15px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        <p>Your about me text goes here...</p>
      </div>
      <div className="h-16" />
    </div>
  );
}
