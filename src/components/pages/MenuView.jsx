import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../../data/menuData';

export default function MenuView({ onNavigate, onOpenPdfModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDiets, setActiveDiets] = useState(new Set());

  const toggleDiet = (diet) => {
    setActiveDiets((prev) => {
      const next = new Set(prev);
      if (next.has(diet)) {
        next.delete(diet);
      } else {
        next.add(diet);
      }
      return next;
    });
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveDiets(new Set());
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 || activeCategory !== 'all' || activeDiets.size > 0;

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary match (must satisfy all selected active diets)
      for (const diet of activeDiets) {
        if (!item.dietary.includes(diet)) {
          return false;
        }
      }
      // Search query match
      if (q) {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const tagMatch = item.tag && item.tag.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !tagMatch) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, activeCategory, activeDiets]);

  return (
    <section className="page-view active" id="view-menu">
      <div className="page-hero menu-hero">
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <span className="hero-badge">Crafted with Pure Ingredients</span>
          <h1>Artisanal Kitchen & Roastery Menu</h1>
          <p>
            Freshly roasted specialty beans, rustic sourdough toasts, wholesome bowls, and delicate
            pastries.
          </p>

          <div className="menu-hero-actions">
            <button className="btn btn-primary" id="downloadPdfBtn" onClick={onOpenPdfModal}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download / Print PDF Menu</span>
            </button>
            <a
              href="#reservations"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('reservations');
              }}
            >
              Reserve Table to Dine
            </a>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        {/* Menu Controls: Category Tabs, Dietary Filter, and Search */}
        <div className="menu-controls-wrapper">
          {/* Search Box */}
          <div className="menu-search-box">
            <div className="search-input-group">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                id="menuSearchInput"
                placeholder="Search menu items (e.g., Cortado, Brioche, Avocado, Matcha)..."
                aria-label="Search menu items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery.length > 0 && (
                <button
                  className="search-clear-btn"
                  id="searchClearBtn"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery('')}
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Category Navigation Pills */}
          <div className="menu-category-pills" role="tablist" aria-label="Menu categories">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filter Toggles */}
          <div className="dietary-filters-row">
            <span className="dietary-filter-label">Dietary Preferences:</span>
            <div className="dietary-tags-group">
              <button
                className={`dietary-toggle ${activeDiets.has('vg') ? 'active' : ''}`}
                aria-pressed={activeDiets.has('vg')}
                onClick={() => toggleDiet('vg')}
              >
                <span className="dot-indicator vg"></span> Vegetarian (VG)
              </button>
              <button
                className={`dietary-toggle ${activeDiets.has('v') ? 'active' : ''}`}
                aria-pressed={activeDiets.has('v')}
                onClick={() => toggleDiet('v')}
              >
                <span className="dot-indicator v"></span> Vegan (V)
              </button>
              <button
                className={`dietary-toggle ${activeDiets.has('gf') ? 'active' : ''}`}
                aria-pressed={activeDiets.has('gf')}
                onClick={() => toggleDiet('gf')}
              >
                <span className="dot-indicator gf"></span> Gluten-Free (GF)
              </button>
            </div>
            {hasActiveFilters && (
              <button
                className="reset-filters-btn"
                id="resetFiltersBtn"
                onClick={resetAllFilters}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Results Status */}
        <div className="menu-results-count" id="menuResultsCount">
          {filteredItems.length === 0
            ? '0 items found matching your filters'
            : filteredItems.length === MENU_ITEMS.length
            ? `Showing all ${MENU_ITEMS.length} handcrafted items`
            : `Showing ${filteredItems.length} of ${MENU_ITEMS.length} handcrafted items`}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="menu-empty-state" id="menuEmptyState" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>☕</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No Dishes Match Your Selection</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              Try broadening your dietary filters or clearing your search term.
            </p>
            <button className="btn btn-primary" id="emptyResetBtn" onClick={resetAllFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Menu Items Grid */
          <div className="menu-grid" id="menuGridContainer">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-card" data-id={item.id}>
                <div className="menu-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  {item.tag && <span className="featured-badge-tag">{item.tag}</span>}
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-top">
                    <h3 className="menu-item-title">{item.title}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-desc">{item.description}</p>
                  <div className="menu-item-footer">
                    <div className="dietary-tags">
                      {item.dietary.includes('vg') && <span className="tag-pill tag-vg">VG</span>}
                      {item.dietary.includes('v') && <span className="tag-pill tag-v">Vegan</span>}
                      {item.dietary.includes('gf') && <span className="tag-pill tag-gf">GF</span>}
                    </div>
                    <span className="item-category-tag">{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
