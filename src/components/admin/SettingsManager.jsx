import React, { useState, useEffect } from 'react';

export default function SettingsManager({ onStatusChange }) {
  const [storeStatus, setStoreStatus] = useState('auto');
  const [announcement, setAnnouncement] = useState('');
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.store_status) {
          setStoreStatus(data.store_status.value || 'auto');
        }
        if (data.announcement_banner) {
          try {
            const parsed = JSON.parse(data.announcement_banner.value);
            setAnnouncement(parsed.text || '');
            setShowAnnouncement(parsed.enabled !== false);
          } catch (e) {
            setAnnouncement(data.announcement_banner.value);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSettings();
      setLoading(false);
    };
    load();
  }, []);

  const handleUpdateStatus = async (newStatus) => {
    setStoreStatus(newStatus);
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/settings/store_status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: newStatus })
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Store status updated to "${newStatus.replace('_', ' ').toUpperCase()}".` });
        if (onStatusChange) onStatusChange(newStatus);
      } else {
        setFeedback({ type: 'error', message: 'Failed to update store status.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error updating store status.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/settings/announcement', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: JSON.stringify({
            text: announcement,
            enabled: showAnnouncement
          })
        })
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Announcement banner updated successfully!' });
      } else {
        setFeedback({ type: 'error', message: 'Failed to update announcement banner.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error updating announcement.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2 className="admin-panel-title">Store Operations & Live Controls</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Control live open/closed indicators, emergency closures, and website announcement alerts.
          </p>
        </div>
        <div className="admin-panel-actions">
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={fetchSettings}>
            <i className="fa-solid fa-rotate"></i> Refresh Settings
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`admin-alert-toast ${feedback.type}`}>
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>×</button>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
          <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
          <p>Loading operational settings...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {/* Store Mode Selector */}
          <div className="store-status-card">
            <h3 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--color-espresso)' }}>
              <i className="fa-solid fa-door-open" style={{ marginRight: '8px', color: 'var(--color-warm-caramel)' }}></i>
              Store Open / Closed Override
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Controls the live "Open Now" or "Closed" badge shown to guests on the website header and reservation view.
            </p>

            <div className="store-status-options">
              <div 
                className={`store-status-option ${storeStatus === 'auto' ? 'selected' : ''}`}
                onClick={() => handleUpdateStatus('auto')}
              >
                <div className="store-status-option-title" style={{ color: 'var(--color-espresso)' }}>
                  <i className="fa-regular fa-clock"></i> Automatic
                </div>
                <div className="store-status-option-desc">
                  Based on normal business hours (7:00 AM – 8:00 PM)
                </div>
              </div>

              <div 
                className={`store-status-option ${storeStatus === 'force_open' ? 'selected' : ''}`}
                onClick={() => handleUpdateStatus('force_open')}
              >
                <div className="store-status-option-title" style={{ color: 'var(--color-success)' }}>
                  <i className="fa-solid fa-circle-check"></i> Force Open
                </div>
                <div className="store-status-option-desc">
                  Show "Open Now" even outside standard operating hours
                </div>
              </div>

              <div 
                className={`store-status-option ${storeStatus === 'force_closed' ? 'selected' : ''}`}
                onClick={() => handleUpdateStatus('force_closed')}
              >
                <div className="store-status-option-title" style={{ color: 'var(--color-danger)' }}>
                  <i className="fa-solid fa-ban"></i> Force Closed
                </div>
                <div className="store-status-option-desc">
                  Mark as closed (e.g. private holiday, renovation, maintenance)
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 16px', background: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-espresso)', marginBottom: '4px' }}>
                Current Active Status:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <span className={`badge-status ${storeStatus === 'force_closed' ? 'badge-status-cancelled' : 'badge-status-confirmed'}`}>
                  {storeStatus === 'auto' ? 'Automatic (Schedule-based)' : storeStatus === 'force_open' ? 'Manually Forced OPEN' : 'Manually Forced CLOSED'}
                </span>
              </div>
            </div>
          </div>

          {/* Announcement Banner Editor */}
          <div className="store-status-card">
            <h3 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--color-espresso)' }}>
              <i className="fa-solid fa-bullhorn" style={{ marginRight: '8px', color: 'var(--color-warm-caramel)' }}></i>
              Top Announcement Banner
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Display seasonal specials, holiday alerts, or live messages across all pages of the website.
            </p>

            <form onSubmit={handleSaveAnnouncement}>
              <div className="admin-form-group">
                <label className="admin-form-label">Banner Message</label>
                <textarea 
                  rows={3} 
                  className="admin-form-control"
                  placeholder="e.g. Autumn Blend Tasting & Special Roast release this Saturday • Walk-ins welcome!"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={showAnnouncement}
                    onChange={(e) => setShowAnnouncement(e.target.checked)}
                  />
                  Enable announcement banner at top of site
                </label>
              </div>

              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Updating...' : 'Save Banner Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Operating Hours Reference Table */}
      <div style={{ marginTop: '24px', background: '#FAF6EE', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
        <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-serif)', color: 'var(--color-espresso)' }}>
          <i className="fa-solid fa-calendar-days" style={{ marginRight: '8px', color: 'var(--color-warm-caramel)' }}></i>
          Configured Standard Weekly Hours
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.85rem' }}>
          <div><strong>Monday – Friday:</strong> 7:00 AM – 8:00 PM</div>
          <div><strong>Saturday:</strong> 7:30 AM – 9:00 PM</div>
          <div><strong>Sunday:</strong> 8:00 AM – 7:00 PM</div>
          <div><strong>Kitchen Closes:</strong> 45 min before closing</div>
        </div>
      </div>
    </div>
  );
}
