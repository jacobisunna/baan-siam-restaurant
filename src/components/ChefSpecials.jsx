import React from 'react';
import { useCart } from '../context/CartContext';
import { menuItems, activeSpecials, isAvailableNow, laToday, soldOutLabel } from '../data/restaurantData';
import { Crown, Flame, Plus, Sparkles, Eye } from 'lucide-react';

export const ChefSpecials = () => {
  const { addToCart, setSelectedDish } = useCart();
  const today = laToday();

  // Dishes with a running special (menu.json "special") lead, then signatures or popular picks fill the row
  const runningSpecials = activeSpecials(today);
  const signaturePicks = menuItems.filter(
    (item) => (item.category === 'signatures' || item.popular) && !runningSpecials.includes(item)
  );
  const specials = [...runningSpecials, ...signaturePicks].slice(0, Math.max(3, runningSpecials.length));

  return (
    <section id="signatures" className="py-24 bg-[#0a1510] relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122b1e] border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-widest uppercase mb-4">
            <Crown className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Royal Court Specialties</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-5">
            Chef Somchai's <span className="gold-gradient-text">Royal Signatures</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Our most celebrated culinary creations—celebrating centuries of royal feast recipes with intricate marinades, velvety curries, and sizzling wok masterwork.
          </p>
        </div>

        {/* Featured Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specials.map((dish) => {
            const isSpecial = runningSpecials.includes(dish);
            const soldOut = !isAvailableNow(dish, today);
            return (
            <div
              key={dish.id}
              className={`group bg-[#0e1d16] rounded-3xl overflow-hidden border border-stone-800 hover:border-[#c59b27]/70 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c59b27]/15 flex flex-col justify-between ${
                soldOut ? 'opacity-70' : ''
              }`}
            >
              {/* Dish Photo with Zoom on Hover */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-900 cursor-pointer" onClick={() => setSelectedDish(dish)}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105 ${
                    soldOut ? 'grayscale' : ''
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d16] via-transparent to-black/30" />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 right-24 flex flex-wrap gap-1.5">
                  {isSpecial ? (
                    <span className="px-3 py-1 rounded-full bg-[#f3e5ab] text-stone-950 font-bold text-xs shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {dish.special.label}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#c59b27] text-stone-950 font-bold text-xs shadow-md flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Signature
                    </span>
                  )}
                  {soldOut && (
                    <span className="px-3 py-1 rounded-2xl bg-stone-950/85 text-stone-100 border border-stone-600 font-bold text-xs shadow-md">
                      {soldOutLabel(dish)}
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-serif font-bold text-sm">
                    ${dish.price.toFixed(2)}
                  </span>
                </div>

                {/* Quick inspect button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDish(dish);
                  }}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 hover:bg-[#c59b27] hover:text-black text-white text-xs font-medium backdrop-blur-sm transition-colors flex items-center gap-1.5 opacity-0 group-hover:opacity-100 duration-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Dish</span>
                </button>
              </div>

              {/* Dish Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#c59b27] font-serif tracking-wider uppercase">
                      {dish.thaiName}
                    </span>
                    {/* Spice Level meter */}
                    {dish.spiceLevel > 0 && (
                      <div className="flex items-center gap-0.5" title={`Spice Level: ${dish.spiceLevel} of 3`}>
                        {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    )}
                  </div>

                  <h3
                    onClick={() => setSelectedDish(dish)}
                    className="text-xl font-serif font-bold text-white group-hover:text-[#f3e5ab] transition-colors cursor-pointer"
                  >
                    {dish.name}
                  </h3>

                  <p className="text-xs text-stone-300 mt-2.5 leading-relaxed font-light line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                {/* Dietary Tags and CTA */}
                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {dish.dietary.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#12281e] text-emerald-300 border border-emerald-900/40">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {soldOut ? (
                    <button
                      disabled
                      className="px-4 py-2 rounded-full bg-stone-800 text-stone-400 border border-stone-700 font-bold text-xs whitespace-nowrap flex items-center gap-1.5 cursor-not-allowed"
                    >
                      <span>Sold out</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(dish)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-[#c59b27]/20 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
