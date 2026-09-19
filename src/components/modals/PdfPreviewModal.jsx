import React from 'react';
import { MENU_ITEMS } from '../../data/menuData';

export default function PdfPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const categories = [
    { key: 'coffee', label: 'Specialty Coffees & Ceremonial Teas' },
    { key: 'breakfast', label: 'Breakfast & Sourdough Toasts' },
    { key: 'lunch', label: 'Savory Mains & Nourish Bowls' },
    { key: 'dessert', label: 'Artisanal Bakery & Patisserie' }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop active"
      id="pdfPreviewModal"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target.id === 'pdfPreviewModal') onClose();
      }}
    >
      <div className="modal-card pdf-modal">
        <button
          className="modal-close"
          id="closePdfModalBtn"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="pdf-modal-header">
          <span className="badge-pill">Printable Format</span>
          <h2>Aura & Bean Full Menu Preview</h2>
          <p>Ready to save as a PDF or print directly for takeout orders and office catering.</p>
        </div>

        <div className="pdf-modal-actions">
          <button className="btn btn-primary" id="triggerPrintAction" onClick={handlePrint}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print / Save as PDF</span>
          </button>
          <button className="btn btn-secondary" id="closePdfSecondaryBtn" onClick={onClose}>
            Close Preview
          </button>
        </div>

        <div className="printable-menu-sheet" id="printableMenuSheet">
          <div
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              borderBottom: '2px solid #21130D',
              paddingBottom: '16px'
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.2rem',
                margin: 0,
                color: '#21130D'
              }}
            >
              AURA & BEAN
            </h1>
            <p
              style={{
                fontSize: '0.85rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#C5853B',
                margin: '4px 0'
              }}
            >
              Artisanal Roastery & Scratch Kitchen
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              Plot 482, 12th Main Road, Indiranagar, Bengaluru • +91 80 4123 4567 • aurabeancafe.com
            </p>
          </div>

          {categories.map((cat) => {
            const items = MENU_ITEMS.filter((i) => i.category === cat.key);
            return (
              <div key={cat.key} style={{ marginBottom: '24px' }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem',
                    borderBottom: '1px solid #E8DFD3',
                    paddingBottom: '6px',
                    marginBottom: '12px',
                    color: '#21130D'
                  }}
                >
                  {cat.label}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ pageBreakInside: 'avoid' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#21130D'
                        }}
                      >
                        <span>{item.title}</span>
                        <span style={{ color: '#C5853B' }}>{item.price}</span>
                      </div>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#555',
                          marginTop: '2px',
                          lineHeight: 1.4
                        }}
                      >
                        {item.description}
                      </p>
                      <small style={{ fontSize: '0.7rem', color: '#2E7D32' }}>
                        {item.dietary.map((d) => d.toUpperCase()).join(' • ')}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div
            style={{
              textAlign: 'center',
              borderTop: '1px solid #E8DFD3',
              paddingTop: '14px',
              fontSize: '0.75rem',
              color: '#888'
            }}
          >
            All organic ingredients • Plant milks at no extra charge • Fair trade & carbon neutral
            operations
          </div>
        </div>
      </div>
    </div>
  );
}
