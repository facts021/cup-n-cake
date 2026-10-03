import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface SpecialOccasionCTAProps {
  onContactClick: () => void;
}

export const SpecialOccasionCTA: React.FC<SpecialOccasionCTAProps> = ({ onContactClick }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#2E1B11] text-white relative overflow-hidden">
      
      {/* Warm ambient bakery lighting glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8C5338]/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="text-xs font-semibold uppercase tracking-wider text-[#F8E08E] mb-3">
          Gurugram Bakehouse Celebrations
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-balance">
          Making a Celebration Sweeter
        </h2>

        <p className="text-base sm:text-xl text-[#D8C7BC] max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          Planning a birthday, anniversary or special celebration? Let's create something delicious for it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl("Hi, I'm planning a special celebration and would like to order a cake from The CUPnCAKE Factory.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Order on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-[#2E1B11] bg-white hover:bg-[#F3ECE6] transition-all duration-200 cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Mail className="w-4 h-4 text-[#8C5338]" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Small trust detail */}
        <p className="text-xs text-[#A89487] mt-8">
          Pre-orders recommended 24–48 hours in advance for custom tier designs.
        </p>

      </div>
    </section>
  );
};
