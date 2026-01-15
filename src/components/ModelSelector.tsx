'use client';

import { useTheme } from '@/context/ThemeContext';

export function ModelSelector() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="px-3 py-2">
      <span className={`font-normal text-[18px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        janiseGPT 5.2
      </span>
    </div>
  );
}
