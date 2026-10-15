import React from 'react';
import { guestReviews, restaurantInfo } from '../data/restaurantData';
import { Star, Award, Quote, CheckCircle } from 'lucide-react';

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0a1510] relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122b1e] border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Critically Acclaimed</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-5">
            Loved by Critics, <span className="gold-gradient-text">Cherished by Guests</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Read what culinary journalists and our treasured guests say about our authentic Royal Thai cuisine and signature smiling hospitality.
          </p>
        </div>

        {/* Awards Banner Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {restaurantInfo.awards.map((award, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0e1d16] border border-[#c59b27]/30 text-center flex flex-col items-center justify-center shadow-lg group hover:border-[#c59b27] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#12281e] border border-[#c59b27] flex items-center justify-center text-[#c59b27] mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-1">
                {award.title}
              </h3>
              <p className="text-xs text-[#c59b27] font-medium">
                {award.year || award.org}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guestReviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#0e1d16] border border-stone-800/80 hover:border-[#c59b27]/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#c59b27]/30 mb-4" />
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#c59b27] fill-[#c59b27]" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-light italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{review.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-[#c59b27]">{review.title}</p>
                </div>
                <span className="text-[10px] text-stone-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
