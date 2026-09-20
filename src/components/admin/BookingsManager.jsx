import React, { useState, useEffect } from 'react';

export default function BookingsManager({ onStatsUpdate }) {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('reservations'); // 'reservations' | 'events'
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'confirmed' | 'cancelled'
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
        if (onStatsUpdate) {
          const pendingCount = data.filter(b => b.status === 'pending').length;
          onStatsUpdate({ totalBookings: data.length, pendingBookings: pendingCount });
        }
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchBookings(), fetchEvents()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setActionLoading(id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok) {
        let msg = `Booking marked as ${status}.`;
        if (data.email_dispatched) {
          msg += ` Automated confirmation email dispatched to ${data.booking.email}!`;
        }
        setFeedback({
          type: 'success',
          message: msg,
          previewUrl: data.preview_url
        });
        await fetchBookings();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update status.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error updating booking status.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Booking removed successfully.' });
        await fetchBookings();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to delete booking.' });
    }
  };

  const handleUpdateEventStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/events/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Event inquiry updated to ${status}.` });
        await fetchEvents();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to update event status.' });
    }
  };

  // Filter and search bookings
  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'all' ? true : b.status === filter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      b.full_name?.toLowerCase().includes(term) ||
      b.email?.toLowerCase().includes(term) ||
      b.phone?.toLowerCase().includes(term) ||
      b.reference_number?.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2 className="admin-panel-title">Guest Reservations & Inquiries</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Review table reservations and event bookings stored in PostgreSQL. Accept to trigger client confirmation emails.
          </p>
        </div>
        <div className="admin-panel-actions">
          <button 
            className={`admin-btn ${activeSubTab === 'reservations' ? 'admin-btn-primary' : 'admin-btn-secondary'} admin-btn-sm`}
            onClick={() => setActiveSubTab('reservations')}
          >
            <i className="fa-solid fa-calendar-check"></i> Reservations ({bookings.length})
          </button>
          <button 
            className={`admin-btn ${activeSubTab === 'events' ? 'admin-btn-primary' : 'admin-btn-secondary'} admin-btn-sm`}
            onClick={() => setActiveSubTab('events')}
          >
            <i className="fa-solid fa-champagne-glasses"></i> Event Requests ({events.length})
          </button>
          <button 
            className="admin-btn admin-btn-secondary admin-btn-sm" 
            onClick={() => { fetchBookings(); fetchEvents(); }}
            title="Refresh database records"
          >
            <i className="fa-solid fa-rotate"></i> Refresh
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`admin-alert-toast ${feedback.type}`}>
          <div>
            <strong>{feedback.type === 'success' ? 'Success: ' : 'Notice: '}</strong>
            {feedback.message}
            {feedback.previewUrl && (
              <div style={{ marginTop: '6px' }}>
                <a 
                  href={feedback.previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontWeight: '700', textDecoration: 'underline', color: 'var(--color-espresso)' }}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Open Sent Email Preview (Ethereal)
                </a>
              </div>
            )}
          </div>
          <button 
            onClick={() => setFeedback(null)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'inherit' }}
          >
            ×
          </button>
        </div>
      )}

      {activeSubTab === 'reservations' ? (
        <>
          <div className="admin-filter-bar">
            <input 
              type="text"
              placeholder="Search by name, email, phone or ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            <div className="admin-filter-pills">
              {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                <button 
                  key={f}
                  className={`admin-filter-pill ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === 'pending' && (
                    <span style={{ marginLeft: '5px', opacity: 0.85 }}>
                      ({bookings.filter(b => b.status === 'pending').length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
              <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <p>Loading reservations from database...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--color-cream-bg)', borderRadius: 'var(--radius-sm)' }}>
              <i className="fa-regular fa-calendar-xmark" style={{ fontSize: '2.5rem', color: 'var(--color-warm-caramel)', marginBottom: '12px' }}></i>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)' }}>No Reservations Found</h3>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {searchTerm || filter !== 'all' ? 'Try adjusting your filters or search terms.' : 'No customer bookings currently logged.'}
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref #</th>
                    <th>Guest / Contact</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Seating & Notes</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <strong style={{ color: 'var(--color-warm-caramel)', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                          {b.reference_number || `#AB-${b.id}`}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                          {new Date(b.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '700', color: 'var(--color-espresso)' }}>{b.full_name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          <a href={`mailto:${b.email}`} style={{ color: 'inherit' }}>{b.email}</a>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)' }}>{b.phone}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>
                          <i className="fa-regular fa-calendar" style={{ marginRight: '5px', color: 'var(--color-warm-caramel)' }}></i>
                          {b.booking_date}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          <i className="fa-regular fa-clock" style={{ marginRight: '5px' }}></i>
                          {b.booking_time}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: '600' }}>
                          <i className="fa-solid fa-users" style={{ marginRight: '5px', color: 'var(--color-warm-caramel)' }}></i>
                          {b.guests} {b.guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </td>
                      <td style={{ maxWidth: '220px' }}>
                        <div style={{ fontSize: '0.84rem' }}>
                          <span style={{ fontWeight: '600' }}>Area:</span> {b.seating_preference || 'Standard'}
                        </div>
                        {b.occasion && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                            <span style={{ fontWeight: '600' }}>Occasion:</span> {b.occasion}
                          </div>
                        )}
                        {b.special_requests && (
                          <div style={{ 
                            fontSize: '0.78rem', 
                            color: 'var(--color-text-muted)', 
                            fontStyle: 'italic', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            maxWidth: '200px'
                          }}>
                            "{b.special_requests}"
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge-status badge-status-${b.status}`}>
                          {b.status === 'confirmed' && <i className="fa-solid fa-check" style={{ fontSize: '0.7rem' }}></i>}
                          {b.status === 'pending' && <i className="fa-solid fa-hourglass-half" style={{ fontSize: '0.7rem' }}></i>}
                          {b.status === 'cancelled' && <i className="fa-solid fa-xmark" style={{ fontSize: '0.7rem' }}></i>}
                          {b.status}
                        </span>
                        {b.email_sent && (
                          <div className="badge-email-sent" title="Email confirmation sent to client">
                            <i className="fa-solid fa-envelope-circle-check"></i> Email Sent
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          {b.status !== 'confirmed' && (
                            <button 
                              className="admin-btn admin-btn-success admin-btn-sm"
                              onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                              disabled={actionLoading === b.id}
                              title="Accept reservation and send confirmation email"
                            >
                              {actionLoading === b.id ? (
                                <i className="fa-solid fa-circle-notch fa-spin"></i>
                              ) : (
                                <>
                                  <i className="fa-solid fa-paper-plane"></i> Accept & Email
                                </>
                              )}
                            </button>
                          )}
                          {b.status === 'pending' && (
                            <button 
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                              title="Decline reservation"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          )}
                          <button 
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={() => handleDeleteBooking(b.id)}
                            title="Delete booking record"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        /* Event Inquiries Sub-view */
        <div>
          {events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--color-cream-bg)', borderRadius: 'var(--radius-sm)' }}>
              <i className="fa-solid fa-champagne-glasses" style={{ fontSize: '2.5rem', color: 'var(--color-warm-caramel)', marginBottom: '12px' }}></i>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)' }}>No Event Inquiries Yet</h3>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Private event, catering, and celebration inquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref #</th>
                    <th>Client Contact</th>
                    <th>Event Type</th>
                    <th>Date & Guests</th>
                    <th>Catering / Services</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id}>
                      <td>
                        <strong style={{ color: 'var(--color-warm-caramel)', fontFamily: 'monospace' }}>
                          {ev.reference_number || `#EV-${ev.id}`}
                        </strong>
                      </td>
                      <td>
                        <div style={{ fontWeight: '700' }}>{ev.full_name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{ev.email}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)' }}>{ev.phone}</div>
                      </td>
                      <td>
                        <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{ev.event_type}</span>
                        {ev.event_time && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{ev.event_time}</div>}
                      </td>
                      <td>
                        <div><i className="fa-regular fa-calendar" style={{ marginRight: '5px' }}></i>{ev.event_date}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          <i className="fa-solid fa-users" style={{ marginRight: '5px' }}></i>{ev.guests} Guests
                        </div>
                      </td>
                      <td style={{ maxWidth: '240px', fontSize: '0.84rem' }}>
                        <div><strong>Needs:</strong> {ev.catering_needed || 'Standard Package'}</div>
                        {ev.message && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: '4px' }}>
                            "{ev.message}"
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge-status badge-status-${ev.status}`}>
                          {ev.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          {ev.status !== 'confirmed' && (
                            <button 
                              className="admin-btn admin-btn-success admin-btn-sm"
                              onClick={() => handleUpdateEventStatus(ev.id, 'confirmed')}
                            >
                              <i className="fa-solid fa-check"></i> Confirm
                            </button>
                          )}
                          {ev.status !== 'contacted' && ev.status !== 'confirmed' && (
                            <button 
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              onClick={() => handleUpdateEventStatus(ev.id, 'contacted')}
                            >
                              Mark Contacted
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
