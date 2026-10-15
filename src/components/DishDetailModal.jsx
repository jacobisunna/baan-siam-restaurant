import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Flame, Plus, Check, Sparkles, AlertCircle } from 'lucide-react';
import { isAvailableNow, soldOutLabel } from '../data/restaurantData';

export const DishDetailModal = () => {
  const { selectedDish, setSelectedDish, addToCart } = useCart();
  const [spiceLevel, setSpiceLevel] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (selectedDish) {
      setSpiceLevel(selectedDish.spiceLevel);
      setSpecialInstructions('');
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [selectedDish]);

  if (!selectedDish) return null;

  const soldOut = !isAvailableNow(selectedDish);

  const handleAdd = () => {
    if (soldOut) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedDish, spiceLevel, specialInstructions);
    }
    setAddedAnimation(true);
    setTimeout(() => {
      setSelectedDish(null);
    }, 400);
  };

  const spiceDescriptions = [
    { level: 0, title: 'No Spice / Mild', desc: 'Delicate, fragrant herbs without chili heat' },
    { level: 1, title: 'Mild Warmth', desc: 'A gentle tingling warmth suitable for all guests' },
    { level: 2, title: 'Medium Bangkok Heat', desc: 'Traditional balanced Thai street heat' },
    { level: 3, title: 'Authentic Thai Hot', desc: 'Fiery bird\'s eye chilies for authentic spice lovers' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0e1d16] border border-[#c59b27]/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-[#c59b27] transition-colors"
          aria-label="Close dish modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto">
          {/* High-res Image Header */}
          <div className="relative aspect-[16/9] w-full bg-stone-900">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className={`w-full h-full object-cover ${soldOut ? 'grayscale opacity-70' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d16] via-transparent to-black/30" />
            {soldOut && (
              <div className="absolute top-4 left-4 right-16">
                <span className="inline-block px-3 py-1 rounded-full bg-stone-950/85 text-stone-100 border border-stone-600 font-bold text-xs uppercase tracking-wider shadow">
                  {soldOutLabel(selectedDish)}
                </span>
              </div>
            )}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs text-[#c59b27] font-serif uppercase tracking-widest">
                  {selectedDish.thaiName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {selectedDish.name}
                </h3>
              </div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#f3e5ab] bg-black/60 px-4 py-1 rounded-full border border-white/10">
                ${selectedDish.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Description & Dietary */}
            <div>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {selectedDish.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedDish.calories && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-stone-800 text-stone-300">
                    🔥 {selectedDish.calories}
                  </span>
                )}
                {selectedDish.dietary.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#12281e] text-emerald-300 border border-emerald-900/60"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Customizer: Spice Level */}
            <div className="pt-4 border-t border-stone-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#c59b27] mb-3">
                Select Your Spice Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {spiceDescriptions.map((item) => {
                  const isSelected = spiceLevel === item.level;
                  return (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setSpiceLevel(item.level)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b3d2c] border-[#c59b27] text-white shadow-md'
                          : 'bg-[#12241b] border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {item.level === 0 ? (
                          <span className="text-xs text-stone-400">Zero Heat</span>
                        ) : (
                          Array.from({ length: item.level }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          ))
                        )}
                      </div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-[10px] text-stone-400 mt-1 line-clamp-2 leading-tight">
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests / Allergen Note */}
            <div className="pt-4 border-t border-stone-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                Special Requests or Dietary Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra lime wedges, light peanut sauce, cilantro on side..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-[#12241b] border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c59b27]"
              />
              <p className="text-[11px] text-stone-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Our kitchen accommodates all allergies with fresh cookware.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#0a1510] border-t border-stone-800 flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-[#12241b] border border-stone-800 rounded-full px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-stone-300 hover:text-white font-bold px-2 py-0.5"
            >
              -
            </button>
            <span className="text-sm font-bold text-white min-w-[1.5rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-stone-300 hover:text-white font-bold px-2 py-0.5"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={soldOut}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              soldOut
                ? 'bg-stone-800 text-stone-400 border border-stone-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 shadow-lg shadow-[#c59b27]/20 cursor-pointer'
            }`}
          >
            {soldOut ? (
              <span>{soldOutLabel(selectedDish)}</span>
            ) : addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-stone-950" />
                <span>Add to Cart · ${(selectedDish.price * quantity).toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
