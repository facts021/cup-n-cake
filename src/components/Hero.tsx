import React from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { BAKERY_CONFIG, getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-[#FAF7F2]">
      {/* Subtle organic warm background accent */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F4EBE3]/50 rounded-full blur-3xl pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Quiet 1-line text kicker without pill boxes */}
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-3">
              Gurugram's Artisanal Bakehouse
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2E1B11] leading-[1.12] mb-6 text-balance">
              Baked Fresh. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#8C5338]">Made With Love.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#5E4B42] leading-relaxed mb-8 max-w-xl text-balance">
              Beautiful cakes, cupcakes and freshly baked treats made for birthdays, celebrations and every sweet moment.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-[#2E1B11] bg-white border border-[#D9CBC2] hover:bg-[#F7F2EE] hover:border-[#8C5338] transition-all duration-200 whitespace-nowrap cursor-pointer shadow-sm"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 text-[#8C5338]" />
              </button>
            </div>

            {/* Zero-Pill Trust Indicators with clean typographic dot separators */}
            <div className="pt-6 border-t border-[#E8DFD8] w-full max-w-xl">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm font-medium text-[#7A6961]">
                <span className="text-[#2E1B11]">Since 2014</span>
                <span aria-hidden="true" className="text-[#C5B3A8]">·</span>
                <span className="text-[#2E1B11]">Freshly Baked</span>
                <span aria-hidden="true" className="text-[#C5B3A8]">·</span>
                <span className="text-[#2E1B11]">Custom Orders</span>
                <span aria-hidden="true" className="text-[#C5B3A8]">·</span>
                <span className="text-[#8C5338] font-semibold">Gurugram</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame with graceful styled fallback */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3ECE6]">
                <img
                  src={BAKERY_CONFIG.images.hero}
                  alt="Artisanal chocolate celebration cake from The CUPnCAKE Factory in Gurugram"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle soft gradient overlay at bottom for depth */}
                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#2E1B11]/50 via-transparent to-transparent pointer-events-none"
                />

                {/* Quiet bottom corner caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium drop-shadow-md flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-display tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-[#F8E08E]" /> Handcrafted Celebration Cakes
                  </span>
                  <span className="text-[11px] opacity-90 font-mono">Bakehouse Gurugram</span>
                </div>
              </div>

              {/* Decorative subtle floating stamp - since 2014 */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white border border-[#E8DFD8] rounded-2xl p-3.5 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EC] flex items-center justify-center text-[#8C5338] font-display font-bold text-lg">
                  12+
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2E1B11]">Years of Joy</p>
                  <p className="text-[11px] text-[#7A6961]">Serving Gurugram Since 2014</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
