/* =====================================================
   LUXEWEAR — Main Script
   Sections:
   1. Product Data
   2. State
   3. DOM References
   4. Navbar
   5. Hero / Filter Buttons
   6. Product Rendering
   7. Product Filtering & Search
   8. Wishlist
   9. Quick View Modal
   10. Cart
   11. Cart UI
   12. Checkout Modal
   13. Newsletter
   14. Toast
   15. Scroll Reveal
   16. Init
===================================================== */

'use strict';

/* ===== 1. PRODUCT DATA ===== */
const PRODUCTS = [
  {
    id: 1,
    name: 'Oversized Essential T-Shirt',
    category: 'men',
    categoryLabel: 'Men',
    price: 1299,
    originalPrice: null,
    isSale: false,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=75',
    description: 'A relaxed, oversized silhouette crafted from 100% premium combed cotton. Soft, breathable, and built for all-day comfort. Available in multiple colourways.',
  },
  {
    id: 2,
    name: 'Premium Linen Shirt',
    category: 'men',
    categoryLabel: 'Men',
    price: 2499,
    originalPrice: null,
    isSale: false,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=75',
    description: 'Effortlessly elegant. This premium linen shirt features a relaxed fit and a crisp collar. Perfect for warm days, dressed up or down.',
  },
  {
    id: 3,
    name: 'Relaxed Fit Jeans',
    category: 'men',
    categoryLabel: 'Men',
    price: 2999,
    originalPrice: 3799,
    isSale: true,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=75',
    description: 'Classic five-pocket jeans in a relaxed, straight cut. Made from slightly stretchy denim for all-day ease without compromising on style.',
  },
  {
    id: 4,
    name: 'Classic Bomber Jacket',
    category: 'men',
    categoryLabel: 'Men',
    price: 3999,
    originalPrice: null,
    isSale: false,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=75',
    description: 'A modern take on the iconic bomber silhouette. Features ribbed cuffs, a clean zip-front, and a smooth satin-touch lining. A year-round wardrobe staple.',
  },
  {
    id: 5,
    name: 'Ribbed Knit Top',
    category: 'women',
    categoryLabel: 'Women',
    price: 1899,
    originalPrice: 2499,
    isSale: true,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=75',
    description: 'Slim-fitted ribbed knit top with a subtle stretch for a flattering silhouette. Easy to layer or wear alone — a closet essential all year round.',
  },
  {
    id: 6,
    name: 'Wide Leg Trousers',
    category: 'women',
    categoryLabel: 'Women',
    price: 2699,
    originalPrice: null,
    isSale: false,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=75',
    description: 'Fluid wide-leg trousers with an elasticated waist. The relaxed, floor-grazing silhouette exudes effortless sophistication whether styled casually or formally.',
  },
  {
    id: 7,
    name: 'Essential Hoodie',
    category: 'women',
    categoryLabel: 'Women',
    price: 2299,
    originalPrice: null,
    isSale: false,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=75',
    description: 'A premium heavyweight hoodie in garment-dyed cotton fleece. The dropped shoulder and oversized cut create the perfect relaxed feel for everyday wear.',
  },
  {
    id: 8,
    name: 'Minimal Overshirt',
    category: 'men',
    categoryLabel: 'Men',
    price: 2799,
    originalPrice: 3499,
    isSale: true,
    image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=75',
    description: 'A versatile overshirt in brushed cotton twill. Wear open as a lightweight jacket or buttoned as a shirt. Relaxed fit with chest patch pockets.',
  },
];

/* ===== 2. STATE ===== */
let cart = JSON.parse(localStorage.getItem('luxewear_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('luxewear_wishlist')) || [];
let activeFilter = 'all';
let searchQuery = '';
let currentProductId = null;
let modalQty = 1;
let selectedSize = 'M';

/* ===== 3. DOM REFERENCES ===== */
const navbar         = document.getElementById('navbar');
const hamburgerBtn   = document.getElementById('hamburgerBtn');
const mobileMenu     = document.getElementById('mobileMenu');
const searchToggleBtn= document.getElementById('searchToggleBtn');
const searchBar      = document.getElementById('searchBar');
const searchInput    = document.getElementById('searchInput');
const searchCloseBtn = document.getElementById('searchCloseBtn');
const productGrid    = document.getElementById('productGrid');
const noResults      = document.getElementById('noResults');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterTabs     = document.querySelectorAll('.filter-tab');

// Cart
const cartToggleBtn  = document.getElementById('cartToggleBtn');
const cartCloseBtn   = document.getElementById('cartCloseBtn');
const cartDrawer     = document.getElementById('cartDrawer');
const cartOverlay    = document.getElementById('cartOverlay');
const cartBadge      = document.getElementById('cartBadge');
const cartEmpty      = document.getElementById('cartEmpty');
const cartItems      = document.getElementById('cartItems');
const cartFooter     = document.getElementById('cartFooter');
const cartSubtotal   = document.getElementById('cartSubtotal');
const cartItemCount  = document.getElementById('cartItemCount');
const cartContinueBtn= document.getElementById('cartContinueBtn');
const clearCartBtn   = document.getElementById('clearCartBtn');
const checkoutBtn    = document.getElementById('checkoutBtn');

// Quick View Modal
const modalOverlay   = document.getElementById('modalOverlay');
const modalCloseBtn  = document.getElementById('modalCloseBtn');
const modalImage     = document.getElementById('modalImage');
const modalBadge     = document.getElementById('modalBadge');
const modalCategory  = document.getElementById('modalCategory');
const modalProductName = document.getElementById('modalProductName');
const modalPrice     = document.getElementById('modalPrice');
const modalOriginalPrice = document.getElementById('modalOriginalPrice');
const modalDesc      = document.getElementById('modalDesc');
const modalQtyMinus  = document.getElementById('modalQtyMinus');
const modalQtyPlus   = document.getElementById('modalQtyPlus');
const modalQtyValue  = document.getElementById('modalQtyValue');
const modalAddToCart = document.getElementById('modalAddToCart');
const sizeBtns       = document.querySelectorAll('.size-btn');

// Checkout Modal
const checkoutOverlay  = document.getElementById('checkoutOverlay');
const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
const checkoutCloseBtn2= document.getElementById('checkoutCloseBtn2');

// Newsletter
const newsletterForm    = document.getElementById('newsletterForm');
const newsletterEmail   = document.getElementById('newsletterEmail');
const newsletterError   = document.getElementById('newsletterError');
const newsletterSuccess = document.getElementById('newsletterSuccess');

// Toast
const toast = document.getElementById('toast');

/* ===== 4. NAVBAR ===== */

// Scroll effect
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger toggle
hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));

  // Collapse search when hamburger opens
  if (isOpen) closeSearch();
});

// Close mobile menu when a link is clicked
mobileMenu.addEventListener('click', (e) => {
  const link = e.target.closest('.mobile-nav-link');
  if (!link) return;

  const filter = link.dataset.filter;
  if (filter) {
    e.preventDefault();
    closeMobileMenu();
    applyFilter(filter);
    document.getElementById('new-arrivals').scrollIntoView({ behavior: 'smooth' });
  } else {
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

// Search toggle
searchToggleBtn.addEventListener('click', () => {
  const isOpen = searchBar.classList.toggle('open');
  searchBar.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) {
    searchInput.focus();
    closeMobileMenu();
  } else {
    clearSearch();
  }
});

searchCloseBtn.addEventListener('click', closeSearch);

function closeSearch() {
  searchBar.classList.remove('open');
  searchBar.setAttribute('aria-hidden', 'true');
  clearSearch();
}

// Live search
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  renderProducts();
});

// Close search on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (searchBar.classList.contains('open')) closeSearch();
    if (modalOverlay.classList.contains('open')) closeQuickView();
    if (checkoutOverlay.classList.contains('open')) closeCheckout();
    if (cartDrawer.classList.contains('open')) closeCart();
  }
});

/* ===== 5. HERO / NAV FILTER BUTTONS ===== */

// Nav links with data-filter
document.querySelectorAll('[data-filter]').forEach(el => {
  el.addEventListener('click', (e) => {
    const filter = el.dataset.filter;
    if (!filter) return;

    // Only intercept anchor-like elements pointing to #products
    const href = el.getAttribute('href');
    if (href && href.includes('#products')) {
      e.preventDefault();
      applyFilter(filter);
      document.getElementById('new-arrivals').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== 6. PRODUCT RENDERING ===== */

/**
 * Build and inject product card HTML
 */
function renderProducts() {
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;

  productGrid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const discountPercent = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

    return `
      <article class="product-card reveal" role="listitem" data-id="${product.id}" data-category="${product.category}">
        <div class="product-img-wrap">
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            class="product-img"
          />
          ${product.isSale && discountPercent ? `
            <div class="product-badge">
              <span class="sale-badge">${discountPercent}% OFF</span>
            </div>
          ` : ''}
          <button
            class="wishlist-btn ${isWishlisted ? 'active' : ''}"
            data-id="${product.id}"
            aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          >
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <button class="quick-view-trigger" data-id="${product.id}" aria-label="Quick view ${product.name}">
            Quick View
          </button>
        </div>
        <div class="product-info">
          <p class="product-category">${product.categoryLabel}</p>
          <h3 class="product-name" data-id="${product.id}">${product.name}</h3>
          <div class="product-price-row">
            <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.originalPrice
              ? `<span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>`
              : ''}
          </div>
          <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">
            <i class="fa-regular fa-bag-shopping"></i> Add to Cart
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach card-level event listeners
  attachProductEvents();

  // Trigger scroll reveal for newly rendered cards
  observeRevealElements();
}

/**
 * Attach event listeners to product cards
 */
function attachProductEvents() {
  // Quick view on image / product name click
  productGrid.querySelectorAll('.quick-view-trigger, .product-name').forEach(el => {
    el.addEventListener('click', () => openQuickView(Number(el.dataset.id)));
  });

  productGrid.querySelectorAll('.product-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', (e) => {
      // Only if user didn't click wishlist or quick-view button
      if (!e.target.closest('.wishlist-btn') && !e.target.closest('.quick-view-trigger')) {
        const card = wrap.closest('.product-card');
        if (card) openQuickView(Number(card.dataset.id));
      }
    });
  });

  // Wishlist
  productGrid.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(Number(btn.dataset.id));
    });
  });

  // Add to cart
  productGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = getProductById(Number(btn.dataset.id));
      if (product) {
        addToCart(product, 'M', 1);
        showToast(`${product.name} added to cart`);
      }
    });
  });
}

/* ===== 7. PRODUCT FILTERING & SEARCH ===== */

function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    const matchesFilter =
      activeFilter === 'all' ||
      product.category === activeFilter ||
      (activeFilter === 'sale' && product.isSale);

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.categoryLabel.toLowerCase().includes(searchQuery);

    return matchesFilter && matchesSearch;
  });
}

function applyFilter(filter) {
  activeFilter = filter;
  searchQuery  = '';
  searchInput.value = '';

  // Update tab UI
  filterTabs.forEach(tab => {
    const isActive = tab.dataset.filter === filter;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  renderProducts();
}

function clearSearch() {
  searchQuery = '';
  searchInput.value = '';
  renderProducts();
}

// Filter tab clicks
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
});

// Clear search from no-results button
clearSearchBtn.addEventListener('click', () => {
  closeSearch();
  applyFilter('all');
});

/* ===== 8. WISHLIST ===== */

function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  const product = getProductById(id);

  if (idx === -1) {
    wishlist.push(id);
    showToast(`${product?.name} added to wishlist`);
  } else {
    wishlist.splice(idx, 1);
    showToast(`${product?.name} removed from wishlist`);
  }

  saveWishlist();
  // Re-render to update heart icon
  renderProducts();
}

function saveWishlist() {
  localStorage.setItem('luxewear_wishlist', JSON.stringify(wishlist));
}

/* ===== 9. QUICK VIEW MODAL ===== */

function openQuickView(id) {
  const product = getProductById(id);
  if (!product) return;

  currentProductId = id;
  modalQty = 1;
  selectedSize = 'M';

  // Populate modal
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = product.categoryLabel;
  modalProductName.textContent = product.name;
  modalPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  modalDesc.textContent = product.description;
  modalQtyValue.textContent = '1';

  if (product.originalPrice) {
    modalOriginalPrice.textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;
    modalOriginalPrice.hidden = false;
  } else {
    modalOriginalPrice.textContent = '';
    modalOriginalPrice.hidden = true;
  }

  if (product.isSale) {
    const disc = Math.round((1 - product.price / product.originalPrice) * 100);
    modalBadge.textContent = `${disc}% OFF`;
    modalBadge.hidden = false;
  } else {
    modalBadge.hidden = true;
  }

  // Reset size selection
  sizeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === 'M');
  });

  // Open
  modalOverlay.hidden = false;
  requestAnimationFrame(() => modalOverlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
  modalCloseBtn.focus();
}

function closeQuickView() {
  modalOverlay.classList.remove('open');
  setTimeout(() => { modalOverlay.hidden = true; }, 300);
  document.body.style.overflow = '';
  currentProductId = null;
}

// Modal close events
modalCloseBtn.addEventListener('click', closeQuickView);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeQuickView();
});

// Size selection
sizeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
  });
});

// Quantity controls
modalQtyMinus.addEventListener('click', () => {
  if (modalQty > 1) {
    modalQty--;
    modalQtyValue.textContent = modalQty;
  }
});

modalQtyPlus.addEventListener('click', () => {
  if (modalQty < 10) {
    modalQty++;
    modalQtyValue.textContent = modalQty;
  }
});

// Add to cart from modal
modalAddToCart.addEventListener('click', () => {
  const product = getProductById(currentProductId);
  if (!product) return;

  addToCart(product, selectedSize, modalQty);
  showToast(`${product.name} added to cart`);
  closeQuickView();
  openCart();
});

/* ===== 10. CART ===== */

/**
 * Add or increment a product in the cart
 */
function addToCart(product, size = 'M', qty = 1) {
  const key = `${product.id}_${size}`;
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 10);
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      category: product.categoryLabel,
      price: product.price,
      image: product.image,
      size,
      qty,
    });
  }

  saveCart();
  updateCartBadge();
}

function removeFromCart(key) {
  cart = cart.filter(item => item.key !== key);
  saveCart();
  updateCartBadge();
  renderCartUI();
}

function updateCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;

  item.qty = Math.max(1, Math.min(item.qty + delta, 10));
  saveCart();
  renderCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartBadge();
  renderCartUI();
}

function saveCart() {
  localStorage.setItem('luxewear_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const count = getCartItemCount();
  cartBadge.textContent = count;

  if (count > 0) {
    cartBadge.classList.add('bump');
    cartBadge.addEventListener('animationend', () => cartBadge.classList.remove('bump'), { once: true });
  }
}

/* ===== 11. CART UI ===== */

function openCart() {
  renderCartUI();
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('visible');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  cartCloseBtn.focus();
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('visible');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderCartUI() {
  const count = getCartItemCount();

  cartItemCount.textContent = count > 0 ? `(${count})` : '';

  if (cart.length === 0) {
    cartEmpty.hidden = false;
    cartItems.innerHTML = '';
    cartFooter.hidden = true;
    return;
  }

  cartEmpty.hidden = true;
  cartFooter.hidden = false;

  cartItems.innerHTML = cart.map(item => `
    <li class="cart-item" data-key="${item.key}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">Size: ${item.size} &nbsp;·&nbsp; ${item.category}</p>
        <div class="cart-item-qty">
          <button class="cart-qty-btn" data-key="${item.key}" data-delta="-1" aria-label="Decrease quantity">
            <i class="fa-regular fa-minus"></i>
          </button>
          <span class="cart-item-count">${item.qty}</span>
          <button class="cart-qty-btn" data-key="${item.key}" data-delta="1" aria-label="Increase quantity">
            <i class="fa-regular fa-plus"></i>
          </button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
        <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        <button class="cart-remove-btn" data-key="${item.key}" aria-label="Remove ${item.name} from cart">
          <i class="fa-regular fa-xmark"></i>
        </button>
      </div>
    </li>
  `).join('');

  cartSubtotal.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;

  // Attach cart item events
  cartItems.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateCartQty(btn.dataset.key, Number(btn.dataset.delta));
    });
  });

  cartItems.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
  });
}

// Cart open/close events
cartToggleBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

cartContinueBtn.addEventListener('click', () => {
  closeCart();
  document.getElementById('new-arrivals').scrollIntoView({ behavior: 'smooth' });
});

clearCartBtn.addEventListener('click', () => {
  if (confirm('Clear your entire cart?')) clearCart();
});

/* ===== 12. CHECKOUT MODAL ===== */

checkoutBtn.addEventListener('click', openCheckout);

function openCheckout() {
  closeCart();
  checkoutOverlay.hidden = false;
  requestAnimationFrame(() => checkoutOverlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  checkoutOverlay.classList.remove('open');
  setTimeout(() => { checkoutOverlay.hidden = true; }, 300);
  document.body.style.overflow = '';
}

checkoutCloseBtn.addEventListener('click', closeCheckout);
checkoutCloseBtn2.addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', (e) => {
  if (e.target === checkoutOverlay) closeCheckout();
});

/* ===== 13. NEWSLETTER ===== */

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterEmail.value.trim();

  newsletterError.textContent = '';
  newsletterSuccess.hidden = true;

  if (!email) {
    newsletterError.textContent = 'Please enter your email address.';
    return;
  }

  if (!isValidEmail(email)) {
    newsletterError.textContent = 'Please enter a valid email address.';
    return;
  }

  // Simulate success
  newsletterSuccess.hidden = false;
  newsletterEmail.value = '';

  // Hide success after 6 seconds
  setTimeout(() => { newsletterSuccess.hidden = true; }, 6000);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== 14. TOAST ===== */

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ===== 15. SCROLL REVEAL ===== */

function observeRevealElements() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ===== HELPERS ===== */

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

/* ===== 16. INIT ===== */

function init() {
  // Render products
  renderProducts();

  // Update cart badge from localStorage
  updateCartBadge();

  // Scroll reveal for static sections
  document.querySelectorAll('.category-card, .featured-grid, .promo-content').forEach(el => {
    el.classList.add('reveal');
  });
  observeRevealElements();

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  console.log('%cLUXEWEAR', 'font-size:2rem;font-weight:bold;letter-spacing:0.2em;');
  console.log('%cStyle that speaks for you.', 'color:#c9a96e;font-style:italic;');
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', init);
