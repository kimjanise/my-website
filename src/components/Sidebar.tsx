'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BlogPostSummary } from '@/types/blog';
import { useSidebar } from '@/context/SidebarContext';
import { useTheme } from '@/context/ThemeContext';
import { useChat } from '@/context/ChatContext';
import { ProfileMenu } from './ProfileMenu';
import { LuStar, LuCode, LuMonitor, LuUsers, LuUtensils, LuLandmark, LuLightbulb } from 'react-icons/lu';
import { HiOutlinePencilAlt } from 'react-icons/hi';

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

interface SidebarProps {
  posts: BlogPostSummary[];
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isOpen: boolean;
  isDark: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NavItem = ({ href, icon, label, badge, isOpen, isDark, onClick }: NavItemProps) => (
  <div className={`flex items-center h-[36px] ${isOpen ? 'px-[10px]' : 'px-[8px]'}`}>
    <Link
      href={href}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`flex items-center rounded-lg cursor-pointer transition-colors relative z-10 h-[36px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'
        } ${isOpen
          ? `flex-1 ${isDark ? 'hover:bg-[#212121]' : 'hover:bg-[#ececec]'}`
          : `w-[36px] justify-center ${isDark ? 'hover:bg-[#2f2f2f]' : 'hover:bg-[#e5e5e5]'}`
        }`}
    >
      <div className={`flex items-center justify-center flex-shrink-0 ${isOpen ? 'w-[32px]' : ''}`}>
        {icon}
      </div>
      {isOpen && (
        <div className="flex items-center gap-2 pl-2 pr-3">
          <span className="text-[15px] whitespace-nowrap">{label}</span>
          {badge && (
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium uppercase ${isDark ? 'bg-[#3a3a3a] text-[#a0a0a0]' : 'bg-[#e5e5e5] text-[#6b6b6b]'}`}>
              {badge}
            </span>
          )}
        </div>
      )}
    </Link>
  </div>
);

export function Sidebar({ posts }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const { theme } = useTheme();
  const { resetChat } = useChat();
  const isDark = theme === 'dark';
  const pathname = usePathname();
  const currentSlug = pathname.startsWith('/blog/')
    ? pathname.replace('/blog/', '')
    : null;
  const [logoHovered, setLogoHovered] = useState(false);
  const isHomePage = pathname === '/';

  const handleSidebarClick = () => {
    if (!isOpen) {
      toggle();
    }
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const handleNewChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHomePage) {
      e.preventDefault();
      resetChat();
    }
  };

  return (
    <aside
      onClick={handleSidebarClick}
      className={`h-full flex flex-col flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${isOpen
        ? `w-[260px] ${isDark ? 'bg-[#171717]' : 'bg-[#f9f9f9]'}`
        : `w-[52px] bg-transparent border-r cursor-pointer ${isDark ? 'border-[#3a3a3a]' : 'border-[#e5e5e5]'}`
        }`}
    >
      {/* Header */}
      <div className="flex items-center h-[52px]">
        <div
          className="w-[52px] flex items-center justify-center flex-shrink-0 relative z-10"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {isOpen ? (
            <Link
              href="/"
              onClick={handleNewChatClick}
              className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-[#424242]' : 'text-[#0d0d0d] hover:bg-[#e5e5e5]'}`}
            >
              <OpenAILogo />
            </Link>
          ) : logoHovered ? (
            <button
              onClick={(e) => { e.stopPropagation(); toggle(); }}
              className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-[#2f2f2f]' : 'text-[#0d0d0d] hover:bg-[#e5e5e5]'}`}
            >
              <SidebarToggleIcon />
            </button>
          ) : (
            <Link
              href="/"
              onClick={handleNewChatClick}
              className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-[#2f2f2f]' : 'text-[#0d0d0d] hover:bg-[#e5e5e5]'}`}
            >
              <OpenAILogo />
            </Link>
          )}
        </div>
        {isOpen && (
          <div className="flex-1 flex justify-end pr-2">
            <button
              onClick={(e) => { e.stopPropagation(); toggle(); }}
              className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? 'text-[#9a9a9a] hover:bg-[#424242] hover:text-white' : 'text-[#6b6b6b] hover:bg-[#e5e5e5] hover:text-[#0d0d0d]'}`}
            >
              <SidebarToggleIcon />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="h-[300px] flex-shrink-0">
        <nav className="flex flex-col mt-3">
          <NavItem href="/" icon={<HiOutlinePencilAlt size={20} />} label="new chat" isOpen={isOpen} isDark={isDark} onClick={handleNewChatClick} />
          <NavItem href="/about-me" icon={<LuStar size={20} />} label="about me" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} />
          <NavItem href="/values" icon={<LuLightbulb size={20} />} label="values" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} />
          <NavItem href="/work" icon={<LuCode size={20} />} label="work" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} />
          {/* <NavItem href="/tech" icon={<LuMonitor size={20} />} label="tech" badge="NEW" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} /> */}
          <NavItem href="/people" icon={<LuUsers size={20} />} label="people" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} />
          <NavItem href="/eats" icon={<LuUtensils size={20} />} label="eats" badge="NEW" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} />
          {/* <NavItem href="/museums" icon={<LuLandmark size={20} />} label="museums" isOpen={isOpen} isDark={isDark} onClick={stopPropagation} /> */}
        </nav>
      </div>

      {/* Recent thoughts - only visible when open */}
      {isOpen && (
        <div className="mt-3 flex-1 flex flex-col overflow-hidden">
          <div className="px-5 py-1.5">
            <span className={`text-[14px] ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>recent thoughts</span>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={stopPropagation}
                className={`block px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${currentSlug === post.slug
                  ? isDark ? 'bg-[#2f2f2f] text-[#ececec]' : 'bg-[#e5e5e5] text-[#0d0d0d]'
                  : isDark ? 'text-[#ececec] hover:bg-[#212121]' : 'text-[#0d0d0d] hover:bg-[#ececec]'
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
      <div className={`mt-auto relative z-20 py-1.5 ${isDark ? 'border-t border-[#2f2f2f]' : 'border-t border-[#e5e5e5]'}`}>
        <ProfileMenu isOpen={isOpen} isSidebarOpen={isOpen} />
      </div>
    </aside>
  );
}
