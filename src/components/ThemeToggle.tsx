'use client';

import { useTheme } from '@/context/ThemeContext';

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`cursor-pointer p-2 rounded-lg transition-colors ${
        isDark
          ? 'text-[#9a9a9a] hover:bg-[#2f2f2f] hover:text-[#ececec]'
          : 'text-[#6b6b6b] hover:bg-[#f0f0f0] hover:text-[#0d0d0d]'
      }`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
