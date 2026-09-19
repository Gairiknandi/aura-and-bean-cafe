import React, { useState } from 'react';

export default function Footer({ onNavigate, showToast, liveHours }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailPattern.test(cleanEmail)) {
      showToast('Please enter a valid email address for the newsletter.', 'warn');
      return;
    }

    setEmail('');
    showToast(
      'Welcome to the Aura & Bean circle! Check your inbox for your 10% welcome coupon.',
      'success'
    );
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-cta">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-text">
              <span className="badge-pill">The Roaster's Dispatch</span>
              <h3>Join Our Inner Circle & Enjoy 10% Off</h3>
              <p>
                Receive secret off-menu drink invitations, home-brewing tips from our roastmasters,
                and early access to holiday event bookings.
              </p>
            </div>
            <form className="newsletter-form" id="newsletterForm" onSubmit={handleSubscribe} noValidate>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  id="newsletterEmail"
                  placeholder="Enter your email address..."
                  required
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" id="newsletterSubmitBtn">
                  Subscribe
                </button>
              </div>
              <small className="newsletter-disclaimer">
                We respect your peace. No spam, unsubscribe anytime.
              </small>
            </form>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Bio Col */}
          <div className="footer-col footer-brand-col">
            <a
              href="#home"
              className="brand-logo footer-logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              <div className="brand-icon">☕</div>
              <div className="brand-text">
                <span className="brand-title">AURA & BEAN</span>
                <span className="brand-subtitle">ROASTERY & KITCHEN</span>
              </div>
            </a>
            <p className="footer-bio">
              An artisanal sanctuary for coffee connoisseurs, slow food devotees, and vibrant
              gatherings. Roasted with care in Bengaluru, India.
            </p>
            <div className="footer-social-icons">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon-btn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="social-icon-btn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="https://yelp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yelp"
                className="social-icon-btn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                >
                  Home & Story
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('menu');
                  }}
                >
                  Full Artisan Menu
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('reservations');
                  }}
                >
                  Reserve a Table
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('events');
                  }}
                >
                  Corporate Events
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('events');
                  }}
                >
                  Birthday Celebrations
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('location');
                  }}
                >
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours Summary */}
          <div className="footer-col">
            <h4>Hours of Warmth</h4>
            <ul className="footer-hours-list">
              <li>
                <span>Mon – Thu:</span> <span>7:00 AM – 9:00 PM</span>
              </li>
              <li>
                <span>Friday:</span> <span>7:00 AM – 10:00 PM</span>
              </li>
              <li>
                <span>Saturday:</span> <span>8:00 AM – 10:00 PM</span>
              </li>
              <li>
                <span>Sunday:</span> <span>8:00 AM – 8:00 PM</span>
              </li>
            </ul>
            <div className="footer-status-tag" id="footerLiveStatus">
              <span className={`status-dot ${!liveHours.isOpen ? 'closed' : ''}`}></span>{' '}
              {liveHours.isOpen
                ? `Open Today Until ${liveHours.schedule.closeStr}`
                : `Closed Now • Reopens at ${liveHours.schedule.openStr}`}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="footer-col">
            <h4>Visit & Inquire</h4>
            <p className="footer-address">
              Plot 482, 12th Main Road
              <br />
              100 Feet Road, Indiranagar
              <br />
              Bengaluru, Karnataka 560038
            </p>
            <p className="footer-phone">
              <strong>Phone:</strong> <a href="tel:+918041234567">+91 80 4123 4567</a>
            </p>
            <p className="footer-email">
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@aurabeancafe.com">hello@aurabeancafe.com</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>
            &copy; <span id="currentYear">{new Date().getFullYear()}</span> Aura & Bean Artisanal Cafe
            & Roastery. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  'Demo Privacy Policy: Aura & Bean is committed to protecting your privacy in this demonstration website.'
                );
              }}
            >
              Privacy Policy
            </a>
            <span className="bullet">•</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Demo Terms: Website designed for demonstration and booking showcase.');
              }}
            >
              Terms of Service
            </a>
            <span className="bullet">•</span>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('menu');
              }}
            >
              Allergen Guide
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
