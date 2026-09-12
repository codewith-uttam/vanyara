/* ==========================================================================
   VANYARA — App logic
   Renders the product grid from PRODUCTS (data.js), handles category
   filtering, the cart drawer, header scroll state, mobile nav and the
   newsletter form. No build step, no dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ---- Helpers ----------------------------------------------------------- */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function svgSwatch([from, to], label) {
    return `
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="grad-${label}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${from}" />
            <stop offset="100%" stop-color="${to}" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#grad-${label})" />
        <g opacity="0.5" stroke="#f4efe4" stroke-width="1">
          <line x1="0" y1="120" x2="400" y2="90" />
          <line x1="0" y1="260" x2="400" y2="300" />
          <line x1="0" y1="400" x2="400" y2="430" />
        </g>
      </svg>`;
  }

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-visible"), 2200);
  }

  /* ---- Product grid -------------------------------------------------------- */

  let activeFilter = "all";

  function renderProducts() {
    const grid = $("#productGrid");
    const items =
      activeFilter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeFilter);

    if (items.length === 0) {
      grid.innerHTML = `<div class="empty-state">No pieces in this category yet — check back soon.</div>`;
      return;
    }

    grid.innerHTML = items
      .map(
        (p) => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media">
          ${svgSwatch(p.swatch, p.id)}
          ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
          <button class="product-quickadd" data-add="${p.id}" aria-label="Add ${p.name} to bag" title="Add to bag">
            <svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
        <div class="product-body">
          <span class="product-fabric">${p.fabric}</span>
          <h3 class="product-name">${p.name}</h3>
          <span class="product-price">${FMT.format(p.price)}</span>
        </div>
      </article>`
      )
      .join("");
  }

  function initFilters() {
    $("#filterRow").addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      $$(".chip", $("#filterRow")).forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderProducts();
    });
  }

  function initQuickAdd() {
    $("#productGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      const product = PRODUCTS.find((p) => p.id === btn.dataset.add);
      Cart.add(product.id);
      toast(`Added "${product.name}" to your bag`);
    });
  }

  /* ---- Cart drawer -------------------------------------------------------- */

  function renderCart() {
    const lines = Cart.lines();
    $("#cartCount").textContent = Cart.count();
    const wrap = $("#cartLines");

    if (lines.length === 0) {
      wrap.innerHTML = `<p class="cart-empty">Your bag is empty. Go find something you'll wear for years.</p>`;
    } else {
      wrap.innerHTML = lines
        .map(
          ({ product, qty }) => `
        <div class="cart-line" data-id="${product.id}">
          <div class="cart-line-media">${svgSwatch(product.swatch, "cart-" + product.id)}</div>
          <div>
            <div class="cart-line-name">${product.name}</div>
            <div class="cart-line-price">${FMT.format(product.price)}</div>
            <div class="qty-control">
              <button data-qty="-1" aria-label="Decrease quantity">−</button>
              <span>${qty}</span>
              <button data-qty="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="cart-line-remove" data-remove>Remove</button>
        </div>`
        )
        .join("");
    }

    $("#cartSubtotal").textContent = FMT.format(Cart.subtotal());
  }

  function openCart() {
    $("#cartDrawer").classList.add("is-open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $("#overlay").classList.add("is-open");
  }

  function closeCart() {
    $("#cartDrawer").classList.remove("is-open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $("#overlay").classList.remove("is-open");
  }

  function initCart() {
    $("#cartToggle").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#overlay").addEventListener("click", () => {
      closeCart();
      closeMenu();
    });

    $("#cartLines").addEventListener("click", (e) => {
      const line = e.target.closest(".cart-line");
      if (!line) return;
      const id = line.dataset.id;
      const current = Cart.lines().find((l) => l.product.id === id);
      if (!current) return;

      if (e.target.closest("[data-qty]")) {
        const delta = Number(e.target.closest("[data-qty]").dataset.qty);
        Cart.setQty(id, current.qty + delta);
      } else if (e.target.closest("[data-remove]")) {
        Cart.remove(id);
      }
    });

    $("#checkoutBtn").addEventListener("click", () => {
      if (Cart.count() === 0) {
        toast("Your bag is empty");
        return;
      }
      toast("Demo storefront — checkout isn't wired to a payment processor");
    });

    document.addEventListener("cart:change", renderCart);
    renderCart();
  }

  /* ---- Header / mobile nav ------------------------------------------------- */

  function initHeader() {
    const header = $("#siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function closeMenu() {
    $("#mainNav").classList.remove("is-open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
  }

  function initMenu() {
    const nav = $("#mainNav");
    const toggle = $("#menuToggle");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    $$("#mainNav a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---- Marquee strip -------------------------------------------------------- */

  function initStrip() {
    const phrases = [
      "FABRIC FIRST",
      "SMALL BATCHES",
      "HONEST PRICING",
      "TIMELESS STYLE",
      "MODERN YOU",
      "MADE TO KEEP"
    ];
    const track = $("#stripTrack");
    const full = [...phrases, ...phrases]
      .map((p) => `<span>${p}</span>`)
      .join("");
    track.innerHTML = full + full; // duplicated once more for seamless loop width
  }

  /* ---- About visual ---------------------------------------------------------- */

  function initAboutVisual() {
    $("#aboutVisual").innerHTML = svgSwatch(["#1c1c1e", "#8a6b2f"], "about");
    $("#statCount").textContent = PRODUCTS.length;
  }

  /* ---- Newsletter (demo only, no backend) ------------------------------------ */

  function initNewsletter() {
    $("#newsletterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      $("#newsletterNote").textContent = "Thanks — you're on the list.";
      e.target.reset();
    });
  }

  /* ---- Boot -------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();
    renderProducts();
    initFilters();
    initQuickAdd();
    initCart();
    initHeader();
    initMenu();
    initStrip();
    initAboutVisual();
    initNewsletter();
  });
})();
