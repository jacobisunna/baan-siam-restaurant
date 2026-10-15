# Baan Siam website: editing rules for humans and bots

Baan Siam is a fictional Thai restaurant in Thai Town, Los Angeles, built for a RestaurantBot demo.
This is a Vite + React + Tailwind single-page site; Vercel deploys `main` to production.
RestaurantBot makes content changes (menu, sold-out dishes, specials, banners) through pull requests,
so these rules keep its edits small, safe and reviewable.

## Where the content lives

| File | What it holds |
| --- | --- |
| `src/data/menu.json` | `{ version: 1, categories: [...], items: [...] }`: menu tabs and every dish |
| `src/data/site.json` | `restaurant` (name, address, phone, email, hours), `awards`, `hospitalityTeam`, `guestReviews` |
| `src/data/announcements.json` | `{ version: 1, items: [...] }`: banners shown above the navigation |
| `src/data/restaurantData.js` | Adapter that exposes the JSON to components. No content here. |

Content changes go in those JSON files only. Do not edit components to change text, prices or dishes.

## Rules

1. **Never rename or change a dish's `slug` or `posId`.** They link the website to the POS menu
   forever. Fix a typo in `name` instead.
2. **To remove a dish, set `"hidden": true`.** Never delete an item from `items`.
3. **Sold out:** set `"available": false`. Optionally add `"unavailableNote"` (at most 80 characters,
   shown instead of "Sold out today") and `"unavailableUntil": "YYYY-MM-DD"`, the Los Angeles date the
   dish comes back on its own. To bring it back by hand, set `"available": true` and delete both fields.
4. **Specials:** add `"special": { "label": "...", "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD" }`
   (label at most 40 characters, dates inclusive, Los Angeles time). Active specials lead the Chef's
   Signatures section with their label. Delete the `special` object once it is over.
5. **Announcements:** each item is `{ "id", "message", "tone", "startDate"?, "endDate"? }` with a
   kebab-case `id`, a message of at most 200 characters, and `tone` one of `info`, `promo`, `alert`.
   Use a new `id` for every new announcement (guests' dismissals are remembered by `id`). No banner:
   `"items": []`.
6. **New dish:** next free `id` (`m26`, `m27`, ...), `slug` = kebab-case of the romanized dish name,
   `posId` = `posIdFor(slug)` (UUIDv5 of `menu|<slug>`; `npm run validate` prints the expected value),
   `"available": true`, `"hidden": false`, and every other field the existing dishes have.
7. **Prices** are plain numbers with at most 2 decimals, more than 0 and at most 500 (`18.5`, not `"18.50"`).
   `category` must be an existing category id; `spiceLevel` is 0 to 3; `image` is an `https://` URL or
   a `/images/...` path.
8. **Accolades stay fictional.** Never add a real guide or award (Michelin, James Beard, Zagat and so on).
   The first entry in `awards` is the hero headline and needs a `year`. Keep the footer line saying
   the restaurant is fictional.
9. **Formatting:** UTF-8, 2-space indent, LF line endings, trailing newline, exactly what
   `JSON.stringify(data, null, 2) + "\n"` produces. Keep Thai text as-is.
10. **Before every commit run `npm run verify`** (data validation plus a production build). It must pass.
11. **Protected files: do not change these without a human:** `package.json`, `package-lock.json`,
    `vite.config.js`, `vercel.json`, `scripts/`, `.github/`.

## Menu item fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | `m1`, `m2`, ...; never reused |
| `slug` | string | kebab-case, permanent |
| `posId` | UUID | `posIdFor(slug)`, permanent |
| `name`, `thaiName`, `description` | string | shown on the site |
| `category` | string | a `categories[].id` other than `all` |
| `price` | number | 0 < price <= 500, at most 2 decimals |
| `spiceLevel` | integer | 0 to 3 |
| `dietary` | string[] | for example `"Vegan"`, `"Gluten-Free"`, `"Chef's Pick"` |
| `image` | string | `https://` URL or `/images/...` |
| `popular` | boolean | "Popular" badge |
| `calories` | string | for example `"340 kcal"` |
| `available` | boolean | `false` = sold out |
| `hidden` | boolean | `true` = removed from the site |
| `unavailableNote` | string, optional | sold-out badge text |
| `unavailableUntil` | `YYYY-MM-DD`, optional | LA date the dish is back |
| `special` | object, optional | `{ label, startDate, endDate }` |

## Checking a deploy

Every build serves `/menu.json` (the committed menu data) and `/site-info.json`
(`{ commitSha, branch, builtAt }` from Vercel's environment), so you can confirm a deploy is
serving the commit you expect.

## Commands

- `npm run validate`: check the data files only
- `npm run verify`: validate, then build (must pass before committing)
- `npm run lint`: oxlint
- `npm run dev`: local dev server
