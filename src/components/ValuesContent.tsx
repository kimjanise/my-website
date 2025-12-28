'use client';

import { useTheme } from '@/context/ThemeContext';
import type { Value } from '@/types/values';

interface ValuesContentProps {
  values: Value[];
}

export function ValuesContent({ values }: ValuesContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ul className="space-y-4 list-disc list-outside ml-5">
      {values.map((value) => (
        <li key={value.id} className={`text-[15px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
          {value.content}
        </li>
      ))}
    </ul>
  );
}
