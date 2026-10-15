import React from 'react';
import { restaurantInfo } from '../data/restaurantData';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Car, 
  Sparkles, 
  Navigation,
  Calendar
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const LocationHours = () => {
  const { setIsReservationOpen } = useCart();

  return (
    <section id="location" className="py-24 bg-[#0c1410] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#122b1e] border border-[#c59b27]/40 text-[#c59b27] text-xs font-semibold tracking-widest uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Us & Dining Hours</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-5">
            Visit <span className="gold-gradient-text">Baan Siam</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Conveniently situated in downtown with complimentary valet dining parking, a garden courtyard, and private banquet salons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Hours & Contact Card */}
          <div className="bg-[#0e1d16] p-8 sm:p-10 rounded-3xl border border-stone-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#12281e] border border-[#c59b27] flex items-center justify-center text-[#c59b27]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Hours of Service</h3>
                  <p className="text-xs text-stone-400">Serving lunch & dinner 7 days a week</p>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="space-y-3.5 mb-8">
                {restaurantInfo.hours.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#12241b] border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5"
                  >
                    <span className="font-semibold text-white">{schedule.days}</span>
                    <div className="flex items-center gap-3 text-stone-300">
                      <span>Lunch: {schedule.lunch}</span>
                      <span className="text-stone-600">|</span>
                      <span className="text-[#f3e5ab]">Dinner: {schedule.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Location & Contact Info */}
              <div className="space-y-4 pt-6 border-t border-stone-800">
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Physical Address</strong>
                    <span className="text-stone-300">{restaurantInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Telephone & Reservations</strong>
                    <a href={`tel:${restaurantInfo.phone}`} className="text-[#f3e5ab] hover:underline">
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <Car className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Parking & Valet</strong>
                    <span className="text-stone-300">
                      Complimentary evening valet parking Thursday – Sunday. 2-hour garage validation anytime.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-8">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-sm shadow-xl shadow-[#c59b27]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Reserve a Table for Tonight</span>
              </button>
            </div>
          </div>

          {/* Interactive Styled Map Card */}
          <div className="bg-[#0e1d16] rounded-3xl border border-stone-800/80 shadow-xl overflow-hidden flex flex-col">
            {/* Visual Map Representation */}
            <div className="relative h-72 sm:h-80 bg-stone-900 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                alt="City Map Representation"
                className="w-full h-full object-cover filter brightness-60 contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#081812]/50 backdrop-blur-[1px]" />

              {/* Custom Map Pin Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <div className="px-3.5 py-1.5 rounded-full bg-[#c59b27] text-stone-950 font-bold text-xs shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                  <span>🍛 Baan Siam Restaurant</span>
                </div>
                <div className="w-3 h-3 bg-[#c59b27] rotate-45 -mt-1.5 shadow-md" />
              </div>

              {/* Direction Button Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-black/80 hover:bg-[#c59b27] hover:text-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
                <span className="text-[11px] text-[#f3e5ab] bg-black/70 px-3 py-1 rounded-full border border-white/10">
                  Downtown Arts District
                </span>
              </div>
            </div>

            {/* Private Events & Catering Callout */}
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#c59b27] font-semibold tracking-wider uppercase">
                  Private Gatherings
                </span>
                <h4 className="text-xl font-serif font-bold text-white mt-1 mb-2">
                  Host Your Celebration in Siam Style
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  From wedding celebrations and milestone birthdays to corporate banquets, our Jasmine Courtyard accommodates up to 60 guests with tailored family-style banquet menus and dedicated server captains.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400">Events Concierge:</span>
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-xs text-[#c59b27] hover:underline flex items-center gap-1 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{restaurantInfo.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
