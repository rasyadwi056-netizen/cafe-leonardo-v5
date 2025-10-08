// ===== DATA MENU =====
const menuData = [
  // ☕ Kategori: Coffee
  { id: 1, name: "Espresso", price: 20000, category: "Coffee", image: "images/espresso.png" },
  { id: 2, name: "Cappuccino", price: 25000, category: "Coffee", image: "images/cappuccino.png" },
  { id: 3, name: "Latte", price: 23000, category: "Coffee", image: "images/latte.png" },
  { id: 4, name: "Americano", price: 22000, category: "Coffee", image: "images/americano.png" },

  // 🍵 Kategori: Non-Coffee
  { id: 5, name: "Matcha Latte", price: 27000, category: "Non-Coffee", image: "images/matcha.png" },
  { id: 6, name: "Chocolate", price: 24000, category: "Non-Coffee", image: "images/chocolate.png" },
  { id: 7, name: "Taro Milk", price: 26000, category: "Non-Coffee", image: "images/taro.png" },
  { id: 8, name: "Vanilla Frappe", price: 28000, category: "Non-Coffee", image: "images/vanilla.png" },

  // 🧁 Kategori: Dessert
  { id: 9, name: "Croissant", price: 15000, category: "Dessert", image: "images/croissant.png" },
  { id: 10, name: "Muffin", price: 17000, category: "Dessert", image: "images/muffin.png" },
  { id: 11, name: "Cheesecake", price: 30000, category: "Dessert", image: "images/cheesecake.png" },
  { id: 12, name: "Brownies", price: 18000, category: "Dessert", image: "images/brownies.png" },
];

// ===== LOAD MENU =====
const menuContainer = document.querySelector(".menu-container");
const categoryBtns = document.querySelectorAll(".category-btn");

function loadMenu(category = "All") {
  menuContainer.innerHTML = "";

  const filtered = category === "All"
    ? menuData
    : menuData.filter(item => item.category === category);

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Rp ${item.price.toLocaleString()}</p>
    `;
    card.addEventListener("click", () => openDetail(item.id));
    menuContainer.appendChild(card);
  });
}

categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadMenu(btn.dataset.category);
  });
});

loadMenu();

// ===== OPEN DETAIL PAGE =====
function openDetail(id) {
  const selected = menuData.find(item => item.id === id);
  localStorage.setItem("selectedMenu", JSON.stringify(selected));
  document.body.classList.add("slide-in");
  setTimeout(() => {
    window.location.href = "detail.html";
  }, 400);
}

// ===== DETAIL PAGE LOADING =====
const detailContainer = document.querySelector(".detail-container");
if (detailContainer) {
  const menu = JSON.parse(localStorage.getItem("selectedMenu"));
  if (menu) {
    detailContainer.innerHTML = `
      <img class="detail-img" src="${menu.image}" alt="${menu.name}">
      <div class="detail-info">
        <h2>${menu.name}</h2>
        <p>Harga: Rp ${menu.price.toLocaleString()}</p>
        <p>${menu.name} dibuat dari bahan berkualitas tinggi, disajikan dengan penuh cinta oleh Leonardo Café ☕</p>
        <div class="detail-buttons">
          <button onclick="previousItem(${menu.id})">← Sebelumnya</button>
          <button onclick="nextItem(${menu.id})">Berikutnya →</button>
        </div>
        <a class="back-btn" href="index.html">Kembali ke Menu</a>
      </div>
    `;
  }
}

// ===== NEXT / PREVIOUS =====
function nextItem(currentId) {
  let nextId = currentId + 1;
  if (nextId > menuData.length) nextId = 1;
  localStorage.setItem("selectedMenu", JSON.stringify(menuData.find(i => i.id === nextId)));
  location.reload();
}

function previousItem(currentId) {
  let prevId = currentId - 1;
  if (prevId < 1) prevId = menuData.length;
  localStorage.setItem("selectedMenu", JSON.stringify(menuData.find(i => i.id === prevId)));
  location.reload();
}

// ===== TRANSITION ANIMATION =====
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});
