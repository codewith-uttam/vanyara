import React from 'react';
import { Layers, Scissors, ShieldAlert } from 'lucide-react';

export default function CraftSection() {
  return (
    <section className="section craft-section" id="craft">
      <div className="container">
        <div className="section-head">
          <span className="kicker">HOUSE PHILOSOPHY</span>
          <h2 className="section-title">What we won't compromise on</h2>
          <p className="section-subtitle">
            Most "timeless" streetwear isn't. We built Vanyara around fabric density, honest small batches, and architectural drape.
          </p>
        </div>

        <div className="craft-grid">
          <div className="craft-card">
            <Layers className="craft-card-icon" strokeWidth={1.5} />
            <h3>Fabric First (480–500 GSM)</h3>
            <p>
              We choose the cloth before we sketch the silhouette. If the fabric doesn't hold its structural line or drape with presence, the garment doesn't get made.
            </p>
          </div>

          <div className="craft-card">
            <Scissors className="craft-card-icon" strokeWidth={1.5} />
            <h3>Small Atelier Batches</h3>
            <p>
              Every drop is cut in strictly limited editions. By keeping runs deliberate, every seam, ribbed cuff, and double-needle stitch meets our master tailor's standards.
            </p>
          </div>

          <div className="craft-card">
            <ShieldAlert className="craft-card-icon" strokeWidth={1.5} />
            <h3>Honest Pricing, Always</h3>
            <p>
              One price, year-round. No artificial countdown timers, no fake inflated discounts, and no seasonal clearance rush designed to discard past collections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
