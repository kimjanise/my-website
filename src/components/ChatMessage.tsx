'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Icons matching ChatGPT's style
const CopyIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const ThumbsUpIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ThumbsDownIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2V13M22 11V4C22 2.89543 21.1046 2 20 2H6.57385C5.09302 2 3.83377 3.08032 3.60861 4.54379L2.53168 11.5438C2.25213 13.3611 3.65817 15 5.49678 15H9C9.55228 15 10 15.4477 10 16V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.7361 13.5939C16.8966 13.2327 17.2547 13 17.6499 13H20C21.1046 13 22 12.1046 22 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ShareIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V15M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15V17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RegenerateIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MoreIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
);

const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface ActionButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    isDark: boolean;
    isActive?: boolean;
}

function ActionButton({ icon, onClick, isDark, isActive }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`p-1.5 rounded-md transition-colors ${isActive
                    ? isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'
                    : isDark
                        ? 'text-[#9a9a9a] hover:text-[#ececec] hover:bg-[#424242]'
                        : 'text-[#6b6b6b] hover:text-[#0d0d0d] hover:bg-[#e5e5e5]'
                }`}
        >
            {icon}
        </button>
    );
}

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming = false }: ChatMessageProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Parse content for bold text (text wrapped in **)
    const formatContent = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={index} className="font-semibold">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    };

    if (role === 'user') {
        // User message - right aligned with bubble
        return (
            <div className="flex justify-end mb-8">
                <div
                    className={`max-w-[70%] px-5 py-2.5 rounded-3xl ${isDark ? 'bg-[#303030]' : 'bg-[#f4f4f4]'
                        }`}
                >
                    <p className={`text-[16px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
                        {content}
                    </p>
                </div>
            </div>
        );
    }

    // Assistant message - left aligned with action buttons
    return (
        <div className="mb-8">
            <div className="max-w-none">
                <p className={`text-[16px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
                    {formatContent(content)}
                </p>
            </div>

            {/* Action buttons - matching ChatGPT style, only show when not streaming */}
            {!isStreaming && (
                <div className="flex items-center gap-0.5 mt-3">
                    <ActionButton
                        icon={copied ? <CheckIcon /> : <CopyIcon />}
                        onClick={handleCopy}
                        isDark={isDark}
                        isActive={copied}
                    />
                    <ActionButton icon={<ThumbsUpIcon />} isDark={isDark} />
                    <ActionButton icon={<ThumbsDownIcon />} isDark={isDark} />
                    <ActionButton icon={<ShareIcon />} isDark={isDark} />
                    <ActionButton icon={<RegenerateIcon />} isDark={isDark} />
                    <ActionButton icon={<MoreIcon />} isDark={isDark} />
                </div>
            )}
        </div>
    );
}

