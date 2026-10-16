import React from 'react';
import { useTheme } from '../context/ThemeContext';

// A few bats drifting across the page and a harvest-moon glow, shown only while the
// Halloween theme is on. Purely decorative: no pointer events, hidden from screen readers.
const BAT_PATH =
  'M32 12 L29 6 L28 10 C24 9 21 10 19 12 C15 8 9 7 3 9 C7 11 9 15 10 19 C13 16 17 16 20 18 C22 15 25 15 27 16 C28 19 30 21 32 22 C34 21 36 19 37 16 C39 15 42 15 44 18 C47 16 51 16 54 19 C55 15 57 11 61 9 C55 7 49 8 45 12 C43 10 40 9 36 10 L35 6 Z';

const bats = [
  { top: '18%', size: 44, duration: '26s', delay: '0s' },
  { top: '34%', size: 30, duration: '34s', delay: '-9s' },
  { top: '56%', size: 36, duration: '30s', delay: '-17s' },
  { top: '72%', size: 26, duration: '40s', delay: '-24s' },
];

export const BatIcon = ({ className = '', style }) => (
  <svg viewBox="0 0 64 32" fill="currentColor" className={className} style={style} aria-hidden="true">
    <path d={BAT_PATH} />
  </svg>
);

export const PumpkinIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 7c-4.5 0-8 2.9-8 6.5S7.5 20 12 20s8-2.9 8-6.5S16.5 7 12 7z" />
    <path d="M12 7c-2 1.5-2.5 4-2.5 6.5S10 18.5 12 20" />
    <path d="M12 7c2 1.5 2.5 4 2.5 6.5S14 18.5 12 20" />
    <path d="M12 7V4.5c0-.8.6-1.5 1.5-1.5" />
  </svg>
);

export const HalloweenDecor = () => {
  const { isHalloween } = useTheme();
  if (!isHalloween) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      <div className="halloween-moon" />
      {bats.map((bat, i) => (
        <div
          key={i}
          className="halloween-bat"
          style={{ top: bat.top, animationDuration: bat.duration, animationDelay: bat.delay }}
        >
          <BatIcon style={{ width: bat.size, height: bat.size / 2 }} />
        </div>
      ))}
    </div>
  );
};
