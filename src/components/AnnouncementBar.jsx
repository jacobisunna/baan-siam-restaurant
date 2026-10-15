import React, { useEffect, useRef, useState } from 'react';
import { Info, Megaphone, TriangleAlert, X } from 'lucide-react';
import { activeAnnouncements } from '../data/restaurantData';

const DISMISSED_KEY = 'baansiam_dismissed_announcements';

const toneStyles = {
  info: { Icon: Info, className: 'bg-[#12281e] text-emerald-100 border-emerald-900/70' },
  promo: { Icon: Megaphone, className: 'bg-gradient-to-r from-[#c59b27] to-[#aa771c] text-stone-950 border-[#aa771c]' },
  alert: { Icon: TriangleAlert, className: 'bg-rose-950 text-rose-100 border-rose-900/70' },
};

const readDismissed = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(DISMISSED_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

// Site-wide banners from src/data/announcements.json, shown above the navigation while their
// startDate/endDate window (Los Angeles dates) is open. Guests can dismiss each one.
export const AnnouncementBar = () => {
  const [dismissed, setDismissed] = useState(readDismissed);
  const barRef = useRef(null);
  const visible = activeAnnouncements().filter((item) => !dismissed.includes(item.id));

  // Share the bar's height so the hero can keep its content clear of the fixed header.
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!bar) {
      root.style.setProperty('--announcement-h', '0px');
      return undefined;
    }
    const update = () => root.style.setProperty('--announcement-h', `${bar.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.setProperty('--announcement-h', '0px');
    };
  }, [visible.length]);

  const dismiss = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try {
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode): the banner stays hidden for this visit only.
    }
  };

  if (visible.length === 0) return null;

  return (
    <div ref={barRef} role="region" aria-label="Announcements">
      {visible.map((item) => {
        const { Icon, className } = toneStyles[item.tone] || toneStyles.info;
        return (
          <div key={item.id} className={`border-b ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <p className="flex-1 text-center text-xs sm:text-sm font-medium leading-snug">{item.message}</p>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                className="p-1 rounded-full hover:bg-black/20 transition-colors shrink-0 cursor-pointer"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
