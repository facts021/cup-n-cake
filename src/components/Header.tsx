import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Phone, Clock, MapPin, Database } from 'lucide-react';
import { BAKERY_CONFIG, getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Menu', href: 'menu' },
    { name: 'Custom Cakes', href: 'custom-cakes' },
    { name: 'Gallery', href: 'gallery' },
    { name: 'Reviews', href: 'reviews' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD8]'
            : 'bg-[#FAF7F2] border-b border-[#F0E6DF]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="group flex items-center gap-2 text-left"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#2E1B11] group-hover:text-[#8C5338] transition-colors whitespace-nowrap">
                The CUPnCAKE Factory
              </span>
            </a>

            {/* Zone 2: Clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#57433A]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#2E1B11] transition-colors relative py-1 hover:border-b-2 hover:border-[#8C5338] whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary action button & owner portal */}
            <div className="flex items-center gap-2.5">
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="p-2 rounded-full text-[#7A6961] hover:text-[#2E1B11] hover:bg-[#F3ECE6] transition-colors cursor-pointer"
                  title="Owner Orders & Enquiries (Firebase)"
                  aria-label="Bakery Owner Portal"
                >
                  <Database className="w-4 h-4 text-[#8C5338]" />
                </button>
              )}

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#2E1B11] hover:bg-[#EFE7E0] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFD8] px-4 pt-3 pb-6 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 rounded-lg text-base font-medium text-[#2E1B11] hover:bg-[#F3ECE6] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-[#E8DFD8]">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
              <div className="pt-2 text-xs text-[#7A6961] flex items-center justify-between px-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8C5338]" /> Gurugram, Haryana
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8C5338]" /> Since 2014
                </span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
