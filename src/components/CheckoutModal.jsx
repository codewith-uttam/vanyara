import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Smartphone, Banknote, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatINR } from '../data/products';

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  onOrderComplete
}) {
  if (!isOpen || !checkoutData) return null;

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    pincode: ''
  });
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = `VY-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    onOrderComplete();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">
          <X size={18} />
        </button>

        {step === 'form' ? (
          <div>
            <div style={{ marginBottom: '1.8rem' }}>
              <span className="kicker">SECURE CHECKOUT</span>
              <h2 style={{ fontSize: '1.8rem' }}>Complete Your Order</h2>
              <p style={{ color: 'var(--ivory-dim)', fontSize: '0.88rem' }}>
                Total payable: <b style={{ color: 'var(--gold-bright)' }}>{formatINR(checkoutData.finalTotal)}</b> ({checkoutData.cartItems.reduce((a, b) => a + b.qty, 0)} items)
              </p>
            </div>

            <form onSubmit={handleSubmitOrder}>
              <div className="form-grid">
                <div className="form-field full">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Uttam Sharma"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field full">
                  <label htmlFor="address">Delivery Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    placeholder="Street name, Flat / Building number"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="city">City / District *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="pincode">PIN Code *</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    required
                    placeholder="6 digits"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '1rem' }}>
                <span className="form-field label" style={{ display: 'block', marginBottom: '0.6rem' }}>
                  Select Payment Option
                </span>
                <div className="payment-options">
                  <div
                    className={`payment-option-card ${paymentMethod === 'upi' ? 'is-selected' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <Smartphone size={22} />
                    <span>Instant UPI</span>
                    <small style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>GPay, PhonePe, Paytm</small>
                  </div>

                  <div
                    className={`payment-option-card ${paymentMethod === 'card' ? 'is-selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={22} />
                    <span>Cards & NetBanking</span>
                    <small style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>All Indian & Global cards</small>
                  </div>

                  <div
                    className={`payment-option-card ${paymentMethod === 'cod' ? 'is-selected' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <Banknote size={22} />
                    <span>Cash on Delivery</span>
                    <small style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>Pay upon arrival</small>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--line)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontSize: '0.8rem',
                color: 'var(--ivory-dim)'
              }}>
                <ShieldCheck size={20} color="var(--gold)" />
                <span>256-Bit SSL Encrypted. Certified authentic Vanyara order.</span>
              </div>

              <button
                type="submit"
                className="btn btn-solid"
                style={{ width: '100%', padding: '1.1rem', fontSize: '0.88rem' }}
              >
                <span>Confirm & Place Order ({formatINR(checkoutData.finalTotal)})</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div className="order-success-view">
            <div className="success-icon">
              <CheckCircle size={36} />
            </div>
            <span className="kicker">ORDER CONFIRMED</span>
            <h2 style={{ fontSize: '2.2rem', margin: '0.4rem 0 1rem' }}>Welcome to the House of Vanyara</h2>
            <p style={{ color: 'var(--ivory-dim)', maxWidth: '44ch', margin: '0 auto 1.5rem' }}>
              Thank you, <b>{formData.name || 'valued customer'}</b>. Your order has been placed in our atelier queue for hand inspection and dispatch.
            </p>

            <div style={{
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              padding: '1.2rem',
              borderRadius: 'var(--radius-sm)',
              maxWidth: '360px',
              margin: '0 auto 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ivory-dim)' }}>Order Reference:</span>
                <b style={{ color: 'var(--gold-bright)', letterSpacing: '0.08em' }}>{orderId}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ivory-dim)' }}>Payment Method:</span>
                <span style={{ textTransform: 'uppercase' }}>{paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ivory-dim)' }}>Estimated Delivery:</span>
                <span>3 - 4 Business Days</span>
              </div>
            </div>

            <button className="btn btn-solid" onClick={onClose} style={{ padding: '0.9rem 2rem' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
