const API_URL = "http://localhost:3000/items";
const LIMIT = 5;

let currentPage = 1;
let totalPages = 1;

// DOM
const itemsDiv = document.getElementById("items");
const paginationDiv = document.getElementById("pagination");
const loading = document.getElementById("loading");
const totalItemsEl = document.getElementById("totalItems");
const currentPageEl = document.getElementById("currentPage");
const totalPagesEl = document.getElementById("totalPages");

async function fetchItems(page) {
  loading.style.display = "block";
  itemsDiv.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}?page=${page}&limit=${LIMIT}`);
    const data = await res.json();

    currentPage = data.currentPage;
    totalPages = data.totalPages;

    totalItemsEl.textContent = data.totalItems;
    currentPageEl.textContent = currentPage;
    totalPagesEl.textContent = totalPages;

    renderItems(data.items);
    renderPagination();
  } catch {
    itemsDiv.innerHTML = "❌ Backend not running";
  } finally {
    loading.style.display = "none";
  }
}

// render items
function renderItems(items) {
  itemsDiv.innerHTML = items.map(
    item => `
      <div class="item">
        <b>${item.name}</b><br>
        ${item.description}
      </div>
    `
  ).join("");
}

// render pagination
function renderPagination() {
  let html = "";

  html += `
    <button onclick="changePage(${currentPage - 1})"
      ${currentPage === 1 ? "disabled" : ""}>
      Prev
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="${currentPage === i ? "active" : ""}"
        onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  html += `
    <button onclick="changePage(${currentPage + 1})"
      ${currentPage === totalPages ? "disabled" : ""}>
      Next
    </button>
  `;

  paginationDiv.innerHTML = html;
}

function changePage(page) {
  if (page >= 1 && page <= totalPages) {
    fetchItems(page);
  }
}

fetchItems(1);
