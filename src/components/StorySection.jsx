import React from 'react';
import { Sparkles, Utensils, Award, Clock } from 'lucide-react';

export const StorySection = () => {
  return (
    <section id="story" className="py-24 bg-[#0c1410] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Image Montage */}
          <div className="relative">
            {/* Primary Large Image */}
            <div className="relative rounded-3xl overflow-hidden border border-[#c59b27]/40 shadow-2xl shadow-black/80 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
                alt="Baan Siam Dining Room and Hospitality"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-[#0d2a1d]/90 border border-[#c59b27] text-[#f3e5ab] text-xs font-medium backdrop-blur-md">
                  Est. 2012 · Handcrafted with Devotion
                </span>
              </div>
            </div>

            {/* Overlapping Small Accent Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 rounded-2xl overflow-hidden border-2 border-[#c59b27] shadow-2xl bg-[#0e1d16] p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#1b3d2c] flex items-center justify-center text-[#c59b27]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Daily Granite Mortar</h4>
                  <p className="text-[10px] text-stone-400">Pounded Fresh Each Dawn</p>
                </div>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                Never powdered or canned. We press our own coconut milk and hand-pound galangal, kaffir lime, and fresh chilies daily.
              </p>
            </div>
          </div>

          {/* Story Text & Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122b1e] border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Heritage & Tradition</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-6 leading-tight">
              From Royal Bangkok Kitchens to <span className="gold-gradient-text">Your Table</span>
            </h2>

            <p className="text-stone-300 text-base leading-relaxed mb-5 font-light">
              Founded by Executive Chef Somchai and his wife Mali, <strong className="text-[#f3e5ab] font-medium">Baan Siam</strong> was born from a simple passion: to honor the authentic harmony of Thai culinary heritage—the delicate dance between fiery spice, sweet palm sugar, tart tamarind, and fragrant fresh herbs.
            </p>

            <p className="text-stone-300 text-base leading-relaxed mb-8 font-light">
              Every curry paste is pounded in deep granite stone mortars before sunrise. Our recipes preserve the nuanced techniques of the Royal Thai Palaces while embracing the joyful, communal spirit of Thailand's night markets. Paired with genuine hospitality, dining here is not just a meal—it is a celebration.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800">
              <div className="p-3.5 rounded-xl bg-[#0d1e17] border border-stone-800/80">
                <h4 className="font-serif font-bold text-sm text-[#f3e5ab] mb-1">Authentic Roots</h4>
                <p className="text-xs text-stone-400">No compromises or shortcuts in heritage Thai recipes.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0d1e17] border border-stone-800/80">
                <h4 className="font-serif font-bold text-sm text-[#f3e5ab] mb-1">Wai Hospitality</h4>
                <p className="text-xs text-stone-400">Warm, smiling, attentive service from the heart.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0d1e17] border border-stone-800/80">
                <h4 className="font-serif font-bold text-sm text-[#f3e5ab] mb-1">Pure Ingredients</h4>
                <p className="text-xs text-stone-400">Wild-caught seafood & daily flown herbs from Thailand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
