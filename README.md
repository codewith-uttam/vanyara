# VANYARA — Luxury Streetwear & Heavyweight Essentials Storefront

[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

A modern, high-performance **React.js** e-commerce storefront for **Vanyara** ("Built for Bolder Days. Made to Stay."). Engineered with **Vite**, architectural streetwear aesthetic, and an interactive catalog featuring custom 480–500 GSM heavyweight drop pieces.

---

## What's Inside

```
vanyara 1/
├── LICENSE                     # MIT Open-Source Web License
├── README.md                   # Project documentation
├── index.html                  # Vite HTML entry with Cormorant Garamond & Jost fonts
├── package.json                # Project dependencies and build scripts
├── vite.config.js              # Vite server & build configuration
├── public/
│   └── images/                 # High-resolution local brand photography
│       ├── logo.jpg            # Vanyara brand monogram
│       ├── hoodie-strength-women.jpg # Heavyweight Strength Hoodie
│       ├── tee-loading-oversized.jpg # "Loading" Oversized Tee
│       ├── tee-boxy-silhouette.jpg   # Boxy-Fit Silhouette Tee
│       ├── hoodie-presence-men.jpg   # Signature Presence Hoodie
│       ├── cargo-pants.jpg           # Tactical Wide-Leg Cargos
│       ├── heavy-overshirt.jpg       # Structured Twill Overshirt
│       └── washed-crewneck.jpg       # Acid-Washed Vintage Crewneck
├── src/
│   ├── main.jsx                # React application mount
│   ├── App.jsx                 # Main stateful application controller
│   ├── App.css                 # Hardware-accelerated luxury styling system
│   ├── index.css               # Global tokens, reset and scrollbars
│   ├── data/
│   │   └── products.js         # Product dataset with categories & INR formatter
│   └── components/
│       ├── AnnouncementBar.jsx # Continuous marquee ticker with promos
│       ├── Navbar.jsx          # Sticky glassmorphic navbar with search & cart badges
│       ├── Hero.jsx            # Luxury editorial hero banner with quick-jump pills
│       ├── LookbookShowcase.jsx# Editorial 4-piece hero garment feature with centered prices
│       ├── ProductCard.jsx     # Card with image hover swap, size pills & color swatches
│       ├── ProductGrid.jsx     # Live category filters, instant search, and sorting
│       ├── ProductQuickView.jsx# Full garment inspector modal with image zoom & specs
│       ├── CartDrawer.jsx      # Slide-over cart with free shipping meter & coupon codes
│       ├── CheckoutModal.jsx   # Checkout simulation with address form & payment options
│       ├── WishlistDrawer.jsx  # Slide-over saved pieces drawer
│       ├── CraftSection.jsx    # Atelier GSM standards & small-batch philosophy
│       ├── Toast.jsx           # Animated feedback alerts
│       └── Footer.jsx          # Brand footer with newsletter subscription
└── legacy-static/              # Archived static HTML/CSS/JS version for reference
```

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser. Hot Module Replacement (HMR) is enabled.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in `dist/` (build time <1 second, ~60 kB gzipped).

---

## Key Features

- **High-Performance React & Vite**: Instant page loads, zero CLS, and hardware-accelerated animations.
- **Editorial Lookbook Drop 01**: Showcases the 4 signature hero poster pieces with centered pricing, clean typography, and responsive action buttons.
- **Dynamic Category Filtering**: Live counts on all chips (*All Pieces*, *Heavyweight Hoodies*, *Oversized Tees*, *Boxy-Fit Tees*, *Pants & Cargos*, *Jackets & Overshirts*).
- **Instant Search & Multi-Sort**: Real-time keyword search across fabric, fit, and titles with one-click filter reset.
- **Quick View Modal**: Interactive garment inspector with multi-image gallery, fabric weight (GSM), size guide, and color selectors.
- **Slide-Over Cart Drawer**:
  - Live item count and quantity modifiers (+ / -).
  - Dynamic Free Express Shipping meter (unlocked at ₹2,999).
  - Promo coupon support (try code `VANYARA10` for 10% discount).
- **Checkout Simulator**: Full address form, payment options (Instant UPI, Cards, NetBanking, COD), and realistic order confirmation screen with a generated Order Reference ID.
- **Wishlist Drawer**: Bookmark favorites with one-click "Move to Bag".

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Uttam Sharma (Vanyara).
