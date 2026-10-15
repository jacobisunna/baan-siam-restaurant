import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { categories, menuItems, isAvailableNow, laToday, soldOutLabel } from '../data/restaurantData';
import { 
  Search, 
  Flame, 
  Plus, 
  Utensils, 
  Sparkles, 
  Soup, 
  ChefHat, 
  Crown, 
  Cake, 
  Wine, 
  Eye, 
  Check,
  SlidersHorizontal,
  X
} from 'lucide-react';

const iconMap = {
  Utensils: Utensils,
  Sparkles: Sparkles,
  Soup: Soup,
  Flame: Flame,
  ChefHat: ChefHat,
  Crown: Crown,
  Cake: Cake,
  Wine: Wine,
};

export const MenuSection = () => {
  const { addToCart, setSelectedDish } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState('all');
  const today = laToday();

  const dietaryOptions = [
    { id: 'all', label: 'All Dietary' },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
    { id: 'Halal', label: 'Halal' },
    { id: "Chef's Pick", label: "Chef's Pick" },
  ];

  const spiceOptions = [
    { id: 'all', label: 'All Spiciness' },
    { id: '0', label: 'Non-Spicy (0 🌶️)' },
    { id: '1', label: 'Mild (1 🌶️)' },
    { id: '2', label: 'Medium (2 🌶️)' },
    { id: '3', label: 'Thai Hot (3 🌶️)' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        const hasDietary = item.dietary.some((tag) =>
          tag.toLowerCase().includes(selectedDietary.toLowerCase())
        );
        if (!hasDietary) return false;
      }
      // Spice level filter
      if (selectedSpiceFilter !== 'all') {
        if (item.spiceLevel !== parseInt(selectedSpiceFilter, 10)) {
          return false;
        }
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesThai = item.thaiName.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesThai && !matchesDesc) return false;
      }
      return true;
    });
  }, [activeCategory, selectedDietary, selectedSpiceFilter, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#0c1410] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122b1e] border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-widest uppercase mb-4">
            <Utensils className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Complete Culinary Collection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-5">
            The <span className="gold-gradient-text">Baan Siam Menu</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Every dish is prepared to order using authentic Thai herbs, freshly squeezed coconut milk, and time-honored royal cooking methods. Customize any spice level to your palate.
          </p>
        </div>

        {/* Search & Quick Filters Bar */}
        <div className="bg-[#0e1d16] p-4 sm:p-6 rounded-2xl border border-stone-800/80 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dish or ingredient (e.g. Prawns, Mango)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12241b] border border-stone-700/80 rounded-full pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c59b27] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary & Spice Pill Selectors */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full sm:w-auto">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedDietary(opt.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                      selectedDietary === opt.id
                        ? 'bg-[#c59b27] text-stone-950 font-semibold shadow'
                        : 'bg-[#12241b] text-stone-300 hover:text-white border border-stone-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Spice Filter dropdown */}
              <select
                value={selectedSpiceFilter}
                onChange={(e) => setSelectedSpiceFilter(e.target.value)}
                aria-label="Filter dishes by spice level"
                className="bg-[#12241b] text-xs text-stone-300 border border-stone-800 rounded-full px-3 py-1.5 focus:outline-none focus:border-[#c59b27] cursor-pointer"
              >
                {spiceOptions.map((sp) => (
                  <option key={sp.id} value={sp.id} className="bg-[#0e1d16] text-white">
                    {sp.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Utensils;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c59b27] to-[#aa771c] text-stone-950 shadow-lg shadow-[#c59b27]/20 scale-102'
                    : 'bg-[#0e1d16] text-stone-300 hover:text-white hover:bg-[#12281e] border border-stone-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-[#c59b27]'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredItems.length}</strong> delicious authentic dishes
          </span>
          {(selectedDietary !== 'all' || selectedSpiceFilter !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedDietary('all');
                setSelectedSpiceFilter('all');
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-[#c59b27] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#0e1d16] rounded-2xl border border-stone-800">
            <Utensils className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-white mb-1">No matching dishes found</h3>
            <p className="text-xs text-stone-400 mb-4">Try clearing your search term or adjusting dietary filters.</p>
            <button
              onClick={() => {
                setSelectedDietary('all');
                setSelectedSpiceFilter('all');
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-full bg-[#c59b27] text-stone-950 text-xs font-semibold"
            >
              Show Entire Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => {
              const soldOut = !isAvailableNow(dish, today);
              return (
              <div
                key={dish.id}
                className={`group bg-[#0e1d16] rounded-2xl overflow-hidden border border-stone-800/80 hover:border-[#c59b27]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#c59b27]/10 flex flex-col justify-between ${
                  soldOut ? 'opacity-70' : ''
                }`}
              >
                {/* Food Image with Hover Effect */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer"
                  onClick={() => setSelectedDish(dish)}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className={`w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 filter brightness-95 group-hover:brightness-105 ${
                      soldOut ? 'grayscale' : ''
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d16] via-transparent to-black/20" />

                  {/* Price Tag Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-serif font-bold text-xs sm:text-sm">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Sold Out / Popular Badge */}
                  {soldOut ? (
                    <div className="absolute top-3 left-3 max-w-[70%]">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-950/85 text-stone-100 border border-stone-600 font-bold text-[10px] uppercase tracking-wider shadow">
                        {soldOutLabel(dish)}
                      </span>
                    </div>
                  ) : dish.popular && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#c59b27] text-stone-950 font-bold text-[10px] uppercase tracking-wider shadow">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Quick Inspect Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDish(dish);
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 hover:bg-[#c59b27] hover:text-black text-white text-[11px] font-medium backdrop-blur-sm transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 duration-200"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Customize</span>
                  </button>
                </div>

                {/* Dish Information */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Thai Name & Spiciness */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-[#c59b27] font-serif tracking-wider">
                        {dish.thaiName}
                      </span>
                      {/* Spice indicator */}
                      <div className="flex items-center gap-0.5" title={`Spiciness: ${dish.spiceLevel} / 3`}>
                        {dish.spiceLevel === 0 ? (
                          <span className="text-[10px] text-stone-500">Mild / Non-Spicy</span>
                        ) : (
                          Array.from({ length: dish.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                          ))
                        )}
                      </div>
                    </div>

                    {/* Dish English Name */}
                    <h3
                      onClick={() => setSelectedDish(dish)}
                      className="text-lg font-serif font-bold text-white group-hover:text-[#f3e5ab] transition-colors cursor-pointer"
                    >
                      {dish.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-stone-300 mt-2 leading-relaxed font-light line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Footer of Card: Dietary badges & Add Button */}
                  <div className="mt-5 pt-3.5 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {dish.dietary.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#12281e] text-emerald-300 border border-emerald-900/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedDish(dish)}
                        className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                        title="View details & spice customizer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {soldOut ? (
                        <button
                          disabled
                          className="px-3.5 py-1.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700 font-bold text-xs flex items-center gap-1 cursor-not-allowed"
                        >
                          <span>Sold out</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(dish)}
                          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-xs transition-all flex items-center gap-1 shadow-md shadow-[#c59b27]/20 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
