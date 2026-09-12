import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const [tab, setTab] = useState('signin'); // 'signin' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Uttam Sharma',
      email: 'uttam@vanyara.atelier',
      phone: '+91 98765 43210',
      tier: 'Black Label VIP',
      memberSince: '2026',
      memberId: 'VY-VIP-0091',
      credits: 2450,
      address: 'Skyline Penthouse 14B, Altamount Road, Mumbai 400026'
    };
    onLogin(demoUser);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'signin') {
      if (!formData.email || !formData.password) {
        setError('Please enter your email and password');
        return;
      }
      const loggedUser = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone || '+91 98123 45678',
        tier: 'Atelier Member',
        memberSince: '2026',
        memberId: `VY-MBR-${Math.floor(1000 + Math.random() * 9000)}`,
        credits: 500,
        address: '124 Heritage Boulevard, New Delhi 110001'
      };
      onLogin(loggedUser);
      onClose();
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please complete all required fields');
        return;
      }
      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '+91 98123 45678',
        tier: 'New Member',
        memberSince: '2026',
        memberId: `VY-MBR-${Math.floor(1000 + Math.random() * 9000)}`,
        credits: 250,
        address: 'Signature Residence, Bandra West, Mumbai 400050'
      };
      onLogin(newUser);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close authentication">
          <X size={18} />
        </button>

        <div className="auth-header">
          <span className="kicker">HOUSE OF VANYARA</span>
          <h2 className="auth-title">
            {tab === 'signin' ? 'Welcome Back' : 'Atelier Access'}
          </h2>
          <p className="auth-subtitle">
            {tab === 'signin'
              ? 'Sign in to access your orders, saved pieces, and VIP privileges.'
              : 'Join the private circle for early drop access and tailored benefits.'}
          </p>
        </div>

        {/* 1-Click Quick VIP Demo Login */}
        <button
          type="button"
          className="demo-login-banner"
          onClick={handleDemoLogin}
          title="Instant 1-Click Test Access"
        >
          <div className="demo-banner-left">
            <Sparkles size={18} color="var(--gold-bright)" />
            <div>
              <b>1-Click VIP Demo Login</b>
              <small>Continue as Uttam Sharma (VIP Black Label)</small>
            </div>
          </div>
          <ArrowRight size={16} color="var(--gold-bright)" />
        </button>

        <div className="auth-divider">
          <span>or continue with credentials</span>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${tab === 'signin' ? 'is-active' : ''}`}
            onClick={() => { setTab('signin'); setError(''); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${tab === 'register' ? 'is-active' : ''}`}
            onClick={() => { setTab('register'); setError(''); }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {tab === 'register' && (
            <div className="form-field">
              <label htmlFor="reg-name">Full Name *</label>
              <div className="input-icon-wrap">
                <User size={16} />
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Uttam Sharma"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="auth-email">Email Address *</label>
            <div className="input-icon-wrap">
              <Mail size={16} />
              <input
                id="auth-email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {tab === 'register' && (
            <div className="form-field">
              <label htmlFor="reg-phone">Phone Number (Optional)</label>
              <div className="input-icon-wrap">
                <Phone size={16} />
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="form-field">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="auth-password">Password *</label>
              {tab === 'signin' && (
                <button
                  type="button"
                  style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'none' }}
                  onClick={() => alert('Password reset link sent to your email (demo).')}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="input-icon-wrap">
              <Lock size={16} />
              <input
                id="auth-password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <div className="auth-error-msg">{error}</div>}

          <button type="submit" className="btn btn-solid" style={{ width: '100%', marginTop: '0.6rem' }}>
            <span>{tab === 'signin' ? 'Sign In to Atelier' : 'Create VIP Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
