import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { formatINR } from '../data/products';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor: selectedColor?.name,
      selectedSize
    });
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <article className="product-card" data-id={product.id}>
      <div className="product-media" onClick={() => onQuickView(product)} style={{ cursor: 'pointer' }}>
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
          decoding="async"
        />
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            className="product-img product-img-secondary"
            loading="lazy"
            decoding="async"
          />
        )}

        {product.tag && <span className="card-tag">{product.tag}</span>}

        <button
          className={`card-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Saved" : "Save for later"}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.8} />
        </button>

        <button
          className="card-quickview-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye size={14} style={{ display: 'inline', marginRight: '5px' }} />
          Quick View
        </button>
      </div>

      <div className="product-body">
        <div className="product-fabric-line">
          <span className="product-fabric">{product.fabric.split(" • ")[0] || product.fabric}</span>
          <span className="product-rating">★ {product.rating}</span>
        </div>

        <h3 className="product-name" onClick={() => onQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>
        <p className="product-fit">{product.fit}</p>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="swatches-row" title={`Color: ${selectedColor?.name}`}>
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                className={`swatch-dot ${selectedColor?.name === color.name ? 'is-active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color.name}`}
                title={color.name}
              />
            ))}
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: '4px' }}>
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Sizes */}
        {product.sizes && (
          <div className="sizes-row">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                className={`size-pill ${selectedSize === size ? 'is-selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Price & Quick Add */}
        <div className="product-bottom-row">
          <div className="price-box">
            <span className="current-price">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatINR(product.originalPrice)}</span>
            )}
          </div>

          <button
            className="quick-add-btn"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            title="Add to bag"
          >
            {addedAnim ? <Check size={18} color="var(--ink)" /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </article>
  );
}
