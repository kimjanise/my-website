'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className={`max-w-lg w-full mx-4 rounded-xl shadow-xl p-6 ${
          isDark ? 'bg-[#2f2f2f] text-[#ececec]' : 'bg-white text-[#0d0d0d]'
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">about this site</h2>

        <div className="space-y-4 text-[14px] leading-relaxed">
          <div>
            <h3 className={`font-medium mb-1 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
              tech stack
            </h3>
            <p className={isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}>
              built with next.js 16, react 19, tailwind css 4, and typescript.
              data is stored in supabase (postgres) and the site is styled to look like chatgpt.
            </p>
          </div>

          <div>
            <h3 className={`font-medium mb-1 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
              chat system
            </h3>
            <p className={isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}>
              the homepage features a rag-powered chat interface using vercel&apos;s ai sdk with openai&apos;s
              gpt-4o-mini model. a knowledge base containing info about me is injected into the system
              prompt, allowing the model to answer questions about my background, interests, and projects.
              responses are streamed in real-time for a smooth conversational experience.
            </p>
          </div>

          <div>
            <h3 className={`font-medium mb-1 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
              architecture
            </h3>
            <p className={isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}>
              the frontend sends messages to an edge api route (/api/chat) which formats the conversation
              history, prepends the system prompt with my knowledge base, and streams the response back
              using server-sent events. the chat state is managed client-side with the ai sdk&apos;s useChat hook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
