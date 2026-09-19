import React from 'react';

export default function ReservationReceiptModal({ isOpen, onClose, details, showToast }) {
  if (!isOpen || !details) return null;

  const handleDownloadCalendar = () => {
    const title = 'Table Reservation at Aura & Bean Cafe';
    const description = `Booking Code: ${details.bookingCode}\\nGuests: ${details.guests}\\nAtmosphere: ${details.seating}`;
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

    if (showToast) {
      showToast('Calendar invitation (.ics) downloaded!', 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop active"
      id="reservationModal"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target.id === 'reservationModal') onClose();
      }}
    >
      <div className="modal-card receipt-modal">
        <button
          className="modal-close"
          id="closeResModalBtn"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="receipt-header">
          <div className="success-check-badge">✓</div>
          <span className="badge-pill">Table Confirmed</span>
          <h2>You're All Set for a Wonderful Visit!</h2>
          <p>A confirmation email and SMS reminder have been dispatched.</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-code-box">
            <span className="code-label">Booking Reference:</span>
            <span className="code-value" id="receiptBookingCode">
              {details.bookingCode}
            </span>
          </div>

          <div className="receipt-details">
            <div className="r-row">
              <span>Guest Name:</span>
              <strong id="receiptName">{details.name}</strong>
            </div>
            <div className="r-row">
              <span>Date & Time:</span>
              <strong id="receiptDateTime">{details.dateTime}</strong>
            </div>
            <div className="r-row">
              <span>Party Size:</span>
              <strong id="receiptGuests">{details.guests}</strong>
            </div>
            <div className="r-row">
              <span>Atmosphere:</span>
              <strong id="receiptArea">{details.seating}</strong>
            </div>
            <div className="r-row">
              <span>Occasion:</span>
              <strong id="receiptOccasion">{details.occasion}</strong>
            </div>
          </div>

          <div className="receipt-notice">
            <p>
              <strong>Table Policy:</strong> Your table is held for 15 minutes past your scheduled
              reservation. If you are delayed, simply tap to call host desk:{' '}
              <a href="tel:+918041234567">+91 80 4123 4567</a>.
            </p>
          </div>
        </div>

        <div className="receipt-actions">
          <button
            className="btn btn-primary btn-block"
            id="downloadCalendarBtn"
            onClick={handleDownloadCalendar}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Add to Calendar (.ics)</span>
          </button>
          <button className="btn btn-secondary btn-block" id="printReceiptBtn" onClick={handlePrint}>
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
