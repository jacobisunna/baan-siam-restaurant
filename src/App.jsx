import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { HospitalitySection } from './components/HospitalitySection';
import { ChefSpecials } from './components/ChefSpecials';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0c1410] text-stone-200 selection:bg-[#c59b27] selection:text-black flex flex-col">
        {/* Sticky luxury Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Our Story & Culinary Heritage */}
          <StorySection />

          {/* Smiling Servers & Warm Hospitality */}
          <HospitalitySection />

          {/* Chef's Royal Signatures */}
          <ChefSpecials />

          {/* Complete Categorized Menu with Filters & Search */}
          <MenuSection />

          {/* Michelin Guide & Guest Reviews */}
          <ReviewsSection />

          {/* Location, Hours, Interactive Map & Parking Info */}
          <LocationHours />
        </main>

        {/* Luxury Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <DishDetailModal />
        <ReservationModal />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
