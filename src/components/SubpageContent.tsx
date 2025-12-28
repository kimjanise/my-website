'use client';

import { useTheme } from '@/context/ThemeContext';

interface SubpageContentProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function SubpageContent({ title, description, children }: SubpageContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-3xl py-8 px-6 mx-auto">
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>{title}</h1>
      <p className={`text-[16px] mb-8 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        {description}
      </p>
      {children}
      <div className="h-16" />
    </div>
  );
}
