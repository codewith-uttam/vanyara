import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearchFocus,
  onSelectCategory
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchor, category = null) => {
    setMobileMenuOpen(false);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-row">
        {/* Brand */}
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/images/logo.jpg" alt="Vanyara Atelier" className="brand-img" />
          <span className="brand-text">VANYARA</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Main navigation">
          <button type="button" onClick={() => handleNavClick('#shop', 'all')}>Shop All</button>
          <button type="button" onClick={() => handleNavClick('#shop', 'hoodies')}>Hoodies</button>
          <button type="button" onClick={() => handleNavClick('#shop', 'oversized-tees')}>Tees</button>
          <button type="button" onClick={() => handleNavClick('#lookbook')}>Lookbook Drop</button>
          <button type="button" onClick={() => handleNavClick('#craft')}>Atelier Craft</button>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            className="action-btn"
            onClick={onSearchFocus}
            aria-label="Search catalog"
            title="Search products"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>

          <button
            className="action-btn"
            onClick={onOpenWishlist}
            aria-label="Saved wishlist"
            title="View saved pieces"
          >
            <Heart size={18} strokeWidth={1.75} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>

          <button
            className="action-btn"
            onClick={onOpenCart}
            aria-label="Shopping bag"
            title="View shopping bag"
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          <button
            className="action-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--ink-elevated)',
          borderBottom: '1px solid var(--line)',
          padding: '1.5rem var(--gutter)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          <button style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ivory)' }} onClick={() => handleNavClick('#shop', 'all')}>All Pieces</button>
          <button style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ivory)' }} onClick={() => handleNavClick('#shop', 'hoodies')}>Heavyweight Hoodies</button>
          <button style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ivory)' }} onClick={() => handleNavClick('#shop', 'oversized-tees')}>Oversized Tees</button>
          <button style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ivory)' }} onClick={() => handleNavClick('#shop', 'bottoms')}>Pants & Cargos</button>
          <button style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ivory)' }} onClick={() => handleNavClick('#lookbook')}>Lookbook Drop</button>
          <button style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ivory)' }} onClick={() => handleNavClick('#craft')}>Atelier Craft</button>
        </div>
      )}
    </header>
  );
}
