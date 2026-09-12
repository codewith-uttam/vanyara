import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { formatINR } from '../data/products';

export default function LookbookShowcase({ products, onQuickView, onAddToCart }) {
  // Extract the 4 user-uploaded hero items
  const heroItems = products.filter((p) => p.isHeroDrop);

  return (
    <section className="section lookbook-showcase" id="lookbook">
      <div className="container">
        <div className="section-head">
          <span className="kicker">EDITORIAL DROP 01</span>
          <h2 className="section-title">Built for everyday strength</h2>
          <p className="section-subtitle">
            Streetwear for a better tomorrow. Cut from custom-milled heavyweight loopback cotton and engineered for structural precision.
          </p>
        </div>

        <div className="lookbook-grid">
          {heroItems.map((item) => (
            <article key={item.id} className="lookbook-card">
              {/* Clean Poster Artwork with Click to View */}
              <div
                className="lookbook-media"
                onClick={() => onQuickView(item)}
                title={`Inspect ${item.name}`}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="lookbook-info">
                {/* Centered header row with fit and badge */}
                <div className="lookbook-header-row">
                  <span className="lookbook-fit">{item.fit}</span>
                  {item.tag && <span className="lookbook-pill">{item.tag}</span>}
                </div>

                <h3
                  className="lookbook-title"
                  onClick={() => onQuickView(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.name}
                </h3>
                <p className="lookbook-subtitle">"{item.subtitle}"</p>

                {/* Structured specs with hanging indent */}
                <div className="lookbook-specs">
                  {item.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="lookbook-spec-item">
                      <span className="spec-dot" aria-hidden="true" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Centered Price & Properly Sized Bag Button */}
                <div className="lookbook-action">
                  <div className="lookbook-price-box">
                    <span className="lookbook-price">{formatINR(item.price)}</span>
                    {item.originalPrice && (
                      <span className="lookbook-original-price">{formatINR(item.originalPrice)}</span>
                    )}
                  </div>

                  <div className="lookbook-buttons">
                    <button
                      className="lookbook-btn-details"
                      onClick={() => onQuickView(item)}
                      title="Inspect piece details"
                      aria-label={`View details of ${item.name}`}
                    >
                      <Eye size={15} />
                      <span>Details</span>
                    </button>
                    <button
                      className="lookbook-btn-bag"
                      onClick={() => onAddToCart(item)}
                      title="Add to bag"
                      aria-label={`Add ${item.name} to bag`}
                    >
                      <Plus size={16} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
