import React, { useState } from 'react';

export default function Header({ currentView, onNavigate, liveHours }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, e) => {
    if (e) e.preventDefault();
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'events', label: 'Events' },
    { id: 'location', label: 'Location' }
  ];

  return (
    <header className="site-header" id="siteHeader">
      <div className="nav-container">
        {/* Logo / Brand */}
        <a
          href="#home"
          className="brand-logo"
          onClick={(e) => handleNavClick('home', e)}
        >
          <div className="brand-icon">
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">AURA & BEAN</span>
            <span className="brand-subtitle">ROASTERY & KITCHEN</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <div className="live-status-pill" id="liveStatusHeader">
            <span className={`status-dot ${!liveHours.isOpen ? 'closed' : ''}`}></span>
            <span className="status-text">{liveHours.headerText}</span>
          </div>
          <a
            href="#reservations"
            className="btn btn-primary btn-sm btn-header"
            onClick={(e) => handleNavClick('reservations', e)}
          >
            Reserve Table
          </a>
          <a
            href="#admin"
            className={`btn btn-outline-light btn-sm ${currentView === 'admin' ? 'active' : ''}`}
            style={{ padding: '6px 11px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            onClick={(e) => handleNavClick('admin', e)}
            title="Management Portal"
          >
            <i className="fa-solid fa-lock" style={{ fontSize: '0.75rem' }}></i>
            <span>Admin</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="hamburger-btn"
            id="hamburgerBtn"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}
        id="mobileDrawer"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <div className="brand-text">
              <span className="brand-title">AURA & BEAN</span>
              <span className="brand-subtitle">ROASTERY & KITCHEN</span>
            </div>
            <button
              className="mobile-close-btn"
              id="mobileCloseBtn"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              &times;
            </button>
          </div>
          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`mobile-nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {item.id === 'menu'
                    ? 'Our Menu'
                    : item.id === 'reservations'
                    ? 'Book a Table'
                    : item.id === 'events'
                    ? 'Events & Catering'
                    : item.id === 'location'
                    ? 'Location & Hours'
                    : item.label}
                </a>
              </li>
            ))}
            <li style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              <a
                href="#admin"
                className={`mobile-nav-link ${currentView === 'admin' ? 'active' : ''}`}
                onClick={(e) => handleNavClick('admin', e)}
                style={{ color: 'var(--color-warm-caramel)', fontWeight: '600' }}
              >
                <i className="fa-solid fa-shield-halved" style={{ marginRight: '8px' }}></i>
                Admin Portal 🔒
              </a>
            </li>
          </ul>
          <div className="mobile-drawer-footer">
            <a
              href="#reservations"
              className="btn btn-primary btn-block"
              onClick={(e) => handleNavClick('reservations', e)}
            >
              Reserve a Table
            </a>
            <div className="mobile-contact-snippet">
              <p>
                <strong>Opening Hours Today:</strong>{' '}
                <span id="mobileHoursText">{liveHours.mobileHours}</span>
              </p>
              <p>
                <strong>Call us:</strong>{' '}
                <a href="tel:+918041234567">+91 80 4123 4567</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`drawer-overlay ${mobileMenuOpen ? 'active' : ''}`}
        id="drawerOverlay"
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </header>
  );
}
