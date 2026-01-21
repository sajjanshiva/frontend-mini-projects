/* ---------- ELEMENTS ---------- */
const usernameInput = document.getElementById("username");
const startOrderBtn = document.getElementById("startOrderBtn");
const addButtons = document.querySelectorAll(".add-btn");
const orderDisplay = document.getElementById("orderDisplay");
const clearSessionBtn = document.getElementById("clearSessionBtn");

const favInput = document.getElementById("favItem");
const saveFavBtn = document.getElementById("saveFavBtn");
const favDisplay = document.getElementById("favDisplay");
const clearLocalBtn = document.getElementById("clearLocalBtn");

const lightThemeBtn = document.getElementById("lightThemeBtn");
const darkThemeBtn = document.getElementById("darkThemeBtn");

/* ---------- SESSION STORAGE ---------- */

startOrderBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) return alert("Enter your name");
  sessionStorage.setItem("user", name);
  displayOrder();
});

addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.item;
    const price = Number(btn.dataset.price);

    let order = JSON.parse(sessionStorage.getItem("order")) || [];
    order.push({ item, price });
    sessionStorage.setItem("order", JSON.stringify(order));
    displayOrder();
  });
});

clearSessionBtn.addEventListener("click", () => {
  sessionStorage.clear();
  displayOrder();
});

function displayOrder() {
  const user = sessionStorage.getItem("user");
  const order = JSON.parse(sessionStorage.getItem("order")) || [];

  if (!user) {
    orderDisplay.innerHTML = "<p>No active session</p>";
    return;
  }

  let total = 0;
  let html = `<h4>Order for ${user}</h4><ul>`;

  order.forEach(o => {
    total += o.price;
    html += `<li>${o.item} - ₹${o.price}</li>`;
  });

  html += `</ul><strong>Total: ₹${total}</strong>`;
  orderDisplay.innerHTML = html;
}

/* ---------- LOCAL STORAGE ---------- */

saveFavBtn.addEventListener("click", () => {
  const item = favInput.value.trim();
  if (!item) return;

  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(item);
  localStorage.setItem("favorites", JSON.stringify(favs));
  displayFavorites();
});

clearLocalBtn.addEventListener("click", () => {
  localStorage.removeItem("favorites");
  displayFavorites();
});

function displayFavorites() {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favDisplay.innerHTML =
    "<ul>" + favs.map(f => `<li>${f}</li>`).join("") + "</ul>";
}

/* ---------- THEME ---------- */

lightThemeBtn.addEventListener("click", () => setTheme("light"));
darkThemeBtn.addEventListener("click", () => setTheme("dark"));

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

/* ---------- LOAD ---------- */

displayOrder();
displayFavorites();

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
