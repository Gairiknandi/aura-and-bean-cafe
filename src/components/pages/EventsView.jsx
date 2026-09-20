import React, { useState, useRef } from 'react';
import {
  CORPORATE_PACKAGES,
  BIRTHDAY_PACKAGES,
  EVENT_ADDONS,
  PAST_EVENTS_GALLERY
} from '../../data/eventsData';
import { getTodayDateString } from '../../data/hoursData';

export default function EventsView({ onInquirySubmitted, showToast }) {
  const [activeTab, setActiveTab] = useState('corporate'); // 'corporate' | 'birthdays'
  const [selectedPackage, setSelectedPackage] = useState({
    title: 'All-Day Innovation Retreat',
    price: 55000
  });
  const [selectedAddons, setSelectedAddons] = useState(new Set());

  // Inquiry form states
  const [eventType, setEventType] = useState('Corporate Meeting / Workshop');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState(25);
  const [eventBudget, setEventBudget] = useState('₹40,000 - ₹75,000');
  const [hostName, setHostName] = useState('');
  const [hostCompany, setHostCompany] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [eventNotes, setEventNotes] = useState('');

  const [formErrors, setFormErrors] = useState({});
  const inquirySectionRef = useRef(null);

  const handleSelectPackage = (pkgTitle, pkgPrice) => {
    setSelectedPackage({ title: pkgTitle, price: pkgPrice });
    if (inquirySectionRef.current) {
      inquirySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Selected "${pkgTitle}". Customize add-ons below!`, 'info');
  };

  const toggleAddon = (addonName) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(addonName)) {
        next.delete(addonName);
      } else {
        next.add(addonName);
      }
      return next;
    });
  };

  // Calculate live total
  const calculatedTotal = (() => {
    let total = selectedPackage.price;
    EVENT_ADDONS.forEach((addon) => {
      if (selectedAddons.has(addon.name)) {
        total += addon.price;
      }
    });
    return total;
  })();

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();

    const errors = {};
    const dateTrimmed = eventDate.trim();
    const nameTrimmed = hostName.trim();
    const emailTrimmed = hostEmail.trim();
    const phoneTrimmed = hostPhone.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!dateTrimmed) {
      errors.date = 'Please select an event target date.';
    }
    if (!nameTrimmed) {
      errors.name = 'Please enter host name.';
    }
    if (!emailTrimmed || !emailPattern.test(emailTrimmed)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!phoneTrimmed || phoneTrimmed.length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fill out the highlighted required fields.', 'warn');
      return;
    }

    setFormErrors({});

    let ticketId = '#EVT-' + Math.floor(1000 + Math.random() * 9000);

    try {
      const addonsList = Array.from(selectedAddons).join(', ');
      const cateringDetails = `${selectedPackage.title}${addonsList ? ' + Addons: ' + addonsList : ''}`;
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: nameTrimmed,
          email: emailTrimmed,
          phone: phoneTrimmed,
          event_type: activeTab,
          event_date: dateTrimmed,
          event_time: 'Evening',
          guests: guestCount,
          catering_needed: cateringDetails,
          budget: `$${calculatedTotal}`,
          message: `${hostCompany ? '[Company: ' + hostCompany + '] ' : ''}${eventNotes}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.event?.reference_number) {
          ticketId = data.event.reference_number;
        }
      }
    } catch (err) {
      console.warn('Events API offline, proceeding with local inquiry ID:', err);
    }

    onInquirySubmitted(ticketId);

    showToast(`Inquiry ${ticketId} dispatched to our Private Events Concierge!`, 'success');

    // Reset form
    setEventDate('');
    setHostName('');
    setHostCompany('');
    setHostEmail('');
    setHostPhone('');
    setEventNotes('');
  };

  return (
    <section className="page-view active" id="view-events">
      <div className="page-hero events-hero">
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <span className="hero-badge">Private Celebrations & Gatherings</span>
          <h1>Host Your Unforgettable Event</h1>
          <p>
            From polished executive breakfast symposiums to whimsical candlelit birthday
            celebrations, our warm botanical interior and bespoke catering make every occasion
            extraordinary.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Event Type Switcher Tabs */}
        <div className="events-category-toggle" role="tablist">
          <button
            className={`event-toggle-btn ${activeTab === 'corporate' ? 'active' : ''}`}
            id="tabCorporate"
            role="tab"
            aria-selected={activeTab === 'corporate'}
            onClick={() => setActiveTab('corporate')}
          >
            <span className="event-btn-icon">💼</span> Corporate Events & Mixers
          </button>
          <button
            className={`event-toggle-btn ${activeTab === 'birthdays' ? 'active' : ''}`}
            id="tabBirthdays"
            role="tab"
            aria-selected={activeTab === 'birthdays'}
            onClick={() => setActiveTab('birthdays')}
          >
            <span className="event-btn-icon">🎂</span> Birthday & Private Celebrations
          </button>
        </div>

        {/* Corporate Events Content Panel */}
        {activeTab === 'corporate' && (
          <div className="event-panel active" id="panelCorporate">
            <div className="event-panel-intro">
              <div className="intro-text">
                <h2>Inspiring Corporate Meetings & Team Gatherings</h2>
                <p>
                  Break away from sterile conference rooms. Our sun-drenched industrial-chic space
                  offers dedicated 1 Gbps fiber Wi-Fi, 4K wireless laser projector, wireless
                  microphones, and artisanal coffee service throughout your event.
                </p>
              </div>
              <div className="intro-stats">
                <div className="badge-item">Up to 80 Standing / 50 Seated</div>
                <div className="badge-item">Full AV Equipment & Sound</div>
                <div className="badge-item">Barista Station Included</div>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="packages-grid">
              {CORPORATE_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`package-card ${pkg.isFeatured ? 'featured-package' : ''}`}
                  data-package={pkg.pkgTitle}
                >
                  {pkg.popularBadge && <div className="popular-ribbon">{pkg.popularBadge}</div>}
                  <div className="package-header">
                    <span className="package-tier">{pkg.tier}</span>
                    <h3>{pkg.title}</h3>
                    <div className="package-price">
                      {pkg.priceFormatted} <span className="price-period">{pkg.period}</span>
                    </div>
                    <p className="package-cap">{pkg.capacity}</p>
                  </div>
                  <ul className="package-features">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx}>✓ {feat}</li>
                    ))}
                  </ul>
                  <button
                    className={`btn ${pkg.isFeatured ? 'btn-primary' : 'btn-outline'} package-select-btn`}
                    onClick={() => handleSelectPackage(pkg.pkgTitle, pkg.price)}
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Birthday & Private Events Content Panel */}
        {activeTab === 'birthdays' && (
          <div className="event-panel active" id="panelBirthdays">
            <div className="event-panel-intro">
              <div className="intro-text">
                <h2>Joyful Birthdays, Milestones & Showers</h2>
                <p>
                  Celebrate your special moments in our whimsical, plant-filled sanctuary. We take
                  care of every delightful detail—from tiered custom cakes to handcrafted floral
                  arrangements and bespoke tea service.
                </p>
              </div>
              <div className="intro-stats">
                <div className="badge-item">Parties from 10 to 60 Guests</div>
                <div className="badge-item">Custom In-House Patisserie</div>
                <div className="badge-item">Indoor & Heated Patio Spaces</div>
              </div>
            </div>

            {/* Birthday Packages Grid */}
            <div className="packages-grid">
              {BIRTHDAY_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`package-card ${pkg.isFeatured ? 'featured-package' : ''}`}
                  data-package={pkg.pkgTitle}
                >
                  {pkg.popularBadge && <div className="popular-ribbon">{pkg.popularBadge}</div>}
                  <div className="package-header">
                    <span className="package-tier">{pkg.tier}</span>
                    <h3>{pkg.title}</h3>
                    <div className="package-price">
                      {pkg.priceFormatted} <span className="price-period">{pkg.period}</span>
                    </div>
                    <p className="package-cap">{pkg.capacity}</p>
                  </div>
                  <ul className="package-features">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx}>✓ {feat}</li>
                    ))}
                  </ul>
                  <button
                    className={`btn ${pkg.isFeatured ? 'btn-primary' : 'btn-outline'} package-select-btn`}
                    onClick={() => handleSelectPackage(pkg.pkgTitle, pkg.price)}
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-on Extras Checklist */}
        <div className="addons-section">
          <div className="section-header text-center">
            <span className="section-eyebrow">Custom Enhancements</span>
            <h3 className="section-title">Popular Event Add-Ons</h3>
            <p className="section-subtitle">
              Enhance your gathering with interactive experiences and artisanal upgrades.
            </p>
          </div>

          <div className="addons-grid">
            {EVENT_ADDONS.map((addon) => {
              const isChecked = selectedAddons.has(addon.name);
              return (
                <label key={addon.id} className="addon-card">
                  <input
                    type="checkbox"
                    className="addon-checkbox"
                    checked={isChecked}
                    onChange={() => toggleAddon(addon.name)}
                  />
                  <div className="addon-content">
                    <div className="addon-title-row">
                      <h4>{addon.title}</h4>
                      <span className="addon-price">{addon.priceFormatted}</span>
                    </div>
                    <p>{addon.description}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Event Booking & Custom Inquiry Form */}
        <div className="event-inquiry-box" id="eventInquirySection" ref={inquirySectionRef}>
          <div className="inquiry-header text-center">
            <span className="section-eyebrow">Get a Custom Quote</span>
            <h2>Book Your Event or Inquire</h2>
            <p>
              Tell us about your date, vision, and guest count. Our private events concierge will
              reply within 24 hours.
            </p>
          </div>

          <form id="eventInquiryForm" className="event-inquiry-form" onSubmit={handleSubmitInquiry} noValidate>
            {/* Real-time quote preview banner */}
            <div className="quote-preview-banner">
              <div className="quote-text">
                <span className="quote-label">Estimated Package Investment:</span>
                <span className="quote-total" id="eventQuoteDisplay">
                  ₹{calculatedTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="quote-pkg-selected" id="eventSelectedPkgDisplay">
                Package: {selectedPackage.title}
                {selectedAddons.size > 0 ? ` (+${selectedAddons.size} Add-ons)` : ''}
              </span>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="eventTypeSelect">
                  Event Type <span className="required-star">*</span>
                </label>
                <select
                  id="eventTypeSelect"
                  name="eventType"
                  className="form-input"
                  required
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="Corporate Meeting / Workshop">
                    Corporate Meeting / Workshop
                  </option>
                  <option value="Team Mixer / Happy Hour">Team Mixer / Happy Hour</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Bridal / Baby Shower">Bridal / Baby Shower</option>
                  <option value="Private Dinner / Buyout">Private Dinner / Full Buyout</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="eventDateInput">
                  Target Date <span className="required-star">*</span>
                </label>
                <input
                  type="date"
                  id="eventDateInput"
                  name="eventDate"
                  className={`form-input ${formErrors.date ? 'error' : ''}`}
                  required
                  min={getTodayDateString()}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
                {formErrors.date && (
                  <small className="field-error" id="eventDateError">
                    {formErrors.date}
                  </small>
                )}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="eventGuestCount">
                  Expected Guest Count <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  id="eventGuestCount"
                  name="guestCount"
                  min="10"
                  max="100"
                  className="form-input"
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventBudget">Estimated Budget Range</label>
                <select
                  id="eventBudget"
                  name="eventBudget"
                  className="form-input"
                  value={eventBudget}
                  onChange={(e) => setEventBudget(e.target.value)}
                >
                  <option value="₹20,000 - ₹40,000">₹20,000 – ₹40,000</option>
                  <option value="₹40,000 - ₹75,000">₹40,000 – ₹75,000</option>
                  <option value="₹75,000 - ₹1,50,000">₹75,000 – ₹1,50,000</option>
                  <option value="₹1,50,000+">₹1,50,000+</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="eventHostName">
                  Host / Organizer Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="eventHostName"
                  name="hostName"
                  placeholder="e.g., Marcus Vance"
                  className={`form-input ${formErrors.name ? 'error' : ''}`}
                  required
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                />
                {formErrors.name && (
                  <small className="field-error" id="eventHostNameError">
                    {formErrors.name}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="eventHostCompany">Company / Organization (If applicable)</label>
                <input
                  type="text"
                  id="eventHostCompany"
                  name="hostCompany"
                  placeholder="e.g., Vance Design Studio"
                  className="form-input"
                  value={hostCompany}
                  onChange={(e) => setHostCompany(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="eventHostEmail">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  id="eventHostEmail"
                  name="hostEmail"
                  placeholder="e.g., marcus@vancedesign.com"
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  required
                  value={hostEmail}
                  onChange={(e) => setHostEmail(e.target.value)}
                />
                {formErrors.email && (
                  <small className="field-error" id="eventEmailError">
                    {formErrors.email}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="eventHostPhone">
                  Contact Phone <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="eventHostPhone"
                  name="hostPhone"
                  placeholder="e.g., +91 98450 12345"
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  required
                  value={hostPhone}
                  onChange={(e) => setHostPhone(e.target.value)}
                />
                {formErrors.phone && (
                  <small className="field-error" id="eventPhoneError">
                    {formErrors.phone}
                  </small>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="eventNotes">Event Vision, Timing & Specific Requirements</label>
              <textarea
                id="eventNotes"
                name="eventNotes"
                rows="4"
                className="form-input"
                placeholder="Tell us about special dietary requests, presentation audiovisual requirements, decoration setup, or preferred timeline..."
                value={eventNotes}
                onChange={(e) => setEventNotes(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              id="submitEventBtn"
            >
              <span>Submit Event Inquiry & Reserve Hold</span>
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
            </button>
          </form>
        </div>

        {/* Past Events Gallery */}
        <div className="past-events-gallery section-padding">
          <div className="section-header text-center">
            <span className="section-eyebrow">Atmosphere Gallery</span>
            <h3 className="section-title">Moments Captured at Aura & Bean</h3>
            <p className="section-subtitle">
              Take a glimpse inside recent gatherings, workshops, and celebrations in our spaces.
            </p>
          </div>

          <div className="gallery-grid">
            {PAST_EVENTS_GALLERY.map((item, idx) => (
              <div key={idx} className="gallery-item">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-cat">{item.category}</span>
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
