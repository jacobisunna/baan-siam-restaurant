import React, { useState } from 'react';
import { restaurantInfo } from '../data/restaurantData';
import { 
  Heart, 
  Send, 
  CheckCircle, 
  MapPin, 
  Phone,
  Sparkles,
  Share2
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer = () => {
  const { setIsReservationOpen } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#07120d] border-t border-[#c59b27]/30 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0e2419] via-[#091b12] to-[#0e2419] border border-[#c59b27]/40 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold flex items-center justify-center lg:justify-start gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Siam Circle</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Receive a Complimentary Thai Iced Tea
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light">
              Subscribe for invitations to seasonal chef tastings, festive Songkran feasts, and receive a voucher for handcrafted Thai Iced Tea on your next visit.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 bg-[#12281e] px-5 py-3 rounded-full border border-emerald-800 text-xs sm:text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Sawasdee! Check your inbox for your complimentary beverage gift.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#12241b] border border-stone-700/80 rounded-full px-5 py-3 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c59b27] w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c59b27] flex items-center justify-center bg-[#0d2a1d]">
                <span className="text-[#c59b27] font-serif text-lg">ส</span>
              </div>
              <span className="text-xl font-serif font-bold text-white">{restaurantInfo.name}</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Authentic Royal Thai dining crafted with devotion, heritage spices, and warm, heartfelt hospitality that brings smiles to every table.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12241b] border border-stone-800 flex items-center justify-center text-stone-400 hover:text-[#c59b27] hover:border-[#c59b27] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#12241b] border border-stone-800 flex items-center justify-center text-stone-400 hover:text-[#c59b27] hover:border-[#c59b27] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#story" className="text-stone-400 hover:text-[#c59b27] transition-colors">Our Story & Heritage</a>
              </li>
              <li>
                <a href="#hospitality" className="text-stone-400 hover:text-[#c59b27] transition-colors">Hospitality & Team</a>
              </li>
              <li>
                <a href="#menu" className="text-stone-400 hover:text-[#c59b27] transition-colors">Full Food & Drinks Menu</a>
              </li>
              <li>
                <a href="#signatures" className="text-stone-400 hover:text-[#c59b27] transition-colors">Royal Chef Signatures</a>
              </li>
              <li>
                <a href="#reviews" className="text-stone-400 hover:text-[#c59b27] transition-colors">Accolades & Reviews</a>
              </li>
            </ul>
          </div>

          {/* Reservations & Dining */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Dining Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="text-stone-400 hover:text-[#c59b27] transition-colors text-left cursor-pointer"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <a href="#menu" className="text-stone-400 hover:text-[#c59b27] transition-colors">Online Takeout & Delivery</a>
              </li>
              <li>
                <a href={`mailto:${restaurantInfo.email}`} className="text-stone-400 hover:text-[#c59b27] transition-colors">Private Dining & Buyouts</a>
              </li>
              <li>
                <a href="#location" className="text-stone-400 hover:text-[#c59b27] transition-colors">Parking & Directions</a>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Contact & Location
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              {restaurantInfo.address}
            </p>
            <p className="text-xs text-[#f3e5ab] font-medium mb-1">
              Tel: <a href={`tel:${restaurantInfo.phone}`} className="hover:underline">{restaurantInfo.phone}</a>
            </p>
            <p className="text-xs text-stone-400">
              Email: {restaurantInfo.email}
            </p>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {restaurantInfo.name} ({restaurantInfo.thaiName}). All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic culinary lovers · Ready for GitHub & Vercel</span>
          </div>
        </div>
        <p className="pt-4 text-center text-[11px] text-stone-600">
          Baan Siam is a fictional restaurant created for a RestaurantBot demo.
        </p>
      </div>
    </footer>
  );
};
