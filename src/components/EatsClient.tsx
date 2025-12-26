'use client';

import { useState, useRef, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const categories = [
  'Top Picks',
  'Restaurants',
  'Cafes',
  'Bars',
  'Desserts',
  'Brunch',
  'Late Night',
  'Healthy',
];

export function EatsClient() {
  const [activeCategory, setActiveCategory] = useState('Top Picks');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className="max-w-3xl mx-auto py-8 px-6">
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

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-[#212121] via-[#212121] to-transparent pl-4 pr-1"
          >
            <LuChevronRight size={20} className="text-[#9a9a9a] hover:text-[#ececec]" />
          </button>
        )}
      </div>

      {/* Content placeholder */}
      <div className="text-[#ececec]">
        <h2 className="text-[24px] font-semibold mb-2">{activeCategory}</h2>
        <p className="text-[#9a9a9a]">Content for {activeCategory} coming soon...</p>
      </div>
    </div>
  );
}
