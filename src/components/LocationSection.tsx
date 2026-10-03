import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Instagram, ExternalLink, Navigation, Info } from 'lucide-react';
import { BAKERY_CONFIG, getWhatsAppUrl } from '../config/bakeryConfig.ts';

export const LocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#F0E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
            Visit & Connect
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight mb-3">
            Find Us in Gurugram
          </h2>
          <p className="text-[#6C5950] text-sm sm:text-base">
            Drop by our bakehouse or get in touch for custom cakes, party orders, and enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Main Location Card */}
            <div className="bg-white p-7 rounded-3xl border border-[#EDE4DC] shadow-xs">
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#F0E6DF]">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2E1B11]">
                    {BAKERY_CONFIG.businessName}
                  </h3>
                  <p className="text-xs text-[#8C5338] font-medium mt-0.5">
                    Gurugram, Haryana · Established {BAKERY_CONFIG.establishedYear}
                  </p>
                </div>
              </div>

              {/* Information list */}
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EC] text-[#8C5338] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6961]">
                      Store Address
                    </h4>
                    <p className="text-sm font-medium text-[#2E1B11] mt-0.5">
                      {BAKERY_CONFIG.addressDisplay}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EC] text-[#8C5338] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6961]">
                      Business Hours
                    </h4>
                    <p className="text-sm font-medium text-[#2E1B11] mt-0.5">
                      {BAKERY_CONFIG.openingHoursDisplay}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EC] text-[#8C5338] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6961]">
                      Phone Enquiries
                    </h4>
                    <p className="text-sm font-medium text-[#2E1B11] mt-0.5">
                      {BAKERY_CONFIG.phoneDisplay}
                    </p>
                  </div>
                </div>

              </div>

              {/* Quick Contact Actions */}
              <div className="pt-6 mt-6 border-t border-[#F0E6DF] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getWhatsAppUrl("Hi, I would like to enquire about visiting or placing an order at The CUPnCAKE Factory.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-2xs whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={BAKERY_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#2E1B11] bg-[#FAF7F2] border border-[#D9CBC2] hover:bg-[#F3ECE6] transition-all whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4 text-[#8C5338]" />
                  <span>Instagram</span>
                </a>
              </div>

            </div>

            {/* Config Notice Card */}
            <div className="p-4 rounded-2xl bg-[#F4EFEB] border border-[#E5DAD2] flex items-start gap-3 text-xs text-[#6C5950]">
              <Info className="w-4 h-4 text-[#8C5338] shrink-0 mt-0.5" />
              <p>
                <strong>Owner Note:</strong> All contact details and Google Maps locations are managed centrally in <code className="text-[#2E1B11] bg-white px-1.5 py-0.5 rounded font-mono">bakeryConfig.ts</code> for effortless updates.
              </p>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EDE4DC] shadow-xs">
              
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2E1B11]">
                  <Navigation className="w-3.5 h-3.5 text-[#8C5338]" />
                  <span>Interactive Map Location</span>
                </div>
                <a
                  href={BAKERY_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C5338] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Preview Canvas */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#EAE6DF] border border-[#E0D5CC] flex flex-col items-center justify-center p-6 text-center">
                
                {/* Stylized Google Map Placeholder Graphic */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#8C5338_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 max-w-sm bg-white/95 backdrop-blur-xs p-6 rounded-2xl border border-[#D9CBC2] shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-[#FAF3EC] text-[#8C5338] flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <MapPin className="w-6 h-6 text-[#C2410C]" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#2E1B11]">
                    The CUPnCAKE Factory
                  </h4>
                  <p className="text-xs text-[#6C5950] mt-1 mb-4">
                    Gurugram, Haryana, India
                  </p>
                  <a
                    href={BAKERY_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2E1B11] hover:bg-[#8C5338] transition-all shadow-sm"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="absolute bottom-3 right-3 text-[10px] text-[#7A6961] bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Gurugram Map Coordinates Placeholder
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
