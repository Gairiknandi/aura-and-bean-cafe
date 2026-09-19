import React, { useState } from 'react';
import { getTodayDateString, getTomorrowDateString } from '../../data/hoursData';

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

export default function ReservationsView({ onNavigate, onReservationConfirmed, showToast }) {
  const [guests, setGuests] = useState(2);
  const [bookingDate, setBookingDate] = useState(getTomorrowDateString());
  const [seatingArea, setSeatingArea] = useState('Main Roastery Hall');
  const [mealPeriod, setMealPeriod] = useState('morning');
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [bookingOccasion, setBookingOccasion] = useState('Casual Gathering');
  const [specialRequests, setSpecialRequests] = useState('');

  // Form error states
  const [errors, setErrors] = useState({});

  const partyOptions = [1, 2, 4, 6, 8];

  const handleDateChange = (val) => {
    setBookingDate(val);
  };

  const formatSummaryDate = (dateStr) => {
    if (!dateStr) return 'Tomorrow';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
    return dateStr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const nameTrimmed = guestName.trim();
    const phoneTrimmed = guestPhone.trim();
    const emailTrimmed = guestEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameTrimmed) {
      newErrors.name = 'Please provide your full name.';
    }
    if (!phoneTrimmed || phoneTrimmed.length < 7) {
      newErrors.phone = 'Please provide a valid contact phone.';
    }
    if (!emailTrimmed || !emailPattern.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!bookingDate) {
      newErrors.date = 'Please pick a booking date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please check the highlighted required fields.', 'warn');
      return;
    }

    setErrors({});

    const refCode = '#AB-' + Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = formatSummaryDate(bookingDate);

    onReservationConfirmed({
      bookingCode: refCode,
      name: nameTrimmed,
      dateTime: `${dateFormatted} • ${selectedTime}`,
      guests: `${guests} ${guests === 1 ? 'Guest' : 'Guests'}`,
      seating: seatingArea,
      occasion: bookingOccasion
    });

    showToast(`Reservation ${refCode} confirmed! We've sent confirmation to your email.`, 'success');

    // Reset form fields
    setGuests(2);
    setBookingDate(getTomorrowDateString());
    setSelectedTime('09:30 AM');
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setBookingOccasion('Casual Gathering');
    setSpecialRequests('');
  };

  return (
    <section className="page-view active" id="view-reservations">
      <div className="page-hero reservation-hero">
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <span className="hero-badge">Seamless Dining Experience</span>
          <h1>Reserve Your Table</h1>
          <p>
            Whether it’s a tranquil morning pour-over, a lively weekend brunch, or an intimate
            dinner, we are delighted to host you.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="reservation-layout">
          {/* Booking Form Card */}
          <div className="reservation-form-card">
            <div className="card-header">
              <span className="section-eyebrow">Instant Confirmation</span>
              <h2>Table Reservation Details</h2>
              <p className="form-hint">
                Reservations are held for 15 minutes. For parties larger than 10, please view our{' '}
                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('events');
                  }}
                >
                  Private Events
                </a>{' '}
                packages.
              </p>
            </div>

            <form id="reservationForm" onSubmit={handleSubmit} noValidate>
              {/* Step 1: Party Size */}
              <div className="form-group-block">
                <label className="block-label">
                  1. Party Size <span className="required-star">*</span>
                </label>
                <div className="party-size-selector">
                  {partyOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`party-btn ${guests === opt ? 'active' : ''}`}
                      data-guests={opt}
                      onClick={() => setGuests(opt)}
                    >
                      {opt === 1 ? '1 Person' : `${opt} Guests`}
                    </button>
                  ))}
                  <div className="party-custom-counter">
                    <button
                      type="button"
                      className="counter-btn"
                      id="counterMinus"
                      aria-label="Decrease guests"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    >
                      -
                    </button>
                    <span className="counter-value" id="counterDisplay">
                      {guests}
                    </span>
                    <button
                      type="button"
                      className="counter-btn"
                      id="counterPlus"
                      aria-label="Increase guests"
                      onClick={() => setGuests((g) => Math.min(12, g + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <input type="hidden" name="partySize" id="partySizeInput" value={guests} />
              </div>

              {/* Step 2: Date & Seating Area */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="bookingDate">
                    2. Select Date <span className="required-star">*</span>
                  </label>
                  <input
                    type="date"
                    id="bookingDate"
                    name="bookingDate"
                    required
                    className={`form-input ${errors.date ? 'error' : ''}`}
                    min={getTodayDateString()}
                    value={bookingDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                  {errors.date && (
                    <small className="field-error" id="dateError">
                      {errors.date}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="seatingArea">
                    3. Seating Atmosphere <span className="required-star">*</span>
                  </label>
                  <select
                    id="seatingArea"
                    name="seatingArea"
                    className="form-input"
                    required
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                  >
                    <option value="Main Roastery Hall">Main Roastery Hall (Lively & Aromatic)</option>
                    <option value="Garden Terrace Patio">Garden Terrace Patio (Open-Air & Sunlit)</option>
                    <option value="Cozy Hearthside Booth">Cozy Hearthside Booth (Intimate & Quiet)</option>
                    <option value="Barista Window Counter">Barista Window Counter (High-tops, Street View)</option>
                  </select>
                </div>
              </div>

              {/* Step 3: Interactive Real-Time Time Slots */}
              <div className="form-group-block">
                <div className="slot-header-flex">
                  <label className="block-label">
                    4. Select Preferred Time Slot <span className="required-star">*</span>
                  </label>
                  <span className="slot-live-indicator">
                    <span className="dot-pulse"></span> Live Available Slots
                  </span>
                </div>

                <div className="slot-meal-tabs">
                  <button
                    type="button"
                    className={`meal-tab ${mealPeriod === 'morning' ? 'active' : ''}`}
                    data-period="morning"
                    onClick={() => setMealPeriod('morning')}
                  >
                    Morning & Brunch (8am - 12pm)
                  </button>
                  <button
                    type="button"
                    className={`meal-tab ${mealPeriod === 'afternoon' ? 'active' : ''}`}
                    data-period="afternoon"
                    onClick={() => setMealPeriod('afternoon')}
                  >
                    Afternoon (12pm - 4:30pm)
                  </button>
                  <button
                    type="button"
                    className={`meal-tab ${mealPeriod === 'evening' ? 'active' : ''}`}
                    data-period="evening"
                    onClick={() => setMealPeriod('evening')}
                  >
                    Evening & Dinner (5pm - 8:30pm)
                  </button>
                </div>

                <div className="time-slots-grid" id="timeSlotsGrid">
                  {TIME_SLOTS_DATA[mealPeriod].map((s) => {
                    const isSelected = s.time === selectedTime;
                    return (
                      <button
                        key={s.time}
                        type="button"
                        className={`time-slot-chip ${isSelected ? 'active' : ''}`}
                        data-time={s.time}
                        onClick={() => setSelectedTime(s.time)}
                      >
                        <span className="slot-time">{s.time}</span>
                        <span className="slot-status-text">{s.status}</span>
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  name="selectedTime"
                  id="selectedTimeInput"
                  value={selectedTime}
                />
              </div>

              {/* Step 4: Contact & Guest Details */}
              <div className="form-group-block">
                <label className="block-label">5. Guest Contact & Preferences</label>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="guestName">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="guestName"
                      name="guestName"
                      placeholder="e.g., Eleanor Vance"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                    {errors.name && (
                      <small className="field-error" id="nameError">
                        {errors.name}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="guestPhone">
                      Phone Number <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="guestPhone"
                      name="guestPhone"
                      placeholder="e.g., +91 98450 12345"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <small className="field-error" id="phoneError">
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="guestEmail">
                      Email Address (for Confirmation & Reminders) <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="guestEmail"
                      name="guestEmail"
                      placeholder="e.g., eleanor@example.com"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                    />
                    {errors.email && (
                      <small className="field-error" id="emailError">
                        {errors.email}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="bookingOccasion">Occasion (Optional)</label>
                    <select
                      id="bookingOccasion"
                      name="bookingOccasion"
                      className="form-input"
                      value={bookingOccasion}
                      onChange={(e) => setBookingOccasion(e.target.value)}
                    >
                      <option value="Casual Gathering">Casual Gathering / Meetup</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Anniversary / Date">Anniversary / Date</option>
                      <option value="Business Coffee / Meeting">Business Coffee / Meeting</option>
                      <option value="Family Brunch">Family Brunch</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">
                    Special Requests & Dietary Accommodations
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows="3"
                    className="form-input"
                    placeholder="Let us know if you need high chairs, have severe allergies, or prefer a quiet corner..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                id="submitBookingBtn"
              >
                <span>Confirm Reservation</span>
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

          {/* Live Summary Sidebar */}
          <div className="reservation-summary-card">
            <div className="summary-header">
              <span className="badge-pill">Summary</span>
              <h3>Your Booking Snapshot</h3>
            </div>

            <div className="summary-details-list">
              <div className="summary-detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-val">Aura & Bean Cafe, Bengaluru</span>
              </div>
              <div className="summary-detail-row">
                <span className="detail-label">Guests:</span>
                <span className="detail-val" id="summaryGuests">
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div className="summary-detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-val" id="summaryDate">
                  {formatSummaryDate(bookingDate)}
                </span>
              </div>
              <div className="summary-detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-val" id="summaryTime">
                  {selectedTime}
                </span>
              </div>
              <div className="summary-detail-row">
                <span className="detail-label">Atmosphere:</span>
                <span className="detail-val" id="summaryArea">
                  {seatingArea}
                </span>
              </div>
            </div>

            <div className="summary-policy-box">
              <div className="policy-icon">✨</div>
              <div>
                <strong>Complimentary Welcome:</strong>
                <p>Enjoy a signature seasonal cold-drip tasting shot on arrival for your table.</p>
              </div>
            </div>

            <div className="summary-assistance">
              <p>Need urgent changes or running late?</p>
              <a href="tel:+918041234567" className="phone-link">
                Call Host Desk: +91 80 4123 4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
