'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BlogPostSummary } from '@/types/blog';

// OpenAI Logo Icon
const OpenAILogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4046-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="currentColor" />
  </svg>
);

// Sidebar Toggle Icon
const SidebarToggleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M9 4v16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// New Chat / Edit Icon
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 20h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Search Icon
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Sparkle Icon
const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3l.5 2L7 5.5 5.5 6 5 8l-.5-2L3 5.5 4.5 5 5 3z" fill="currentColor" />
    <path d="M12 5l.75 3L16 8.75 12.75 9.5 12 12.5l-.75-3L8 8.75 11.25 8 12 5z" fill="currentColor" />
    <path d="M19 8l.5 2 1.5.5-1.5.5-.5 2-.5-2-1.5-.5 1.5-.5.5-2z" fill="currentColor" />
    <path d="M8 14l.5 2 1.5.5-1.5.5-.5 2-.5-2-1.5-.5 1.5-.5.5-2z" fill="currentColor" />
  </svg>
);

// Image Icon
const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Apps Icon
const AppsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="2" fill="currentColor" />
    <circle cx="17" cy="7" r="2" fill="currentColor" />
    <circle cx="7" cy="17" r="2" fill="currentColor" />
    <circle cx="17" cy="17" r="2" fill="currentColor" />
  </svg>
);

// Codex Icon
const CodexIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
    <path d="M8.5 14.5c.83 1 2.08 1.5 3.5 1.5s2.67-.5 3.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// GPTs Icon
const GPTsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 6.5L7 9.5v5l5 3 5-3v-5l-5-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// Projects Icon
const ProjectsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface SidebarProps {
  posts: BlogPostSummary[];
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ posts, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname.startsWith('/blog/')
    ? pathname.replace('/blog/', '')
    : null;
  const [logoHovered, setLogoHovered] = useState(false);

  const handleSidebarClick = () => {
    if (!isOpen) {
      onToggle();
    }
  };

  return (
    <aside
      onClick={handleSidebarClick}
      className={`h-full flex flex-col flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'w-[260px] bg-[#171717]' : 'w-[52px] bg-transparent border-r border-[#3a3a3a] cursor-pointer'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center py-3 ${isOpen ? 'justify-between px-2' : 'justify-center'}`}>
        {isOpen ? (
          <>
            <Link href="/" className="text-white cursor-pointer p-2 hover:bg-[#424242] rounded-lg transition-colors">
              <OpenAILogo />
            </Link>
            <button
              onClick={onToggle}
              className="cursor-pointer hover:bg-[#424242] p-2 rounded-lg transition-colors text-[#9a9a9a] hover:text-white"
            >
              <SidebarToggleIcon />
            </button>
          </>
        ) : (
          <div
            className="text-white p-2 rounded-lg transition-colors hover:bg-[#424242]"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            {logoHovered ? <SidebarToggleIcon /> : <OpenAILogo />}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex flex-col mt-3 ${isOpen ? 'px-2' : 'items-center'}`}>
        {isOpen ? (
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-1.5 text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <EditIcon />
            <span className="text-[15px] whitespace-nowrap">new chat</span>
          </Link>
        ) : (
          <div className="flex items-center p-1.5 justify-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors">
            <EditIcon />
          </div>
        )}
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <SearchIcon />
          {isOpen && <span className="text-[15px] whitespace-nowrap">about me</span>}
        </div>
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <SparkleIcon />
          {isOpen && <span className="text-[15px] whitespace-nowrap">projects</span>}
        </div>
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <ImageIcon />
          {isOpen && (
            <>
              <span className="text-[15px] whitespace-nowrap">tech inspo</span>
              <span className="text-[11px] bg-[#3a3a3a] text-[#a0a0a0] px-2 py-0.5 rounded-full font-medium uppercase ml-1">NEW</span>
            </>
          )}
        </div>
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <AppsIcon />
          {isOpen && <span className="text-[15px] whitespace-nowrap">people</span>}
        </div>
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <CodexIcon />
          {isOpen && <span className="text-[15px] whitespace-nowrap">eats</span>}
        </div>
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <GPTsIcon />
          {isOpen && <span className="text-[15px] whitespace-nowrap">music</span>}
        </div>
        <div className={`flex items-center text-[#ececec] hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-3 py-1.5' : 'p-1.5 justify-center'
        }`}>
          <ProjectsIcon />
          {isOpen && <span className="text-[15px] whitespace-nowrap">museums</span>}
        </div>
      </nav>

      {/* Recent thoughts - only visible when open */}
      {isOpen && (
        <div className="mt-3 flex-1 flex flex-col overflow-hidden">
          <div className="px-5 py-1.5">
            <span className="text-[14px] text-[#9a9a9a]">recent thoughts</span>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`block px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  currentSlug === post.slug
                    ? 'bg-[#2f2f2f] text-[#ececec]'
                    : 'text-[#ececec] hover:bg-[#212121]'
                }`}
              >
                <span className="text-[15px]">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Spacer when closed */}
      {!isOpen && <div className="flex-1" />}

      {/* Profile */}
      <div className={`mt-auto ${isOpen ? 'p-3' : 'py-3 flex justify-center'}`}>
        <div className={`flex items-center hover:bg-[#212121] rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'gap-3 px-2 py-2' : 'p-0'
        }`}>
          <img
            src="/profile.png"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover"
          />
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-[14px] text-[#ececec]">janise kim</span>
              <span className="text-[12px] text-[#9a9a9a]">Plus</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
