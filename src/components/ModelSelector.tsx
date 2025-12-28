'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type ModelOption = 'auto' | 'instant' | 'thinking';

const modelOptions: { id: ModelOption; name: string; description: string }[] = [
  { id: 'auto', name: 'Auto', description: 'Decides how long to think' },
  { id: 'instant', name: 'Instant', description: 'Answers right away' },
  { id: 'thinking', name: 'Thinking', description: 'Thinks longer for better answers' },
];

export function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption>('auto');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-colors ${
          isDark ? 'hover:bg-[#2f2f2f]' : 'hover:bg-[#f0f0f0]'
        }`}
      >
        <span className={`font-normal text-[18px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
          janiseGPT 5.2
        </span>
        <span className={isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 w-[240px] rounded-xl shadow-lg border z-50 ${
            isDark
              ? 'bg-[#2f2f2f] border-[#424242]'
              : 'bg-white border-[#e5e5e5]'
          }`}
        >
          <div className="p-3">
            <div className={`text-[13px] font-medium mb-2 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
              GPT-5.2
            </div>

            <div className="space-y-1">
              {modelOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedModel(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-[#424242]' : 'hover:bg-[#f0f0f0]'
                  }`}
                >
                  <div className="text-left">
                    <div className={`text-[14px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
                      {option.name}
                    </div>
                    <div className={`text-[12px] ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
                      {option.description}
                    </div>
                  </div>
                  {selectedModel === option.id && (
                    <span className={isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}>
                      <CheckIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className={`border-t my-2 ${isDark ? 'border-[#424242]' : 'border-[#e5e5e5]'}`} />

            <button
              type="button"
              className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-[#424242]' : 'hover:bg-[#f0f0f0]'
              }`}
            >
              <span className={`text-[14px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
                Legacy models
              </span>
              <span className={isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}>
                <ChevronRightIcon />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
