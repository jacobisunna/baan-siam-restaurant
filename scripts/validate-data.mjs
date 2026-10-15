// Validates the site data in src/data/*.json before it is committed or built.
// Plain Node, no dependencies. Usage: npm run validate   (exits 1 when any error is found)
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');

const errors = [];
const warnings = [];
const error = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const IMAGE_PATH_RE = /^\/images\/[A-Za-z0-9._/-]+$/;
const TONES = ['info', 'promo', 'alert'];
const REAL_AWARD_RE = /michelin|james beard|zagat/i;

const ITEM_REQUIRED = ['id', 'slug', 'posId', 'name', 'thaiName', 'category', 'price', 'spiceLevel', 'dietary',
  'description', 'image', 'popular', 'calories', 'available', 'hidden'];
const ITEM_OPTIONAL = ['unavailableNote', 'unavailableUntil', 'special'];
const ANNOUNCEMENT_KEYS = ['id', 'message', 'tone', 'startDate', 'endDate'];
const SITE_KEYS = ['version', 'restaurant', 'awards', 'hospitalityTeam', 'guestReviews'];
const RESTAURANT_REQUIRED = ['name', 'thaiName', 'tagline', 'description', 'address', 'phone', 'email'];

// Same as posIdFor() in the RestaurantBot runner (runner/lib/ids.mjs): UUIDv5 of "menu|<slug>".
const POS_NS = '6b1f3a52-9c4e-4d2a-8f7b-3e5d1c9a0b24';
function posIdFor(slug) {
  const ns = Buffer.from(POS_NS.replace(/-/g, ''), 'hex');
  const hash = createHash('sha1').update(Buffer.concat([ns, Buffer.from(`menu|${slug}`, 'utf8')])).digest();
  const b = Buffer.from(hash.subarray(0, 16));
  b[6] = (b[6] & 0x0f) | 0x50;
  b[8] = (b[8] & 0x3f) | 0x80;
  const x = b.toString('hex');
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`;
}

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isText = (v) => typeof v === 'string' && v.trim() !== '';

function isDate(v) {
  if (typeof v !== 'string' || !DATE_RE.test(v)) return false;
  const [y, m, d] = v.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function laToday() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const part = (type) => parts.find((p) => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
const TODAY = laToday();

function isImage(v) {
  if (typeof v !== 'string') return false;
  if (IMAGE_PATH_RE.test(v)) return !v.includes('..');
  try {
    return new URL(v).protocol === 'https:';
  } catch {
    return false;
  }
}

function load(name) {
  let text;
  try {
    text = readFileSync(path.join(DATA_DIR, name), 'utf8');
  } catch (e) {
    error(name, `cannot read file (${e.code || e.message})`);
    return null;
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    error(name, `invalid JSON: ${e.message}`);
    return null;
  }
  if (text.includes('\r')) warn(name, 'has CRLF line endings; keep LF');
  else if (text !== `${JSON.stringify(data, null, 2)}\n`) warn(name, 'is not in canonical form (JSON.stringify(data, null, 2) plus a trailing newline)');
  return data;
}

function checkKeys(where, obj, allowed) {
  for (const key of Object.keys(obj)) {
    if (!allowed.includes(key)) error(where, `unknown field "${key}" (allowed: ${allowed.join(', ')})`);
  }
}

// Optional startDate/endDate pair used by specials and announcements.
function checkWindow(where, obj, required) {
  for (const key of ['startDate', 'endDate']) {
    if (obj[key] === undefined) {
      if (required) error(where, `${key} is required (YYYY-MM-DD)`);
    } else if (!isDate(obj[key])) {
      error(where, `${key} must be a real date as YYYY-MM-DD, got ${JSON.stringify(obj[key])}`);
    }
  }
  if (isDate(obj.startDate) && isDate(obj.endDate) && obj.startDate > obj.endDate) {
    error(where, `startDate ${obj.startDate} is after endDate ${obj.endDate}`);
  }
  if (isDate(obj.endDate) && obj.endDate < TODAY) warn(where, `ended on ${obj.endDate}; consider removing it`);
}

function unique(where, list, field) {
  const seen = new Map();
  list.forEach((entry, i) => {
    const value = entry?.[field];
    if (value === undefined) return;
    if (seen.has(value)) error(where, `duplicate ${field} ${JSON.stringify(value)} (entries ${seen.get(value)} and ${i})`);
    else seen.set(value, i);
  });
}

function validateMenu(menu) {
  const file = 'menu.json';
  if (!isObject(menu)) return error(file, 'must be an object { version, categories, items }');
  checkKeys(file, menu, ['version', 'categories', 'items']);
  if (menu.version !== 1) error(file, 'version must be 1');

  const categoryIds = new Set();
  if (!Array.isArray(menu.categories) || menu.categories.length === 0) {
    error(file, 'categories must be a non-empty array');
  } else {
    menu.categories.forEach((cat, i) => {
      const where = `${file} categories[${i}]`;
      if (!isObject(cat)) return error(where, 'must be an object');
      for (const key of ['id', 'name', 'icon']) if (!isText(cat[key])) error(where, `${key} must be a non-empty string`);
      if (isText(cat.id)) categoryIds.add(cat.id);
    });
    unique(`${file} categories`, menu.categories, 'id');
    if (menu.categories[0]?.id !== 'all') error(file, 'the first category must be { "id": "all", ... } (the Full Menu tab)');
  }

  if (!Array.isArray(menu.items) || menu.items.length === 0) return error(file, 'items must be a non-empty array');

  menu.items.forEach((item, i) => {
    const where = `${file} items[${i}]${isText(item?.slug) ? ` (${item.slug})` : ''}`;
    if (!isObject(item)) return error(where, 'must be an object');
    checkKeys(where, item, [...ITEM_REQUIRED, ...ITEM_OPTIONAL]);
    for (const key of ITEM_REQUIRED) if (item[key] === undefined) error(where, `missing required field "${key}"`);

    if (item.id !== undefined && !isText(item.id)) error(where, 'id must be a non-empty string');
    if (item.slug !== undefined && (typeof item.slug !== 'string' || !SLUG_RE.test(item.slug))) {
      error(where, 'slug must be lowercase kebab-case (a-z, 0-9 and single hyphens)');
    }
    if (item.posId !== undefined) {
      if (typeof item.posId !== 'string' || !UUID_RE.test(item.posId)) error(where, 'posId must be a lowercase UUID');
      else if (typeof item.slug === 'string' && item.posId !== posIdFor(item.slug)) {
        error(where, `posId does not match the slug (expected ${posIdFor(item.slug)}); never rename a slug or posId`);
      }
    }
    for (const key of ['name', 'description']) if (item[key] !== undefined && !isText(item[key])) error(where, `${key} must be a non-empty string`);
    for (const key of ['thaiName', 'calories']) if (item[key] !== undefined && typeof item[key] !== 'string') error(where, `${key} must be a string`);
    if (item.category !== undefined && !(isText(item.category) && item.category !== 'all' && categoryIds.has(item.category))) {
      error(where, `category ${JSON.stringify(item.category)} is not one of the menu categories`);
    }
    if (item.price !== undefined) {
      const p = item.price;
      if (typeof p !== 'number' || !Number.isFinite(p) || p <= 0 || p > 500) error(where, 'price must be a number greater than 0 and at most 500');
      else if (Math.abs(p * 100 - Math.round(p * 100)) > 1e-6) error(where, `price ${p} has more than 2 decimal places`);
    }
    if (item.spiceLevel !== undefined && !(Number.isInteger(item.spiceLevel) && item.spiceLevel >= 0 && item.spiceLevel <= 3)) {
      error(where, 'spiceLevel must be an integer from 0 to 3');
    }
    if (item.dietary !== undefined && !(Array.isArray(item.dietary) && item.dietary.every(isText))) {
      error(where, 'dietary must be an array of non-empty strings');
    }
    if (item.image !== undefined && !isImage(item.image)) error(where, 'image must be an https:// URL or a /images/... path');
    for (const key of ['popular', 'available', 'hidden']) {
      if (item[key] !== undefined && typeof item[key] !== 'boolean') error(where, `${key} must be true or false`);
    }
    if (item.unavailableNote !== undefined && !(isText(item.unavailableNote) && item.unavailableNote.length <= 80)) {
      error(where, 'unavailableNote must be a non-empty string of at most 80 characters');
    }
    if (item.unavailableUntil !== undefined && !isDate(item.unavailableUntil)) {
      error(where, 'unavailableUntil must be a real date as YYYY-MM-DD (Los Angeles date)');
    }
    if (item.available !== false && (item.unavailableNote !== undefined || item.unavailableUntil !== undefined)) {
      warn(where, 'unavailableNote/unavailableUntil have no effect while available is true; remove them');
    }
    if (item.special !== undefined) {
      const sw = `${where} special`;
      if (!isObject(item.special)) {
        error(sw, 'must be an object { label, startDate, endDate }');
      } else {
        checkKeys(sw, item.special, ['label', 'startDate', 'endDate']);
        if (!(isText(item.special.label) && item.special.label.length <= 40)) error(sw, 'label must be a non-empty string of at most 40 characters');
        checkWindow(sw, item.special, true);
      }
    }
  });

  unique(`${file} items`, menu.items, 'id');
  unique(`${file} items`, menu.items, 'slug');
  unique(`${file} items`, menu.items, 'posId');
  if (menu.items.every((item) => item?.hidden === true)) warn(file, 'every item is hidden; the menu will be empty');
}

function validateAnnouncements(doc) {
  const file = 'announcements.json';
  if (!isObject(doc)) return error(file, 'must be an object { version, items }');
  checkKeys(file, doc, ['version', 'items']);
  if (doc.version !== 1) error(file, 'version must be 1');
  if (!Array.isArray(doc.items)) return error(file, 'items must be an array (use [] for no announcements)');
  doc.items.forEach((item, i) => {
    const where = `${file} items[${i}]${isText(item?.id) ? ` (${item.id})` : ''}`;
    if (!isObject(item)) return error(where, 'must be an object');
    checkKeys(where, item, ANNOUNCEMENT_KEYS);
    if (!(typeof item.id === 'string' && SLUG_RE.test(item.id))) error(where, 'id must be lowercase kebab-case');
    if (!(isText(item.message) && item.message.length <= 200)) error(where, 'message must be a non-empty string of at most 200 characters');
    if (!TONES.includes(item.tone)) error(where, `tone must be one of ${TONES.join(', ')}`);
    checkWindow(where, item, false);
  });
  unique(`${file} items`, doc.items, 'id');
}

function validateSite(site) {
  const file = 'site.json';
  if (!isObject(site)) return error(file, `must be an object { ${SITE_KEYS.join(', ')} }`);
  checkKeys(file, site, SITE_KEYS);
  for (const key of SITE_KEYS) if (site[key] === undefined) error(file, `missing required key "${key}"`);
  if (site.version !== undefined && site.version !== 1) error(file, 'version must be 1');

  const r = site.restaurant;
  if (r !== undefined) {
    if (!isObject(r)) {
      error(file, 'restaurant must be an object');
    } else {
      for (const key of RESTAURANT_REQUIRED) if (!isText(r[key])) error(`${file} restaurant`, `${key} must be a non-empty string`);
      if (!Array.isArray(r.hours) || r.hours.length === 0) {
        error(`${file} restaurant`, 'hours must be a non-empty array');
      } else {
        r.hours.forEach((h, i) => {
          for (const key of ['days', 'lunch', 'dinner']) if (!isText(h?.[key])) error(`${file} restaurant.hours[${i}]`, `${key} must be a non-empty string`);
        });
      }
    }
  }

  if (site.awards !== undefined) {
    if (!Array.isArray(site.awards) || site.awards.length === 0) {
      error(file, 'awards must be a non-empty array');
    } else {
      site.awards.forEach((a, i) => {
        const where = `${file} awards[${i}]`;
        if (!isText(a?.title)) error(where, 'title must be a non-empty string');
        if (!isText(a?.year) && !isText(a?.org)) error(where, 'needs a year or an org');
        if (REAL_AWARD_RE.test(`${a?.title ?? ''} ${a?.org ?? ''}`)) error(where, 'must not claim a real-world award or guide; Baan Siam is fictional');
      });
      if (!isText(site.awards[0]?.year)) error(`${file} awards[0]`, 'the first award is the hero headline and needs a year');
    }
  }

  if (site.hospitalityTeam !== undefined) {
    if (!Array.isArray(site.hospitalityTeam)) error(file, 'hospitalityTeam must be an array');
    else site.hospitalityTeam.forEach((m, i) => {
      for (const key of ['name', 'role', 'bio']) if (!isText(m?.[key])) error(`${file} hospitalityTeam[${i}]`, `${key} must be a non-empty string`);
      if (!isImage(m?.image)) error(`${file} hospitalityTeam[${i}]`, 'image must be an https:// URL or a /images/... path');
    });
  }

  if (site.guestReviews !== undefined) {
    if (!Array.isArray(site.guestReviews)) error(file, 'guestReviews must be an array');
    else site.guestReviews.forEach((rv, i) => {
      const where = `${file} guestReviews[${i}]`;
      for (const key of ['name', 'title', 'quote', 'date']) if (!isText(rv?.[key])) error(where, `${key} must be a non-empty string`);
      if (!(Number.isInteger(rv?.rating) && rv.rating >= 1 && rv.rating <= 5)) error(where, 'rating must be an integer from 1 to 5');
    });
  }
}

const menu = load('menu.json');
const site = load('site.json');
const announcements = load('announcements.json');
if (menu) validateMenu(menu);
if (site) validateSite(site);
if (announcements) validateAnnouncements(announcements);

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);

const items = Array.isArray(menu?.items) ? menu.items : [];
const summary = `${items.length} menu items (${items.filter((i) => i?.hidden === true).length} hidden, `
  + `${items.filter((i) => i?.available === false).length} marked sold out), `
  + `${Array.isArray(announcements?.items) ? announcements.items.length : 0} announcements`;
if (errors.length > 0) {
  console.error(`\nvalidate-data: FAILED with ${errors.length} error(s), ${warnings.length} warning(s). ${summary}`);
  process.exit(1);
}
console.log(`validate-data: OK, ${warnings.length} warning(s). ${summary}`);
