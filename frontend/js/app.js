let quotes = [];
let todayQuote = null;
const currentUser = localStorage.getItem('currentUser');

if (!currentUser) {
  alert('Please login first');
  window.location.href = 'login.html';
}

// Determine backend URL (Docker service name or localhost)
const BACKEND_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://backend:5000';

// Load quotes from backend
fetch(`${BACKEND_URL}/quotes`)
  .then(res => res.json())
  .then(data => {
    quotes = data;
    displayQuoteOfTheDay();
  })
  .catch(err => console.error('Failed to load quotes:', err));

function displayQuoteOfTheDay() {
  const today = new Date().toISOString().slice(0, 10);
  todayQuote = quotes.find(q => q.date === today) || quotes[Math.floor(Math.random() * quotes.length)];
  const container = document.getElementById('quote-container');
  if (container) {
    container.innerHTML = `<blockquote>${todayQuote.text}</blockquote>
                           <p><em>${todayQuote.reference}</em></p>`;
  }
}

// Save quote for the user (localStorage)
const saveBtn = document.getElementById('save-quote');
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    if (!todayQuote) return;
    let saved = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
    if (!saved.some(q => q.id === todayQuote.id)) {
      saved.push(todayQuote);
      localStorage.setItem('savedQuotes', JSON.stringify(saved));
      alert('Quote saved!');
    } else {
      alert('Already saved');
    }
  });
}
