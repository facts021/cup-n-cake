import React, { useState } from 'react';
import { Eye, MessageCircle, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { BAKERY_CONFIG, getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface GalleryItem {
  id: string;
  title: string;
  category: 'birthday' | 'custom' | 'cupcakes' | 'chocolate' | 'celebration' | 'bakery';
  categoryLabel: string;
  image: string;
  aspect: string;
  description: string;
}

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Gallery items structured cleanly for future real business image replacements
  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Handcrafted Chocolate Ganache Drip Cake',
      category: 'chocolate',
      categoryLabel: 'Chocolate Cakes',
      image: BAKERY_CONFIG.images.hero,
      aspect: 'aspect-[4/5]',
      description: 'Layered rich chocolate sponge with berries, edible gold and glossy Belgian drip.',
    },
    {
      id: 'gal-2',
      title: 'Artisanal Swirl Cupcakes Platter',
      category: 'cupcakes',
      categoryLabel: 'Cupcakes',
      image: BAKERY_CONFIG.images.cupcakes,
      aspect: 'aspect-[1/1]',
      description: 'Gourmet dark truffle and velvet cream cheese swirls on rustic platter.',
    },
    {
      id: 'gal-3',
      title: 'Botanical Blush Tier Celebration Cake',
      category: 'celebration',
      categoryLabel: 'Celebration Cakes',
      image: BAKERY_CONFIG.images.customCake,
      aspect: 'aspect-[4/5]',
      description: 'Bespoke pastel sugarcraft florals and delicate buttercream textures.',
    },
    {
      id: 'gal-4',
      title: 'Baker’s Fresh Vanilla Piping Craft',
      category: 'custom',
      categoryLabel: 'Custom Cakes',
      image: BAKERY_CONFIG.images.about,
      aspect: 'aspect-[1/1]',
      description: 'Traditional piping techniques with fresh whipped cream and vanilla bean.',
    },
    {
      id: 'gal-5',
      title: 'Warm Fudge Brownies & Bakery Pastries',
      category: 'bakery',
      categoryLabel: 'Bakery Products',
      image: BAKERY_CONFIG.images.treats,
      aspect: 'aspect-[4/3]',
      description: 'Fresh out of the oven: walnut fudge squares and golden butter cookies.',
    },
    {
      id: 'gal-6',
      title: 'Milestone Anniversary Floral Theme Cake',
      category: 'birthday',
      categoryLabel: 'Birthday Cakes',
      image: BAKERY_CONFIG.images.hero,
      aspect: 'aspect-[1/1]',
      description: 'Custom celebratory cake personalized with customer color palette.',
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'All Photos' },
    { key: 'birthday', label: 'Birthday Cakes' },
    { key: 'custom', label: 'Custom Cakes' },
    { key: 'cupcakes', label: 'Cupcakes' },
    { key: 'chocolate', label: 'Chocolate Cakes' },
    { key: 'celebration', label: 'Celebration Cakes' },
    { key: 'bakery', label: 'Bakery Products' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleEnquireFromGallery = (item: GalleryItem) => {
    const msg = `Hi, I saw "${item.title}" in The CUPnCAKE Factory gallery and would love to enquire about ordering a similar design for my occasion.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#F0E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8DFD8] gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
              Visual Showcase
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight">
              Bakehouse Gallery
            </h2>
            <p className="text-[#6C5950] text-sm sm:text-base mt-2 max-w-xl">
              A glimpse into our recent cake orders and bakery creations. Easily customize any style for your celebration.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#EDE4DC] overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.key
                    ? 'bg-[#2E1B11] text-white shadow-2xs'
                    : 'text-[#6C5950] hover:text-[#2E1B11] hover:bg-[#F3ECE6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white border border-[#EDE4DC] shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className={`relative ${item.aspect} w-full overflow-hidden bg-[#F3ECE6]`}>
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay with smooth settling */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1B11]/80 via-[#2E1B11]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="text-xs uppercase tracking-wider text-[#F8E08E] font-medium mb-1">
                    {item.categoryLabel}
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEnquireFromGallery(item)}
                      className="px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-xs font-semibold flex items-center gap-1 cursor-pointer text-white"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" /> Enquire
                    </button>
                  </div>
                </div>
              </div>

              {/* Quiet caption underneath */}
              <div className="p-4 sm:hidden bg-white">
                <div className="text-[11px] font-semibold text-[#8C5338] uppercase">
                  {item.categoryLabel}
                </div>
                <h3 className="font-semibold text-sm text-[#2E1B11]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-[#E8DFD8]">
              
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#2E1B11] shadow-md transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] w-full bg-[#F3ECE6]">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold text-[#8C5338] uppercase tracking-wider mb-1">
                  {lightboxItem.categoryLabel} · The CUPnCAKE Factory
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2E1B11] mb-2">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-[#6C5950] mb-6">
                  {lightboxItem.description}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleEnquireFromGallery(lightboxItem)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Enquire About This Design on WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxItem(null)}
                    className="px-5 py-3 rounded-full text-sm font-medium text-[#6C5950] hover:text-[#2E1B11] hover:bg-[#EDE4DC] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
