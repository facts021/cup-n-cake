import React from 'react';
import { MessageCircle, Instagram, MapPin, Phone, Clock, ExternalLink, Database } from 'lucide-react';
import { BAKERY_CONFIG, getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const quickLinks = [
    { name: 'Home', href: 'hero' },
    { name: 'About Us', href: 'about' },
    { name: 'Menu & Cakes', href: 'menu' },
    { name: 'Custom Cakes', href: 'custom-cakes' },
    { name: 'Gallery', href: 'gallery' },
    { name: 'Customer Reviews', href: 'reviews' },
    { name: 'Find Us', href: 'contact' },
  ];

  return (
    <footer className="bg-[#24150D] text-[#E8DFD8] border-t border-[#3D2518] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              {BAKERY_CONFIG.businessName}
            </h3>
            
            <p className="text-sm text-[#BBAAA0] leading-relaxed max-w-sm mb-6">
              An established bakehouse serving Gurugram since {BAKERY_CONFIG.establishedYear}, creating artisanal cakes, gourmet cupcakes, and handcrafted sweet treats for life's celebratory moments.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba59] transition-colors shadow-sm"
                aria-label="Contact on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </a>

              <a
                href={BAKERY_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#8C5338] transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={BAKERY_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#8C5338] transition-colors"
                aria-label="View on Google Maps"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F8E08E] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="lg:col-span-4 space-y-3.5 text-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F8E08E] mb-4">
              Bakehouse Details
            </h4>
            
            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#BBAAA0]">
              <MapPin className="w-4 h-4 text-[#8C5338] shrink-0 mt-0.5" />
              <span>{BAKERY_CONFIG.addressDisplay}</span>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#BBAAA0]">
              <Clock className="w-4 h-4 text-[#8C5338] shrink-0 mt-0.5" />
              <span>{BAKERY_CONFIG.openingHoursDisplay}</span>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#BBAAA0]">
              <Phone className="w-4 h-4 text-[#8C5338] shrink-0 mt-0.5" />
              <span>{BAKERY_CONFIG.phoneDisplay}</span>
            </div>
          </div>

        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="pt-8 border-t border-[#3D2518] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8F7D74] gap-4">
          <p>© 2026 The CUPnCAKE Factory. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#8F7D74]">
            <span>Gurugram, Haryana</span>
            <span>·</span>
            <span>Artisanal Bakehouse</span>
            <span>·</span>
            <a href={BAKERY_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Google Maps
            </a>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Database className="w-3 h-3 text-[#25D366]" />
                  <span>Owner Portal (Firebase)</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
