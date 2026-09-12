import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { formatINR } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.10 for 10%
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 2999;
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const freeShippingProgress = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VANYARA10') {
      setAppliedDiscount(0.10);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "VANYARA10" for 10% off');
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-head">
          <div className="drawer-title">
            <ShoppingBag size={20} color="var(--gold)" />
            <span>Shopping Bag ({cartItems.reduce((a, b) => a + b.qty, 0)})</span>
          </div>
          <button className="action-btn" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="free-shipping-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>
              {amountToFreeShipping === 0
                ? "You've unlocked Free Express Shipping!"
                : `Add ${formatINR(amountToFreeShipping)} more for Free Express Shipping`}
            </span>
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{freeShippingProgress}%</span>
          </div>
          <div className="shipping-progress-track">
            <div className="shipping-progress-fill" style={{ width: `${freeShippingProgress}%` }} />
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-lines">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-meta">
                    Size: <b>{item.selectedSize || 'Standard'}</b> • Color: <b>{item.selectedColor || 'Signature'}</b>
                  </div>
                  <div className="cart-item-price">{formatINR(item.price)}</div>

                  <div style={{ marginTop: '0.6rem' }}>
                    <div className="qty-control" style={{ transform: 'scale(0.88)', transformOrigin: 'left center' }}>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item, item.qty - 1)}
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="qty-num">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQty(item, item.qty + 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => onRemoveItem(item)}
                  aria-label="Remove item"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--ivory-dim)' }}>
              <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 1rem', color: 'var(--line-light)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--ivory)' }}>Your bag is empty</h3>
              <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Discover our Drop 01 heavyweight streetwear collection.
              </p>
              <button className="btn btn-outline" onClick={onClose}>
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="drawer-foot">
            {/* Promo code */}
            {appliedDiscount > 0 ? (
              <div className="promo-badge-applied">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} /> Coupon 'VANYARA10' applied (10% off)
                </span>
                <button
                  style={{ color: 'var(--ivory-dim)', fontSize: '0.72rem', textDecoration: 'underline' }}
                  onClick={() => setAppliedDiscount(0)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="promo-row">
                <input
                  type="text"
                  placeholder="Discount code (try VANYARA10)"
                  className="promo-input"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit" className="btn btn-ghost" style={{ padding: '0.6rem 1rem', fontSize: '0.75rem' }}>
                  Apply
                </button>
              </form>
            )}
            {promoError && <span style={{ fontSize: '0.72rem', color: 'var(--danger)' }}>{promoError}</span>}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--ivory-dim)' }}>
                <span>Subtotal</span>
                <span>{formatINR(rawSubtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--success)' }}>
                  <span>Promo Discount (10%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--ivory-dim)' }}>
                <span>Shipping</span>
                <span>{rawSubtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : formatINR(199)}</span>
              </div>
            </div>

            <div className="subtotal-row">
              <span>Estimated Total</span>
              <span>{formatINR(finalTotal + (rawSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 199))}</span>
            </div>

            <button
              className="btn btn-solid"
              style={{ width: '100%', padding: '1rem' }}
              onClick={() => {
                onClose();
                onCheckout({
                  rawSubtotal,
                  discountAmount,
                  finalTotal: finalTotal + (rawSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 199),
                  cartItems
                });
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
