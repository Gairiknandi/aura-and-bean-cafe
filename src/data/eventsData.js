/**
 * Private Events & Celebrations Packages & Add-ons Dataset
 */

export const CORPORATE_PACKAGES = [
  {
    id: 'morning-symposium',
    title: 'The Morning Symposium',
    pkgTitle: 'Executive Morning Symposium',
    tier: 'Breakfast & Brainstorm',
    price: 24000,
    priceFormatted: '₹24,000',
    period: '/ 3 hours',
    capacity: 'Ideal for 15 – 25 attendees',
    features: [
      'Unlimited specialty pour-over & espresso bar',
      'Fresh sourdough croissants & savory morning pastries',
      'Organic yogurt parfaits & fresh fruit skewers',
      'High-speed Wi-Fi, 85" 4K display, presentation remotes',
      'Dedicated event manager & barista'
    ]
  },
  {
    id: 'innovation-retreat',
    title: 'All-Day Innovation Retreat',
    pkgTitle: 'All-Day Innovation Retreat',
    tier: 'Full Day Immersion',
    price: 55000,
    priceFormatted: '₹55,000',
    period: '/ 7 hours',
    capacity: 'Ideal for 20 – 45 attendees',
    popularBadge: 'Most Popular',
    isFeatured: true,
    features: [
      'Continuous artisanal coffee, craft matcha, & herbal tea bar',
      'Full artisanal breakfast & seasonal hot lunch buffet',
      'Afternoon artisan dessert bites & nitro cold brew flights',
      'Premium AV setup, wireless clip-on microphones',
      'Exclusive semi-private Garden Terrace breakout space'
    ]
  },
  {
    id: 'evening-mixer',
    title: 'Evening Mixer & Buyout',
    pkgTitle: 'Evening Mixer & Roastery Buyout',
    tier: 'Exclusive Buyout',
    price: 95000,
    priceFormatted: '₹95,000',
    period: '/ 4 hours',
    capacity: 'Capacity up to 80 guests',
    features: [
      'Full private closure of the entire cafe & outdoor patio',
      'Grazing tables with artisanal cheeses, cured bites & dips',
      'Espresso martini bar (or mocktail bar) & custom drink menu',
      'Customizable ambient warm lighting & audio playlist system',
      'Full staff, cleanup crew, and valet parking service'
    ]
  }
];

export const BIRTHDAY_PACKAGES = [
  {
    id: 'high-tea-party',
    title: 'Botanical High Tea Party',
    pkgTitle: 'Botanical High Tea Party',
    tier: 'Intimate Afternoon',
    price: 18000,
    priceFormatted: '₹18,000',
    period: '/ 2.5 hours',
    capacity: 'Perfect for 10 – 18 guests',
    features: [
      '3-tier silver stands with finger tartines & savory brioche',
      'Warm scones with clotted cream & house strawberry compote',
      'Curated loose-leaf teas & sparkling botanical spritzers',
      'Personalized vintage floral table styling & menus',
      'Polaroid keepsake photo corner'
    ]
  },
  {
    id: 'golden-soiree',
    title: 'The Golden Birthday Soirée',
    pkgTitle: 'The Golden Birthday Soirée',
    tier: 'Celebration Special',
    price: 36000,
    priceFormatted: '₹36,000',
    period: '/ 3.5 hours',
    capacity: 'Ideal for 20 – 40 guests',
    popularBadge: 'Guest Favorite',
    isFeatured: true,
    features: [
      'Gourmet brunch or dinner tapas buffet for all guests',
      'Custom 2-tier Birthday Cake by our Head Pastry Chef',
      'Unlimited specialty coffee & sparkling mocktail fountain',
      'Floral archway backdrop & celebratory balloon garland',
      'Personalized custom music playlist & microphone for toasts'
    ]
  },
  {
    id: 'candlelight-dinner',
    title: 'Private Candlelight Dinner',
    pkgTitle: 'Private Candlelight Dinner',
    tier: 'VIP Evening',
    price: 65000,
    priceFormatted: '₹65,000',
    period: '/ 4 hours',
    capacity: 'Exclusive for up to 35 guests',
    features: [
      '4-course plated seasonal dining experience',
      'Coffee cupping flight paired with handcrafted desserts',
      'Private acoustic musician or curated vinyl DJ set',
      'Lavish candlelight, botanical table runner & place cards',
      'Full private patio access with outdoor fire pits'
    ]
  }
];

export const EVENT_ADDONS = [
  {
    id: 'latte-art-class',
    name: 'Barista Latte Art Class',
    title: 'Interactive Latte Art Workshop',
    price: 6500,
    priceFormatted: '+₹6,500',
    description: '30-minute fun hands-on barista tutorial for your guests with take-home coffee beans.'
  },
  {
    id: 'dessert-tower',
    name: 'Deluxe Dessert Grazing Tower',
    title: 'Deluxe Dessert Grazing Tower',
    price: 5000,
    priceFormatted: '+₹5,000',
    description: '3-tiered display of macarons, cruffins, mini cheesecakes, and chocolate truffles.'
  },
  {
    id: 'floral-installation',
    name: 'Custom Floral Installations',
    title: 'Seasonal Fresh Floral Centerpieces',
    price: 8000,
    priceFormatted: '+₹8,000',
    description: 'Fresh eucalyptus, garden roses, and dried wheat arrangements customized to your color palette.'
  },
  {
    id: 'mocktail-bar',
    name: 'Sparkling Botanical Mocktail Bar',
    title: 'Sparkling Mocktail / Spritzer Bar',
    price: 6000,
    priceFormatted: '+₹6,000',
    description: 'Cold-pressed lavender lemonade, strawberry basil spritzers, and nitro peach iced tea.'
  }
];

export const PAST_EVENTS_GALLERY = [
  {
    category: 'Corporate Workshop',
    title: 'Design Thinking Summit',
    image: 'https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=700&q=80',
    alt: 'Corporate team workshop at long timber table'
  },
  {
    category: 'Birthday Celebration',
    title: "Sophia's 30th Botanical Brunch",
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80',
    alt: 'Milestone 30th birthday gathering with cakes and balloons'
  },
  {
    category: 'Private Gathering',
    title: 'Spring Bridal High Tea',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80',
    alt: 'Intimate high tea with floral arrangements'
  },
  {
    category: 'Interactive Workshop',
    title: 'Coffee Cupping & Tasting Masterclass',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80',
    alt: 'Barista giving pour-over coffee demonstration'
  }
];
