import React, { createContext, useContext, useEffect, useState } from 'react';
import { isWithinDates } from '../data/restaurantData';

// Seasonal Halloween theme. HALLOWEEN_THEME.enabled is the site-wide switch: true shows the
// theme to every guest by default, false turns it off for everyone. It only runs inside its
// LA date window. The pumpkin button in the navigation lets a visitor flip it on their own screen.
export const HALLOWEEN_THEME = {
  enabled: false,
  startDate: '2026-10-01',
  endDate: '2026-10-31',
};

const STORAGE_KEY = 'baansiam_halloween_theme';
const THEME_CLASS = 'theme-halloween';

const ThemeContext = createContext({ isSeason: false, isHalloween: false, toggleHalloween: () => {} });

const readChoice = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'on' || saved === 'off' ? saved : null;
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ children }) => {
  const isSeason = HALLOWEEN_THEME.enabled && isWithinDates(HALLOWEEN_THEME);
  const [choice, setChoice] = useState(readChoice);
  const isHalloween = isSeason && choice !== 'off';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(THEME_CLASS, isHalloween);
    return () => root.classList.remove(THEME_CLASS);
  }, [isHalloween]);

  const toggleHalloween = () => {
    const next = isHalloween ? 'off' : 'on';
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this visit only.
    }
  };

  return (
    <ThemeContext.Provider value={{ isSeason, isHalloween, toggleHalloween }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
