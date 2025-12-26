'use client';

import { useState, useRef, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import type { Place, LocationTag, EatsCategory } from '@/types/eats';

const categories = [
  'all',
  'restaurants',
  'bakeries',
  'coffee + tea',
  'bars',
] as const;

const tagColors: Record<LocationTag, string> = {
  'nyc': 'bg-blue-500/20 text-blue-400',
  'sf': 'bg-orange-500/20 text-orange-400',
  'pittsburgh': 'bg-yellow-500/20 text-yellow-400',
  'other': 'bg-gray-500/20 text-gray-400',
};

const locations: LocationTag[] = ['nyc', 'sf', 'pittsburgh', 'other'];

interface EatsClientProps {
  places: Place[];
}

type CategoryTab = typeof categories[number];

export function EatsClient({ places }: EatsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('all');
  const [activeLocations, setActiveLocations] = useState<LocationTag[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleLocation = (location: LocationTag) => {
    setActiveLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  // Filter places by category and location
  const filteredPlaces = places
    .filter((place) => activeCategory === 'all' || place.category === activeCategory)
    .filter((place) => activeLocations.length === 0 || activeLocations.includes(place.location));

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-3xl ml-auto py-8 px-6 mr-48">
      <h1 className="text-[32px] font-semibold text-[#ececec] mb-2">eats</h1>
      <p className="text-[#9a9a9a] text-[16px] mb-8">
        My favorite food spots and recommendations.
      </p>

      {/* Category tabs */}
      <div className="relative mb-8">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-[#212121] via-[#212121] to-transparent pr-4 pl-1"
          >
            <LuChevronLeft size={20} className="text-[#9a9a9a] hover:text-[#ececec]" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex gap-1 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 text-[15px] whitespace-nowrap transition-colors ${activeCategory === category
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

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-[#212121] via-[#212121] to-transparent pl-4 pr-1"
          >
            <LuChevronRight size={20} className="text-[#9a9a9a] hover:text-[#ececec]" />
          </button>
        )}
      </div>

      {/* Location filter */}
      <div className="flex gap-2 mb-6">
        {locations.map((location) => (
          <button
            key={location}
            onClick={() => toggleLocation(location)}
            className={`text-[12px] px-3 py-1 rounded-full transition-colors ${activeLocations.includes(location)
              ? tagColors[location]
              : 'bg-[#2f2f2f] text-[#9a9a9a] hover:text-[#ececec]'
              }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Content */}
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
    </div>
  );
}
