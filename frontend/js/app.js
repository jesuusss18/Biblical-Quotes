// Minimal frontend logic for Biblical Quotes app.
// - Fetches quotes from /api/quotes (recommended) or falls back to /backend/quotes.json
// - Renders random quote, browse, favorites, simple login stub
// - Favorites are stored in localStorage as an array of quote IDs

(() => {
  const API_BASE = '/api/quotes'; // primary API endpoint
  const FALLBACK_JSON = '/backend/quotes.json'; // static fallback if no backend

  // DOM elements (may or may not exist on the current page)
  const el = {
    randomContainer: document.getElementById('random-quote-container'),
    newRandomBtn: document.getElementById('new-random-quote'),
    saveRandomFavBtn: document.getElementById('save-random-fav'),
    recentList: document.getElementById('recent-quotes-list'),
    quotesContainer: document.getElementById('quotes-container'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    bookSelect: document.getElementById('book-select'),
    filterBtn: document.getElementById('filter-btn'),
    favoritesList: document.getElementById('favorites-list'),
    clearFavoritesBtn: document.getElementById('clear-favorites'),
    loginForm: document.getElementById('login-form'),
    loginMessage: document.getElementById('login-message'),
  };

  let QUOTES = []; // cached quotes
  let currentRandom = null;
  let favorites = loadFavorites();

  // Fetch quotes (try API, fallback to static JSON)
  async function fetchQuotes() {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      // If router returns paginated results, extract results
      QUOTES = Array.isArray(data) ? data : data.results || [];
    } catch (err) {
      console.warn('API fetch failed, trying fallback JSON:', err.message);
      try {
        const res = await fetch(FALLBACK_JSON);
        QUOTES = await res.json();
      } catch (err2) {
        console.error('Fallback fetch failed:', err2);
        QUOTES = [];
      }
    }
    populateBookSelect();
  }

  // Utilities
  function randomItem(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function renderQuoteCard(quote) {
    if (!quote) return '<div class="quote-card empty">No quote</div>';
    // Accept either API shape or local shape
    const id = quote.id ?? quote._id ?? quote.book + '|' + (quote.chapter_verse || quote.verse || '');
    const text = quote.text || quote.quote || '';
    const book = quote.book || '';
    const chapter = quote.chapter_verse || quote.verse || '';
    const author = quote.author?.name || (quote.author || '');
    const favBtnText = isFavorite(id) ? 'Remove Favorite' : 'Save Favorite';

    return `
      <article class="quote-card" data-id="${id}">
        <p class="quote-text">${escapeHtml(text)}</p>
        <p class="quote-meta">${escapeHtml(book)} ${escapeHtml(chapter)} ${author ? '— ' + escapeHtml(author) : ''}</p>
        <div class="quote-actions">
          <button class="fav-toggle" data-id="${id}">${favBtnText}</button>
        </div>
      </article>
    `;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  // Render functions
  function renderRandom() {
    currentRandom = randomItem(QUOTES);
    if (!el.randomContainer) return;
    el.randomContainer.innerHTML = renderQuoteCard(currentRandom);
  }

  function renderRecent(limit = 6) {
    if (!el.recentList) return;
    const items = QUOTES.slice(0, limit);
    el.recentList.innerHTML = items.map(renderQuoteCard).join('');
  }

  function renderQuotesList(list) {
    if (!el.quotesContainer) return;
    if (!list || list.length === 0) {
      el.quotesContainer.innerHTML = '<p>No quotes found.</p>';
      return;
    }
    el.quotesContainer.innerHTML = list.map(renderQuoteCard).join('');
  }

  function renderFavorites() {
    if (!el.favoritesList) return;
    const favQuotes = QUOTES.filter(q => favorites.includes((q.id ?? q._id ?? q.book + '|' + (q.chapter_verse || q.verse || ''))));
    if (favQuotes.length === 0) {
      el.favoritesList.innerHTML = '<p>No favorites yet.</p>';
      return;
    }
    el.favoritesList.innerHTML = favQuotes.map(renderQuoteCard).join('');
  }

  // Favorites management using localStorage
  function loadFavorites() {
    try {
      const raw = localStorage.getItem('bib_favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveFavorites() {
    localStorage.setItem('bib_favorites', JSON.stringify(favorites));
  }

  function isFavorite(id) {
    if (!id) return false;
    return favorites.indexOf(String(id)) !== -1;
  }

  function toggleFavorite(id) {
    id = String(id);
    const idx = favorites.indexOf(id);
    if (idx === -1) favorites.push(id);
    else favorites.splice(idx, 1);
    saveFavorites();
    // Re-render the current page parts
    renderRandom();
    renderRecent();
    renderQuotesList(currentFilterList || QUOTES);
    renderFavorites();
  }

  // Simple search and filter
  let currentFilterList = null;
  function doSearch(term) {
    if (!term) {
      currentFilterList = QUOTES;
      renderQuotesList(QUOTES);
      return;
    }
    const q = term.toLowerCase();
    currentFilterList = QUOTES.filter(item => {
      const txt = (item.text || item.quote || '').toLowerCase();
      const book = (item.book || '').toLowerCase();
      const cv = (item.chapter_verse || item.verse || '').toLowerCase();
      return txt.includes(q) || book.includes(q) || cv.includes(q);
    });
    renderQuotesList(currentFilterList);
  }

  function populateBookSelect() {
    if (!el.bookSelect) return;
    const books = Array.from(new Set(QUOTES.map(q => q.book).filter(Boolean))).sort();
    el.bookSelect.innerHTML = '<option value=\"\">All books</option>' + books.map(b => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');
  }

  function filterByBook(book) {
    if (!book) {
      currentFilterList = QUOTES;
      renderQuotesList(QUOTES);
      return;
    }
    currentFilterList = QUOTES.filter(q => (q.book || '').toLowerCase() === book.toLowerCase());
    renderQuotesList(currentFilterList);
  }

  // Event delegation for fav buttons inside containers
  function onDocumentClick(e) {
    const favBtn = e.target.closest('.fav-toggle');
    if (favBtn) {
      const id = favBtn.dataset.id;
      toggleFavorite(id);
      return;
    }
  }

  // Login stub
  function handleLoginSubmit(e) {
    if (!el.loginForm) return;
    e.preventDefault();
    const username = document.getElementById('username').value;
    // Simple client-side stub
    el.loginMessage.textContent = `Hello ${username}, login is a stub in this demo.`;
    el.loginForm.reset();
  }

  // Clear favorites
  function clearFavorites() {
    favorites = [];
    saveFavorites();
    renderFavorites();
    renderRandom();
    renderRecent();
  }

  // Initialization
  async function init() {
    document.addEventListener('click', onDocumentClick);

    if (el.newRandomBtn) el.newRandomBtn.addEventListener('click', renderRandom);
    if (el.saveRandomFavBtn) el.saveRandomFavBtn.addEventListener('click', () => {
      if (!currentRandom) return;
      const id = currentRandom.id ?? currentRandom._id ?? currentRandom.book + '|' + (currentRandom.chapter_verse || currentRandom.verse || '');
      toggleFavorite(id);
    });

    if (el.searchBtn) el.searchBtn.addEventListener('click', () => doSearch(el.searchInput.value));
    if (el.searchInput) el.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch(el.searchInput.value);
    });

    if (el.filterBtn) el.filterBtn.addEventListener('click', () => filterByBook(el.bookSelect.value));
    if (el.clearFavoritesBtn) el.clearFavoritesBtn.addEventListener('click', clearFavorites);
    if (el.loginForm) el.loginForm.addEventListener('submit', handleLoginSubmit);

    // Fetch quotes and render initial UI
    await fetchQuotes();
    renderRandom();
    renderRecent();
    renderQuotesList(QUOTES);
    renderFavorites();
  }

  // Run init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();