// VANYARA — Optimized Local Product Catalog
export const CATEGORIES = [
  { id: "all", name: "All Pieces" },
  { id: "hoodies", name: "Heavyweight Hoodies" },
  { id: "oversized-tees", name: "Oversized Tees" },
  { id: "boxy-tees", name: "Boxy-Fit Tees" },
  { id: "bottoms", name: "Pants & Cargos" },
  { id: "outerwear", name: "Jackets & Overshirts" }
];

export const PRODUCTS = [
  {
    id: "vy-h01",
    name: "Heavyweight Strength Hoodie",
    category: "hoodies",
    subtitle: "Built for Everyday Strength",
    price: 4499,
    originalPrice: 5499,
    tag: "NEW DROP",
    isHeroDrop: true,
    fabric: "480 GSM Loopback French Terry",
    fit: "Relaxed Structured Fit",
    image: "/images/hoodie-strength-women.jpg",
    secondaryImage: "/images/hoodie-presence-men.jpg",
    description: "Made from premium 480 GSM heavyweight fabric, the Vanyara Hoodie offers a structured drape with all-day comfort. Designed for those who value quality, versatility, and timeless streetwear presence.",
    highlights: [
      "480 GSM Heavyweight Loopback Terry",
      "Adjustable Hood with Reinforced Drawstrings",
      "Ultra-Durable Ribbed Cuffs & Hem",
      "Deep Kangaroo Utility Pocket",
      "Pre-shrunk for Zero Size Shift"
    ],
    colors: [
      { name: "Onyx Black", hex: "#111112", inStock: true },
      { name: "Heather Grey", hex: "#7a7b7e", inStock: true },
      { name: "Sand Cream", hex: "#d8cebe", inStock: true }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 48
  },
  {
    id: "vy-t01",
    name: "Vanyara 'Loading' Oversized Tee",
    category: "oversized-tees",
    subtitle: "Built Bigger. Made to Stand Out.",
    price: 2299,
    originalPrice: 2899,
    tag: "BESTSELLER",
    isHeroDrop: true,
    fabric: "280 GSM Combed Ring-Spun Cotton",
    fit: "Oversized Fit with Dropped Shoulders",
    image: "/images/tee-loading-oversized.jpg",
    secondaryImage: "/images/tee-boxy-silhouette.jpg",
    description: "Relaxed proportions, dropped shoulders, and a premium heavy-weight feel. The Vanyara Oversized Tee brings effortless architecture to everyday streetwear, accented by the signature gold foil progress emblem.",
    highlights: [
      "280 GSM Heavyweight Combed Cotton",
      "Luxury Brushed Gold 'Loading...' Accent",
      "Dropped Shoulders for a Bold Stance",
      "Thick 32mm Bound Collar",
      "Loose Fit, Clean Lines, No Compromise"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#0f0f10", inStock: true },
      { name: "Chalk White", hex: "#eceae5", inStock: true },
      { name: "Mineral Slate", hex: "#35383f", inStock: true }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.95,
    reviewsCount: 64
  },
  {
    id: "vy-t02",
    name: "Boxy-Fit Silhouette Tee",
    category: "boxy-tees",
    subtitle: "Clean Cut. Strong Silhouette.",
    price: 1999,
    originalPrice: 2499,
    tag: "ESSENTIAL",
    isHeroDrop: true,
    fabric: "260 GSM Structured Matte Cotton",
    fit: "Cropped Boxy Silhouette",
    image: "/images/tee-boxy-silhouette.jpg",
    secondaryImage: "/images/tee-loading-oversized.jpg",
    description: "A cropped, structured drape designed to hold its square shape. The Vanyara Boxy-Fit Tee brings effortless precision to everyday streetwear with zero torso cling.",
    highlights: [
      "Cropped Length for Natural Pant Proportions",
      "260 GSM Premium Heavy Fabric",
      "Strong Shoulders with Architectural Drape",
      "Thick Ribbed Collar with Zero Sagging",
      "Less Distractions. More Essentials."
    ],
    colors: [
      { name: "Deep Matte Black", hex: "#121213", inStock: true },
      { name: "Raw Umber", hex: "#48392b", inStock: true },
      { name: "Sage Mist", hex: "#6c776e", inStock: true }
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.88,
    reviewsCount: 39
  },
  {
    id: "vy-h02",
    name: "Signature Presence Heavyweight Hoodie",
    category: "hoodies",
    subtitle: "Heavy on Comfort. Strong on Presence.",
    price: 4499,
    originalPrice: 5499,
    tag: "SIGNATURE",
    isHeroDrop: true,
    fabric: "500 GSM Brushed Fleece French Terry",
    fit: "Bold Boxy Structured Stance",
    image: "/images/hoodie-presence-men.jpg",
    secondaryImage: "/images/hoodie-strength-women.jpg",
    description: "Cut from premium heavyweight fabric, the Vanyara Signature Hoodie delivers ultimate comfort with a structured feel built for everyday streetwear. Built for bolder days. Made to stay.",
    highlights: [
      "500 GSM Ultra-Dense French Terry",
      "Double-Layer Stiff Hood without Eyelets",
      "Tonal Micro Monogram Center Embroidery",
      "Heavy Ribbed Waistband and Cuffs",
      "Durable & Built for Everyday Strength"
    ],
    colors: [
      { name: "Pitch Black", hex: "#0a0a0a", inStock: true },
      { name: "Washed Charcoal", hex: "#2f2f33", inStock: true },
      { name: "Earthy Olive", hex: "#3b3e34", inStock: true }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.96,
    reviewsCount: 72
  },
  {
    id: "vy-b01",
    name: "Tactical Wide-Leg Cargo Trousers",
    category: "bottoms",
    subtitle: "Architectural Streetwear Utility",
    price: 3999,
    originalPrice: 4999,
    tag: "HOT",
    fabric: "320 GSM Double-Weave Cotton Twill",
    fit: "Relaxed Wide-Leg with Cinch Hem",
    image: "/images/cargo-pants.jpg",
    secondaryImage: "/images/hoodie-presence-men.jpg",
    description: "Architectural cargo trousers cut from structured double-weave twill. Features 6 ergonomic utility pockets, matte black hardware, and adjustable bungee cuffs to drape seamlessly over boots or chunky sneakers.",
    highlights: [
      "6 Deep Ergonomic Utility Pockets",
      "Matte Black Metal D-Ring Hardware",
      "Reinforced Double-Layer Knee Construction",
      "Adjustable Ankle Bungee Toggles",
      "Internal Drawcord Elastic Waist"
    ],
    colors: [
      { name: "Stealth Black", hex: "#151517", inStock: true },
      { name: "Combat Green", hex: "#2d3329", inStock: true },
      { name: "Concrete Grey", hex: "#525458", inStock: true }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.85,
    reviewsCount: 31
  },
  {
    id: "vy-o01",
    name: "Structured Twill Work Overshirt",
    category: "outerwear",
    subtitle: "Layered Streetwear Architecture",
    price: 4299,
    originalPrice: 5199,
    tag: "LIMITED",
    fabric: "380 GSM Heavy Milled Twill",
    fit: "Tailored Boxy Shacket",
    image: "/images/heavy-overshirt.jpg",
    secondaryImage: "/images/cargo-pants.jpg",
    description: "A tailored streetwear overshirt crafted from heavyweight milled twill. Features polished brass-gold hardware, gusseted chest flap pockets, and an internal pocket for your phone or passport.",
    highlights: [
      "Polished Gold-Tone Metal Two-Way Zipper",
      "Dual Gusseted 3D Chest Pockets",
      "Heavy Structured Collar that Holds Shape",
      "Reinforced Sleeve Plackets with Snap Closures"
    ],
    colors: [
      { name: "Midnight Black", hex: "#141416", inStock: true },
      { name: "Camel Taupe", hex: "#8c7251", inStock: true }
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 27
  },
  {
    id: "vy-c01",
    name: "Acid-Washed Vintage Crewneck",
    category: "hoodies",
    subtitle: "Mineral-Washed Slouch Fit",
    price: 3499,
    originalPrice: 4299,
    tag: "POPULAR",
    fabric: "450 GSM Heavy French Terry",
    fit: "Oversized Vintage Slouch",
    image: "/images/washed-crewneck.jpg",
    secondaryImage: "/images/hoodie-strength-women.jpg",
    description: "Individually hand-treated with mineral stones to produce subtle faded highs and lows. Ultra-soft interior with dropped shoulders and subtle micro-distressing at the neckline.",
    highlights: [
      "Individual Mineral Wash Process",
      "Micro-Distressed Collar Edge",
      "Tonal Vanyara Chest Emblem",
      "Heavy 450 GSM Loopback Terry"
    ],
    colors: [
      { name: "Acid Charcoal", hex: "#3a3b3d", inStock: true },
      { name: "Washed Moss", hex: "#43473f", inStock: true },
      { name: "Vintage Clay", hex: "#614e44", inStock: true }
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.87,
    reviewsCount: 43
  }
];

export const formatINR = (val) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
};
