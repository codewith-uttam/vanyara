import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';

export default function ProductGrid({
  products,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  searchInputRef
}) {
  const [sortBy, setSortBy] = useState('featured');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fit.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.tag === 'NEW DROP' ? 1 : 0) - (a.tag === 'NEW DROP' ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const hasActiveFilters = activeCategory !== 'all' || searchQuery.trim().length > 0;

  return (
    <section className="section" id="shop">
      <div className="container">
        <div className="section-head">
          <span className="kicker">DROP 01 ESSENTIALS</span>
          <h2 className="section-title">The Streetwear Catalog</h2>
          <p className="section-subtitle">
            Engineered with 480–500 GSM loopback cotton, dropped-shoulder posture, and precision tailoring.
          </p>
        </div>

        {/* Controls Bar: Search, Sort, Categories */}
        <div className="catalog-controls">
          <div className="search-sort-bar">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search />
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search by fabric, fit, hoodie, tee, cargo..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="sort-select-wrap">
              <SlidersHorizontal size={16} color="var(--gold)" />
              <span className="sort-label">Sort:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Curated Collection</option>
                <option value="newest">New Drops First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Category Chips with Dynamic Item Count */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div className="category-chips" role="tablist">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                if (cat.id !== 'all' && count === 0) return null; // Don't show empty categories

                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    className={`chip ${activeCategory === cat.id ? 'is-active' : ''}`}
                    onClick={() => onCategoryChange(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span style={{
                      marginLeft: '6px',
                      opacity: 0.75,
                      fontSize: '0.72rem',
                      fontWeight: 'normal'
                    }}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                className="btn btn-ghost"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.72rem', height: 34 }}
                onClick={() => {
                  onCategoryChange('all');
                  onSearchChange('');
                }}
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="product-grid" aria-live="polite">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="empty-state">
              <h3>No garments matched your filter</h3>
              <p>Try resetting the search terms or browsing all available pieces.</p>
              <button
                className="btn btn-solid"
                onClick={() => {
                  onCategoryChange('all');
                  onSearchChange('');
                }}
              >
                View All Pieces ({products.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
