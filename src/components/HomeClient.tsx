'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { ModelSelector } from './ModelSelector';
import { ChatMessage } from './ChatMessage';
import type { BlogPostSummary } from '@/types/blog';
import { useTheme } from '@/context/ThemeContext';
import { useChat as useChatContext } from '@/context/ChatContext';

// Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MicrophoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4v16M8 7v10M4 9v6M16 7v10M20 9v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const ScrollDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="12" height="12" rx="1" />
  </svg>
);

interface HomeClientProps {
  posts: BlogPostSummary[];
}

// Create a transport instance outside the component to avoid recreation
const chatTransport = new DefaultChatTransport({ api: '/api/chat' });

export function HomeClient({ posts }: HomeClientProps) {
  const { messages, sendMessage, stop, status, setMessages } = useChat({
    transport: chatTransport,
  });

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const { registerResetHandler } = useChatContext();
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isDark = theme === 'dark';
  const hasMessages = messages.length > 0;
  const isLoading = status === 'streaming' || status === 'submitted';

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    if (!hasMessages) {
      inputRef.current?.focus();
    }
  }, [hasMessages]);

  // Track scroll position for scroll-to-bottom button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && hasMessages);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setInput('');
  }, [setMessages]);

  // Register the reset handler so Sidebar can trigger it
  useEffect(() => {
    registerResetHandler(handleNewChat);
  }, [registerResetHandler, handleNewChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    await sendMessage({ text: userMessage });
  };

  // Helper to get text content from message parts
  const getMessageContent = (message: UIMessage): string => {
    if (!message.parts) return '';
    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map(part => part.text)
      .join('');
  };

  return (
    <div className={`flex h-screen w-full ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Sidebar posts={posts} />

      <main className={`flex-1 flex flex-col relative ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-3 py-1.5 relative z-10">
          <div className="flex items-center">
            <ModelSelector />
          </div>

          <div className="flex items-center gap-1">
            <div className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-[#9a9a9a] hover:bg-[#2f2f2f]' : 'text-[#6b6b6b] hover:bg-[#f0f0f0]'}`}>
              <HelpIcon />
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main content area */}
        {!hasMessages ? (
          // Welcome screen - centered
          <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-24">
            <h1 className={`text-[32px] font-normal mb-8 tracking-tight ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
              hi! i&apos;m janise :)
            </h1>

            <div className="w-full max-w-[760px]">
              <form onSubmit={onSubmit}>
                <div className={`flex items-center rounded-[26px] pl-3 pr-2 py-2 gap-1 ${isDark ? 'bg-[#2f2f2f]' : 'bg-[#f4f4f4] border border-[#e5e5e5]'}`}>
                  <div className={`p-1.5 rounded-full ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
                    <PlusIcon />
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="ask about what i'm up to"
                    value={input}
                    onChange={handleInputChange}
                    className={`flex-1 bg-transparent border-none outline-none text-[15px] px-2 ${isDark ? 'text-[#ececec] placeholder:text-[#8e8e8e]' : 'text-[#0d0d0d] placeholder:text-[#9a9a9a]'}`}
                  />

                  <div className={`p-1.5 rounded-full ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
                    <MicrophoneIcon />
                  </div>

                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className={`p-2 rounded-full transition-colors ${input.trim()
                      ? isDark ? 'bg-white text-black hover:bg-gray-100 cursor-pointer' : 'bg-[#0d0d0d] text-white hover:bg-[#2f2f2f] cursor-pointer'
                      : isDark ? 'bg-[#676767] text-[#2f2f2f] cursor-default' : 'bg-[#d5d5d5] text-[#f4f4f4] cursor-default'
                      }`}
                  >
                    {input.trim() ? <UploadIcon /> : <VoiceIcon />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Chat messages area
          <>
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto"
            >
              <div className="max-w-[760px] mx-auto px-4 py-6">
                {messages.map((message: UIMessage, index: number) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role as 'user' | 'assistant'}
                    content={getMessageContent(message)}
                    isStreaming={isLoading && index === messages.length - 1 && message.role === 'assistant'}
                  />
                ))}

                {/* Loading indicator - pulsing dot like ChatGPT */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="mb-8">
                    <div
                      className={`w-3 h-3 rounded-full animate-[pulse-dot_0.8s_ease-in-out_infinite] ${isDark ? 'bg-[#ececec]' : 'bg-[#0d0d0d]'}`}
                    />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-36 z-20">
                <button
                  onClick={scrollToBottom}
                  className={`p-2 rounded-full shadow-lg border transition-colors ${isDark
                    ? 'bg-[#2f2f2f] border-[#424242] text-[#ececec] hover:bg-[#424242]'
                    : 'bg-white border-[#e5e5e5] text-[#0d0d0d] hover:bg-[#f4f4f4]'
                    }`}
                >
                  <ScrollDownIcon />
                </button>
              </div>
            )}

            {/* Input area - fixed at bottom */}
            <div className={`px-4 pb-3 pt-2 ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
              <div className="max-w-[760px] mx-auto">
                <form onSubmit={onSubmit}>
                  <div className={`flex items-center rounded-[26px] pl-3 pr-2 py-2 gap-1 ${isDark ? 'bg-[#2f2f2f]' : 'bg-[#f4f4f4] border border-[#e5e5e5]'}`}>
                    <div className={`p-1.5 rounded-full ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
                      <PlusIcon />
                    </div>

                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="ask about what i'm up to"
                      value={input}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`flex-1 bg-transparent border-none outline-none text-[15px] px-2 ${isDark ? 'text-[#ececec] placeholder:text-[#8e8e8e]' : 'text-[#0d0d0d] placeholder:text-[#9a9a9a]'}`}
                    />

                    <div className={`p-1.5 rounded-full ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
                      <MicrophoneIcon />
                    </div>

                    {isLoading ? (
                      <button
                        type="button"
                        onClick={stop}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${isDark ? 'bg-[#676767] text-white hover:bg-[#5a5a5a]' : 'bg-[#e5e5e5] text-[#0d0d0d] hover:bg-[#d5d5d5]'}`}
                      >
                        <StopIcon />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!input.trim()}
                        className={`p-2 rounded-full transition-colors ${input.trim()
                          ? isDark ? 'bg-white text-black hover:bg-gray-100 cursor-pointer' : 'bg-[#0d0d0d] text-white hover:bg-[#2f2f2f] cursor-pointer'
                          : isDark ? 'bg-[#676767] text-[#2f2f2f] cursor-default' : 'bg-[#d5d5d5] text-[#f4f4f4] cursor-default'
                          }`}
                      >
                        {input.trim() ? <UploadIcon /> : <VoiceIcon />}
                      </button>
                    )}
                  </div>
                </form>

                {/* Disclaimer text */}
                <p className={`text-center text-[12px] mt-2 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
                  this feature's a work in progress! any feedback is appreciated :)
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
