/**
 * Aura & Bean Artisanal Cafe & Roastery
 * Menu Offerings Dataset
 */

export const MENU_ITEMS = [
  // Specialty Coffee & Teas
  {
    id: 'hazelnut-cortado',
    title: 'Spiced Hazelnut Cortado',
    category: 'coffee',
    price: '₹240',
    numericPrice: 240,
    description: 'Equal parts slow-pulled Chikmagalur estate espresso and velvety micro-foamed oat milk, infused with roasted hazelnuts and Kerala cinnamon.',
    dietary: ['vg', 'v', 'gf'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    featured: true,
    tag: "Roaster's Signature"
  },
  {
    id: 'cold-brew-nitro',
    title: 'Nitro Cascara Cold Brew',
    category: 'coffee',
    price: '₹280',
    numericPrice: 280,
    description: '20-hour steeped single-origin Coorg Arabica beans infused with nitrogen for a Guinness-like creamy head, with sweet cherry and cacao nib notes.',
    dietary: ['vg', 'v', 'gf'],
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    featured: true,
    tag: 'Cold & Smooth'
  },
  {
    id: 'matcha-ceremonial',
    title: 'Ceremonial Uji Matcha Latte',
    category: 'coffee',
    price: '₹320',
    numericPrice: 320,
    description: 'First-harvest stone-ground green tea from Uji, Kyoto, hand-whisked with steamed pistachio milk and raw Coorg wildflower blossom honey.',
    dietary: ['vg', 'gf'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Antioxidant Rich'
  },
  {
    id: 'smoked-caramel-latte',
    title: 'Smoked Sea Salt Caramel Latte',
    category: 'coffee',
    price: '₹290',
    numericPrice: 290,
    description: 'House-cooked jaggery caramel infused with Tuticorin flaked sea salt, double espresso shot, and silky whole farm-fresh milk.',
    dietary: ['vg', 'gf'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Guest Favorite'
  },

  // Breakfast & Brunch
  {
    id: 'wild-mushroom-toast',
    title: 'Truffle & Wild Mushroom Tartine',
    category: 'breakfast',
    price: '₹420',
    numericPrice: 420,
    description: 'Pan-seared Himalayan morel and cremini mushrooms on toasted country sourdough, herbed ricotta cream, poached pasture egg, and white truffle oil drizzle.',
    dietary: ['vg'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    featured: true,
    tag: 'Brunch Icon'
  },
  {
    id: 'avocado-tartine',
    title: 'Heirloom Avocado & Citrus Toast',
    category: 'breakfast',
    price: '₹380',
    numericPrice: 380,
    description: 'Kodaikanal butter avocado mash on toasted seeded levain with watermelon radish, Nagpur orange segments, dukkah spice crunch, and cold-pressed olive oil.',
    dietary: ['vg', 'v'],
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: '100% Plant Based'
  },
  {
    id: 'shakshuka-skillet',
    title: 'North African Baked Shakshuka',
    category: 'breakfast',
    price: '₹440',
    numericPrice: 440,
    description: 'Two pasture eggs gently poached in spiced San Marzano tomato & roasted bell pepper ragu, topped with Greek feta, fresh mint, and warm hearth bread.',
    dietary: ['vg', 'gf'],
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Warm & Comforting'
  },
  {
    id: 'brioche-french-toast',
    title: 'Pecan & Fig Custard French Toast',
    category: 'breakfast',
    price: '₹390',
    numericPrice: 390,
    description: 'Thick-cut house brioche soaked in vanilla bean custard, pan-caramelized and served with roasted Poona figs, candied pecans, and organic maple syrup.',
    dietary: ['vg'],
    image: 'https://images.unsplash.com/photo-1484723091739-00821c45d9da?auto=format&fit=crop&w=600&q=80',
    featured: true,
    tag: 'Chef Choice'
  },

  // Lunch & Savory
  {
    id: 'prosciutto-fig-panini',
    title: 'Smoked Chicken & Caramelized Fig Panini',
    category: 'lunch',
    price: '₹460',
    numericPrice: 460,
    description: 'Artisanal smoked herb chicken, creamy Taleggio cheese, black mission fig jam, and wild arugula pressed on rustic sourdough ciabatta.',
    dietary: [],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Warm Pressed'
  },
  {
    id: 'quinoa-goddess-bowl',
    title: 'Green Goddess Nourish Bowl',
    category: 'lunch',
    price: '₹390',
    numericPrice: 390,
    description: 'Tri-color quinoa, baby spinach, charred broccolini, roasted chickpeas, avocado, and pickled shallots, tossed in creamy tahini-herb green goddess dressing.',
    dietary: ['vg', 'v', 'gf'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Wholesome & Fresh'
  },
  {
    id: 'smoked-salmon-croissant',
    title: 'House-Cured Gravlax Croissant',
    category: 'lunch',
    price: '₹480',
    numericPrice: 480,
    description: 'Citrus-dill cured Norwegian salmon on a flaky butter croissant with lemon cream cheese, caper berries, cucumber ribbons, and fresh dill.',
    dietary: [],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Artisan Seafood'
  },
  {
    id: 'burrata-heirloom-salad',
    title: 'Di Stefano Burrata & Stonefruit Salad',
    category: 'lunch',
    price: '₹450',
    numericPrice: 450,
    description: 'Creamy artisanal burrata ball over heirloom tomatoes, grilled Himachal peaches, crispy basil leaves, and 12-year aged Modena balsamic reduction.',
    dietary: ['vg', 'gf'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Seasonal Special'
  },

  // Bakery & Desserts
  {
    id: 'pistachio-rose-cruffin',
    title: 'Pistachio Rose Cardamom Cruffin',
    category: 'dessert',
    price: '₹260',
    numericPrice: 260,
    description: 'Laminated croissant-muffin hybrid filled with fragrant pistachio pastry cream, dusted with crushed Kashmiri rose petals and Idukki cardamom sugar.',
    dietary: ['vg'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    featured: true,
    tag: 'Scratch Bakery'
  },
  {
    id: 'basque-burnt-cheesecake',
    title: 'San Sebastián Burnt Cheesecake',
    category: 'dessert',
    price: '₹320',
    numericPrice: 320,
    description: 'Caramelized bronzed top with an ultra-creamy, molten vanilla-citrus center, served alongside house Mahabaleshwar berry compote.',
    dietary: ['vg', 'gf'],
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Chef Favorite'
  },
  {
    id: 'dark-chocolate-tart',
    title: '70% Single-Origin Ganache Tart',
    category: 'dessert',
    price: '₹290',
    numericPrice: 290,
    description: 'Rich dark chocolate ganache in an almond shortbread crust, topped with smoked sea salt flakes and roasted Anaimalai cocoa nib crisp.',
    dietary: ['vg'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: 'Decadent'
  },
  {
    id: 'vegan-raspberry-pavlova',
    title: 'Raspberry Passionfruit Pavlova',
    category: 'dessert',
    price: '₹280',
    numericPrice: 280,
    description: 'Crispy plant-based aquafaba meringue cloud filled with whipped coconut cream, fresh raspberries, and tart passionfruit coulis.',
    dietary: ['vg', 'v', 'gf'],
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
    featured: false,
    tag: '100% Plant & GF'
  }
];

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Offerings' },
  { id: 'coffee', label: '☕ Specialty Coffee & Tea' },
  { id: 'breakfast', label: '🍳 Breakfast & Brunch' },
  { id: 'lunch', label: '🥗 Lunch & Savory' },
  { id: 'dessert', label: '🍰 Bakery & Desserts' }
];
