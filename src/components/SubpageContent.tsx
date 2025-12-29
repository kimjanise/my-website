'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PageContainer } from './PageContainer';

const stars = ['✺', '✱', '✢', '◦', '✢', '✱'];

function AnimatedStar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stars.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return <span className="animate-thinking-star">{stars[index]}</span>;
}

interface SubpageContentProps {
  title: string;
  description: string;
  animatedDescription?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
}

export function SubpageContent({ title, description, animatedDescription, wide, children }: SubpageContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderDescription = () => {
    if (animatedDescription && description.startsWith('✱')) {
      const textAfterStar = description.slice(1);
      return (
        <>
          <AnimatedStar />
          <span className="animate-thinking-text">{textAfterStar}</span>
        </>
      );
    }
    return description;
  };

  return (
    <PageContainer wide={wide}>
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>{title}</h1>
      <p className={`text-[16px] mb-6 ${!animatedDescription ? (isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]') : ''}`}>
        {renderDescription()}
      </p>
      {children}
    </PageContainer>
  );
}
