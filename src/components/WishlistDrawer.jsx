import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { formatINR } from '../data/products';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div className="drawer-title">
            <Heart size={20} color="var(--gold)" fill="var(--gold)" />
            <span>Saved Pieces ({wishlistItems.length})</span>
          </div>
          <button className="action-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-lines">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-meta">{item.fit} • {item.fabric.split(" ")[0]}</div>
                  <div className="cart-item-price">{formatINR(item.price)}</div>

                  <button
                    className="btn btn-solid"
                    style={{ marginTop: '0.6rem', padding: '0.4rem 0.8rem', fontSize: '0.72rem' }}
                    onClick={() => onMoveToCart(item)}
                  >
                    <ShoppingBag size={14} />
                    <span>Move to Bag</span>
                  </button>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => onRemoveFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--ivory-dim)' }}>
              <Heart size={48} strokeWidth={1} style={{ margin: '0 auto 1rem', color: 'var(--line-light)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--ivory)' }}>No saved pieces</h3>
              <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Tap the heart on any garment to save it for later review.
              </p>
              <button className="btn btn-outline" onClick={onClose}>
                Browse Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
