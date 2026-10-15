# Baan Siam (บ้านสยาม) - Royal Thai Cuisine & Warm Hospitality

An authentic, high-fidelity responsive website for **Baan Siam**, an upscale yet warm authentic Thai restaurant. Designed with appetizing high-resolution food photography, radiant smiling hospitality staff, a complete categorized menu with interactive dietary and spice level customizers, an online ordering cart drawer, and an instant table reservation system.

![Baan Siam Preview](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85)

---

## ✨ Features

- **Royal Thai Aesthetics**: Custom luxury color palette combining deep emerald greens, warm teakwood, gold accents (`#D4AF37`), and elegant typography (*Playfair Display* & *Plus Jakarta Sans*).
- **Smiling Hospitality & Team Showcase**: Dedicated section celebrating the warmth of Thai hospitality (*"Sabai Sabai"* and the *"Wai"* greeting) with photography of smiling hosts, servers, and executive chefs.
- **Complete Categorized Menu**:
  - Starters & Small Plates
  - Soups & Fresh Salads
  - Royal Curries (slow-braised Massaman lamb, authentic Green curry, etc.)
  - Wok & Rice Noodles (Pad Thai Boran, Drunken Noodles, Crab Fried Rice)
  - Chef's Royal Signatures (Pla Rad Prik seabass, Crying Tiger ribeye)
  - Artisanal Desserts (Mango Sticky Rice, Thai Tea Crème Brûlée, Young Coconut Gelato)
  - Craft Drinks (Traditional Thai Iced Tea, Butterfly Pea Elixirs, Botanical Cocktails)
- **Interactive Dietary & Spice Filtering**:
  - Filter by Vegetarian, Gluten-Free, Halal, or Chef's Pick
  - Real-time instant search by dish or ingredient
  - Spice level selector (0 = Mild to 3 = Authentic Thai Hot 🌶️🌶️🌶️)
- **Dish Detail Modal & Customizer**: Inspect high-res food photos, select custom spice levels, add special instructions or allergy notes, and adjust quantities.
- **Online Ordering Cart Drawer**:
  - Slide-out order drawer with pickup (25-30m) vs. delivery (40-50m) toggle
  - Custom spice levels preserved per item
  - Promo code simulator (Try `THAI10` or `SAWASDEE`)
  - Subtotal, estimated Los Angeles sales tax, and simulated checkout flow with confetti celebration
- **Table Reservation Engine**:
  - Multi-step booking modal (Date, Time slots, Party size, Seating area preference)
  - Seating options: Main Royal Dining, Jasmine Garden Courtyard, Chef's Wok Counter, Romantic Booth
  - Instant booking confirmation with reference code and confetti
- **Accolades & Reviews**: Fictional accolade badges (e.g. "Siam Table Guide: Recommended") and quotes from food critics and diners.
- **Location, Hours & Parking**: Interactive map card, lunch & dinner service hours, and Thai Town parking and transit information.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Deployment Platform**: Vercel ready (`vercel.json` included for single-page routing)

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Deploy to Vercel & GitHub

### Step 1: Initialize Git and Commit

```bash
git init
git add .
git commit -m "Initial commit: Baan Siam Thai Restaurant website"
```

### Step 2: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `baan-siam-restaurant` (or any name you choose).
2. Run the following commands in your terminal (replace `<YOUR_USERNAME>` with your GitHub username):

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/baan-siam-restaurant.git
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Via the Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository (`baan-siam-restaurant`).
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your website will be live worldwide in seconds with an SSL certificate and automatic continuous deployment on every Git push!

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Run vercel deploy
vercel
```
