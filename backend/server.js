const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf-8'));
let users = {}; // simple in-memory store for saved quotes

// Get today's quote
app.get('/quote/today', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const todayQuote = quotes.find(q => q.date === today) || quotes[Math.floor(Math.random() * quotes.length)];
  res.json(todayQuote);
});

// Get all quotes
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// Save quote for a user
app.post('/save', (req, res) => {
  const { username, quoteId } = req.body;
  if (!username || !quoteId) return res.status(400).json({ error: 'Missing fields' });
  users[username] = users[username] || [];
  if (!users[username].includes(quoteId)) users[username].push(quoteId);
  res.json({ success: true });
});

// Get saved quotes
app.get('/saved/:username', (req, res) => {
  const username = req.params.username;
  const savedIds = users[username] || [];
  const savedQuotes = quotes.filter(q => savedIds.includes(q.id));
  res.json(savedQuotes);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
