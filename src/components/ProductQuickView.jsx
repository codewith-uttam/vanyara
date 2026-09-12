import React, { useState, useEffect } from 'react';
import { X, Check, Heart, ShoppingBag, Truck, RotateCcw } from 'lucide-react';
import { formatINR } from '../data/products';

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  if (!isOpen || !product) return null;

  const [activeImg, setActiveImg] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImg(product.image);
    setSelectedColor(product.colors?.[0] || null);
    setSelectedSize(product.sizes?.[0] || null);
    setQuantity(1);
  }, [product]);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor: selectedColor?.name,
      selectedSize,
      qty: quantity
    });
    onClose();
  };

  const images = [product.image, product.secondaryImage].filter(Boolean);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quickview-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        <div className="quickview-grid">
          {/* Gallery */}
          <div className="quickview-gallery">
            <div className="gallery-main">
              <img src={activeImg} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb-btn ${activeImg === img ? 'is-active' : ''}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="quickview-details">
            {product.tag && <span className="quickview-badge">{product.tag}</span>}
            <h2 className="quickview-title">{product.name}</h2>
            <p className="quickview-subtitle">"{product.subtitle}"</p>

            <div className="quickview-price-row">
              <span className="quickview-current-price">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: '1.2rem' }}>
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Highlights List */}
            <ul className="quickview-highlights">
              {product.highlights.map((item, idx) => (
                <li key={idx}>
                  <Check size={15} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="option-group">
                <div className="option-label">
                  <span>Colorway</span>
                  <span>{selectedColor?.name}</span>
                </div>
                <div className="swatches-row">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      className={`swatch-dot ${selectedColor?.name === c.name ? 'is-active' : ''}`}
                      style={{ backgroundColor: c.hex, width: 22, height: 22 }}
                      onClick={() => setSelectedColor(c)}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="option-group">
                <div className="option-label">
                  <span>Select Size</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold)' }}>True to oversize fit</span>
                </div>
                <div className="sizes-row">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-pill ${selectedSize === size ? 'is-selected' : ''}`}
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-num">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-solid"
                style={{ flexGrow: 1 }}
                onClick={handleAdd}
              >
                <ShoppingBag size={17} />
                <span>Add to Bag • {formatINR(product.price * quantity)}</span>
              </button>

              <button
                className={`action-btn ${isWishlisted ? 'is-active' : ''}`}
                style={{ width: 44, height: 44 }}
                onClick={() => onToggleWishlist(product)}
                aria-label="Save to Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Guarantee Pills */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1.5rem',
              paddingTop: '1.2rem',
              borderTop: '1px solid var(--line)',
              fontSize: '0.75rem',
              color: 'var(--ivory-dim)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={14} color="var(--gold)" /> Free Express Delivery
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <RotateCcw size={14} color="var(--gold)" /> 7-Day Doorstep Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
