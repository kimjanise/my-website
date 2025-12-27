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
    <div className="min-w-[768px] max-w-3xl py-8 px-6 ml-60">
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>{title}</h1>
      <p className={`text-[16px] mb-8 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        {description}
      </p>
      {children}
      <div className="h-16" />
    </div>
  );
}
