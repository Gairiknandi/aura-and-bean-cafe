import React, { useState } from 'react';

export default function AnnouncementBar({ onNavigate, customAnnouncement }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;
  if (customAnnouncement && customAnnouncement.enabled === false) return null;

  const messageText = customAnnouncement?.text || 'Autumn Spiced Pecan Flat White & Caramel Fig Brioche are back!';

  return (
    <div className="announcement-bar" id="announcementBar">
      <div className="announcement-content">
        <span className="badge-pill">Now In Season</span>
        <span>{messageText}</span>
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
