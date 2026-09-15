/**
 * Aura & Bean Artisanal Cafe & Roastery
 * Core Application Controller & Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. DATASETS (Menu Items, Testimonials, Operating Hours)
  // ==========================================================================

  const MENU_ITEMS = [
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
      tag: "Cold & Smooth"
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
      tag: "Antioxidant Rich"
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
      tag: "Guest Favorite"
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

  const TESTIMONIALS = [
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

  // ==========================================================================
  // 2. STATE MANAGEMENT
  // ==========================================================================
  const state = {
    currentView: 'home',
    activeCategory: 'all',
    activeDiets: new Set(),
    searchQuery: '',
    currentTestimonialIndex: 0,
    testimonialTimer: null,
    // Reservation State
    reservation: {
      guests: 2,
      date: getTomorrowDateString(),
      time: '09:30 AM',
      seating: 'Main Roastery Hall',
      occasion: 'Casual Gathering'
    },
    // Event State
    event: {
      packageTitle: 'All-Day Innovation Retreat',
      packagePrice: 55000,
      addons: new Map() // addonName -> price
    }
  };

  function getTomorrowDateString() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
  }

  // ==========================================================================
  // 3. NAVIGATION & VIEW ROUTING
  // ==========================================================================
  const navLinks = document.querySelectorAll('[data-nav]');
  const pageViews = document.querySelectorAll('.page-view');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  function switchView(viewName, updateHash = true) {
    if (!['home', 'menu', 'reservations', 'events', 'location'].includes(viewName)) {
      viewName = 'home';
    }

    state.currentView = viewName;

    // Update View Containers
    pageViews.forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update Desktop Nav Active Link
    desktopLinks.forEach(link => {
      if (link.getAttribute('data-nav') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Mobile Nav Active Link
    mobileLinks.forEach(link => {
      if (link.getAttribute('data-nav') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update URL Hash if needed
    if (updateHash) {
      window.location.hash = viewName;
    }

    // Scroll to top of main smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close Mobile Drawer if open
    closeMobileDrawer();
  }

  // Click handler for all navigation items
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetNav = link.getAttribute('data-nav');
      if (targetNav) {
        switchView(targetNav, true);
      }
    });
  });

  // Handle browser back/forward buttons (hashchange)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== state.currentView) {
      switchView(hash, false);
    }
  });

  // Mobile Drawer Controls
  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

  // Announcement Bar close
  const closeAnnouncement = document.getElementById('closeAnnouncement');
  const announcementBar = document.getElementById('announcementBar');
  if (closeAnnouncement && announcementBar) {
    closeAnnouncement.addEventListener('click', () => {
      announcementBar.style.display = 'none';
    });
  }

  // Sticky Header elevation on scroll
  const siteHeader = document.getElementById('siteHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 4. LIVE OPEN / CLOSED HOURS CALCULATOR
  // ==========================================================================
  function computeLiveHours() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeDecimal = hour + minute / 60;

    // Define schedule [openHour, closeHour, closeString]
    let schedule = { open: 7, close: 21, closeStr: '9:00 PM', openStr: '7:00 AM' };
    if (day === 5) { // Friday
      schedule = { open: 7, close: 22, closeStr: '10:00 PM', openStr: '7:00 AM' };
    } else if (day === 6) { // Saturday
      schedule = { open: 8, close: 22, closeStr: '10:00 PM', openStr: '8:00 AM' };
    } else if (day === 0) { // Sunday
      schedule = { open: 8, close: 20, closeStr: '8:00 PM', openStr: '8:00 AM' };
    }

    const isOpen = timeDecimal >= schedule.open && timeDecimal < schedule.close;

    // 1. Header live status pill
    const headerPill = document.getElementById('liveStatusHeader');
    if (headerPill) {
      const dot = headerPill.querySelector('.status-dot');
      const text = headerPill.querySelector('.status-text');
      if (isOpen) {
        dot.className = 'status-dot';
        text.textContent = `Open Now • Closes ${schedule.closeStr}`;
      } else {
        dot.className = 'status-dot closed';
        text.textContent = `Closed Now • Opens ${schedule.openStr}`;
      }
    }

    // 2. Banner on Home page
    const bannerBadge = document.getElementById('bannerLiveBadge');
    const bannerText = document.getElementById('bannerLiveText');
    if (bannerBadge && bannerText) {
      const dot = bannerBadge.querySelector('.status-dot');
      if (isOpen) {
        if (dot) dot.className = 'status-dot';
        bannerText.textContent = `Open Today Until ${schedule.closeStr}`;
      } else {
        if (dot) dot.className = 'status-dot closed';
        bannerText.textContent = `Currently Closed • Reopens at ${schedule.openStr}`;
      }
    }

    // 3. Location View Big Status Card
    const bigHeadline = document.getElementById('bigStatusHeadline');
    const bigTitle = document.getElementById('bigStatusTitle');
    const bigDetail = document.getElementById('bigStatusDetail');
    if (bigHeadline && bigTitle && bigDetail) {
      if (isOpen) {
        bigTitle.textContent = 'OPEN NOW';
        bigHeadline.textContent = 'Brewing Fresh Coffee Right Now';
        bigDetail.textContent = `Today's hours: ${schedule.openStr} – ${schedule.closeStr}. Drop in or book ahead!`;
      } else {
        bigTitle.textContent = 'CLOSED NOW';
        bigHeadline.textContent = 'Resting Our Grinders For The Evening';
        bigDetail.textContent = `We will reopen tomorrow at ${schedule.openStr}. Table bookings for tomorrow are open!`;
      }
    }

    // 4. Highlight Today in Hours Schedule List
    const scheduleRows = document.querySelectorAll('.schedule-row');
    scheduleRows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === day) {
        row.classList.add('today');
        const dayName = row.querySelector('.day-name');
        if (dayName && !dayName.textContent.includes('(Today)')) {
          dayName.textContent += ' (Today)';
        }
      } else {
        row.classList.remove('today');
      }
    });

    // 5. Mobile Hours snippet
    const mobileHours = document.getElementById('mobileHoursText');
    if (mobileHours) {
      mobileHours.textContent = `${schedule.openStr} – ${schedule.closeStr}`;
    }
  }

  computeLiveHours();

  // ==========================================================================
  // 5. TESTIMONIALS CAROUSEL
  // ==========================================================================
  const testimonialTrack = document.getElementById('testimonialTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');

  function renderTestimonials() {
    if (!testimonialTrack) return;
    testimonialTrack.innerHTML = '';
    carouselDots.innerHTML = '';

    TESTIMONIALS.forEach((item, index) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide';
      slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-stars" aria-label="${item.stars}">${item.stars}</div>
          <blockquote class="testimonial-quote">“${item.quote}”</blockquote>
          <div class="testimonial-author">
            <img src="${item.avatar}" alt="${item.name}" class="author-avatar" loading="lazy">
            <div class="author-info">
              <div class="author-name">${item.name}</div>
              <div class="author-title">${item.title}</div>
            </div>
          </div>
        </div>
      `;
      testimonialTrack.appendChild(slide);

      // Dot
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => {
        goToTestimonial(index);
        restartTestimonialAutoplay();
      });
      carouselDots.appendChild(dot);
    });

    updateTestimonialPosition();
  }

  function updateTestimonialPosition() {
    if (!testimonialTrack) return;
    testimonialTrack.style.transform = `translateX(-${state.currentTestimonialIndex * 100}%)`;
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.currentTestimonialIndex);
    });
  }

  function nextTestimonial() {
    state.currentTestimonialIndex = (state.currentTestimonialIndex + 1) % TESTIMONIALS.length;
    updateTestimonialPosition();
  }

  function prevTestimonial() {
    state.currentTestimonialIndex = (state.currentTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    updateTestimonialPosition();
  }

  function goToTestimonial(idx) {
    state.currentTestimonialIndex = idx;
    updateTestimonialPosition();
  }

  function startTestimonialAutoplay() {
    stopTestimonialAutoplay();
    state.testimonialTimer = setInterval(nextTestimonial, 5500);
  }

  function stopTestimonialAutoplay() {
    if (state.testimonialTimer) {
      clearInterval(state.testimonialTimer);
      state.testimonialTimer = null;
    }
  }

  function restartTestimonialAutoplay() {
    stopTestimonialAutoplay();
    startTestimonialAutoplay();
  }

  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      prevTestimonial();
      restartTestimonialAutoplay();
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      nextTestimonial();
      restartTestimonialAutoplay();
    });
  }

  const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopTestimonialAutoplay);
    carouselWrapper.addEventListener('mouseleave', startTestimonialAutoplay);
  }

  renderTestimonials();
  startTestimonialAutoplay();

  // ==========================================================================
  // 6. HOME PAGE FEATURED DISHES
  // ==========================================================================
  function renderFeaturedHomeDishes() {
    const featuredGrid = document.getElementById('homeFeaturedGrid');
    if (!featuredGrid) return;
    const featured = MENU_ITEMS.filter(item => item.featured);

    featuredGrid.innerHTML = featured.map(item => `
      <div class="featured-card">
        <div class="featured-card-img">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="featured-badge-tag">${item.tag || 'Specialty'}</span>
          <span class="featured-price-tag">${item.price}</span>
        </div>
        <div class="featured-card-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="dietary-tags">
            ${item.dietary.includes('vg') ? '<span class="tag-pill tag-vg">Vegetarian</span>' : ''}
            ${item.dietary.includes('v') ? '<span class="tag-pill tag-v">Vegan</span>' : ''}
            ${item.dietary.includes('gf') ? '<span class="tag-pill tag-gf">Gluten-Free</span>' : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  renderFeaturedHomeDishes();

  // ==========================================================================
  // 7. MENU PAGE: FILTERING, SEARCH, & RENDERING
  // ==========================================================================
  const menuGridContainer = document.getElementById('menuGridContainer');
  const menuSearchInput = document.getElementById('menuSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const dietaryToggles = document.querySelectorAll('.dietary-toggle');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const menuResultsCount = document.getElementById('menuResultsCount');
  const menuEmptyState = document.getElementById('menuEmptyState');
  const emptyResetBtn = document.getElementById('emptyResetBtn');

  function renderMenuItems() {
    if (!menuGridContainer) return;

    // Filter Items
    const query = state.searchQuery.toLowerCase().trim();
    const filtered = MENU_ITEMS.filter(item => {
      // Category match
      if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
        return false;
      }
      // Dietary match (must satisfy all active diets)
      for (const diet of state.activeDiets) {
        if (!item.dietary.includes(diet)) {
          return false;
        }
      }
      // Search query match
      if (query) {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const tagMatch = item.tag && item.tag.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !tagMatch) {
          return false;
        }
      }
      return true;
    });

    // Update Results count
    if (filtered.length === 0) {
      menuGridContainer.style.display = 'none';
      menuEmptyState.style.display = 'block';
      menuResultsCount.textContent = '0 items found matching your filters';
    } else {
      menuGridContainer.style.display = 'grid';
      menuEmptyState.style.display = 'none';
      menuResultsCount.textContent = `Showing ${filtered.length} of ${MENU_ITEMS.length} handcrafted items`;

      menuGridContainer.innerHTML = filtered.map(item => `
        <div class="menu-card" data-id="${item.id}">
          <div class="menu-card-img">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            ${item.tag ? `<span class="featured-badge-tag">${item.tag}</span>` : ''}
          </div>
          <div class="menu-card-body">
            <div class="menu-card-top">
              <h3 class="menu-item-title">${item.title}</h3>
              <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.description}</p>
            <div class="menu-item-footer">
              <div class="dietary-tags">
                ${item.dietary.includes('vg') ? '<span class="tag-pill tag-vg">VG</span>' : ''}
                ${item.dietary.includes('v') ? '<span class="tag-pill tag-v">Vegan</span>' : ''}
                ${item.dietary.includes('gf') ? '<span class="tag-pill tag-gf">GF</span>' : ''}
              </div>
              <span class="item-category-tag">${item.category}</span>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Toggle reset filters visibility
    const hasActiveFilters = state.activeCategory !== 'all' || state.activeDiets.size > 0 || state.searchQuery.length > 0;
    if (resetFiltersBtn) {
      resetFiltersBtn.style.display = hasActiveFilters ? 'inline-block' : 'none';
    }
  }

  // Category Pill Handlers
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      state.activeCategory = pill.getAttribute('data-category');
      renderMenuItems();
    });
  });

  // Dietary Toggle Handlers
  dietaryToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const diet = toggle.getAttribute('data-diet');
      if (state.activeDiets.has(diet)) {
        state.activeDiets.delete(diet);
        toggle.classList.remove('active');
        toggle.setAttribute('aria-pressed', 'false');
      } else {
        state.activeDiets.add(diet);
        toggle.classList.add('active');
        toggle.setAttribute('aria-pressed', 'true');
      }
      renderMenuItems();
    });
  });

  // Search Input Handler
  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = state.searchQuery.length > 0 ? 'block' : 'none';
      }
      renderMenuItems();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      state.searchQuery = '';
      menuSearchInput.value = '';
      searchClearBtn.style.display = 'none';
      renderMenuItems();
      menuSearchInput.focus();
    });
  }

  // Reset Filters
  function resetAllFilters() {
    state.activeCategory = 'all';
    state.activeDiets.clear();
    state.searchQuery = '';
    if (menuSearchInput) menuSearchInput.value = '';
    if (searchClearBtn) searchClearBtn.style.display = 'none';

    categoryPills.forEach((p, idx) => {
      p.classList.toggle('active', idx === 0);
      p.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    });

    dietaryToggles.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });

    renderMenuItems();
  }

  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

  renderMenuItems();

  // ==========================================================================
  // 8. PRINTABLE PDF MENU GENERATION & MODAL
  // ==========================================================================
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const pdfPreviewModal = document.getElementById('pdfPreviewModal');
  const closePdfModalBtn = document.getElementById('closePdfModalBtn');
  const closePdfSecondaryBtn = document.getElementById('closePdfSecondaryBtn');
  const triggerPrintAction = document.getElementById('triggerPrintAction');
  const printableMenuSheet = document.getElementById('printableMenuSheet');

  function generatePrintableSheet() {
    if (!printableMenuSheet) return;
    
    // Group items by category
    const categories = [
      { key: 'coffee', label: 'Specialty Coffees & Ceremonial Teas' },
      { key: 'breakfast', label: 'Breakfast & Sourdough Toasts' },
      { key: 'lunch', label: 'Savory Mains & Nourish Bowls' },
      { key: 'dessert', label: 'Artisanal Bakery & Patisserie' }
    ];

    let html = `
      <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #21130D; padding-bottom: 16px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; margin: 0; color: #21130D;">AURA & BEAN</h1>
        <p style="font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: #C5853B; margin: 4px 0;">Artisanal Roastery & Scratch Kitchen</p>
        <p style="font-size: 0.8rem; color: #666;">Plot 482, 12th Main Road, Indiranagar, Bengaluru • +91 80 4123 4567 • aurabeancafe.com</p>
      </div>
    `;

    categories.forEach(cat => {
      const items = MENU_ITEMS.filter(i => i.category === cat.key);
      html += `
        <div style="margin-bottom: 24px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; border-bottom: 1px solid #E8DFD3; padding-bottom: 6px; margin-bottom: 12px; color: #21130D;">
            ${cat.label}
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            ${items.map(item => `
              <div style="page-break-inside: avoid;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.95rem; color: #21130D;">
                  <span>${item.title}</span>
                  <span style="color: #C5853B;">${item.price}</span>
                </div>
                <p style="font-size: 0.8rem; color: #555; margin-top: 2px; line-height: 1.4;">${item.description}</p>
                <small style="font-size: 0.7rem; color: #2E7D32;">${item.dietary.map(d => d.toUpperCase()).join(' • ')}</small>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    html += `
      <div style="text-align: center; border-top: 1px solid #E8DFD3; padding-top: 14px; font-size: 0.75rem; color: #888;">
        All organic ingredients • Plant milks at no extra charge • Fair trade & carbon neutral operations
      </div>
    `;

    printableMenuSheet.innerHTML = html;
  }

  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      generatePrintableSheet();
      pdfPreviewModal.classList.add('active');
      pdfPreviewModal.setAttribute('aria-hidden', 'false');
    });
  }

  function closePdfModal() {
    pdfPreviewModal.classList.remove('active');
    pdfPreviewModal.setAttribute('aria-hidden', 'true');
  }

  if (closePdfModalBtn) closePdfModalBtn.addEventListener('click', closePdfModal);
  if (closePdfSecondaryBtn) closePdfSecondaryBtn.addEventListener('click', closePdfModal);
  if (triggerPrintAction) {
    triggerPrintAction.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================================================
  // 9. TABLE RESERVATIONS SYSTEM
  // ==========================================================================
  const reservationForm = document.getElementById('reservationForm');
  const bookingDateInput = document.getElementById('bookingDate');
  const seatingAreaSelect = document.getElementById('seatingArea');
  const partySizeInput = document.getElementById('partySizeInput');
  const partyButtons = document.querySelectorAll('.party-btn');
  const counterMinus = document.getElementById('counterMinus');
  const counterPlus = document.getElementById('counterPlus');
  const counterDisplay = document.getElementById('counterDisplay');
  const mealTabs = document.querySelectorAll('.meal-tab');
  const timeSlotsGrid = document.getElementById('timeSlotsGrid');
  const selectedTimeInput = document.getElementById('selectedTimeInput');

  // Summary Sidebar Elements
  const summaryGuests = document.getElementById('summaryGuests');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const summaryArea = document.getElementById('summaryArea');

  // Confirmation Modal Elements
  const reservationModal = document.getElementById('reservationModal');
  const closeResModalBtn = document.getElementById('closeResModalBtn');
  const receiptBookingCode = document.getElementById('receiptBookingCode');
  const receiptName = document.getElementById('receiptName');
  const receiptDateTime = document.getElementById('receiptDateTime');
  const receiptGuests = document.getElementById('receiptGuests');
  const receiptArea = document.getElementById('receiptArea');
  const receiptOccasion = document.getElementById('receiptOccasion');
  const downloadCalendarBtn = document.getElementById('downloadCalendarBtn');
  const printReceiptBtn = document.getElementById('printReceiptBtn');

  // Set min date to today, default to tomorrow
  if (bookingDateInput) {
    bookingDateInput.min = getTodayDateString();
    bookingDateInput.value = state.reservation.date;
    updateSummaryDateText(state.reservation.date);

    bookingDateInput.addEventListener('change', (e) => {
      state.reservation.date = e.target.value;
      updateSummaryDateText(e.target.value);
      generateTimeSlots('morning');
    });
  }

  function updateSummaryDateText(dateStr) {
    if (!dateStr) return;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      summaryDate.textContent = d.toLocaleDateString('en-US', options);
    }
  }

  // Party Size Selection
  partyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.getAttribute('data-guests'), 10);
      setPartySize(count);
    });
  });

  if (counterMinus) {
    counterMinus.addEventListener('click', () => {
      if (state.reservation.guests > 1) {
        setPartySize(state.reservation.guests - 1);
      }
    });
  }

  if (counterPlus) {
    counterPlus.addEventListener('click', () => {
      if (state.reservation.guests < 12) {
        setPartySize(state.reservation.guests + 1);
      }
    });
  }

  function setPartySize(num) {
    state.reservation.guests = num;
    partySizeInput.value = num;
    counterDisplay.textContent = num;

    partyButtons.forEach(btn => {
      const btnVal = parseInt(btn.getAttribute('data-guests'), 10);
      btn.classList.toggle('active', btnVal === num);
    });

    summaryGuests.textContent = `${num} ${num === 1 ? 'Guest' : 'Guests'}`;
  }

  // Seating area change
  if (seatingAreaSelect) {
    seatingAreaSelect.addEventListener('change', (e) => {
      state.reservation.seating = e.target.value;
      summaryArea.textContent = e.target.value;
    });
  }

  // Dynamic Time Slots
  const TIME_SLOTS_DATA = {
    morning: [
      { time: '08:00 AM', status: 'Available', statusClass: 'avail' },
      { time: '08:30 AM', status: 'Few Left', statusClass: 'warn' },
      { time: '09:00 AM', status: 'Filling Fast', statusClass: 'warn' },
      { time: '09:30 AM', status: 'Available', statusClass: 'avail' },
      { time: '10:00 AM', status: 'Available', statusClass: 'avail' },
      { time: '10:30 AM', status: '1 Table Left', statusClass: 'warn' },
      { time: '11:00 AM', status: 'Available', statusClass: 'avail' },
      { time: '11:30 AM', status: 'Filling Fast', statusClass: 'warn' }
    ],
    afternoon: [
      { time: '12:00 PM', status: 'Peak Time', statusClass: 'warn' },
      { time: '12:30 PM', status: 'Available', statusClass: 'avail' },
      { time: '01:00 PM', status: 'Available', statusClass: 'avail' },
      { time: '01:30 PM', status: 'Available', statusClass: 'avail' },
      { time: '02:30 PM', status: 'Quiet Hour', statusClass: 'avail' },
      { time: '03:30 PM', status: 'Available', statusClass: 'avail' },
      { time: '04:00 PM', status: 'Available', statusClass: 'avail' }
    ],
    evening: [
      { time: '05:00 PM', status: 'Available', statusClass: 'avail' },
      { time: '05:30 PM', status: 'Available', statusClass: 'avail' },
      { time: '06:00 PM', status: 'Popular', statusClass: 'warn' },
      { time: '06:30 PM', status: 'Filling Fast', statusClass: 'warn' },
      { time: '07:00 PM', status: '2 Tables Left', statusClass: 'warn' },
      { time: '07:30 PM', status: 'Available', statusClass: 'avail' },
      { time: '08:00 PM', status: 'Available', statusClass: 'avail' }
    ]
  };

  function generateTimeSlots(period) {
    if (!timeSlotsGrid) return;
    const slots = TIME_SLOTS_DATA[period] || TIME_SLOTS_DATA.morning;

    timeSlotsGrid.innerHTML = slots.map((s, index) => {
      const isSelected = s.time === state.reservation.time;
      return `
        <button type="button" class="time-slot-chip ${isSelected ? 'active' : ''}" data-time="${s.time}">
          <span class="slot-time">${s.time}</span>
          <span class="slot-status-text">${s.status}</span>
        </button>
      `;
    }).join('');

    // Attach slot clicks
    const chips = timeSlotsGrid.querySelectorAll('.time-slot-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const chosen = chip.getAttribute('data-time');
        state.reservation.time = chosen;
        selectedTimeInput.value = chosen;
        summaryTime.textContent = chosen;
      });
    });
  }

  mealTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mealTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const period = tab.getAttribute('data-period');
      generateTimeSlots(period);
    });
  });

  generateTimeSlots('morning');

  // Reservation Form Validation & Submit
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('guestName');
      const phoneInput = document.getElementById('guestPhone');
      const emailInput = document.getElementById('guestEmail');
      const occasionSelect = document.getElementById('bookingOccasion');

      // Clear previous error messages
      document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      // Validate Name
      if (!nameInput.value.trim()) {
        document.getElementById('nameError').textContent = 'Please provide your full name.';
        nameInput.classList.add('error');
        isValid = false;
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        document.getElementById('phoneError').textContent = 'Please provide a valid contact phone.';
        phoneInput.classList.add('error');
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
      }

      // Validate Date
      if (!bookingDateInput.value) {
        document.getElementById('dateError').textContent = 'Please pick a booking date.';
        bookingDateInput.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please check the highlighted required fields.', 'warn');
        return;
      }

      // Generate Reference Code
      const refCode = '#AB-' + Math.floor(1000 + Math.random() * 9000);

      // Populate Receipt
      receiptBookingCode.textContent = refCode;
      receiptName.textContent = nameInput.value.trim();
      receiptDateTime.textContent = `${summaryDate.textContent} • ${state.reservation.time}`;
      receiptGuests.textContent = `${state.reservation.guests} Guests`;
      receiptArea.textContent = state.reservation.seating;
      receiptOccasion.textContent = occasionSelect.value;

      // Show Confirmation Modal
      reservationModal.classList.add('active');
      reservationModal.setAttribute('aria-hidden', 'false');

      // Toast notification
      showToast(`Reservation ${refCode} confirmed! We've sent confirmation to your email.`, 'success');

      // Reset form fields
      reservationForm.reset();
      setPartySize(2);
      bookingDateInput.value = getTomorrowDateString();
    });
  }

  function closeReservationModal() {
    reservationModal.classList.remove('active');
    reservationModal.setAttribute('aria-hidden', 'true');
  }

  if (closeResModalBtn) closeResModalBtn.addEventListener('click', closeReservationModal);
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ICS Calendar Generator
  if (downloadCalendarBtn) {
    downloadCalendarBtn.addEventListener('click', () => {
      const title = 'Table Reservation at Aura & Bean Cafe';
      const description = `Booking Code: ${receiptBookingCode.textContent}\\nGuests: ${receiptGuests.textContent}\\nAtmosphere: ${receiptArea.textContent}`;
      const location = 'Plot 482, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038';
      
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Aura and Bean Cafe//Reservations//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'aura-bean-reservation.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Calendar invitation (.ics) downloaded!', 'success');
    });
  }

  // ==========================================================================
  // 10. PRIVATE EVENTS (CORPORATE & BIRTHDAY) SYSTEM
  // ==========================================================================
  const tabCorporate = document.getElementById('tabCorporate');
  const tabBirthdays = document.getElementById('tabBirthdays');
  const panelCorporate = document.getElementById('panelCorporate');
  const panelBirthdays = document.getElementById('panelBirthdays');
  const eventQuoteDisplay = document.getElementById('eventQuoteDisplay');
  const eventSelectedPkgDisplay = document.getElementById('eventSelectedPkgDisplay');
  const packageSelectBtns = document.querySelectorAll('.package-select-btn');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const eventInquiryForm = document.getElementById('eventInquiryForm');
  const eventInquiryModal = document.getElementById('eventInquiryModal');
  const closeEventModalBtn = document.getElementById('closeEventModalBtn');
  const eventDoneBtn = document.getElementById('eventDoneBtn');
  const eventTicketCode = document.getElementById('eventTicketCode');
  const eventDateInput = document.getElementById('eventDateInput');

  if (eventDateInput) {
    eventDateInput.min = getTodayDateString();
  }

  // Tab switching
  if (tabCorporate && tabBirthdays) {
    tabCorporate.addEventListener('click', () => {
      tabCorporate.classList.add('active');
      tabCorporate.setAttribute('aria-selected', 'true');
      tabBirthdays.classList.remove('active');
      tabBirthdays.setAttribute('aria-selected', 'false');
      panelCorporate.style.display = 'block';
      panelBirthdays.style.display = 'none';
    });

    tabBirthdays.addEventListener('click', () => {
      tabBirthdays.classList.add('active');
      tabBirthdays.setAttribute('aria-selected', 'true');
      tabCorporate.classList.remove('active');
      tabCorporate.setAttribute('aria-selected', 'false');
      panelBirthdays.style.display = 'block';
      panelCorporate.style.display = 'none';
    });
  }

  // Package Selection
  packageSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-pkg-title');
      const price = parseInt(btn.getAttribute('data-pkg-price'), 10);
      
      state.event.packageTitle = title;
      state.event.packagePrice = price;

      updateEventQuote();

      // Smooth scroll to inquiry form
      const inquirySec = document.getElementById('eventInquirySection');
      if (inquirySec) {
        inquirySec.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Selected "${title}". Customize add-ons below!`, 'info');
    });
  });

  // Addon Checkbox Handlers
  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const name = cb.getAttribute('data-addon-name');
      const price = parseInt(cb.getAttribute('data-addon-price'), 10);
      
      if (cb.checked) {
        state.event.addons.set(name, price);
      } else {
        state.event.addons.delete(name);
      }
      updateEventQuote();
    });
  });

  function updateEventQuote() {
    let total = state.event.packagePrice;
    state.event.addons.forEach(price => {
      total += price;
    });

    if (eventQuoteDisplay) {
      eventQuoteDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
    if (eventSelectedPkgDisplay) {
      let extraText = state.event.addons.size > 0 ? ` (+${state.event.addons.size} Add-ons)` : '';
      eventSelectedPkgDisplay.textContent = `Package: ${state.event.packageTitle}${extraText}`;
    }
  }

  updateEventQuote();

  // Event Inquiry Form Submit
  if (eventInquiryForm) {
    eventInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const dateInput = document.getElementById('eventDateInput');
      const hostName = document.getElementById('eventHostName');
      const hostEmail = document.getElementById('eventHostEmail');
      const hostPhone = document.getElementById('eventHostPhone');

      // Clear previous error styles
      document.querySelectorAll('#eventInquiryForm .field-error').forEach(el => el.textContent = '');
      document.querySelectorAll('#eventInquiryForm .form-input').forEach(el => el.classList.remove('error'));

      let isValid = true;
      if (!dateInput.value) {
        document.getElementById('eventDateError').textContent = 'Please select an event target date.';
        dateInput.classList.add('error');
        isValid = false;
      }
      if (!hostName.value.trim()) {
        document.getElementById('eventHostNameError').textContent = 'Please enter host name.';
        hostName.classList.add('error');
        isValid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!hostEmail.value.trim() || !emailPattern.test(hostEmail.value.trim())) {
        document.getElementById('eventEmailError').textContent = 'Please enter a valid email address.';
        hostEmail.classList.add('error');
        isValid = false;
      }
      if (!hostPhone.value.trim() || hostPhone.value.trim().length < 7) {
        document.getElementById('eventPhoneError').textContent = 'Please enter a valid phone number.';
        hostPhone.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please fill out the highlighted required fields.', 'warn');
        return;
      }

      const ticketId = '#EVT-' + Math.floor(1000 + Math.random() * 9000);
      eventTicketCode.textContent = ticketId;

      eventInquiryModal.classList.add('active');
      eventInquiryModal.setAttribute('aria-hidden', 'false');

      showToast(`Inquiry ${ticketId} dispatched to our Private Events Concierge!`, 'success');
      eventInquiryForm.reset();
    });
  }

  function closeEventModal() {
    eventInquiryModal.classList.remove('active');
    eventInquiryModal.setAttribute('aria-hidden', 'true');
  }

  if (closeEventModalBtn) closeEventModalBtn.addEventListener('click', closeEventModal);
  if (eventDoneBtn) eventDoneBtn.addEventListener('click', closeEventModal);

  // ==========================================================================
  // 11. NEWSLETTER SUBSCRIPTION & TOAST NOTIFICATIONS
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const toastContainer = document.getElementById('toastContainer');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailPattern.test(email)) {
        showToast('Please enter a valid email address for the newsletter.', 'warn');
        return;
      }

      newsletterEmail.value = '';
      showToast('Welcome to the Aura & Bean circle! Check your inbox for your 10% welcome coupon.', 'success');
    });
  }

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = '☕';
    if (type === 'success') icon = '✓';
    if (type === 'warn') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4500);
  }

  // ==========================================================================
  // 12. INITIALIZATION ON LOAD
  // ==========================================================================
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && ['home', 'menu', 'reservations', 'events', 'location'].includes(initialHash)) {
    switchView(initialHash, false);
  } else {
    switchView('home', false);
  }

  // Update current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
