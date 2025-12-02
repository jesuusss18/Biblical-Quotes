// ==========================
// Biblical Quotes App JS
// ==========================

const quotes = [
  {"id":1,"text":"For God so loved the world...","reference":"John 3:16","date":"2025-12-12","category":"Love"},
  {"id":2,"text":"Trust in the LORD with all your heart...","reference":"Proverbs 3:5","date":"2025-11-09","category":"Faith"},
  {"id":3,"text":"The Lord is my shepherd...","reference":"Psalm 23:1","date":"2025-11-10","category":"Guidance"},
  {"id":25,"text":"Love does no harm to a neighbor. Therefore love is the fulfillment of the law.","reference":"Romans 13:10","date":"2025-12-02","category":"Love"},
  // add all other quotes here...
];

let todayQuote = null;

// DOM Elements
const todayQuoteDiv = document.getElementById("today-quote");
const newRandomBtn = document.getElementById("new-random-quote");
const saveBtn = document.getElementById("save-random-fav");
const favoritesList = document.getElementById("favorites-list");

// ----------------------------
// Display Quote of the Day
// ----------------------------
function displayQuote(quote) {
  if (!todayQuoteDiv || !quote) return;
  todayQuoteDiv.innerHTML = `<blockquote>${quote.text}</blockquote><p><em>${quote.reference}</em></p>`;
}

function pickTodayQuote() {
  const today = new Date().toISOString().slice(0, 10);
  todayQuote = quotes.find(q => q.date === today) || quotes[Math.floor(Math.random() * quotes.length)];
  displayQuote(todayQuote);
}

// ----------------------------
// Save quote to favorites
// ----------------------------
function saveQuote() {
  if (!todayQuote) return;
  const saved = JSON.parse(localStorage.getItem("savedQuotes") || "[]");
  if (!saved.some(q => q.id === todayQuote.id)) {
    saved.push(todayQuote);
    localStorage.setItem("savedQuotes", JSON.stringify(saved));
    alert("Quote saved!");
    renderFavorites();
  } else {
    alert("Already saved");
  }
}

// ----------------------------
// Render Favorites Page
// ----------------------------
function renderFavorites() {
  if (!favoritesList) return;
  const saved = JSON.parse(localStorage.getItem("savedQuotes") || "[]");
  favoritesList.innerHTML = saved.map(q => `<li>${q.text} — <em>${q.reference}</em></li>`).join("");
}

// ----------------------------
// Login / Logout
// ----------------------------
function checkLogin() {
  const currentUser = localStorage.getItem("currentUser");
  const loginLink = document.getElementById("nav-login");
  const logoutBtn = document.getElementById("logout-btn");
  if (currentUser) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline";
  } else {
    if (loginLink) loginLink.style.display = "inline";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

function login(username) {
  if (!username) return alert("Enter a username!");
  localStorage.setItem("currentUser", username);
  alert("Logged in as " + username);
  checkLogin();
}

function logout() {
  localStorage.removeItem("currentUser");
  checkLogin();
}

// ----------------------------
// Page Navigation
// ----------------------------
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => (p.style.display = "none"));
  const page = document.getElementById(pageId);
  if (page) page.style.display = "block";

  // Update content on page load
  if (pageId === "home") pickTodayQuote();
  if (pageId === "favorites") renderFavorites();
}

// Handle history navigation
window.onpopstate = () => {
  const path = window.location.pathname;
  const pages = { "/": "home", "/favorites": "favorites", "/login": "login" };
  const pageId = pages[path] || "home";
  showPage(pageId);
};

// Setup nav links
document.querySelectorAll("a[href^='/']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    const pages = { "/": "home", "/favorites": "favorites", "/login": "login" };
    const pageId = pages[link.getAttribute("href")] || "home";
    showPage(pageId);
  });
});

// ----------------------------
// Event Listeners
// ----------------------------
window.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  showPage("home");

  if (newRandomBtn) newRandomBtn.addEventListener("click", pickTodayQuote);
  if (saveBtn) saveBtn.addEventListener("click", saveQuote);

  const loginBtn = document.getElementById("login-btn");
  const usernameInput = document.getElementById("username");
  if (loginBtn && usernameInput) {
    loginBtn.addEventListener("click", () => login(usernameInput.value));
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
});
