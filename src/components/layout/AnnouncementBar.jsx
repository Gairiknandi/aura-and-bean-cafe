import React, { useState } from 'react';

export default function AnnouncementBar({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="announcement-bar" id="announcementBar">
      <div className="announcement-content">
        <span className="badge-pill">Now In Season</span>
        <span>Autumn Spiced Pecan Flat White & Caramel Fig Brioche are back!</span>
        <a
          href="#menu"
          className="announcement-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('menu');
          }}
        >
          Explore Seasonal Specials &rarr;
        </a>
      </div>
      <button
        className="announcement-close"
        id="closeAnnouncement"
        aria-label="Close Announcement"
        onClick={() => setIsOpen(false)}
      >
        &times;
      </button>
    </div>
  );
}
