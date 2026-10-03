import React, { useState } from 'react';
import { Sparkles, Heart, CheckCircle2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { BAKERY_CONFIG, getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const pillars = [
    {
      title: 'Since 2014',
      desc: 'Serving families and corporate celebrations in Gurugram for over a decade.',
    },
    {
      title: 'Gurugram Bakehouse',
      desc: 'Local kitchen ensuring prompt freshness, careful packaging, and reliable doorstep arrival.',
    },
    {
      title: 'Freshly Prepared',
      desc: 'Baked to order with premium dairy, real vanilla, pure cocoa, and fresh seasonal fruits.',
    },
    {
      title: 'Custom Celebration Cakes',
      desc: 'Expertly designed personalized cakes tailored to your theme, flavor preference, and milestone.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Craftsmanship Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F3ECE6]">
                <img
                  src={BAKERY_CONFIG.images.about}
                  alt="Artisanal baker hand-decorating celebration cake at The CUPnCAKE Factory"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Natural editorial badge */}
              <div className="absolute -top-4 -right-4 bg-white border border-[#E8DFD8] rounded-2xl p-4 shadow-md max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C5338] mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Handcrafted Daily
                </div>
                <p className="text-[12px] text-[#6C5950] leading-tight">
                  No premixes, baked with dedicated culinary care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
              Our Journey & Craft
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E1B11] tracking-tight mb-6">
              A Sweet Story Since 2014
            </h2>

            <p className="text-lg text-[#523E35] leading-relaxed mb-6">
              The CUPnCAKE Factory is an established bakehouse serving customers in Gurugram since 2014, creating cakes and baked treats for everyday cravings and special celebrations.
            </p>

            <p className="text-base text-[#6C5950] leading-relaxed mb-8">
              Over the years, we have baked for thousands of birthdays, milestone anniversaries, office events, and quiet Sunday tea times across Gurugram. Our philosophy is simple: authentic recipes, honest baking, and warm personal attention for every custom request.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {pillars.map((pillar) => (
                <div 
                  key={pillar.title} 
                  className="bg-white p-4 rounded-xl border border-[#EDE4DC] shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#8C5338] shrink-0" />
                    <h3 className="font-semibold text-sm text-[#2E1B11]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#7A6961] leading-relaxed pl-6">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Collapsible expanded detail */}
            {isExpanded && (
              <div className="mb-8 p-5 rounded-2xl bg-white border border-[#E8DFD8] text-sm text-[#523E35] space-y-3">
                <p>
                  <strong>Why Gurugram loves our bakehouse:</strong> We believe celebration cakes shouldn't just look sensational on photographs—they must taste profoundly fresh and light. Whether it's our signature Belgian Dark Chocolate Truffle, our velvety cream cheese Red Velvet, or a bespoke multi-tier themed masterpiece for a child's birthday, our team works closely with you to bring your dream design to life.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#8C5338] pt-2 font-medium">
                  <MapPin className="w-4 h-4" /> Ready for pickup or express doorstep delivery across Gurugram.
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#2E1B11] bg-white border border-[#D9CBC2] hover:bg-[#F3ECE6] transition-all cursor-pointer shadow-xs"
              >
                <span>{isExpanded ? 'Show Less' : 'Know More About Us'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <a
                href={getWhatsAppUrl("Hi, I'd like to know more about The CUPnCAKE Factory and discuss cake options.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C5338] hover:text-[#2E1B11] transition-colors py-2 px-3"
              >
                <span>Chat with our Baker</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
