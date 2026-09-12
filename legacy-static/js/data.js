/* ==========================================================================
   VANYARA — Product data
   This is the single source of truth for the catalog. To add a product,
   add an object to PRODUCTS below — the grid, filters and cart all read
   from this array, so nothing else needs to change.
   ========================================================================== */

const PRODUCTS = [
  {
    id: "vy-001",
    name: "Onyx Tailored Blazer",
    category: "women",
    price: 6499,
    swatch: ["#1c1c1e", "#3a3a3d"],
    tag: "New",
    fabric: "Wool blend",
    description:
      "A sharp-shouldered blazer cut from a fluid wool blend, built to move between the studio and the street."
  },
  {
    id: "vy-002",
    name: "Amber Silk Wrap Dress",
    category: "women",
    price: 5299,
    swatch: ["#8a5a2b", "#c98a3f"],
    tag: "Bestseller",
    fabric: "Mulberry silk",
    description:
      "Bias-cut mulberry silk that drapes rather than clings, finished with a self-tie waist."
  },
  {
    id: "vy-003",
    name: "Ivory Column Slip",
    category: "women",
    price: 3899,
    swatch: ["#e7e0d2", "#bfb49a"],
    tag: null,
    fabric: "Washed satin",
    description:
      "A quiet, columnar slip in washed satin — the kind of piece that disappears until someone asks where it's from."
  },
  {
    id: "vy-004",
    name: "Charcoal Wide-Leg Trouser",
    category: "men",
    price: 4599,
    swatch: ["#2b2b2d", "#55555a"],
    tag: null,
    fabric: "Brushed twill",
    description:
      "Full through the leg, tapered at the ankle — brushed twill that holds its line all day."
  },
  {
    id: "vy-005",
    name: "Gold-Thread Overshirt",
    category: "men",
    price: 3999,
    swatch: ["#4a3c1f", "#a9822f"],
    tag: "New",
    fabric: "Cotton twill",
    description:
      "A structured overshirt with a single thread of gold running through the weave — worn open or buttoned through."
  },
  {
    id: "vy-006",
    name: "Slate Merino Sweater",
    category: "men",
    price: 3299,
    swatch: ["#3f4145", "#6c6f74"],
    tag: "Bestseller",
    fabric: "Merino wool",
    description:
      "Fine-gauge merino in a slate that reads dark indoors and soft in daylight."
  },
  {
    id: "vy-007",
    name: "Vanyara Signet Cufflinks",
    category: "accessories",
    price: 2199,
    swatch: ["#6b5326", "#d4af6a"],
    tag: null,
    fabric: "Brass, gold finish",
    description:
      "The house monogram, cast in brass and finished by hand — a quiet detail for a cuff."
  },
  {
    id: "vy-008",
    name: "Woven Leather Belt",
    category: "accessories",
    price: 1899,
    swatch: ["#2a1c14", "#5c3d29"],
    tag: null,
    fabric: "Full-grain leather",
    description:
      "Hand-woven full-grain leather on a solid brass buckle, built to outlast the trend it started in."
  },
  {
    id: "vy-009",
    name: "Ember Silk Scarf",
    category: "accessories",
    price: 1599,
    swatch: ["#7a2e1d", "#c96a3e"],
    tag: "New",
    fabric: "Silk twill",
    description:
      "Hand-rolled silk twill in a warm ember tone, printed with a house motif you'll only notice up close."
  }
];

const FMT = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

/* ---- Tiny cart store, persisted to localStorage ------------------------ */
const Cart = {
  key: "vanyara_cart_v1",

  read() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || {};
    } catch {
      return {};
    }
  },

  write(state) {
    localStorage.setItem(this.key, JSON.stringify(state));
    document.dispatchEvent(new CustomEvent("cart:change", { detail: state }));
  },

  add(id) {
    const state = this.read();
    state[id] = (state[id] || 0) + 1;
    this.write(state);
  },

  setQty(id, qty) {
    const state = this.read();
    if (qty <= 0) {
      delete state[id];
    } else {
      state[id] = qty;
    }
    this.write(state);
  },

  remove(id) {
    this.setQty(id, 0);
  },

  count() {
    return Object.values(this.read()).reduce((a, b) => a + b, 0);
  },

  lines() {
    const state = this.read();
    return Object.entries(state)
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        return product ? { product, qty } : null;
      })
      .filter(Boolean);
  },

  subtotal() {
    return this.lines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
  }
};
