'use client';

import { useState } from 'react';
import type { Place, LocationTag } from '@/types/eats';
import { useTheme } from '@/context/ThemeContext';

const categories = ['all', 'restaurants', 'bakeries', 'coffee + tea', 'bars'] as const;

const tagColors: Record<LocationTag, string> = {
  nyc: 'bg-blue-500/20 text-blue-400',
  sf: 'bg-orange-500/20 text-orange-400',
  pittsburgh: 'bg-yellow-500/20 text-yellow-400',
  other: 'bg-gray-500/20 text-gray-400',
};

const locations: LocationTag[] = ['nyc', 'sf', 'pittsburgh', 'other'];

type CategoryTab = (typeof categories)[number];

interface EatsClientProps {
  places: Place[];
}

export function EatsClient({ places }: EatsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('all');
  const [activeLocations, setActiveLocations] = useState<LocationTag[]>([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggleLocation = (location: LocationTag) => {
    setActiveLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const filteredPlaces = places
    .filter((place) => activeCategory === 'all' || place.category === activeCategory)
    .filter((place) => activeLocations.length === 0 || activeLocations.includes(place.location));

  return (
    <div className="w-full max-w-xl py-8 px-6 mx-auto">
      <h1 className={`text-[32px] font-semibold mb-2 ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>eats</h1>
      <p className={`text-[16px] mb-8 ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>
        where i would take someone if they were visiting me (see beli!)
      </p>

      <div className="flex gap-1 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-4 py-2 text-[15px] whitespace-nowrap transition-colors ${
              activeCategory === category
                ? isDark ? 'text-[#ececec] font-semibold' : 'text-[#0d0d0d] font-semibold'
                : isDark ? 'text-[#9a9a9a] hover:text-[#ececec]' : 'text-[#6b6b6b] hover:text-[#0d0d0d]'
            }`}
          >
            {category}
            {activeCategory === category && (
              <span className={`absolute bottom-0 left-2 right-2 h-[2px] ${isDark ? 'bg-[#ececec]' : 'bg-[#0d0d0d]'}`} />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {locations.map((location) => (
          <button
            key={location}
            onClick={() => toggleLocation(location)}
            className={`text-[12px] px-3 py-1 rounded-full transition-colors ${
              activeLocations.includes(location)
                ? tagColors[location]
                : isDark ? 'bg-[#2f2f2f] text-[#9a9a9a] hover:text-[#ececec]' : 'bg-[#e5e5e5] text-[#6b6b6b] hover:text-[#0d0d0d]'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredPlaces.map((place) => (
          <div key={place.id} className="flex items-center gap-3">
            {place.website ? (
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[15px] hover:underline ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}
              >
                {place.name}
              </a>
            ) : (
              <span className={`text-[15px] ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>{place.name}</span>
            )}
            <span className={`text-[12px] px-2 py-0.5 rounded-full ${tagColors[place.location]}`}>
              {place.location}
            </span>
            <span className={`text-[20px] leading-none ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>•</span>
            <span className={`text-[14px] ${isDark ? 'text-[#9a9a9a]' : 'text-[#6b6b6b]'}`}>{place.favorites}</span>
          </div>
        ))}
      </div>
      <div className="h-16" />
    </div>
  );
}
