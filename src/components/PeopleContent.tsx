'use client';

import { useTheme } from '@/context/ThemeContext';
import type { Person } from '@/types/people';

interface PeopleContentProps {
  people: Person[];
}

export function PeopleContent({ people }: PeopleContentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ul className="space-y-4 list-disc list-outside ml-5">
      {people.map((person) => (
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
  );
}
