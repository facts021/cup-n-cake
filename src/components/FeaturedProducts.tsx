import React, { useState } from 'react';
import { MessageCircle, Eye, X, Check, Sparkles, Filter } from 'lucide-react';
import { BAKERY_CONFIG, ProductItem, getProductWhatsAppUrl, getWhatsAppUrl } from '../config/bakeryConfig.ts';

interface FeaturedProductsProps {
  selectedCategory: 'all' | 'cakes' | 'cupcakes' | 'custom' | 'treats';
  onCategoryChange: (cat: 'all' | 'cakes' | 'cupcakes' | 'custom' | 'treats') => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [customQuery, setCustomQuery] = useState('');

  const filterTabs = [
    { label: 'All Creations', key: 'all' as const },
    { label: 'Cakes', key: 'cakes' as const },
    { label: 'Cupcakes', key: 'cupcakes' as const },
    { label: 'Custom Cakes', key: 'custom' as const },
    { label: 'Bakery Treats', key: 'treats' as const },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? BAKERY_CONFIG.products
    : BAKERY_CONFIG.products.filter((p) => p.category === selectedCategory);

  const handleCustomEnquiry = (product: ProductItem) => {
    let msg = `Hi, I found The CUPnCAKE Factory website and would like to enquire about ordering "${product.name}".`;
    if (customQuery.trim()) {
      msg += ` Additional note: ${customQuery.trim()}`;
    }
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white border-t border-[#F0E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#F0E6DF] gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
              Our Fresh Bakes
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight">
              Featured Menu & Specialities
            </h2>
            <p className="text-[#6C5950] text-sm sm:text-base mt-2 max-w-xl">
              Freshly prepared with pure ingredients. Click any treat to enquire about sizes, flavours, and availability over WhatsApp.
            </p>
          </div>

          {/* Interactive filter tabs (segmented control, adhering to Section 1.A) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#EDE4DC] overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onCategoryChange(tab.key)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.key
                    ? 'bg-[#2E1B11] text-white shadow-xs'
                    : 'text-[#6C5950] hover:text-[#2E1B11] hover:bg-[#F3ECE6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#EDE4DC] hover:border-[#8C5338]/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image Area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F3ECE6]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Quick View Button overlay */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalProduct(product);
                    setCustomQuery('');
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#2E1B11] hover:bg-white shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer"
                  title="Quick View Details"
                  aria-label={`View details of ${product.name}`}
                >
                  <Eye className="w-4 h-4 text-[#523E35]" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-[#7A6961]">
                    <span className="capitalize font-medium text-[#8C5338]">
                      {product.category === 'cakes' ? 'Cake' : product.category === 'cupcakes' ? 'Cupcake' : product.category === 'custom' ? 'Custom' : 'Bakehouse Treat'}
                    </span>
                    <span className="font-semibold text-[#523E35]">
                      {product.priceLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#2E1B11] mb-2 leading-snug group-hover:text-[#8C5338] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6C5950] line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Order / Enquire Button */}
                <div className="pt-3 border-t border-[#E8DFD8]">
                  <a
                    href={getProductWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-[#2E1B11] bg-white border border-[#D9CBC2] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200 shadow-2xs group/btn whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/btn:text-white transition-colors" />
                    <span>Order / Enquire</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View & Custom Enquiry Modal */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E8DFD8] relative animate-in fade-in zoom-in-95 duration-200">
              
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#2E1B11] shadow-md transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] w-full bg-[#F3ECE6] relative overflow-hidden">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between text-xs text-[#8C5338] font-semibold uppercase tracking-wider mb-2">
                  <span>{activeModalProduct.category} · The CUPnCAKE Factory</span>
                  <span className="text-[#2E1B11] text-sm">{activeModalProduct.priceLabel}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2E1B11] mb-3">
                  {activeModalProduct.name}
                </h3>

                <p className="text-sm sm:text-base text-[#6C5950] leading-relaxed mb-4">
                  {activeModalProduct.description}
                </p>

                {activeModalProduct.flavorNotes && (
                  <div className="mb-6 p-3.5 rounded-xl bg-white border border-[#E8DFD8] text-xs text-[#523E35]">
                    <span className="font-semibold text-[#8C5338]">Flavour Profile: </span>
                    {activeModalProduct.flavorNotes}
                  </div>
                )}

                {/* Optional Custom note before sending to WhatsApp */}
                <div className="mb-6">
                  <label htmlFor="custom-notes" className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Have specific questions (weights, message on cake, delivery date)?
                  </label>
                  <input
                    id="custom-notes"
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="e.g., Need 1kg for tomorrow evening with 'Happy Birthday Ronit'"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CBC2] bg-white text-sm text-[#2E1B11] placeholder:text-[#9E8E85] focus:outline-none focus:ring-2 focus:ring-[#8C5338]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCustomEnquiry(activeModalProduct)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md transition-all whitespace-nowrap cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(null)}
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
