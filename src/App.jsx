import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { PRODUCTS } from './data/products';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LookbookShowcase from './components/LookbookShowcase';
import ProductGrid from './components/ProductGrid';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import CraftSection from './components/CraftSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';

export default function App() {
  // User Authentication State (Persisted)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vanyara_user_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Customer Orders State (Persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('vanyara_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial sample VIP order for immediate rich showcase
    return [
      {
        id: 'VY-749201',
        date: 'Sep 10, 2026',
        status: 'In Transit',
        total: 4490,
        items: [
          {
            id: 'vy-001',
            name: 'Everyday Strength Hoodie',
            price: 4490,
            image: '/images/hoodie-strength-women.jpg',
            selectedSize: 'L (Oversize)',
            selectedColor: 'Black Onyx',
            qty: 1
          }
        ],
        shippingAddress: 'Skyline Penthouse 14B, Altamount Road, Mumbai 400026'
      }
    ];
  });

  // Modals & Drawers Visibility
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Cart State (Persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vanyara_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('vanyara_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Sync User to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('vanyara_user_v1', JSON.stringify(user));
    } else {
      localStorage.removeItem('vanyara_user_v1');
    }
  }, [user]);

  // Sync Orders to LocalStorage
  useEffect(() => {
    localStorage.setItem('vanyara_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // Show login popup when visiting this page for non-logged in visitors
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setIsAuthOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auth operations
  const handleLogin = (userData) => {
    setUser(userData);
    showToast(`Welcome to House of Vanyara, ${userData.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    setIsDashboardOpen(false);
    showToast('Signed out of Atelier');
  };

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('vanyara_cart_v2', JSON.stringify(cart));
  }, [cart]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('vanyara_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Operations
  const handleAddToCart = (productWithVariant) => {
    const size = productWithVariant.selectedSize || productWithVariant.sizes?.[0] || 'Standard';
    const color = productWithVariant.selectedColor || productWithVariant.colors?.[0]?.name || 'Signature';
    const addQty = productWithVariant.qty || 1;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.id === productWithVariant.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].qty += addQty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...productWithVariant,
            selectedSize: size,
            selectedColor: color,
            qty: addQty
          }
        ];
      }
    });

    showToast(`Added "${productWithVariant.name}" to your bag`);
  };

  const handleUpdateQty = (itemToUpdate, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemToUpdate);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === itemToUpdate.id &&
          item.selectedSize === itemToUpdate.selectedSize &&
          item.selectedColor === itemToUpdate.selectedColor
            ? { ...item, qty: newQty }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.selectedSize === itemToRemove.selectedSize &&
            item.selectedColor === itemToRemove.selectedColor
          )
      )
    );
    showToast(`Removed from bag`);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed from saved pieces`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist`);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    showToast(`Removed from wishlist`);
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  // Nav actions
  const handleFocusSearch = () => {
    const shopEl = document.querySelector('#shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 450);
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    const shopEl = document.querySelector('#shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopScroll = () => {
    const shopEl = document.querySelector('#shop');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLookbookScroll = () => {
    const lookbookEl = document.querySelector('#lookbook');
    if (lookbookEl) lookbookEl.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="vanyara-app">
      {/* Announcement bar ticker */}
      <AnnouncementBar />

      {/* Sticky header navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        user={user}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onSearchFocus={handleFocusSearch}
        onSelectCategory={handleCategorySelect}
      />

      <main>
        {/* Editorial Hero */}
        <Hero
          onShopClick={handleShopScroll}
          onLookbookClick={handleLookbookScroll}
          onCategorySelect={handleCategorySelect}
        />

        {/* Featured Drop 01 Lookbook (Highlighting 4 user uploaded garments) */}
        <LookbookShowcase
          products={PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* Complete Product Catalog Grid with Search & Filters */}
        <ProductGrid
          products={PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wishlistIds={wishlist.map((w) => w.id)}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          searchInputRef={searchInputRef}
        />

        {/* Atelier Craft Standards & GSM breakdown */}
        <CraftSection />
      </main>

      {/* Luxury Footer with Newsletter */}
      <Footer
        onCategorySelect={handleCategorySelect}
        onNotify={showToast}
      />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={(data) => setCheckoutData(data)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={Boolean(checkoutData)}
        onClose={() => setCheckoutData(null)}
        checkoutData={checkoutData}
        user={user}
        onOrderComplete={(newOrder) => {
          setCart([]);
          if (newOrder) {
            setOrders((prev) => [newOrder, ...prev]);
          }
          showToast('Order confirmed! Check your email for tracking.');
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      {/* Customer VIP Dashboard */}
      <UserDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={user}
        orders={orders}
        onLogout={handleLogout}
        onOpenShop={handleShopScroll}
      />

      {/* Feedback Toasts */}
      <Toast toasts={toasts} />
    </div>
  );
}
