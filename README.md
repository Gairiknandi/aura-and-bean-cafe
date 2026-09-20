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

## 🛠️ Backend API & PostgreSQL Database (`server/`)

The application features an enterprise Express.js backend connecting to a local PostgreSQL database (`aurabean_db`) with automated transactional email confirmations.

### Features
1. **PostgreSQL Database (`aurabean_db`)**:
   - `bookings`: Stores guest reservations, contact details, date/time, party size, seating preferences, status, and email dispatch flag.
   - `event_inquiries`: Stores private event and catering requests.
   - `menu_items`: Dynamic menu catalog with live price updates, images, dietary tags, and availability status.
   - `testimonials`: Customer reviews, star ratings, quotes, and homepage featured status.
   - `store_settings`: Store open/closed mode overrides and live announcement banner settings.
2. **Automated Client Email Dispatch (`server/mailer.js`)**:
   - When a booking is accepted by an admin, a confirmation email is automatically sent to the guest.
   - Supports production SMTP (SendGrid, Mailgun, AWS SES, Gmail) and automatic fallback to Ethereal mock email with instant preview URLs.

### Starting the Backend
```bash
# Start backend server on port 5050
npm run server

# Re-seed default database records
npm run seed
```

---

## 🔒 Staff Admin Management Portal (`#admin`)

Access the Admin Portal by clicking the **"Admin"** lock button in the top navigation bar or the **"Admin Portal 🔒"** link in the footer.

- **Passcode Gate**: Default passcode is `admin123`.
- **Management Features**:
  1. **Bookings & Requests**:
     - Live overview of table reservations and event inquiries.
     - Filter by `All`, `Pending`, `Confirmed`, and `Cancelled`.
     - One-click **"Accept & Email"** button: Updates booking status to `confirmed` in PostgreSQL and automatically dispatches a branded confirmation email to the guest.
  2. **Menu, Pricing & Imagery**:
     - Add new dishes, edit prices, descriptions, and high-res image URLs.
     - Instant availability toggle (marks items as "Available" or "Sold Out").
     - Delete or update any dish in real time.
  3. **Customer Reviews**:
     - Add, edit, or delete customer testimonials and star ratings.
     - Toggle which reviews are featured on the homepage carousel.
  4. **Store Operations & Status**:
     - Toggle between **Automatic (7 AM – 8 PM schedule)**, **Force Open (Special Event)**, and **Force Closed (Emergency / Maintenance)**.
     - Live Announcement Banner editor with on/off toggle.

---

## 🎨 Customization Guide

- **Cafe Name & Tagline**: Change in `src/components/layout/Header.jsx` and `src/components/layout/Footer.jsx`.
- **Colors & Theme**: Adjust CSS variables in `src/styles.css` under `:root` (e.g., `--color-warm-caramel`, `--color-espresso`, `--color-cream-bg`).
- **Menu Items**: Live updates via Admin Portal or baseline dataset in `src/data/menuData.js`.
- **Operating Hours**: Update `src/data/hoursData.js` or override in Admin Portal.


