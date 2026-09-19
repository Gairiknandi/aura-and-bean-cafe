# Aura & Bean | Artisanal Cafe & Roastery Website

A modern, responsive, and elegant website designed for an artisanal cafe and roastery. Built with React.js, modern CSS3 (Custom Properties, Flexbox, CSS Grid), and Vite.

---

## ✨ Key Features & Pages

### 1. Home Page (`#home`)
- **Hero Section**: High-resolution cafe imagery, warm typography, atmospheric badge, and primary Call-To-Action buttons (*"Reserve a Table"*, *"View Full Menu"*).
- **Cafe Story & Vibe**: An authentic story of micro-batch coffee roasting, sustainable direct trade partnerships, and stone-hearth scratch baking.
- **Highlights & Specialties**: Featured signatures preview with real-time badges, prices, and dietary tags.
- **Why Choose Us**: 4 core pillar cards highlighting Ethical Direct Trade, Scratch Kitchen, Warm Community Vibe, and Inclusive Dietary Menus.
- **Live Hours Quick Banner**: Dynamic status indicator indicating whether the cafe is open or closed right now.
- **Customer Testimonials Carousel**: Auto-scrolling reviews with star ratings, reviewer titles, avatars, and dot/arrow navigation.

### 2. Full Menu Page (`#menu`)
- **Categorized Offerings**:
  - Specialty Coffees & Ceremonial Teas
  - Breakfast & Brunch Sourdough Toasts
  - Lunch & Savory Nourish Bowls
  - Handcrafted Bakery & Desserts
- **Interactive Search**: Instant real-time text search filtering by title, ingredients, or keywords.
- **Dietary Filter Toggles**: One-click filtering for Vegetarian (VG), Vegan (V), and Gluten-Free (GF) diets.
- **Downloadable / Printable PDF Menu**: Formatted preview modal and direct print stylesheet (`@media print`) for easy printing or PDF export.

### 3. Table Reservation Page (`#reservations`)
- **Interactive Party Size Selector**: Quick buttons (1, 2, 4, 6, 8 guests) and custom `- / +` counter.
- **Date Picker**: Disables past dates and defaults intelligently to tomorrow.
- **Atmosphere Selector**: Main Roastery Hall, Garden Terrace Patio, Cozy Hearthside Booth, or Barista Window Counter.
- **Real-Time Interactive Time Slots**: Morning, afternoon, and evening slots with live availability badges.
- **Guest Contact & Occasion Fields**: Comprehensive client-side validation with helpful inline alerts.
- **Live Summary Card**: Updates in real time as choices change.
- **Confirmation Receipt Modal**: Generates a booking reference code (e.g. `#AB-8492`), summary receipt, print receipt button, and a downloadable `.ics` calendar invite.

### 4. Private Events Page (`#events`)
- **Event Type Switcher**: Seamless tabs for **Corporate Meetings & Mixers** vs. **Birthday & Private Celebrations**.
- **Tiered Packages**: Detailed capacity, pricing tiers, and inclusions (e.g., *Executive Morning Symposium*, *All-Day Innovation Retreat*, *The Golden Birthday Soirée*).
- **Add-On Customizer**: Interactive checkboxes (Latte Art Masterclass, Dessert Tower, Fresh Floral Centerpieces, Mocktail Bar) with live quote calculation.
- **Event Inquiry Form**: Date, guest count, budget range slider, host contact, and vision notes.
- **Past Events Gallery**: Curated atmosphere gallery with category tags.

### 5. Location & Hours Page (`#location`)
- **Live Open/Closed Status Card**: Dynamic status badge ("OPEN NOW" / "CLOSED NOW") calculated based on the visitor's current day and time.
- **Weekly Schedule**: Daily operating hours with automatic highlighting of today's schedule.
- **Embedded Google Map**: Responsive map container with quick *"Open in Google Maps"* button.
- **Contact & Social Handles**: Click-to-call phone number, click-to-email link, and social channels.
- **Parking & Accessibility**: Dedicated guides for the private valet parking lot, Namma Metro transit, and wheelchair accessibility.

### 6. Site-Wide Footer
- **The Roaster's Dispatch**: Newsletter subscription form with input validation and animated toast feedback.
- Quick navigation links, operating hours recap, and legal notices.

---

## 🚀 How to Run the Website

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Customization Guide

- **Cafe Name & Tagline**: Change in `src/components/layout/Header.jsx` and `src/components/layout/Footer.jsx`.
- **Colors & Theme**: Adjust CSS variables in `src/styles.css` under `:root` (e.g., `--color-warm-caramel`, `--color-espresso`, `--color-cream-bg`).
- **Menu Items**: Modify or add items to `src/data/menuData.js`.
- **Operating Hours**: Update `src/data/hoursData.js`.

