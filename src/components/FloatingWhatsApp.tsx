import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '../config/bakeryConfig.ts';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside 
      aria-label="Instant WhatsApp Order"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 group"
    >
      {/* Tooltip prompt (dismissible or auto-hides after tap) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-1.5 bg-white text-[#2E1B11] text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-[#E8DFD8] animate-in fade-in slide-in-from-right-3 duration-300">
          <span>Need a cake quickly? Chat with us!</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-[#9E8E85] hover:text-[#2E1B11] ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating CTA Button */}
      <a
        href={getWhatsAppUrl("Hi, I found The CUPnCAKE Factory website and would like to enquire about ordering a cake.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Order on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
};
