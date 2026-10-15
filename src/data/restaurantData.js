export const restaurantInfo = {
  name: "Baan Siam",
  thaiName: "บ้านสยาม",
  tagline: "Authentic Royal Thai Cuisine & Warm Siam Hospitality",
  description: "Experience the harmonious balance of sweet, sour, salty, and spicy. Crafted with heritage recipes from Bangkok and the Royal Palaces of Siam, paired with heartfelt hospitality that makes every guest feel like cherished family.",
  address: "428 Siam Boulevard, Thai Town, Los Angeles, CA 90027",
  phone: "(323) 555-0142",
  email: "sawasdee@baansiamrestaurant.com",
  hours: [
    { days: "Monday – Thursday", lunch: "11:30 AM – 3:00 PM", dinner: "4:30 PM – 10:00 PM" },
    { days: "Friday", lunch: "11:30 AM – 3:00 PM", dinner: "4:30 PM – 11:00 PM" },
    { days: "Saturday", lunch: "12:00 PM – 3:30 PM", dinner: "4:30 PM – 11:00 PM" },
    { days: "Sunday", lunch: "12:00 PM – 3:30 PM", dinner: "4:30 PM – 9:30 PM" }
  ],
  awards: [
    { title: "Siam Table Guide: Recommended", org: "Siam Table Guide", year: "2024 & 2025" },
    { title: "Best Thai Restaurant", org: "LA Neighborhood Dining Awards" },
    { title: "Hospitality Excellence Award", org: "Golden Spoon Honors" }
  ]
};

export const hospitalityTeam = [
  {
    name: "Somchai & Mali Prasert",
    role: "Executive Chef & Founder",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=85",
    bio: "Trained in the culinary arts of royal Bangkok cuisine, Chef Somchai brings 25 years of devotion to authentic mortar-and-pestle curry pastes and aromatic wok mastery."
  },
  {
    name: "Sunisa & Anong",
    role: "Head Hosts & Guest Relations",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=85",
    bio: "Greets every guest with the traditional Thai 'Wai' and a radiant smile. To Sunisa, every guest entering Baan Siam is treated like a beloved family member visiting home."
  },
  {
    name: "Kavin & The Service Family",
    role: "Senior Floor Captain & Servers",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85",
    bio: "Known across the city for cheerful, anticipatory service, vibrant cocktail recommendations, and an infectious warmth that brightens your dining experience."
  },
  {
    name: "Chaiyaporn 'Chai'",
    role: "Beverage Director & Master Mixologist",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=85",
    bio: "Crafting Thai-botanical syrups, smoked lemongrass infusions, and refreshing butterfly pea elixirs to elevate each flavorful bite."
  }
];

export const categories = [
  { id: "all", name: "Full Menu", icon: "Utensils" },
  { id: "starters", name: "Starters & Small Plates", icon: "Sparkles" },
  { id: "soups", name: "Soups & Fresh Salads", icon: "Soup" },
  { id: "curries", name: "Royal Curries", icon: "Flame" },
  { id: "noodles", name: "Wok & Rice Noodles", icon: "ChefHat" },
  { id: "signatures", name: "Chef's Signatures", icon: "Crown" },
  { id: "desserts", name: "Artisanal Desserts", icon: "Cake" },
  { id: "drinks", name: "Drinks & Cocktails", icon: "Wine" }
];

export const menuItems = [
  // --- STARTERS ---
  {
    id: "m1",
    name: "Por Pia Tod (Golden Crispy Rolls)",
    thaiName: "เปาะเปี๊ยะทอด",
    category: "starters",
    price: 13.95,
    spiceLevel: 0,
    dietary: ["Vegetarian", "Vegan"],
    description: "Crispy hand-rolled pastries stuffed with glass noodles, shredded taro, shiitake mushrooms, and sweet cabbage. Served with homemade sweet organic plum-chili sauce.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "340 kcal"
  },
  {
    id: "m2",
    name: "Chicken Satay Skewers",
    thaiName: "สะเต๊ะไก่",
    category: "starters",
    price: 15.50,
    spiceLevel: 1,
    dietary: ["Gluten-Free", "Halal"],
    description: "Tender chicken tenderloins steeped in turmeric, lemongrass, and coconut marinade, flame-grilled on bamboo skewers. Paired with warm rich peanut sauce and pickled cucumber relish.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "420 kcal"
  },
  {
    id: "m3",
    name: "Thung Thong (Golden Money Bags)",
    thaiName: "ถุงทอง",
    category: "starters",
    price: 14.95,
    spiceLevel: 0,
    dietary: ["Chef's Pick"],
    description: "Delicate crispy wonton purses tied with green chives, packed with minced prawns, sweet water chestnuts, and fragrant cilantro root. Symbol of prosperity and joyful dining.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "310 kcal"
  },
  {
    id: "m4",
    name: "Tod Mun Pla (Thai Fish Cakes)",
    thaiName: "ทอดมันปลา",
    category: "starters",
    price: 14.50,
    spiceLevel: 2,
    dietary: ["Gluten-Free"],
    description: "Wild-caught white fish pounded with red curry paste, kaffir lime ribbons, and long green beans, lightly flash-fried. Served with sweet cucumber chili relish and toasted crushed peanuts.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "380 kcal"
  },

  // --- SOUPS & SALADS ---
  {
    id: "m5",
    name: "Tom Yum Goong Mae Nam",
    thaiName: "ต้มยำกุ้งแม่น้ำ",
    category: "soups",
    price: 19.95,
    spiceLevel: 2,
    dietary: ["Gluten-Free", "Chef's Pick"],
    description: "Thailand's iconic aromatic lemongrass broth simmered with colossal wild river prawns, galangal, kaffir lime leaf, straw mushrooms, and roasted chili oil with a splash of evaporated milk.",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "290 kcal"
  },
  {
    id: "m6",
    name: "Tom Kha Gai (Coconut Galangal Soup)",
    thaiName: "ต้มข่าไก่",
    category: "soups",
    price: 18.50,
    spiceLevel: 1,
    dietary: ["Gluten-Free", "Halal"],
    description: "Silky, comforting broth of slow-simmered rich coconut cream, sliced free-range chicken, young galangal root, fresh lime juice, and oyster mushrooms garnished with cilantro.",
    image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "360 kcal"
  },
  {
    id: "m7",
    name: "Som Tum Thai (Artisan Papaya Salad)",
    thaiName: "ส้มตำไทย",
    category: "soups",
    price: 16.50,
    spiceLevel: 2,
    dietary: ["Gluten-Free", "Vegetarian Available"],
    description: "Crisp hand-shredded green papaya, snake beans, and sweet heirloom cherry tomatoes bruised in a stone mortar with bird's eye chilies, palm sugar, tamarind lime dressing, and roasted peanuts.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "210 kcal"
  },
  {
    id: "m8",
    name: "Larb Gai Isan (Spiced Herb Chicken Salad)",
    thaiName: "ลาบไก่",
    category: "soups",
    price: 17.50,
    spiceLevel: 3,
    dietary: ["Gluten-Free", "Halal"],
    description: "Warm minced organic chicken tossed with toasted jasmine rice powder (khao khua), fresh mint leaves, shallots, scallions, fresh lime juice, and fiery Isan dried chili flakes.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "280 kcal"
  },

  // --- ROYAL CURRIES ---
  {
    id: "m9",
    name: "Royal Massaman Lamb Shank",
    thaiName: "มัสมั่นแกะ",
    category: "curries",
    price: 29.50,
    spiceLevel: 1,
    dietary: ["Gluten-Free", "Chef's Pick", "Halal"],
    description: "Fall-off-the-bone 6-hour braised lamb shank in an opulent royal Massaman curry infused with cardamom, cinnamon, star anise, baby Dutch yellow potatoes, shallots, and toasted whole peanuts.",
    image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "680 kcal"
  },
  {
    id: "m10",
    name: "Gaeng Keow Wan (Emerald Green Curry)",
    thaiName: "แกงเขียวหวานไก่",
    category: "curries",
    price: 21.00,
    spiceLevel: 2,
    dietary: ["Gluten-Free"],
    description: "Fragrant green curry crafted from freshly pounded green bird's eye chilies, Thai round eggplants, crisp bamboo shoots, tender chicken breast, sweet Thai basil, and coconut cream.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "520 kcal"
  },
  {
    id: "m11",
    name: "Panang Curry with Prime Beef",
    thaiName: "พะแนงเนื้อ",
    category: "curries",
    price: 23.50,
    spiceLevel: 2,
    dietary: ["Gluten-Free", "Halal"],
    description: "Thick, rich, and velvety red curry reduction infused with roasted cumin, finely slivered makrut lime leaves, sliced prime flank steak, and crushed peanuts finished with coconut swirl.",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "590 kcal"
  },
  {
    id: "m12",
    name: "Pineapple Roast Duck Curry (Gaeng Phed Ped Yang)",
    thaiName: "แกงเผ็ดเป็ดย่าง",
    category: "curries",
    price: 26.50,
    spiceLevel: 2,
    dietary: ["Chef's Pick"],
    description: "Succulent crispy-skin roasted duck simmered in fragrant red curry with sweet caramelized Phuket pineapple chunks, heirloom cherry tomatoes, lychee, and fresh holy basil.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "630 kcal"
  },

  // --- WOK & NOODLES ---
  {
    id: "m13",
    name: "Pad Thai Boran (Royal Bangkok Style)",
    thaiName: "ผัดไทยโบราณ",
    category: "noodles",
    price: 20.95,
    spiceLevel: 1,
    dietary: ["Gluten-Free Available", "Vegetarian Available"],
    description: "Chanthaburi rice noodles flash-fried in smoky woks with jumbo black tiger prawns, pressed pressed spiced tofu, sweet preserved radish, garlic chives, crunchy bean sprouts, and tamarind palm-sugar glaze.",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "540 kcal"
  },
  {
    id: "m14",
    name: "Pad See Ew (Charred River Noodles)",
    thaiName: "ผัดซีอิ๊ว",
    category: "noodles",
    price: 19.50,
    spiceLevel: 0,
    dietary: ["Vegetarian Available"],
    description: "Wide flat rice noodles wok-seared over high flame for deep smoky 'wok hei' aroma, tossed with tender sliced flank steak, crisp Chinese broccoli (Gai Lan), organic egg, and aged dark sweet soy sauce.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "510 kcal"
  },
  {
    id: "m15",
    name: "Pad Kee Mao (Drunken Seafood Noodles)",
    thaiName: "ผัดขี้เมาทะเล",
    category: "noodles",
    price: 23.50,
    spiceLevel: 3,
    dietary: ["Chef's Pick"],
    description: "Fiery wok-tossed wide noodles with jumbo sea prawns, tender calamari, fresh green peppercorn clusters, fragrant holy basil leaves, baby corn, and crushed bird's eye chilies.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "530 kcal"
  },
  {
    id: "m16",
    name: "Khao Pad Poo (Royal Lump Crab Fried Rice)",
    thaiName: "ข้าวผัดปู",
    category: "noodles",
    price: 25.50,
    spiceLevel: 0,
    dietary: ["Gluten-Free Available"],
    description: "Fluffy fragrant jasmine rice stir-fried in a roaring hot wok with generous heaps of sweet Dungeness lump crab meat, organic farm eggs, green scallions, white pepper, and side Prik Nam Pla (chili fish sauce).",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "480 kcal"
  },

  // --- CHEF'S SIGNATURES ---
  {
    id: "m17",
    name: "Pla Rad Prik (Crispy Whole Seabass)",
    thaiName: "ปลากะพงราดพริก",
    category: "signatures",
    price: 36.50,
    spiceLevel: 2,
    dietary: ["Chef's Pick", "Gluten-Free"],
    description: "Crispy whole wild Mediterranean seabass drizzled in our house three-flavor caramelized sauce of tart tamarind, palm nectar, garlic, and sweet red chili reduction, crowned with flash-fried holy basil leaves.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "620 kcal"
  },
  {
    id: "m18",
    name: "Suea Rong Hai (Crying Tiger Prime Ribeye)",
    thaiName: "เสือร้องไห้",
    category: "signatures",
    price: 34.00,
    spiceLevel: 2,
    dietary: ["Gluten-Free", "Halal"],
    description: "12oz USDA Prime ribeye marinated in crushed garlic, cilantro roots, and Thai spices, char-grilled to medium rare perfection. Accompanied by spicy toasted rice Nam Jim Jaew dipping sauce.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "710 kcal"
  },
  {
    id: "m19",
    name: "Hor Mok Talay (Royal Seafood Soufflé)",
    thaiName: "ห่อหมกทะเล",
    category: "signatures",
    price: 27.95,
    spiceLevel: 2,
    dietary: ["Gluten-Free", "Chef's Pick"],
    description: "Aromatic mousse of wild prawns, sea scallops, and flaky fish steamed gently inside a young green coconut with red curry paste, egg, sweet basil, and thick coconut custard.",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "460 kcal"
  },

  // --- DESSERTS ---
  {
    id: "m20",
    name: "Khao Niew Mamuang (Mango Sticky Rice)",
    thaiName: "ข้าวเหนียวมะม่วง",
    category: "desserts",
    price: 12.50,
    spiceLevel: 0,
    dietary: ["Gluten-Free", "Vegan", "Chef's Pick"],
    description: "Sweet slices of golden Thai honey mango resting on warm steamed sticky rice infused with salted sweet coconut milk, sprinkled with toasted crunchy yellow mung beans.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "380 kcal"
  },
  {
    id: "m21",
    name: "Thai Tea Crème Brûlée",
    thaiName: "แครมบรูเล่ชาไทย",
    category: "desserts",
    price: 11.50,
    spiceLevel: 0,
    dietary: ["Vegetarian"],
    description: "Silky custard infused with authentic Cha Tra Mue black tea leaves, star anise, and sweetened condensed milk beneath a golden, crackling caramelized sugar crust.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "340 kcal"
  },
  {
    id: "m22",
    name: "I-Tim Kati (Young Coconut Ice Cream)",
    thaiName: "ไอติมกะทิสด",
    category: "desserts",
    price: 10.95,
    spiceLevel: 0,
    dietary: ["Gluten-Free", "Vegan"],
    description: "House-churned dairy-free coconut milk gelato served inside a tender young coconut half shell with roasted peanuts, sweet corn kernels, and sticky palm jelly.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "290 kcal"
  },

  // --- DRINKS & COCKTAILS ---
  {
    id: "m23",
    name: "Traditional Thai Iced Tea (Cha Yen)",
    thaiName: "ชาเย็น",
    category: "drinks",
    price: 6.50,
    spiceLevel: 0,
    dietary: ["Vegetarian"],
    description: "Slow-brewed dark Thai red tea spiced with star anise and crushed cardamom pods, poured over crushed ice and topped with a luscious layer of sweet half-and-half.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "210 kcal"
  },
  {
    id: "m24",
    name: "Siam Orchid Passion (Craft Cocktail)",
    thaiName: "สยามออร์คิด",
    category: "drinks",
    price: 15.00,
    spiceLevel: 0,
    dietary: ["Chef's Pick"],
    description: "Artisan botanical gin shaken with house-made lemongrass syrup, sweet lychee liqueur, fresh passionfruit puree, butterfly pea infusion, and a splash of sparkling prosecco.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=85",
    popular: true,
    calories: "190 kcal"
  },
  {
    id: "m25",
    name: "Butterfly Pea Flower Herbal Cooler",
    thaiName: "น้ำอัญชันมะนาว",
    category: "drinks",
    price: 7.00,
    spiceLevel: 0,
    dietary: ["Vegan", "Gluten-Free"],
    description: "Naturally vibrant blue butterfly pea flower tea with organic wild honey and fresh squeezed lime juice that magically shifts the color from deep sapphire to royal violet before your eyes.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85",
    popular: false,
    calories: "120 kcal"
  }
];

export const guestReviews = [
  {
    name: "Sophia Montgomery",
    title: "Food & Wine Critic",
    quote: "The Massaman Lamb Shank is a masterclass in slow reduction, but what will bring me back again and again is the dazzling, heartwarming smile of the servers. You feel like royalty from the moment you step through the teakwood doors.",
    rating: 5,
    date: "February 2025"
  },
  {
    name: "David Chen",
    title: "Verified Gourmet Diner",
    quote: "Hands down the best Pad Thai and Tom Yum in Los Angeles. Authentic heat, fresh fragrant herbs, and the staff are genuinely the kindest, happiest team I’ve ever experienced in fine dining.",
    rating: 5,
    date: "January 2025"
  },
  {
    name: "Elena Rostova",
    title: "Private Event Host",
    quote: "We hosted our 15-person anniversary dinner in the Courtyard. The staff treated us like royalty, the craft cocktails were sublime, and every single dish was bursting with flavor.",
    rating: 5,
    date: "December 2024"
  }
];
