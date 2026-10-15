// Site content lives in the JSON files next to this module (menu.json, site.json,
// announcements.json). Edit those, not this file. This module keeps the original export
// names so components do not need to know where the data comes from.
import menuData from './menu.json';
import siteData from './site.json';
import announcementData from './announcements.json';

export const restaurantInfo = { ...siteData.restaurant, awards: siteData.awards };

export const hospitalityTeam = siteData.hospitalityTeam;

export const categories = menuData.categories;

// Hidden dishes are removed from the site entirely. Sold-out dishes stay listed (see isAvailableNow).
export const menuItems = menuData.items.filter((item) => !item.hidden);

export const guestReviews = siteData.guestReviews;

const LA_TIME_ZONE = 'America/Los_Angeles';

/** Today's date in Los Angeles as YYYY-MM-DD (the restaurant's business date). */
export function laToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: LA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type) => parts.find((p) => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

/** True when `today` falls inside the optional, inclusive startDate/endDate (YYYY-MM-DD) window. */
export function isWithinDates({ startDate, endDate } = {}, today = laToday()) {
  return (!startDate || startDate <= today) && (!endDate || today <= endDate);
}

/**
 * Whether a dish can be ordered right now. `available: false` marks it sold out; if
 * `unavailableUntil` (an LA date) is set, it comes back automatically on that date.
 */
export function isAvailableNow(item, today = laToday()) {
  if (!item || item.hidden) return false;
  if (item.available !== false) return true;
  return Boolean(item.unavailableUntil) && item.unavailableUntil <= today;
}

/** Badge text for a sold-out dish. */
export function soldOutLabel(item) {
  return item.unavailableNote || 'Sold out today';
}

/** Visible dishes whose `special` window includes today (LA), in menu order. */
export function activeSpecials(today = laToday()) {
  return menuItems.filter((item) => item.special && isWithinDates(item.special, today));
}

/** Announcement banners whose window includes today (LA). */
export function activeAnnouncements(today = laToday()) {
  return announcementData.items.filter((item) => isWithinDates(item, today));
}
