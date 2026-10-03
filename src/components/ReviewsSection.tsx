import React from 'react';
import { Star, ExternalLink, Quote, ShieldCheck } from 'lucide-react';
import { BAKERY_CONFIG } from '../config/bakeryConfig.ts';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-[#F0E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C5338] mb-2">
            Patron Love
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2E1B11] tracking-tight mb-3">
            What Our Customers Say
          </h2>
          <p className="text-[#6C5950] text-sm sm:text-base">
            Verified feedback from birthday celebrations, weddings, and everyday dessert lovers in Gurugram.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BAKERY_CONFIG.sampleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF7F2] p-7 rounded-3xl border border-[#EDE4DC] flex flex-col justify-between hover:border-[#8C5338]/40 transition-colors shadow-xs"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                  <span className="text-xs font-semibold text-[#523E35] ml-2">
                    5.0 Rating
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#46332A] leading-relaxed mb-6 italic">
                  "{review.review}"
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-4 border-t border-[#E8DFD8] flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-[#2E1B11]">
                    {review.author}
                  </h3>
                  <div className="text-xs text-[#7A6961] flex items-center gap-1.5 mt-0.5">
                    <span>{review.occasion}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#8C5338] font-medium">Gurugram</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#7A6961]" title="Verified Customer Feedback">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Profile Connection Placeholder & Link */}
        <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#EDE4DC] max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-semibold text-[#2E1B11]">
              Read more authentic experiences on Google
            </h4>
            <p className="text-xs text-[#7A6961] mt-0.5">
              Live Google profile link placeholder ready for bakery owner credentials.
            </p>
          </div>

          <a
            href={BAKERY_CONFIG.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-[#2E1B11] bg-white border border-[#D9CBC2] hover:bg-[#F3ECE6] hover:border-[#8C5338] transition-all whitespace-nowrap shadow-2xs"
          >
            <span>See More Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8C5338]" />
          </a>
        </div>

      </div>
    </section>
  );
};
