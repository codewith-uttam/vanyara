import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  user,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenDashboard,
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
          <img src="/images/logo.jpg" alt="Vanyara" className="brand-img" />
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

          {/* User Account Button (Auth / VIP Dashboard) */}
          <button
            className={`action-btn user-account-btn ${user ? 'is-logged-in' : ''}`}
            onClick={user ? onOpenDashboard : onOpenAuth}
            aria-label={user ? `Open account for ${user.name}` : "Sign In or Register"}
            title={user ? `VIP Account: ${user.name} (${user.tier})` : "Sign In to Atelier"}
          >
            {user ? (
              <span className="user-avatar-text">{user.name.charAt(0)}</span>
            ) : (
              <User size={18} strokeWidth={1.75} />
            )}
            {user && <span className="user-vip-dot" title="VIP Member" />}
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
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile navigation menu">
          <div className="mobile-nav-list">
            <button
              type="button"
              className="mobile-nav-link"
              style={{ color: 'var(--gold-bright)', fontWeight: 600 }}
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) onOpenDashboard();
                else onOpenAuth();
              }}
            >
              <span>{user ? `VIP Account (${user.name})` : 'Atelier Access / Sign In'}</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
            <button type="button" className="mobile-nav-link" onClick={() => handleNavClick('#shop', 'all')}>
              <span>Shop All Pieces</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
            <button type="button" className="mobile-nav-link" onClick={() => handleNavClick('#shop', 'hoodies')}>
              <span>Heavyweight Hoodies (480 GSM)</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
            <button type="button" className="mobile-nav-link" onClick={() => handleNavClick('#shop', 'oversized-tees')}>
              <span>Oversized Street Tees</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
            <button type="button" className="mobile-nav-link" onClick={() => handleNavClick('#shop', 'bottoms')}>
              <span>Pants & Cargos</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
            <button type="button" className="mobile-nav-link" onClick={() => handleNavClick('#lookbook')}>
              <span>Drop 01 Editorial Lookbook</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
            <button type="button" className="mobile-nav-link" onClick={() => handleNavClick('#craft')}>
              <span>Atelier Craft Standards</span>
              <span className="mobile-nav-arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
