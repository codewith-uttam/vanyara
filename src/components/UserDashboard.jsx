import React, { useState } from 'react';
import {
  X,
  Package,
  MapPin,
  Award,
  LogOut,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { formatINR } from '../data/products';

export default function UserDashboard({
  isOpen,
  onClose,
  user,
  orders = [],
  onLogout,
  onOpenShop
}) {
  if (!isOpen || !user) return null;

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'perks'
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <span className="order-status-badge status-delivered"><CheckCircle2 size={13} /> Delivered</span>;
      case 'in transit':
      case 'dispatched':
        return <span className="order-status-badge status-transit"><Truck size={13} /> In Transit</span>;
      default:
        return <span className="order-status-badge status-processing"><Clock size={13} /> Atelier Inspection</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="dashboard-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dashboard">
          <X size={18} />
        </button>

        {/* VIP Black Label Membership Card */}
        <div className="vip-membership-card">
          <div className="vip-card-glow" />
          <div className="vip-card-top">
            <div className="vip-brand-row">
              <span className="vip-brand-name">VANYARA</span>
              <span className="vip-tier-badge">
                <Sparkles size={13} />
                <span>{user.tier || 'Black Label VIP'}</span>
              </span>
            </div>
            <span className="vip-member-id">{user.memberId || 'VY-VIP-0091'}</span>
          </div>

          <div className="vip-card-middle">
            <h3 className="vip-user-name">{user.name}</h3>
            <span className="vip-user-email">{user.email}</span>
          </div>

          <div className="vip-card-bottom">
            <div className="vip-stat">
              <span className="vip-stat-label">Atelier Credits</span>
              <b className="vip-stat-value">{user.credits ? `₹${user.credits.toLocaleString('en-IN')}` : '₹1,500'}</b>
            </div>
            <div className="vip-stat">
              <span className="vip-stat-label">Member Since</span>
              <b className="vip-stat-value">{user.memberSince || '2026'}</b>
            </div>
            <div className="vip-stat">
              <span className="vip-stat-label">Courier Status</span>
              <b className="vip-stat-value" style={{ color: 'var(--gold-bright)' }}>Express VIP</b>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`dash-tab-btn ${activeTab === 'orders' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={16} />
            <span>Orders & Tracking ({orders.length})</span>
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'addresses' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin size={16} />
            <span>Saved Address</span>
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'perks' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('perks')}
          >
            <Award size={16} />
            <span>VIP Privileges</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="dashboard-content">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="dash-tab-pane">
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <div className="order-id-row">
                            <span className="order-id-title">Order Ref:</span>
                            <b className="order-id-code">{order.id}</b>
                          </div>
                          <span className="order-date-text">
                            Placed on {order.date || 'Recent drop'}
                          </span>
                        </div>
                        <div className="order-header-right">
                          {getStatusBadge(order.status || 'Atelier Inspection')}
                          <b className="order-total-amount">{formatINR(order.total || order.finalTotal || 0)}</b>
                        </div>
                      </div>

                      {/* Order Visual Progress Track */}
                      <div className="order-progress-wrapper">
                        <div className="order-progress-steps">
                          <div className="step is-complete">
                            <span className="step-dot" />
                            <span className="step-text">Placed</span>
                          </div>
                          <div className={`step ${order.status !== 'Placed' ? 'is-complete' : 'is-active'}`}>
                            <span className="step-dot" />
                            <span className="step-text">Atelier Inspection</span>
                          </div>
                          <div className={`step ${order.status === 'Delivered' || order.status === 'In Transit' ? 'is-complete' : ''}`}>
                            <span className="step-dot" />
                            <span className="step-text">Express Dispatch</span>
                          </div>
                          <div className={`step ${order.status === 'Delivered' ? 'is-complete' : ''}`}>
                            <span className="step-dot" />
                            <span className="step-text">Delivered</span>
                          </div>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="order-items-grid">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="order-item-mini">
                            <img src={item.image} alt={item.name} className="order-item-thumb" />
                            <div className="order-item-desc">
                              <h4 className="order-item-title">{item.name}</h4>
                              <span className="order-item-spec">
                                Size: <b>{item.selectedSize || 'Standard'}</b> • Qty: <b>{item.qty || 1}</b>
                              </span>
                              <span className="order-item-price">{formatINR(item.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-footer">
                        <div className="delivery-est">
                          <Truck size={15} color="var(--gold)" />
                          <span>Estimated Arrival: <b>3 - 4 Business Days</b></span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          style={{ padding: '0.45rem 0.9rem', fontSize: '0.74rem' }}
                          onClick={() => alert(`Tracking package ${order.id} via BlueDart / Delhivery Express: In transit to destination hub.`)}
                        >
                          <ExternalLink size={13} />
                          <span>Track Package</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dash-empty-orders">
                  <Package size={42} strokeWidth={1.2} style={{ color: 'var(--muted)', margin: '0 auto 0.8rem' }} />
                  <h3>No Orders Placed Yet</h3>
                  <p>Explore Drop 01 heavyweight streetwear collection to build your wardrobe.</p>
                  <button
                    className="btn btn-solid"
                    style={{ marginTop: '1rem' }}
                    onClick={() => { onClose(); if (onOpenShop) onOpenShop(); }}
                  >
                    <ShoppingBag size={16} />
                    <span>Explore Collection</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="dash-tab-pane">
              <div className="address-card">
                <div className="address-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <MapPin size={18} color="var(--gold)" />
                    <b>Primary Atelier Residence</b>
                  </div>
                  <span className="default-badge">DEFAULT</span>
                </div>
                <div className="address-body">
                  <p className="address-name">{user.name}</p>
                  <p className="address-text">{user.address || 'Skyline Penthouse 14B, Altamount Road, Mumbai 400026'}</p>
                  <p className="address-phone">Phone: {user.phone || '+91 98765 43210'}</p>
                </div>
                <div className="address-card-actions">
                  <button
                    className="btn btn-ghost"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.74rem' }}
                    onClick={() => {
                      const newAddress = prompt('Enter your updated delivery address:', user.address || '');
                      if (newAddress) {
                        user.address = newAddress;
                        alert('Address updated successfully.');
                      }
                    }}
                  >
                    Edit Address
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIP PERKS */}
          {activeTab === 'perks' && (
            <div className="dash-tab-pane">
              <div className="perks-grid">
                <div className="perk-card">
                  <Sparkles className="perk-icon" />
                  <h4>Drop 02 Priority Allocation</h4>
                  <p>Reserved private allocation 48 hours prior to public release for all limited runs.</p>
                </div>
                <div className="perk-card">
                  <Truck className="perk-icon" />
                  <h4>White-Glove Express Courier</h4>
                  <p>Zero courier fees on all national dispatches with door-step garment inspection.</p>
                </div>
                <div className="perk-card">
                  <ShieldCheck className="perk-icon" />
                  <h4>Lifetime Stitch Guarantee</h4>
                  <p>Complimentary reinforcement or repair on French Terry seams for up to 3 years.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Sign Out */}
        <div className="dashboard-footer">
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            Logged in as <b>{user.email}</b>
          </span>
          <button
            type="button"
            className="btn btn-ghost sign-out-btn"
            onClick={onLogout}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
