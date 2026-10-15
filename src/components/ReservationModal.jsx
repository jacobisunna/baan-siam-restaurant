import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  HeartHandshake,
  Utensils
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { restaurantInfo } from '../data/restaurantData';

export const ReservationModal = () => {
  const { isReservationOpen, setIsReservationOpen } = useCart();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('6:30 PM');
  const [guests, setGuests] = useState('2');
  const [area, setArea] = useState('Main Royal Dining');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isReservationOpen) return null;

  const lunchTimes = ['11:45 AM', '12:15 PM', '1:00 PM', '1:30 PM', '2:00 PM'];
  const dinnerTimes = ['5:00 PM', '5:45 PM', '6:30 PM', '7:15 PM', '8:00 PM', '8:45 PM', '9:15 PM'];

  const seatingAreas = [
    { name: 'Main Royal Dining', desc: 'Teakwood tables under glowing brass lanterns' },
    { name: 'Jasmine Garden Courtyard', desc: 'Heated open-air terrace with tropical greenery' },
    { name: "Chef's Wok Counter", desc: 'Front-row view of roaring wok artistry' },
    { name: 'Romantic Booth', desc: 'Intimate velvet banquet seating with candlelight' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `SIAM-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0D472B', '#FAF7F2'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setIsReservationOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#0e1d16] border border-[#c59b27]/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-[#c59b27] transition-colors"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Success Screen */
          <div className="p-8 sm:p-10 text-center flex flex-col items-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#1b3d2c] border-2 border-[#c59b27] flex items-center justify-center mb-6 shadow-xl text-[#c59b27]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold mb-1">
              Reservation Confirmed · Sawasdee!
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-sm text-stone-300 max-w-md mb-6 font-light">
              Your table at <strong className="text-white">Baan Siam</strong> has been reserved for{' '}
              <span className="text-[#f3e5ab] font-medium">{guests} guests</span> on{' '}
              <span className="text-[#f3e5ab] font-medium">{date}</span> at{' '}
              <span className="text-[#f3e5ab] font-medium">{time}</span> ({area}).
            </p>

            <div className="bg-[#12281e] p-4 rounded-xl border border-stone-800 w-full text-left space-y-2 mb-6 text-xs text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Confirmation Reference:</span>
                <span className="font-mono font-bold text-[#c59b27]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guest Name:</span>
                <span className="font-medium text-white">{name || 'Honored Guest'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Address:</span>
                <span className="text-white">{restaurantInfo.address}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 mb-6 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#c59b27]" />
              <span>A confirmation text has been prepared for {phone || 'your phone'}.</span>
            </p>

            <button
              onClick={resetForm}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-sm shadow-lg shadow-[#c59b27]/20 transition-all cursor-pointer"
            >
              Done & Explore Menu
            </button>
          </div>
        ) : (
          /* Reservation Form */
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c59b27] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fine Thai Dining</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Reserve Your Table
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Join us for an unforgettable dining experience greeted by our smiling hospitality team.
              </p>
            </div>

            {/* Date, Guests & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#12241b] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#12241b] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-[#c59b27]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, '9+ (Private Dining)'].map((num) => (
                    <option key={num} value={num} className="bg-[#0e1d16] text-white">
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                Preferred Seating Time
              </label>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#c59b27] font-semibold">
                    Dinner Service
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dinnerTimes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          time === t
                            ? 'bg-[#c59b27] text-stone-950 font-bold shadow'
                            : 'bg-[#12241b] text-stone-300 hover:text-white border border-stone-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#c59b27] font-semibold">
                    Lunch Service
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lunchTimes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          time === t
                            ? 'bg-[#c59b27] text-stone-950 font-bold shadow'
                            : 'bg-[#12241b] text-stone-300 hover:text-white border border-stone-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Seating Area Preference */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {seatingAreas.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setArea(s.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      area === s.name
                        ? 'bg-[#183627] border-[#c59b27] text-white shadow'
                        : 'bg-[#12241b] border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{s.name}</div>
                    <div className="text-[10px] text-stone-400">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs text-stone-400 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Somchai Prasert"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#12241b] border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="(323) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#12241b] border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c59b27]"
                />
              </div>
            </div>

            {/* Occasion / Dietary notes */}
            <div>
              <label className="block text-xs text-stone-400 mb-1">Special Occasion / Dietary Notes</label>
              <input
                type="text"
                placeholder="Anniversary, Birthday, peanut allergy, high chair needed..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#12241b] border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#c59b27]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-sm shadow-xl shadow-[#c59b27]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Confirm Table Reservation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
