'use client';

import { useTheme } from '@/context/ThemeContext';

interface BlogPostContentProps {
  title: string;
  createdAt: string;
  content: string;
}

export function BlogPostContent({ title, createdAt, content }: BlogPostContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <article className="max-w-3xl mx-auto py-8 px-6">
      <h1 className={`text-[32px] font-semibold mb-4 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        {title}
      </h1>
      <time className={`text-[14px] block mb-8 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        {new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <div className={`text-[16px] leading-relaxed whitespace-pre-wrap ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
        {content}
      </div>
      <div className="h-16" />
    </article>
  );
}
