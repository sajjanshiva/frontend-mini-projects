const API_URL = 'http://localhost:3000';
let apiCallCount = 0;
let scrollCount = 0;
let throttledScrollCount = 0;

// DEBOUNCE FUNCTION
// Waits for user to stop typing before making API call
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// THROTTLE FUNCTION
// Limits how often a function can run
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Search movies (called with debounce)
async function searchMovies(query) {
  apiCallCount++;
  document.getElementById('apiCounter').textContent = `API Calls: ${apiCallCount}`;
  
  if (!query.trim()) {
    document.getElementById('results').innerHTML = '<p>Type to search...</p>';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/search?q=${query}`);
    const movies = await res.json();
    displayMovies(movies);
  } catch (err) {
    document.getElementById('results').innerHTML = '<p>Error connecting to server</p>';
  }
}

// Display movies
function displayMovies(movies) {
  const resultsDiv = document.getElementById('results');
  
  if (movies.length === 0) {
    resultsDiv.innerHTML = '<p>No movies found</p>';
    return;
  }

  resultsDiv.innerHTML = movies.map(m => `
    <div class="movie-item">
      <div class="movie-title">${m.title}</div>
      <div class="movie-info">${m.year} • ${m.genre}</div>
    </div>
  `).join('');
}

// Handle scroll (with throttle)
function handleScroll() {
  scrollCount++;
  document.getElementById('scrollCount').textContent = scrollCount;
}

function handleThrottledScroll() {
  throttledScrollCount++;
  document.getElementById('throttledCount').textContent = throttledScrollCount;
  console.log('Throttled scroll event fired');
}

// Event listeners
const debouncedSearch = debounce(searchMovies, 500);

document.getElementById('searchInput').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', throttle(handleThrottledScroll, 1000));

// Initial message
document.getElementById('results').innerHTML = '<p>Type to search...</p>';