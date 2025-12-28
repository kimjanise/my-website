'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import type { Person } from '@/types/people';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface PeopleContentProps {
  people: Person[];
}

export function PeopleContent({ people }: PeopleContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-6 ${isDark ? 'bg-[#2f2f2f]' : 'bg-[#f4f4f4]'}`}>
        <span className={isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="grace hopper"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`flex-1 bg-transparent border-none outline-none text-[14px] ${isDark ? 'text-[#ececec] placeholder:text-[#8e8e8e]' : 'text-[#0d0d0d] placeholder:text-[#9a9a9a]'}`}
        />
      </div>

      <ul className="space-y-4 list-disc list-outside ml-5">
        {filteredPeople.map((person) => (
          <li key={person.id} className={`text-[15px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
            {person.name_url ? (
              <a
                href={person.name_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 hover:opacity-70"
              >
                {person.name}
              </a>
            ) : (
              <span className="font-semibold">{person.name}</span>
            )}
            {person.role && ` (${person.role})`}
            {' '}
            {person.description}
            {person.link_text && person.link_url && (
              <>
                {' '}
                {person.link_prefix}
                <a
                  href={person.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:opacity-70"
                >
                  {person.link_text}
                </a>
                {person.link_suffix}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
