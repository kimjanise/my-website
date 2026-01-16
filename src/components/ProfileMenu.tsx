'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { RiTwitterXLine } from 'react-icons/ri';
import { PiHamburger } from 'react-icons/pi';

interface ProfileMenuProps {
  isSidebarExpanded: boolean;
}

export function ProfileMenu({ isSidebarExpanded }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  const socialLinks = [
    { icon: <FiLinkedin size={18} />, label: 'linkedin', href: 'https://www.linkedin.com/in/janise-kim/' },
    { icon: <RiTwitterXLine size={18} />, label: 'x', href: 'https://x.com/jskim671' },
    { icon: <FiGithub size={18} />, label: 'github', href: 'https://github.com/kimjanise' },
    { icon: <PiHamburger size={18} />, label: 'beli', href: 'https://beliapp.co/app/janise' },
  ];

  return (
    <div className={`relative ${isSidebarExpanded ? 'px-[8px]' : 'px-[8px]'}`} ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center rounded-lg cursor-pointer transition-colors ${isSidebarExpanded
          ? `flex-1 w-full py-1 ${isDark ? 'hover:bg-[#212121]' : 'hover:bg-[#ececec]'}`
          : `w-[36px] h-[36px] justify-center ${isDark ? 'hover:bg-[#2f2f2f]' : 'hover:bg-[#e5e5e5]'}`
          }`}
      >
        <div className={`flex items-center justify-center flex-shrink-0 ${isSidebarExpanded ? 'w-[32px]' : ''}`}>
          <img
            src="/profile.png"
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />
        </div>
        {isSidebarExpanded && (
          <div className="flex flex-col text-left pl-2">
            <span className={`text-[14px] leading-tight ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>janise kim</span>
            <span className={`text-[12px] leading-tight -mt-[1px] ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>Plus</span>
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className={`fixed bottom-16 left-[8px] w-[244px] rounded-xl shadow-lg border z-50 ${isDark
            ? 'bg-[#2f2f2f] border-[#424242]'
            : 'bg-white border-[#e5e5e5]'
            }`}
        >
          <div className="p-2">
            {/* Profile header - email link */}
            <a
              href="mailto:janiseskim@gmail.com"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#424242]' : 'hover:bg-[#f0f0f0]'
                }`}
            >
              <img
                src="/profile.png"
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className={`text-[14px] font-medium ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>janise kim</span>
                <span className={`text-[12px] ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>janiseskim@gmail.com</span>
              </div>
            </a>

            <div className={`border-t my-1.5 ${isDark ? 'border-[#424242]' : 'border-[#e5e5e5]'}`} />

            {/* Social links */}
            <div>
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#424242]' : 'hover:bg-[#f0f0f0]'
                    }`}
                >
                  <span className={isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}>
                    {item.icon}
                  </span>
                  <span className={`text-[14px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
