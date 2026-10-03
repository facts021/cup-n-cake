import React from 'react';
import { Cake, MessageCircle, PartyPopper } from 'lucide-react';
import { getWhatsAppUrl } from '../config/bakeryConfig.ts';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose',
      description: 'Browse our cakes and baked treats.',
      detail: 'Explore classic celebration cakes, gourmet cupcakes, or gather ideas for a custom creation.',
      icon: Cake,
    },
    {
      num: '02',
      title: 'Enquire',
      description: 'Send your requirements through WhatsApp.',
      detail: 'Share your desired date, guest count, and flavor preference with our Gurugram baking team.',
      icon: MessageCircle,
    },
    {
      num: '03',
      title: 'Celebrate',
      description: 'Confirm your order and enjoy your cake.',
      detail: 'We bake your order fresh to perfection, ready for pickup or express doorstep delivery.',
      icon: PartyPopper,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#F0E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
            Seamless & Personal
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight mb-3">
            How to Order
          </h2>
          <p className="text-[#6C5950] text-sm sm:text-base">
            Ordering your favorite cakes in Gurugram is simple and hassle-free.
          </p>
        </div>

        {/* 3 Simple Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-[#FAF7F2] p-8 rounded-3xl border border-[#EDE4DC] flex flex-col justify-between hover:border-[#8C5338]/40 transition-colors shadow-xs"
              >
                <div>
                  {/* Step Editorial Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-4xl font-bold text-[#8C5338]/60">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DFD8] flex items-center justify-center text-[#2E1B11] shadow-2xs">
                      <Icon className="w-5 h-5 text-[#8C5338]" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#2E1B11] mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-[#523E35] mb-2">
                    {step.description}
                  </p>

                  <p className="text-xs text-[#7A6961] leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {idx === 1 && (
                  <div className="mt-6 pt-4 border-t border-[#E8DFD8]">
                    <a
                      href={getWhatsAppUrl("Hi, I would like to enquire about ordering a cake from The CUPnCAKE Factory.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
                      <span>Start WhatsApp Chat &rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
