import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Calendar, Utensils, Heart, Award, Clock } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';

export const Hero = () => {
  const { setIsReservationOpen } = useCart();
  // The first award in the data is the headline accolade shown in the hero.
  const headlineAward = restaurantInfo.awards[0];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-[calc(6rem_+_var(--announcement-h,0px))] pb-16 overflow-hidden">
      {/* Background Image with Cinematic Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Baan Siam Restaurant Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        {/* Multilayered Gradients for rich Thai emerald depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1410] via-[#0c1410]/70 to-[#081812]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c1410]/50 to-[#0c1410]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Recognition Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#122b1e]/90 border border-[#c59b27]/50 text-[#f3e5ab] text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-black/40 backdrop-blur-md">
          <Award className="w-4 h-4 text-[#c59b27]" />
          <span>{headlineAward.title} {headlineAward.year}</span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-300">Authentic Royal Thai Flavors</span>
        </div>

        {/* Thai Script Watermark / Sub-header */}
        <p className="text-[#c59b27] font-serif text-lg sm:text-2xl tracking-[0.25em] uppercase mb-2 font-light">
          {restaurantInfo.thaiName} · Welcome to Siam
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6">
          Authentic Royal Flavors, <br />
          <span className="gold-gradient-text">Served with Siam Warmth.</span>
        </h1>

        {/* Descriptive Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-light leading-relaxed mb-10">
          Where centuries of Royal Thai culinary traditions meet our heartfelt family hospitality. Fresh hand-pounded herbs, aromatic curries, wok-fired noodles, and warm, radiant smiles.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] text-stone-950 font-semibold text-base hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#c59b27]/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-stone-950 group-hover:rotate-12 transition-transform" />
            <span>Explore Complete Menu</span>
          </a>

          <button
            onClick={() => setIsReservationOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#12281e]/80 hover:bg-[#183528] border border-[#c59b27]/50 text-[#f3e5ab] font-semibold text-base transition-all hover:border-[#c59b27] flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-[#c59b27]" />
            <span>Reserve Your Table</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-stone-800/80">
          <div className="p-3 sm:p-4 rounded-xl bg-[#0f2219]/60 border border-stone-800/80 backdrop-blur-sm text-center">
            <Sparkles className="w-5 h-5 text-[#c59b27] mx-auto mb-1.5" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">Daily Fresh Herbs</h4>
            <p className="text-[11px] text-stone-400 mt-0.5">Lemongrass & Makrut</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0f2219]/60 border border-stone-800/80 backdrop-blur-sm text-center">
            <Heart className="w-5 h-5 text-[#c59b27] mx-auto mb-1.5" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">Heartfelt Hospitality</h4>
            <p className="text-[11px] text-stone-400 mt-0.5">Warm 'Sawasdee' Smiles</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0f2219]/60 border border-stone-800/80 backdrop-blur-sm text-center">
            <Award className="w-5 h-5 text-[#c59b27] mx-auto mb-1.5" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">{headlineAward.org || headlineAward.title}</h4>
            <p className="text-[11px] text-stone-400 mt-0.5">Recognized {headlineAward.year}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0f2219]/60 border border-stone-800/80 backdrop-blur-sm text-center">
            <Clock className="w-5 h-5 text-[#c59b27] mx-auto mb-1.5" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">Open 7 Days</h4>
            <p className="text-[11px] text-stone-400 mt-0.5">Lunch & Dinner Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};
