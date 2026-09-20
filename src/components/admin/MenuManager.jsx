import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Coffee & Espresso',
  'Artisanal Teas & Infusions',
  'Bakery & Pastries',
  'Savory & Brunch',
  'Desserts & Sweets'
];

const EMPTY_ITEM = {
  name: '',
  category: 'Coffee & Espresso',
  price: '',
  description: '',
  image: '',
  badge: '',
  calories: '',
  volume: '',
  allergens: '',
  is_vegan: false,
  is_gf: false,
  is_dairy_free: false,
  is_organic: false,
  is_available: true
};

export default function MenuManager({ onStatsUpdate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null means creating new
  const [formData, setFormData] = useState(EMPTY_ITEM);
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
        if (onStatsUpdate) {
          onStatsUpdate({ totalMenu: data.length });
        }
      }
    } catch (err) {
      console.error('Failed to fetch menu items:', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchItems();
      setLoading(false);
    };
    load();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(EMPTY_ITEM);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    const numericVal = item.numericPrice !== undefined 
      ? item.numericPrice 
      : String(item.price).replace(/[^0-9]/g, '') || '0';

    setFormData({
      ...item,
      price: numericVal.toString()
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const num = parseInt(formData.price, 10) || 0;
    const payload = {
      ...formData,
      price: `₹${num}`,
      numericPrice: num,
      numeric_price: num
    };

    try {
      let res;
      if (editingItem) {
        res = await fetch(`/api/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setFeedback({
          type: 'success',
          message: editingItem ? 'Item updated successfully!' : 'New menu item added!'
        });
        setModalOpen(false);
        await fetchItems();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', message: err.error || 'Failed to save menu item.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error saving item.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the menu?`)) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', message: `"${name}" removed from menu.` });
        await fetchItems();
      } else {
        setFeedback({ type: 'error', message: 'Failed to delete menu item.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error deleting item.' });
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !item.is_available })
      });
      if (res.ok) {
        await fetchItems();
      }
    } catch (err) {
      console.error('Failed to toggle availability:', err);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      item.name?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2 className="admin-panel-title">Menu, Pricing & Imagery Catalog</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Manage dishes, prices, descriptions, images, and live item availability.
          </p>
        </div>
        <div className="admin-panel-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleOpenCreate}>
            <i className="fa-solid fa-plus"></i> Add New Dish
          </button>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={fetchItems}>
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

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <input 
          type="text"
          placeholder="Search items by name or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input"
        />
        <div className="admin-filter-pills">
          {['All', ...CATEGORIES].map(cat => (
            <button 
              key={cat}
              className={`admin-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
          <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
          <p>Loading catalog items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--color-cream-bg)', borderRadius: 'var(--radius-sm)' }}>
          <i className="fa-solid fa-mug-hot" style={{ fontSize: '2.5rem', color: 'var(--color-warm-caramel)', marginBottom: '12px' }}></i>
          <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)' }}>No Menu Items Found</h3>
          <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {searchTerm ? 'No items match your search.' : 'Click "Add New Dish" to add your first menu item.'}
          </p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>Dish / Beverage Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Dietary Tags</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} style={{ opacity: item.is_available ? 1 : 0.65 }}>
                  <td>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ 
                        width: '60px', 
                        height: '50px', 
                        objectFit: 'cover', 
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)'
                      }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop'; }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: '700', color: 'var(--color-espresso)' }}>
                      {item.name}
                      {item.badge && (
                        <span style={{ 
                          marginLeft: '8px', 
                          fontSize: '0.72rem', 
                          background: 'rgba(197, 133, 59, 0.15)', 
                          color: 'var(--color-warm-caramel)', 
                          padding: '2px 8px', 
                          borderRadius: '12px',
                          fontWeight: '700' 
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.description}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700', color: 'var(--color-warm-caramel)', fontSize: '1.05rem' }}>
                      {typeof item.price === 'string' && item.price.startsWith('₹')
                        ? item.price
                        : `₹${item.numericPrice || item.price}`}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleToggleAvailability(item)}
                      style={{
                        background: item.is_available ? '#E8F5E9' : '#FFEBEE',
                        color: item.is_available ? '#2E7D32' : '#C62828',
                        border: `1px solid ${item.is_available ? '#C8E6C9' : '#FFCDD2'}`,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                      title="Click to toggle availability"
                    >
                      {item.is_available ? '● Available' : '○ Sold Out'}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {item.is_vegan && <span style={{ fontSize: '0.7rem', background: '#E8F5E9', color: '#1B5E20', padding: '2px 6px', borderRadius: '4px' }}>VE</span>}
                      {item.is_gf && <span style={{ fontSize: '0.7rem', background: '#FFF3E0', color: '#E65100', padding: '2px 6px', borderRadius: '4px' }}>GF</span>}
                      {item.is_dairy_free && <span style={{ fontSize: '0.7rem', background: '#EDE7F6', color: '#512DA8', padding: '2px 6px', borderRadius: '4px' }}>DF</span>}
                      {item.is_organic && <span style={{ fontSize: '0.7rem', background: '#E0F2F1', color: '#00695C', padding: '2px 6px', borderRadius: '4px' }}>ORG</span>}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button 
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => handleOpenEdit(item)}
                        title="Edit details, price, or image"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button 
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(item.id, item.name)}
                        title="Delete item"
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

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">
                  {editingItem ? `Edit: ${editingItem.name}` : 'Add New Menu Item'}
                </h3>
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                  ×
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Dish / Drink Title *</label>
                  <input 
                    type="text" 
                    required
                    className="admin-form-control"
                    placeholder="e.g. Vanilla Bean Flat White"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category *</label>
                    <select 
                      className="admin-form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price (₹ INR) *</label>
                    <input 
                      type="number" 
                      step="5" 
                      required
                      className="admin-form-control"
                      placeholder="e.g. 240"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Image URL *</label>
                  <input 
                    type="url" 
                    required
                    className="admin-form-control"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  {formData.image && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        style={{ width: '70px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Image Preview</span>
                    </div>
                  )}
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Description *</label>
                  <textarea 
                    rows={3} 
                    required
                    className="admin-form-control"
                    placeholder="Describe flavor notes, roast origin, ingredients..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Highlight Badge (Optional)</label>
                    <input 
                      type="text" 
                      className="admin-form-control"
                      placeholder="e.g. Signature, Chef's Choice"
                      value={formData.badge || ''}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Calories / Serving</label>
                    <input 
                      type="text" 
                      className="admin-form-control"
                      placeholder="e.g. 180 kcal"
                      value={formData.calories || ''}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Dietary Tags</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.is_vegan} 
                        onChange={(e) => setFormData({ ...formData, is_vegan: e.target.checked })}
                      />
                      Vegan Friendly
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.is_gf} 
                        onChange={(e) => setFormData({ ...formData, is_gf: e.target.checked })}
                      />
                      Gluten-Free
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.is_dairy_free} 
                        onChange={(e) => setFormData({ ...formData, is_dairy_free: e.target.checked })}
                      />
                      Dairy-Free
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.is_organic} 
                        onChange={(e) => setFormData({ ...formData, is_organic: e.target.checked })}
                      />
                      Organic Certified
                    </label>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.is_available} 
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    />
                    Available for Order (Uncheck if Sold Out)
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
