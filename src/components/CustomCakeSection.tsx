import React, { useState } from 'react';
import { MessageCircle, Palette, Calendar, Cake, Layers, Sparkles, Send, Loader2 } from 'lucide-react';
import { BAKERY_CONFIG, getCustomCakeWhatsAppUrl } from '../config/bakeryConfig.ts';
import { saveCustomCakeRequestToFirestore } from '../services/dbService.ts';

export const CustomCakeSection: React.FC = () => {
  const [occasion, setOccasion] = useState('Birthday cakes');
  const [size, setSize] = useState('1 kg (approx. 6–8 servings)');
  const [flavor, setFlavor] = useState('Chocolate Truffle');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const cakeExamples = [
    'Birthday cakes',
    'Anniversary cakes',
    'Theme cakes',
    "Kids' cakes",
    'Corporate cakes',
    'Celebration cakes',
  ];

  const sizeOptions = [
    '0.5 kg (Small Intimate)',
    '1 kg (approx. 6–8 servings)',
    '1.5 kg – 2 kg (Party size)',
    'Multi-tier (Grand celebration)',
  ];

  const flavorOptions = [
    'Chocolate Truffle',
    'Red Velvet Cream Cheese',
    'Madagascar Vanilla Bean',
    'Fresh Seasonal Fruit',
    'Custom / Baker Recommendation',
  ];

  const handleDiscussWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    let recordId: string | null = null;
    try {
      recordId = await saveCustomCakeRequestToFirestore({
        occasion,
        size,
        flavor,
        deliveryDate,
        customTheme,
      });
    } catch (err) {
      console.warn('Could not save custom cake request to Firestore:', err);
    } finally {
      setIsSaving(false);
    }

    const url = getCustomCakeWhatsAppUrl({
      occasion,
      size,
      flavor,
      date: deliveryDate || 'Flexible / To be confirmed',
      notes: `${customTheme || 'Custom bespoke design discussion'}${recordId ? ` (Database Ref: #${recordId})` : ''}`,
    });
    window.open(url, '_blank');
  };

  return (
    <section id="custom-cakes" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#F0E6DF] relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F3ECE6] rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
            Bespoke Artistry
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E1B11] tracking-tight mb-4 text-balance">
            Have a Cake in Mind?
          </h2>
          <p className="text-base sm:text-lg text-[#6C5950] leading-relaxed max-w-2xl mx-auto text-balance">
            Tell us your idea, theme or occasion and enquire about a custom cake. We turn your imagination into edible art.
          </p>

          {/* Quick example tags as interactive buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {cakeExamples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setOccasion(ex)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  occasion === ex
                    ? 'bg-[#2E1B11] text-white shadow-xs'
                    : 'bg-white text-[#523E35] border border-[#E8DFD8] hover:border-[#8C5338]'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Showcase Visual + Interactive WhatsApp Cake Planner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3ECE6]">
                <img
                  src={BAKERY_CONFIG.images.customCake}
                  alt="Custom celebration cake with delicate handcrafted accents from The CUPnCAKE Factory"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                <div 
                  aria-hidden="true" 
                  className="absolute inset-0 bg-gradient-to-t from-[#2E1B11]/60 via-transparent to-transparent pointer-events-none"
                />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-wider text-[#F8E08E] font-medium mb-1">
                    Bespoke Custom Cake Portfolio
                  </p>
                  <p className="font-display text-xl font-bold text-white drop-shadow-sm">
                    Customized to your vision & celebration
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white border border-[#E8DFD8] rounded-2xl p-4 shadow-lg flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EC] text-[#8C5338] flex items-center justify-center shrink-0">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2E1B11]">Custom Theming</h4>
                  <p className="text-[11px] text-[#7A6961]">Send reference images directly via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Custom Cake Planner Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE4DC] shadow-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5338] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Quick WhatsApp Cake Planner
            </div>
            
            <h3 className="font-display text-2xl font-bold text-[#2E1B11] mb-2">
              Plan Your Custom Cake
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6961] mb-6">
              Pick your basic preferences below. We will instantly format a message ready for our baker on WhatsApp.
            </p>

            <form onSubmit={handleDiscussWhatsApp} className="space-y-4">
              
              {/* Occasion Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                  1. Occasion / Type of Cake
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-sm text-[#2E1B11] focus:ring-2 focus:ring-[#8C5338] focus:outline-none"
                >
                  {cakeExamples.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                  <option value="Other Special Celebration">Other Special Celebration</option>
                </select>
              </div>

              {/* Size / Weight & Flavor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    2. Approximate Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-xs sm:text-sm text-[#2E1B11] focus:ring-2 focus:ring-[#8C5338] focus:outline-none"
                  >
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    3. Preferred Flavour
                  </label>
                  <select
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-xs sm:text-sm text-[#2E1B11] focus:ring-2 focus:ring-[#8C5338] focus:outline-none"
                  >
                    {flavorOptions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Date & Theme Ideas */}
              <div>
                <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                  4. Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-sm text-[#2E1B11] focus:ring-2 focus:ring-[#8C5338] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                  5. Design Theme or Message on Cake (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  placeholder="e.g. Pastel pink floral theme, or Marvel Avengers topper with 'Happy 5th Birthday Aryan'"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-xs sm:text-sm text-[#2E1B11] placeholder:text-[#9E8E85] focus:ring-2 focus:ring-[#8C5338] focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.99] whitespace-nowrap disabled:opacity-75"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving Cake Request...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Discuss Your Cake on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#7A6961] mt-2 flex items-center justify-center gap-1.5">
                <span>Opens in WhatsApp with details formatted & saved securely to bakery records.</span>
              </p>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
