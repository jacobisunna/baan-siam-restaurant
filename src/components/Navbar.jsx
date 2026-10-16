import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { PumpkinIcon } from './HalloweenDecor';

export const Navbar = () => {
  const { totalItems, setIsCartOpen, setIsReservationOpen } = useCart();
  const { isSeason, isHalloween, toggleHalloween } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Hospitality', href: '#hospitality' },
    { name: 'Menu', href: '#menu' },
    { name: 'Signatures', href: '#signatures' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Hours & Location', href: '#location' },
  ];

  return (
    <header
      className={`relative transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081812]/95 backdrop-blur-md border-b border-[#c59b27]/20 shadow-xl py-3'
          : 'bg-gradient-to-b from-[#081812]/90 via-[#081812]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#c59b27] flex items-center justify-center bg-[#0d2a1d] shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="text-[#c59b27] text-xl font-serif">ส</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-white group-hover:text-[#f3e5ab] transition-colors">
                {restaurantInfo.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#c59b27] font-medium">
                {restaurantInfo.thaiName} · Royal Thai Dining
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-[#c59b27] transition-colors tracking-wide relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#c59b27] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone quick link (desktop) */}
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="hidden sm:flex items-center gap-2 text-xs text-stone-300 hover:text-[#c59b27] transition-colors px-3 py-1.5 rounded-full border border-stone-700/60 hover:border-[#c59b27]/60"
            >
              <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>{restaurantInfo.phone}</span>
            </a>

            {/* Halloween theme switch (only during the season) */}
            {isSeason && (
              <button
                type="button"
                onClick={toggleHalloween}
                aria-pressed={isHalloween}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isHalloween
                    ? 'bg-[#2a1238] border-[#ff7a1a]/60 text-[#ff7a1a] hover:border-[#ff7a1a]'
                    : 'bg-[#12281e] border-stone-700/60 text-stone-400 hover:text-stone-200'
                }`}
                title={isHalloween ? 'Halloween theme: on (tap to turn off)' : 'Halloween theme: off (tap to turn on)'}
                aria-label="Halloween theme"
              >
                <PumpkinIcon className="w-5 h-5" />
              </button>
            )}

            {/* Table Reservation Button */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] text-stone-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#c59b27]/15 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
            </button>

            {/* Order Bag / Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#12281e] border border-[#c59b27]/40 text-stone-200 hover:text-[#f3e5ab] hover:border-[#c59b27] transition-all cursor-pointer group"
              title="View Order"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#c59b27] group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c59b27] text-stone-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081812]/98 border-b border-[#c59b27]/30 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-200 hover:text-[#c59b27] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-stone-600">→</span>
              </a>
            ))}
            <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center gap-2 text-sm text-[#c59b27]"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us: {restaurantInfo.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-[#c59b27]" />
                <span>{restaurantInfo.address}</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
