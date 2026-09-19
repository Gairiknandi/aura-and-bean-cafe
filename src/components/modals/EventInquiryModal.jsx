import React from 'react';

export default function EventInquiryModal({ isOpen, onClose, ticketCode }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop active"
      id="eventInquiryModal"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target.id === 'eventInquiryModal') onClose();
      }}
    >
      <div className="modal-card">
        <button
          className="modal-close"
          id="closeEventModalBtn"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="receipt-header">
          <div className="success-check-badge">✨</div>
          <span className="badge-pill">Inquiry Received</span>
          <h2>Thank You for Reaching Out!</h2>
          <p>Your private event inquiry has been routed directly to our Head Events Concierge.</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-code-box">
            <span className="code-label">Inquiry Ticket:</span>
            <span className="code-value" id="eventTicketCode">
              {ticketCode}
            </span>
          </div>
          <p className="receipt-notice">
            We have reserved a tentative calendar hold for your requested date. Elena Vance from our
            events department will contact you within <strong>24 business hours</strong> with custom
            catering recommendations, floor layouts, and an itemized contract.
          </p>
        </div>

        <div className="receipt-actions">
          <button className="btn btn-primary btn-block" id="eventDoneBtn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
