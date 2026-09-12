import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer({ onCategorySelect, onNotify }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      if (onNotify) onNotify(`Welcome to the private drop list (${email})`);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer" id="newsletter">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-text">VANYARA</span>
            <p>
              Architectural luxury streetwear crafted from 480 GSM French Terry, dropped shoulders, and pure minimal aesthetics. Built for everyday strength.
            </p>
          </div>

          <div className="footer-col">
            <h4>Collections</h4>
            <ul>
              <li><button onClick={() => onCategorySelect('hoodies')}>Heavyweight Hoodies</button></li>
              <li><button onClick={() => onCategorySelect('oversized-tees')}>Oversized Graphic Tees</button></li>
              <li><button onClick={() => onCategorySelect('boxy-tees')}>Boxy-Fit Clean Tees</button></li>
              <li><button onClick={() => onCategorySelect('bottoms')}>Cargo Trousers</button></li>
              <li><button onClick={() => onCategorySelect('accessories')}>House Jewelry & Accessories</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Atelier</h4>
            <ul>
              <li><a href="#about">Philosophy</a></li>
              <li><a href="#craft">Craft Standards</a></li>
              <li><a href="#lookbook">Drop 01 Lookbook</a></li>
              <li><a href="#newsletter">Private Drop List</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Private Access</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginBottom: '0.8rem' }}>
              One dispatch per month with early drop links and atelier journal entries.
            </p>
            {subscribed ? (
              <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                <Check size={16} /> You're on the private drop list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-solid" style={{ padding: '0.6rem 1rem' }}>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VANYARA Atelier. All rights reserved.</span>
          <span>Timeless Style. Modern You. Built for Bolder Days.</span>
        </div>
      </div>
    </footer>
  );
}
