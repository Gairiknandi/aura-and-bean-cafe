import React, { useState, useEffect, useRef } from 'react';
import { MENU_ITEMS } from '../../data/menuData';
import { TESTIMONIALS } from '../../data/testimonialsData';

export default function HomeView({ onNavigate, liveHours }) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const featuredItems = MENU_ITEMS.filter((item) => item.featured);

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="page-view active" id="view-home">
      {/* Hero Banner Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="sparkle-icon">✨</span> Single-Origin Roastery • Organic Scratch Bakery
            </div>
            <h1 className="hero-title">
              Where Every Sip Tells an <span className="text-accent">Artisanal Story.</span>
            </h1>
            <p className="hero-tagline">
              Step into a sunlit sanctuary of slow-brewed micro-lot coffees, warm sourdough pastries
              fresh from our stone hearth, and vibrant farm-to-table plates crafted with mindful
              devotion.
            </p>
            <div className="hero-cta-group">
              <a
                href="#reservations"
                className="btn btn-primary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('reservations');
                }}
              >
                <span>Reserve a Table</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#menu"
                className="btn btn-secondary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('menu');
                }}
              >
                <span>View Full Menu</span>
              </a>
            </div>

            {/* Quick Credibility Badges */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">4.9 ★</span>
                <span className="stat-label">2,400+ Happy Guests</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Fair Trade Beans</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">Daily</span>
                <span className="stat-label">Baked In-House at 5 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cafe Story & Vibe Section */}
      <section className="story-section section-padding">
        <div className="container">
          <div className="story-grid">
            <div className="story-images">
              <div className="story-img-card story-img-main">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                  alt="Barista pouring artisanal latte art at Aura & Bean"
                  loading="lazy"
                />
              </div>
              <div className="story-img-card story-img-sub">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
                  alt="Cozy sunlit rustic cafe seating area"
                  loading="lazy"
                />
                <div className="story-floating-badge">
                  <span className="badge-year">Est. 2021</span>
                  <span className="badge-sub">Craft & Community</span>
                </div>
              </div>
            </div>

            <div className="story-text-col">
              <span className="section-eyebrow">Our Story & Craft</span>
              <h2 className="section-title">
                Roasted with Intention, <br />
                Served with Soul.
              </h2>
              <p className="section-description">
                Aura & Bean began with a modest vintage 5kg drum roaster and an unwavering dream: to
                create an unhurried haven where craft coffee, honest baking, and warm conversations
                flourish.
              </p>
              <p className="section-text">
                We partner directly with smallholder coffee cooperatives across Ethiopia, Colombia,
                and Guatemala. Every morning before sunrise, our bakers shape sourdough croissants
                and brioche using stone-ground heritage flours and French cultured butter. We
                believe coffee is not just fuel—it is an invitation to pause, connect, and savor
                the present moment.
              </p>
              <div className="story-features-list">
                <div className="story-feature">
                  <div className="feature-icon">☕</div>
                  <div>
                    <h4>Small-Batch Roasting</h4>
                    <p>Light-to-medium profiles highlighting terroir floral and fruit notes.</p>
                  </div>
                </div>
                <div className="story-feature">
                  <div className="feature-icon">🌿</div>
                  <div>
                    <h4>Mindful & Sustainable</h4>
                    <p>100% compostable takeaway ware, zero food waste composting program.</p>
                  </div>
                </div>
              </div>
              <div className="story-signature">
                <div className="signature-text">Elena & Mateo Vance</div>
                <div className="signature-title">Founders & Head Roasters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specialties Section */}
      <section className="featured-section section-padding bg-warm">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Handcrafted Favorites</span>
            <h2 className="section-title">Signature Dishes & Brews</h2>
            <p className="section-subtitle">
              A curated preview of our guests’ most cherished creations, prepared to perfection
              daily.
            </p>
          </div>

          <div className="featured-grid" id="homeFeaturedGrid">
            {featuredItems.map((item) => (
              <div key={item.id} className="featured-card">
                <div className="featured-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="featured-badge-tag">{item.tag || 'Specialty'}</span>
                  <span className="featured-price-tag">{item.price}</span>
                </div>
                <div className="featured-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="dietary-tags">
                    {item.dietary.includes('vg') && (
                      <span className="tag-pill tag-vg">Vegetarian</span>
                    )}
                    {item.dietary.includes('v') && <span className="tag-pill tag-v">Vegan</span>}
                    {item.dietary.includes('gf') && (
                      <span className="tag-pill tag-gf">Gluten-Free</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer-cta text-center">
            <a
              href="#menu"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('menu');
              }}
            >
              Explore Our Full Menu (16 Items) &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Pillars Section */}
      <section className="pillars-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">The Aura & Bean Difference</span>
            <h2 className="section-title">Why Guests Love Our Space</h2>
            <p className="section-subtitle">
              Every detail is thoughtfully curated to provide an unforgettable cafe experience.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Ethical Direct Trade</h3>
              <p>
                We pay 40% above Fair Trade minimums directly to independent farmers, ensuring
                sustainable livelihoods and exceptional bean quality.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>Artisanal Scratch Kitchen</h3>
              <p>
                No frozen dough or artificial syrups. Every sauce, compote, bread loaf, and pastry
                is meticulously created from scratch in our open kitchen.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Warm & Welcoming Vibe</h3>
              <p>
                High ceilings, natural timber, lush plants, comfortable booths, high-speed fiber
                Wi-Fi, and gentle jazz create the ultimate sanctuary.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Dietary Inclusive</h3>
              <p>
                Rich assortment of plant-based milks (oat, almond, coconut) at no extra surcharge,
                alongside gluten-free and vegan breakfast favorites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Hours & Quick Visit Banner */}
      <section className="visit-banner-section">
        <div className="container">
          <div className="visit-banner-card">
            <div className="visit-banner-text">
              <div className="banner-badge" id="bannerLiveBadge">
                <span className={`status-dot ${!liveHours.isOpen ? 'closed' : ''}`}></span>{' '}
                <span id="bannerLiveText">{liveHours.bannerText}</span>
              </div>
              <h3>Join Us for Today's Fresh Roast</h3>
              <p id="bannerHoursSummary">
                Monday – Friday: 7:00 AM – 9:00 PM | Weekends: 8:00 AM – 10:00 PM
              </p>
              <p className="banner-address-text">
                📍 Plot 482, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038
              </p>
            </div>
            <div className="visit-banner-actions">
              <a
                href="#reservations"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('reservations');
                }}
              >
                Book a Table
              </a>
              <a
                href="#location"
                className="btn btn-outline-light"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('location');
                }}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="testimonials-section section-padding bg-warm">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Guest Impressions</span>
            <h2 className="section-title">Words From Our Community</h2>
            <p className="section-subtitle">
              Real experiences shared by local coffee lovers, neighborhood regulars, and food critics.
            </p>
          </div>

          <div
            className="testimonial-carousel-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              className="carousel-control carousel-prev"
              id="carouselPrev"
              aria-label="Previous testimonial"
              onClick={prevTestimonial}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="testimonial-carousel-track" id="testimonialTrack">
              {TESTIMONIALS.map((item, index) => (
                <div
                  key={index}
                  className={`testimonial-slide ${index === currentTestimonialIndex ? 'active' : ''}`}
                  style={{
                    display: index === currentTestimonialIndex ? 'block' : 'none',
                    opacity: index === currentTestimonialIndex ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                  }}
                >
                  <div className="testimonial-quote-icon">“</div>
                  <p className="testimonial-text">{item.quote}</p>
                  <div className="testimonial-stars">{item.stars}</div>
                  <div className="testimonial-author">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="author-avatar"
                      loading="lazy"
                    />
                    <div className="author-info">
                      <h4>{item.name}</h4>
                      <p>{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-control carousel-next"
              id="carouselNext"
              aria-label="Next testimonial"
              onClick={nextTestimonial}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Carousel Dots Pagination */}
          <div className="carousel-dots" id="carouselDots" role="tablist" aria-label="Testimonial slides">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentTestimonialIndex ? 'active' : ''}`}
                role="tab"
                aria-label={`Slide ${index + 1}`}
                onClick={() => setCurrentTestimonialIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
