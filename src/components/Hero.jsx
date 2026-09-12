import React from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Hero({ onShopClick, onLookbookClick, onCategorySelect }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg-overlay" />
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Drop 01 — Architectural Streetwear</span>
          </div>
          <h1 className="hero-title">
            Built for <span>bolder days.</span> Made to stay.
          </h1>
          <p className="hero-desc">
            Vanyara engineers heavyweight street silhouettes crafted from 480 GSM French Terry, dropped-shoulder architecture, and zero-compromise tailoring. Timeless style. Modern you.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-solid" onClick={onShopClick}>
              <span>Shop Collection</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-outline" onClick={onLookbookClick}>
              <span>Explore Drop 01 Lookbook</span>
            </button>
          </div>

          {/* Quick jump category pills */}
          <div style={{ marginTop: '1.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                className="chip"
                style={{ fontSize: '0.72rem', padding: '0.4rem 0.85rem' }}
                onClick={() => onCategorySelect(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <b>480 GSM</b>
              <span>Loopback Terry</span>
            </div>
            <div className="hero-stat">
              <b>7 Pieces</b>
              <span>Atelier Drop</span>
            </div>
            <div className="hero-stat">
              <b>Small Run</b>
              <span>Limited Edition</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="hero-card-tag">Signature Silhouette</div>
          <img
            src="/images/hoodie-strength-women.jpg"
            alt="Vanyara Heavyweight Hoodie Hero"
            width="550"
            height="580"
            loading="eager"
            decoding="async"
          />
          <div className="hero-card-footer">
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                Heavyweight Drop
              </span>
              <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>Everyday Strength Hoodie</h3>
            </div>
            <button
              className="btn btn-solid"
              style={{ padding: '0.6rem 1rem', fontSize: '0.75rem' }}
              onClick={onShopClick}
            >
              View Drop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
