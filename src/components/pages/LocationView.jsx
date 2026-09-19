import React from 'react';
import { WEEKLY_SCHEDULE } from '../../data/hoursData';

export default function LocationView({ liveHours }) {
  return (
    <section className="page-view active" id="view-location">
      <div className="page-hero location-hero">
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <span className="hero-badge">Find Us in Indiranagar, Bengaluru</span>
          <h1>Visit Our Roastery & Cafe</h1>
          <p>
            Conveniently located with dedicated street parking, rapid transit access, and a sunny
            outdoor garden terrace.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="location-grid">
          {/* Left Column: Contact & Hours Info Cards */}
          <div className="location-info-col">
            {/* Dynamic Open/Closed Status Card */}
            <div className="status-card-big" id="statusCardBig">
              <div className="status-indicator-badge">
                <span className={`status-dot ${!liveHours.isOpen ? 'closed' : ''}`}></span>
                <span id="bigStatusTitle">{liveHours.bigStatusTitle}</span>
              </div>
              <h3 id="bigStatusHeadline">{liveHours.bigStatusHeadline}</h3>
              <p id="bigStatusDetail">{liveHours.bigStatusDetail}</p>
            </div>

            {/* Operating Hours Detailed Schedule */}
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🕒</span>
                <h3>Weekly Operating Hours</h3>
              </div>
              <div className="hours-schedule" id="weeklyHoursSchedule">
                {WEEKLY_SCHEDULE.map((item) => {
                  const isToday = item.dayIndex === liveHours.currentDay;
                  return (
                    <div
                      key={item.name}
                      className={`schedule-row ${isToday ? 'today' : ''}`}
                      data-day={item.dayIndex}
                    >
                      <span className="day-name">
                        {item.name}
                        {isToday ? ' (Today)' : ''}
                      </span>
                      <span className="day-hours">
                        {item.hours}{' '}
                        {item.lateNote && <small className="late-note">{item.lateNote}</small>}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="kitchen-note">
                <strong>Note:</strong> Full kitchen brunch menu available until 4:00 PM daily.
                Bakery, tapas, espresso, and craft drinks served until close.
              </p>
            </div>

            {/* Contact & Social Details */}
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">📞</span>
                <h3>Contact & Social Details</h3>
              </div>
              <ul className="contact-details-list">
                <li>
                  <div className="contact-icon">📍</div>
                  <div>
                    <strong>Physical Address</strong>
                    <p>
                      Plot 482, 12th Main Road, Indiranagar
                      <br />
                      Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">📞</div>
                  <div>
                    <strong>Telephone</strong>
                    <p>
                      <a href="tel:+918041234567" className="text-link">
                        +91 80 4123 4567
                      </a>{' '}
                      (Host Desk & Takeaway)
                    </p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">✉️</div>
                  <div>
                    <strong>Email Inquiries</strong>
                    <p>
                      <a href="mailto:hello@aurabeancafe.com" className="text-link">
                        hello@aurabeancafe.com
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">💬</div>
                  <div>
                    <strong>Follow Along</strong>
                    <div className="social-tags-row">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-pill"
                      >
                        Instagram @aurabeancafe
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-pill"
                      >
                        Facebook
                      </a>
                      <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-pill"
                      >
                        TikTok
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Parking & Accessibility Details */}
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🚗</span>
                <h3>Parking & Accessibility</h3>
              </div>
              <div className="accessibility-points">
                <div className="access-point">
                  <strong>🅿️ Free & Valet Parking:</strong>
                  <p>
                    Complimentary valet service with private 20-car secured lot behind the cafe
                    accessible via 12th Main Cross.
                  </p>
                </div>
                <div className="access-point">
                  <strong>♿ Wheelchair & Stroller Accessible:</strong>
                  <p>
                    Ground-floor step-free ramp entrance, wide dining aisles, tactile flooring, and
                    spacious ADA-compliant restrooms.
                  </p>
                </div>
                <div className="access-point">
                  <strong>🚇 Namma Metro & EV Charging:</strong>
                  <p>
                    3 min walk from Indiranagar Metro Station (Purple Line). 2 dedicated dual-port EV
                    fast charging bays installed on-site.
                  </p>
                </div>
                <div className="access-point">
                  <strong>🐕 Pet Friendly:</strong>
                  <p>
                    Well-behaved leashed dogs are warmly welcomed in our lush garden courtyard patio
                    (fresh pup-cups available!).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map & Directions */}
          <div className="location-map-col">
            <div className="map-card-container">
              <div className="map-header">
                <div>
                  <span className="map-badge">Interactive Map</span>
                  <h3>Bengaluru Flagship (Indiranagar)</h3>
                  <p>Plot 482, 12th Main Road, 100 Feet Road, Indiranagar, Bengaluru 560038</p>
                </div>
                <a
                  href="https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Open in Maps</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              {/* Responsive Map Embed */}
              <div className="map-embed-wrapper">
                <iframe
                  title="Aura & Bean Cafe Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985145899732!2d77.6385313!3d12.9727827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a79a838547%3A0x286377889e472658!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Transit / Landmarks Box */}
              <div className="map-footer-guide">
                <h4>Neighborhood Landmarks</h4>
                <div className="landmarks-grid">
                  <div className="landmark-item">
                    <span>🚇 Indiranagar Metro</span>
                    <small>3 min walk (250 m)</small>
                  </div>
                  <div className="landmark-item">
                    <span>🛍️ 100 Feet Road Hub</span>
                    <small>2 min walk (150 m)</small>
                  </div>
                  <div className="landmark-item">
                    <span>🌳 Defence Colony Park</span>
                    <small>5 min walk (400 m)</small>
                  </div>
                  <div className="landmark-item">
                    <span>☕ Roastery Boulevard</span>
                    <small>1 min walk (80 m)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
