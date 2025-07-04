

// === LOGIN / REGISTER TOGGLE ===
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const formWrapper = document.getElementById('formWrapper');

loginBtn?.addEventListener('click', () => {
  formWrapper.style.transform = 'translateX(0%)';
  loginBtn.classList.add('active');
  registerBtn.classList.remove('active');
});

registerBtn?.addEventListener('click', () => {
  formWrapper.style.transform = 'translateX(-50%)';
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

// === PRODUCT IMAGE PREVIEW ===
const mainImage = document.getElementsByClassName('main-image');
document.querySelectorAll('.thumbnail-group img').forEach(img => {
  img.addEventListener('click', () => {
    mainImage.src = img.src;
  });
});

// === COLOR & SIZE SELECTION ===
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// === CHECKBOX FILTER ===
document.querySelectorAll('input[type="checkbox"]').forEach(box => {
  box.addEventListener('change', () => {
    const selected = Array.from(document.querySelectorAll('input[type="checkbox"]'))
      .filter(b => b.checked)
      .map(b => b.id);
    console.log("Selected checkboxes:", selected);
  });
});

// === PRICE SLIDER ===
const priceSlider = document.querySelector('input[type="range"]');
const priceDisplay = document.querySelector('.price-values span:last-child');

priceSlider?.addEventListener('input', () => {
  priceDisplay.textContent = `₹${priceSlider.value}`;
});

// === COLOR CIRCLE SELECTION ===
let selectedColors = [];
document.querySelectorAll('.color-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    const color = circle.classList[1];
    if (selectedColors.includes(color)) {
      selectedColors = selectedColors.filter(c => c !== color);
      circle.style.outline = '';
    } else {
      selectedColors.push(color);
      circle.style.outline = '3px solid #007BFF';
    }
    console.log("Selected colors:", selectedColors);
  });
});

// === RESET FILTERS ===
document.querySelectorAll('.filter-group button').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-group');

    group.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    const slider = group.querySelector('input[type="range"]');
    if (slider) {
      slider.value = 1320;
      priceDisplay.textContent = `₹1320`;
    }
    group.querySelectorAll('.color-circle').forEach(c => c.style.outline = '');
    selectedColors = [];
  console.log(`Reset group: ${group.querySelector('h3')?.textContent}`);
  });
});


  
const products = [
  { id: 1, name: "Classic Glasses", price: 49.99, image: "glasses.jpg" },
  { id: 2, name: "Aviator Sunglasses", price: 59.99, image: "glasses.jpg" },
  { id: 3, name: "Round Frames", price: 39.99, image: "glasses.jpg" },
  { id: 4, name: "Rectangle Frames", price: 42.00, image: "glasses.jpg" },
  { id: 5, name: "Cat Eye", price: 55.00, image: "glasses.jpg" },
  { id: 6, name: "Wayfarer", price: 38.50, image: "glasses.jpg" },
  { id: 7, name: "Wafarer", price: 38.50, image: "glasses.jpg" },
  { id: 8, name: "Wayfarr", price: 38.50, image: "glasses.jpg" },
  { id: 9, name: "Wayarer", price: 38.50, image: "AmberGray.jpg" },
  { id: 10, name: "Ayfarer", price: 38.50, image: "AmberGray.jpg" },
  { id: 11, name: "Wfarer", price: 38.50, image: "AmberGray.jpg" },
  { id: 12, name: "Wayfr", price: 38.50, image: "AmberGray.jpg" },
  { id: 13, name: "Wayfayr", price: 38.50, image: "AmberGray.jpg" },
  { id: 14, name: "Wayfar", price: 38.50, image: "AmberGray.jpg" },
  { id: 15, name: "Wayfr", price: 38.50, image: "AmberGray.jpg" },
  { id: 16, name: "Wayr", price: 38.50, image: "AmberGray.jpg" },
];

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
  const counter = document.querySelector(".cart-counter");
  if (counter) {
    counter.textContent = cartItems.reduce((sum, item) => sum + item.qty, 0);
  }
}

function updateCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const summary = drawer?.querySelector(".cart-summary");
  if (!summary) return;
  summary.innerHTML = "";

  let subtotal = 0;
  cartItems.forEach((item, index) => {
    subtotal += item.price * item.qty;
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" width="50" height="50">
      <div>
        <p>${item.name}</p>
        <div class="qty-control">
          <button onclick="changeQty(${index}, -1)">-</button>
          <input type="text" value="${item.qty}" readonly>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
      <span class="remove" onclick="removeItem(${index})">×</span>
    `;
    summary.appendChild(itemDiv);
  });

  summary.innerHTML += `
    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
    <p>Shipping: ₹5.00</p>
    <h3>Total: ₹${(subtotal + 5).toFixed(2)}</h3>
    <div class="shop-container">
      <button class="shop-button" id="check-out">
        <span class="shop-text">
          <a class="checkout-btn" href="checkout.html" onclick="saveCartToStorage()">Checkout</a>
        </span>
        <span class="shop-more"></span>
      </button>
    </div>
  `;
}

function addToCart(name, price, image) {
  const existing = cartItems.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, price, qty: 1, image });
  }
  updateCartCounter();
  updateCartDrawer();
}

function changeQty(index, change) {
  cartItems[index].qty += change;
  if (cartItems[index].qty <= 0) {
    cartItems.splice(index, 1);
  }
  updateCartCounter();
  updateCartDrawer();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCartCounter();
  updateCartDrawer();
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function showTick(el) {
  el.classList.add("show-tick");
  setTimeout(() => el.classList.remove("show-tick"), 1000);
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "img-1";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-icons">
      <span class="icon" onclick="showTick(this)">
        <i class="fa-regular fa-heart icon-content"></i>
        <span class="tick-overlay"><i class="fa-solid fa-check"></i></span>
      </span>
      <span class="icon" onclick="showTick(this)">
        <i class="fa-regular fa-eye icon-content"></i>
        <span class="tick-overlay"><i class="fa-solid fa-check"></i></span>
      </span>
      <span class="icon" onclick="showTick(this); addToCart('${product.name}', ${product.price}, '${product.image}')">
        <i class="fa-solid fa-cart-shopping icon-content"></i>
        <span class="tick-overlay"><i class="fa-solid fa-check"></i></span>
      </span>
    </div>
    <div class="product-info">
      <h4>${product.name}</h4>
      <p class="price">₹${product.price}</p>
      <div class="shop-container">
        <button class="shop-button">
          <span class="shop-text">Add Quickly</span>
          <span class="shop-more"></span>
        </button>
      </div>
    </div>
  `;

  card.querySelector(".shop-button").addEventListener("click", () => {
    addToCart(product.name, product.price, product.image);
  });

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  updateCartDrawer();

  // === Product Cards ===
  products.slice(0, 8).forEach(product => {
    const card = createProductCard(product);
    document.getElementById("productContainer")?.appendChild(card);
  });

  // === Cart Drawer Toggle ===
  document.getElementById("openCart")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("cartDrawer")?.classList.add("open");
  });

  document.getElementById("closeCart")?.addEventListener("click", () => {
    document.getElementById("cartDrawer")?.classList.remove("open");
  });

  // === Nav Toggle ===
  document.querySelector(".menu-toggle")?.addEventListener("click", () => {
    document.querySelector(".nav-menu")?.classList.toggle("active");
  });

  document.querySelectorAll(".nav-item.dropdown > a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      link.closest(".nav-item.dropdown")?.classList.toggle("active");
    });
  });

  // === Product Type Search ===
  document.getElementById('productTypeSearch')?.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    document.querySelectorAll('#productTypeOptions .filter-option').forEach(option => {
      option.style.display = option.textContent.toLowerCase().includes(searchValue) ? 'block' : 'none';
    });
  });

  // === Checkout Page Logic ===
  const checkoutContainer = document.getElementById("checkoutItems");
  if (checkoutContainer) {
    const subtotalEl = document.querySelector(".subtotal");
    const totalEl = document.querySelector(".total");
    const placeOrderBtn = document.querySelector(".place-order-btn");

    function updateOverallTotal() {
      let newSubtotal = 0;
      document.querySelectorAll(".order-item").forEach(item => {
        const qty = parseInt(item.querySelector(".qty-input").value);
        const price = parseInt(item.querySelector(".item-price").dataset.price);
        newSubtotal += qty * price;
      });
      subtotalEl.textContent = `Rs${newSubtotal.toLocaleString()}`;
      totalEl.textContent = `Rs${newSubtotal.toLocaleString()}`;
    }

    cartItems.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "order-item";
      const itemTotal = item.price * item.qty;

      itemDiv.innerHTML = `
        <img src="${item.image}" width="80">
        <div>
          <p><strong>${item.name}</strong></p>
          <div class="quantity-selector">
            <button class="minus-btn">-</button>
            <input type="text" class="qty-input" value="${item.qty}" readonly>
            <button class="plus-btn">+</button>
          </div>
        </div>
        <p class="item-price" data-price="${item.price}">Rs${itemTotal.toLocaleString()}</p>
      `;
      checkoutContainer.appendChild(itemDiv);

      const qtyInput = itemDiv.querySelector(".qty-input");
      const priceEl = itemDiv.querySelector(".item-price");
      const pricePerItem = parseInt(priceEl.dataset.price);

      itemDiv.querySelector(".plus-btn").addEventListener("click", () => {
        let qty = parseInt(qtyInput.value) + 1;
        qtyInput.value = qty;
        priceEl.textContent = `Rs${(qty * pricePerItem).toLocaleString()}`;
        updateOverallTotal();
      });

      itemDiv.querySelector(".minus-btn").addEventListener("click", () => {
        let qty = parseInt(qtyInput.value);
        if (qty > 1) {
          qtyInput.value = --qty;
          priceEl.textContent = `Rs${(qty * pricePerItem).toLocaleString()}`;
          updateOverallTotal();
        }
      });
    });

    updateOverallTotal();

    placeOrderBtn?.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".billing-form input[required]");
      let allFilled = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add("input-error");
          allFilled = false;
        } else {
          input.classList.remove("input-error");
        }
      });

      if (!allFilled) return alert("❌ Please fill all required fields.");
      if (!document.querySelector(".order-item")) return alert("❌ Your cart is empty.");

      alert("✅ Order placed successfully!");
      localStorage.removeItem("cart");
    });
  }

  // === Product Detail Page ===
  const selectedProduct = JSON.parse(localStorage.getItem("checkoutItem"));
  if (selectedProduct && document.getElementById("product-name")) {
    document.getElementById("product-name").textContent = selectedProduct.name;
    document.getElementById("product-price").textContent = "₹" + selectedProduct.price;
    document.getElementById("product-image").src = selectedProduct.image;
  }

  // === Quick Add Buttons in Product Cards (for amazon.html) ===
  document.querySelectorAll(".productes .img-1").forEach((card, index) => {
    const addBtn = card.querySelector(".add-to-cart");
    const buyBtn = card.querySelector(".buy-now");
    const product = products[index];
    addBtn?.addEventListener("click", () => {
      addToCart(product.name, product.price, product.image);
      document.getElementById("cartDrawer")?.classList.add("open");
    });
    buyBtn?.addEventListener("click", () => {
      localStorage.setItem("checkoutItem", JSON.stringify(product));
      window.location.href = "amazon.html";
    });
  });
});
