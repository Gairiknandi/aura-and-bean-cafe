import React, { useState, useEffect } from 'react';

const EMPTY_REVIEW = {
  name: '',
  role: 'Loyal Guest',
  rating: 5,
  quote: '',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop',
  is_featured: true
};

export default function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState(EMPTY_REVIEW);
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchReviews();
      setLoading(false);
    };
    load();
  }, []);

  const handleOpenCreate = () => {
    setEditingReview(null);
    setFormData(EMPTY_REVIEW);
    setModalOpen(true);
  };

  const handleOpenEdit = (review) => {
    setEditingReview(review);
    setFormData({ ...review });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      let res;
      if (editingReview) {
        res = await fetch(`/api/testimonials/${editingReview.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (res.ok) {
        setFeedback({
          type: 'success',
          message: editingReview ? 'Review updated successfully!' : 'Customer review added!'
        });
        setModalOpen(false);
        await fetchReviews();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', message: err.error || 'Failed to save review.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error saving review.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from ${name}?`)) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Review removed successfully.' });
        await fetchReviews();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to delete review.' });
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2 className="admin-panel-title">Customer Reviews & Testimonials</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Curate customer experiences, press quotes, and ratings displayed on the live website.
          </p>
        </div>
        <div className="admin-panel-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleOpenCreate}>
            <i className="fa-solid fa-plus"></i> Add Review
          </button>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={fetchReviews}>
            <i className="fa-solid fa-rotate"></i> Refresh
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
          <p>Loading customer reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--color-cream-bg)', borderRadius: 'var(--radius-sm)' }}>
          <i className="fa-regular fa-star" style={{ fontSize: '2.5rem', color: 'var(--color-warm-caramel)', marginBottom: '12px' }}></i>
          <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)' }}>No Reviews Yet</h3>
          <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Click "Add Review" to add your first customer testimonial.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {reviews.map(rev => (
            <div 
              key={rev.id} 
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={rev.avatar} 
                      alt={rev.name}
                      style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-warm-caramel)' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop'; }}
                    />
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--color-espresso)' }}>{rev.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rev.role}</div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--color-amber-gold)', fontSize: '0.9rem' }}>
                    {'★'.repeat(rev.rating || 5)}{'☆'.repeat(5 - (rev.rating || 5))}
                  </div>
                </div>
                <blockquote style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'var(--color-text-main)', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{rev.quote}"
                </blockquote>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.78rem', color: rev.is_featured ? 'var(--color-success)' : 'var(--color-text-light)', fontWeight: '600' }}>
                  {rev.is_featured ? '● Featured on Home' : '○ Standard Review'}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => handleOpenEdit(rev)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button 
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => handleDelete(rev.id, rev.name)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">
                  {editingReview ? `Edit Review: ${editingReview.name}` : 'Add New Customer Review'}
                </h3>
                <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Reviewer Name *</label>
                    <input 
                      type="text" 
                      required
                      className="admin-form-control"
                      placeholder="e.g. Dr. Arthur Harrison"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Role / Tagline</label>
                    <input 
                      type="text" 
                      className="admin-form-control"
                      placeholder="e.g. Local Food Critic & Regular"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Star Rating (1 - 5) *</label>
                    <select 
                      className="admin-form-control"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Avatar Image URL</label>
                    <input 
                      type="url" 
                      className="admin-form-control"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Review / Quote *</label>
                  <textarea 
                    rows={4} 
                    required
                    className="admin-form-control"
                    placeholder="Their feedback about the cafe experience, coffee quality, or ambiance..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.is_featured} 
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    Feature prominently in homepage testimonial carousel
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingReview ? 'Save Changes' : 'Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
