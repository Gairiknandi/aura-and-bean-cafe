import React, { useState, useEffect } from 'react';
import BookingsManager from './BookingsManager';
import MenuManager from './MenuManager';
import ReviewsManager from './ReviewsManager';
import SettingsManager from './SettingsManager';

const DEFAULT_PASSCODE = 'admin123';

export default function AdminDashboard({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('aura_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'menu' | 'reviews' | 'settings'
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalMenu: 0,
    storeStatus: 'auto'
  });
  const [dbHealthy, setDbHealthy] = useState(true);

  // Check health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') setDbHealthy(true);
      })
      .catch(() => setDbHealthy(false));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_PASSCODE) {
      sessionStorage.setItem('aura_admin_auth', 'true');
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aura_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const updateStats = (newPartialStats) => {
    setStats(prev => ({ ...prev, ...newPartialStats }));
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-portal-wrapper">
        <div className="admin-lock-screen">
          <div className="admin-lock-card">
            <div className="admin-lock-icon">
              <i className="fa-solid fa-mug-hot"></i>
            </div>
            <h1 className="admin-lock-title">Manager Portal</h1>
            <p className="admin-lock-subtitle">
              Enter your staff passcode to access bookings, live menu editor, and store controls.
            </p>

            <form onSubmit={handleLogin} className="admin-lock-form">
              <div>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setPasscodeError(false); }}
                  placeholder="Enter Passcode..."
                  className="admin-lock-input"
                  autoFocus
                />
                {passcodeError && (
                  <p style={{ color: 'var(--color-danger)', fontSize: '0.82rem', margin: '8px 0 0' }}>
                    Invalid passcode. Try <strong>admin123</strong>.
                  </p>
                )}
              </div>
              <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '13px', width: '100%' }}>
                <i className="fa-solid fa-lock-open"></i> Unlock Dashboard
              </button>
            </form>

            <div className="admin-lock-hint">
              <i className="fa-solid fa-shield-halved" style={{ marginRight: '5px' }}></i>
              Default Passcode: <strong>admin123</strong>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => onNavigate && onNavigate('home')}
                style={{ background: 'none', border: 'none', color: 'var(--color-warm-caramel)', fontSize: '0.86rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                ← Back to Public Cafe Site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-wrapper">
      <div className="admin-container">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header-brand">
            <div className="admin-brand-icon">
              <i className="fa-solid fa-mug-saucer"></i>
            </div>
            <div>
              <h1 className="admin-header-title">Aura & Bean • Admin Management</h1>
              <p className="admin-header-subtitle">
                Live Database Management & Automated Dispatch System
              </p>
            </div>
          </div>

          <div className="admin-header-actions">
            <span className="admin-db-status" title="Connected to PostgreSQL database: aurabean_db">
              <span className="admin-db-status-dot"></span>
              {dbHealthy ? 'PostgreSQL (aurabean_db) Online' : 'Database Offline'}
            </span>
            <button 
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Public Site
            </button>
            <button 
              className="admin-btn admin-btn-danger admin-btn-sm"
              onClick={handleLogout}
              title="End admin session"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card" onClick={() => setActiveTab('bookings')} style={{ cursor: 'pointer' }}>
            <div className="admin-stat-icon-wrapper admin-stat-icon-caramel">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <div>
              <div className="admin-stat-label">Total Bookings</div>
              <div className="admin-stat-value">{stats.totalBookings}</div>
            </div>
          </div>

          <div className="admin-stat-card" onClick={() => setActiveTab('bookings')} style={{ cursor: 'pointer' }}>
            <div className={`admin-stat-icon-wrapper ${stats.pendingBookings > 0 ? 'admin-stat-icon-terracotta' : 'admin-stat-icon-success'}`}>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div>
              <div className="admin-stat-label">Pending Requests</div>
              <div className="admin-stat-value" style={{ color: stats.pendingBookings > 0 ? 'var(--color-terracotta)' : 'var(--color-success)' }}>
                {stats.pendingBookings}
              </div>
            </div>
          </div>

          <div className="admin-stat-card" onClick={() => setActiveTab('menu')} style={{ cursor: 'pointer' }}>
            <div className="admin-stat-icon-wrapper admin-stat-icon-roast">
              <i className="fa-solid fa-utensils"></i>
            </div>
            <div>
              <div className="admin-stat-label">Menu Items</div>
              <div className="admin-stat-value">{stats.totalMenu || 16}</div>
            </div>
          </div>

          <div className="admin-stat-card" onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer' }}>
            <div className="admin-stat-icon-wrapper admin-stat-icon-success">
              <i className="fa-solid fa-store"></i>
            </div>
            <div>
              <div className="admin-stat-label">Store Mode</div>
              <div className="admin-stat-value" style={{ fontSize: '1.25rem', textTransform: 'capitalize' }}>
                {stats.storeStatus.replace('_', ' ')}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="admin-tabs-nav">
          <button 
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fa-solid fa-calendar-check"></i>
            Bookings & Client Requests
            {stats.pendingBookings > 0 && (
              <span className="admin-tab-counter" style={{ background: 'var(--color-terracotta)', color: '#fff' }}>
                {stats.pendingBookings}
              </span>
            )}
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <i className="fa-solid fa-utensils"></i>
            Menu & Prices
            {stats.totalMenu > 0 && (
              <span className="admin-tab-counter">{stats.totalMenu}</span>
            )}
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <i className="fa-regular fa-star"></i>
            Customer Reviews
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fa-solid fa-sliders"></i>
            Store Status & Banner
          </button>
        </nav>

        {/* Tab Content Panels */}
        {activeTab === 'bookings' && (
          <BookingsManager onStatsUpdate={updateStats} />
        )}

        {activeTab === 'menu' && (
          <MenuManager onStatsUpdate={updateStats} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsManager />
        )}

        {activeTab === 'settings' && (
          <SettingsManager onStatusChange={(newStatus) => updateStats({ storeStatus: newStatus })} />
        )}
      </div>
    </div>
  );
}
