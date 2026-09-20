import { pool, initDb } from './db.js';

const INITIAL_MENU_ITEMS = [
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

const INITIAL_TESTIMONIALS = [
  {
    name: 'Julian Montgomery',
    title: 'Senior Food Editor, The Bangalore Gourmet',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    quote: "Aura & Bean has set an entirely new benchmark for Bengaluru's specialty roasteries. The Hazelnut Cortado paired with their Truffle Tartine is simply transcendent."
  },
  {
    name: 'Dr. Clara Thorne',
    title: 'Neighborhood Regular & Pediatrician',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    quote: "My morning ritual for over three years. The warmth of the team, the natural light pouring through the timber beams, and the consistently sublime coffee make it my sanctuary."
  },
  {
    name: 'Marcus & Liam Zhao',
    title: 'Hosts of Private Anniversary Dinner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    quote: "We celebrated our 10th anniversary with their Private Candlelight Dinner package. The floral styling, custom menu pairings, and attentive staff made it the most memorable evening of our lives."
  },
  {
    name: 'Siddharth Patel',
    title: 'Director of Product, Lattice Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    quote: "Hosted our 35-person design summit here. The high-speed Wi-Fi, seamless AV presentation setup, and relentless stream of barista-crafted flat whites blew our whole team away."
  }
];

export async function seedDatabase() {
  await initDb();

  console.log('Seeding and syncing Indian Rupee menu items...');
  for (const item of INITIAL_MENU_ITEMS) {
      await pool.query(
        `INSERT INTO menu_items (id, title, category, price, numeric_price, description, dietary, image, featured, tag)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           category = EXCLUDED.category,
           price = EXCLUDED.price,
           numeric_price = EXCLUDED.numeric_price,
           description = EXCLUDED.description,
           dietary = EXCLUDED.dietary,
           image = EXCLUDED.image,
           featured = EXCLUDED.featured,
           tag = EXCLUDED.tag`,
        [
          item.id,
          item.title,
          item.category,
          item.price,
          item.numericPrice,
          item.description,
          item.dietary,
          item.image,
          item.featured,
          item.tag
        ]
      );
    }
    console.log(`✓ Seeded ${INITIAL_MENU_ITEMS.length} menu items.`);

  // 2. Seed Testimonials if empty
  const testRes = await pool.query('SELECT COUNT(*) FROM testimonials');
  if (parseInt(testRes.rows[0].count, 10) === 0) {
    console.log('Seeding initial testimonials...');
    for (const t of INITIAL_TESTIMONIALS) {
      await pool.query(
        `INSERT INTO testimonials (name, title, avatar, stars, quote)
         VALUES ($1, $2, $3, $4, $5)`,
        [t.name, t.title, t.avatar, t.stars, t.quote]
      );
    }
    console.log(`✓ Seeded ${INITIAL_TESTIMONIALS.length} testimonials.`);
  }

  // 3. Seed Default Store Settings if empty
  const settingsRes = await pool.query('SELECT COUNT(*) FROM store_settings WHERE key = $1', ['store_status']);
  if (parseInt(settingsRes.rows[0].count, 10) === 0) {
    await pool.query(
      `INSERT INTO store_settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO NOTHING`,
      ['store_status', JSON.stringify({ mode: 'auto', manual_state: 'open', banner_note: '' })]
    );
    console.log('✓ Seeded default store settings.');
  }

  console.log('Database seeding complete!');
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
