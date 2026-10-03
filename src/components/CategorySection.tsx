import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BAKERY_CONFIG } from '../config/bakeryConfig.ts';

interface CategorySectionProps {
  onSelectCategory: (categoryKey: 'cakes' | 'cupcakes' | 'custom' | 'treats') => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#F0E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
            Fresh From The Oven
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight mb-4">
            Explore Our Baked Creations
          </h2>
          <p className="text-[#6C5950] text-base sm:text-lg">
            Every treat is freshly baked with premium ingredients, prepared with precision for your special occasions.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BAKERY_CONFIG.categories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col justify-between bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#EDE4DC] hover:border-[#8C5338]/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F3ECE6]">
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#2E1B11]/40 via-transparent to-transparent pointer-events-none"
                />
              </div>

              {/* Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#2E1B11] mb-2 group-hover:text-[#8C5338] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#6C5950] leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Explore button */}
                <button
                  type="button"
                  onClick={() => onSelectCategory(category.filterKey)}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E8DFD8] text-sm font-semibold text-[#2E1B11] group-hover:text-[#8C5338] transition-colors cursor-pointer"
                >
                  <span>Explore {category.name}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#D9CBC2] flex items-center justify-center group-hover:bg-[#8C5338] group-hover:text-white group-hover:border-[#8C5338] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
