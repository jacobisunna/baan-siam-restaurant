import React from 'react';
import { hospitalityTeam } from '../data/restaurantData';
import { Heart, Sparkles, Smile, Users, Award } from 'lucide-react';

export const HospitalitySection = () => {
  return (
    <section id="hospitality" className="py-24 bg-[#0a1510] relative overflow-hidden border-t border-b border-[#c59b27]/20">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0e3b26]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122b1e] border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-widest uppercase mb-4">
            <Smile className="w-3.5 h-3.5" />
            <span>The Heart of Siam</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-5">
            Warm Smiles, <span className="gold-gradient-text">Heartfelt Hospitality</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            In Thailand, dining is an act of warmth, joy, and kinship. We welcome every guest with the traditional <span className="text-[#f3e5ab] font-medium">'Wai'</span> greeting, attentive service that anticipates your every wish, and radiant smiles that make you feel truly at home.
          </p>
        </div>

        {/* Feature Cards of Happy Hospitality Staff */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitalityTeam.map((member, index) => (
            <div
              key={index}
              className="group bg-[#0e1d16] rounded-2xl overflow-hidden border border-stone-800/80 hover:border-[#c59b27]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#c59b27]/10 flex flex-col"
            >
              {/* Photo of Smiling Staff */}
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d16] via-transparent to-black/20" />
                
                {/* Cheerful Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0a1510]/80 backdrop-blur-md border border-[#c59b27]/40 text-[#f3e5ab] text-[11px] font-medium flex items-center gap-1.5">
                  <Smile className="w-3 h-3 text-[#c59b27]" />
                  <span>Siam Warmth</span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#f3e5ab] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#c59b27] font-medium tracking-wide uppercase mt-0.5 mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">
                    "{member.bio}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Always Welcoming
                  </span>
                  <span className="text-stone-500">Baan Siam Family</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hospitality Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#12281e] via-[#0f2118] to-[#12281e] border border-[#c59b27]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-full bg-[#1b3d2c] border border-[#c59b27] flex items-center justify-center shrink-0 shadow-lg">
              <Heart className="w-7 h-7 text-[#c59b27]" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-white">The "Sabai Sabai" Promise</h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-1 font-light">
                *Sabai Sabai* is the Thai philosophy of comfortable ease, peaceful happiness, and feeling cherished. If there is ever anything we can do to make your meal more joyous, our smiling servers are at your side.
              </p>
            </div>
          </div>
          
          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs text-[#f3e5ab] bg-[#0c1812] px-4 py-2 rounded-full border border-[#c59b27]/40 font-medium">
              ✨ 5-Star Service Rating on Google & OpenTable
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
