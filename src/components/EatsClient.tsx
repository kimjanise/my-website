'use client';

import { useState } from 'react';
import type { Place, LocationTag } from '@/types/eats';

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
    <div className="min-w-[768px] max-w-3xl py-8 px-6 ml-60">
      <h1 className="text-[32px] font-semibold text-[#ececec] mb-2">eats</h1>
      <p className="text-[#9a9a9a] text-[16px] mb-8">
        where i would take friends + family if they were visiting (see beli!)
      </p>

      <div className="flex gap-1 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-4 py-2 text-[15px] whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'text-[#ececec]'
                : 'text-[#9a9a9a] hover:text-[#ececec]'
            }`}
          >
            {category}
            {activeCategory === category && (
              <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#ececec]" />
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
                : 'bg-[#2f2f2f] text-[#9a9a9a] hover:text-[#ececec]'
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
                className="text-[15px] text-[#ececec] hover:underline"
              >
                {place.name}
              </a>
            ) : (
              <span className="text-[15px] text-[#ececec]">{place.name}</span>
            )}
            <span className={`text-[12px] px-2 py-0.5 rounded-full ${tagColors[place.location]}`}>
              {place.location}
            </span>
            <span className="text-[20px] text-[#9a9a9a] leading-none">•</span>
            <span className="text-[14px] text-[#9a9a9a]">{place.favorites}</span>
          </div>
        ))}
      </div>
      <div className="h-16" />
    </div>
  );
}
