// ==========================
// Biblical Quotes App JS
// ==========================

const quotes = [
  {"id":1,"text":"For God so loved the world...","reference":"John 3:16","date":"2025-12-02","category":"Love"},
  {"id":2,"text":"Trust in the LORD with all your heart...","reference":"Proverbs 3:5","date":"2025-12-03","category":"Faith"},
  {"id":3,"text":"The Lord is my shepherd...","reference":"Psalm 23:1","date":"2025-12-04","category":"Guidance"},
  {"id":4,"text":"I can do all things through Christ who strengthens me.","reference":"Philippians 4:13","date":"2025-12-05","category":"Strength"},
  {"id":5,"text":"Cast all your anxiety on Him because He cares for you.","reference":"1 Peter 5:7","date":"2025-12-06","category":"Comfort"},
  {"id":6,"text":"Do everything in love.","reference":"1 Corinthians 16:14","date":"2025-12-07","category":"Love"},
  {"id":7,"text":"Praise the LORD, my soul.","reference":"Psalm 146:1","date":"2025-12-08","category":"Worship"},
  {"id":8,"text":"Rejoice always, pray continually, give thanks in all circumstances.","reference":"1 Thessalonians 5:16-18","date":"2025-12-09","category":"Faith"},
  {"id":9,"text":"The LORD is near to all who call on Him.","reference":"Psalm 145:18","date":"2025-12-10","category":"Faith"},
  {"id":10,"text":"Be still, and know that I am God.","reference":"Psalm 46:10","date":"2025-12-11","category":"Peace"},
  {"id":11,"text":"Your word is a lamp to my feet and a light to my path.","reference":"Psalm 119:105","date":"2025-12-12","category":"Guidance"},
  {"id":12,"text":"Do not let your hearts be troubled.","reference":"John 14:1","date":"2025-12-13","category":"Comfort"},
  {"id":13,"text":"Walk in love, as Christ loved us and gave Himself up for us.","reference":"Ephesians 5:2","date":"2025-12-14","category":"Love"},
  {"id":14,"text":"Rejoice in the Lord always. I will say it again: Rejoice!","reference":"Philippians 4:4","date":"2025-12-15","category":"Joy"},
  {"id":15,"text":"Blessed are the peacemakers, for they will be called children of God.","reference":"Matthew 5:9","date":"2025-12-16","category":"Peace"},
  {"id":16,"text":"Love does no harm to a neighbor. Therefore love is the fulfillment of the law.","reference":"Romans 13:10","date":"2025-12-17","category":"Love"},
  {"id":17,"text":"The LORD is compassionate and gracious, slow to anger, abounding in love.","reference":"Psalm 103:8","date":"2025-12-18","category":"Faith"},
  {"id":18,"text":"Let everything that has breath praise the LORD.","reference":"Psalm 150:6","date":"2025-12-19","category":"Worship"},
  {"id":19,"text":"Blessed are those who hunger and thirst for righteousness, for they will be filled.","reference":"Matthew 5:6","date":"2025-12-20","category":"Faith"},
  {"id":20,"text":"Trust in Him at all times, you people; pour out your hearts to Him.","reference":"Psalm 62:8","date":"2025-12-21","category":"Faith"},
  {"id":21,"text":"Delight yourself in the LORD, and He will give you the desires of your heart.","reference":"Psalm 37:4","date":"2025-12-22","category":"Faith"},
  {"id":22,"text":"God is our refuge and strength, an ever-present help in trouble.","reference":"Psalm 46:1","date":"2025-12-23","category":"Comfort"},
  {"id":23,"text":"Therefore encourage one another and build each other up.","reference":"1 Thessalonians 5:11","date":"2025-12-24","category":"Encouragement"},
  {"id":24,"text":"Faith is confidence in what we hope for and assurance about what we do not see.","reference":"Hebrews 11:1","date":"2025-12-25","category":"Faith"},
  {"id":25,"text":"Cast your burden on the LORD, and He will sustain you.","reference":"Psalm 55:22","date":"2025-12-26","category":"Comfort"},
  {"id":26,"text":"Be strong in the Lord and in His mighty power.","reference":"Ephesians 6:10","date":"2025-12-27","category":"Strength"},
  {"id":27,"text":"Do not be overcome by evil, but overcome evil with good.","reference":"Romans 12:21","date":"2025-12-28","category":"Guidance"},
  {"id":28,"text":"Serve wholeheartedly, as if you were serving the Lord.","reference":"Ephesians 6:7","date":"2025-12-29","category":"Faith"},
  {"id":29,"text":"Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.","reference":"Galatians 6:9","date":"2025-12-30","category":"Perseverance"},
  {"id":30,"text":"Commit your way to the LORD; trust in Him and He will act.","reference":"Psalm 37:5","date":"2025-12-31","category":"Faith"}
];


let todayQuote = null;

function getToday() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function displayQuote(quote) {
  const container = document.getElementById('today-quote');
  if (!container) return;
  container.innerHTML = `<blockquote>${quote.text}</blockquote><p><em>${quote.reference}</em></p>`;
  todayQuote = quote;
}


function pickTodayQuote() {
  const today = getToday();
  const quote = quotes.find(q => q.date === today);
  if (quote) {
    displayQuote(quote);
  } else {
    // fallback: show a random quote
    pickRandomQuote(true);
  }
}

function pickRandomQuote(allowToday = false) {
  const today = getToday();
  let pool = allowToday ? quotes : quotes.filter(q => q.date !== today);
  if (pool.length === 0) pool = quotes;
  const randomIndex = Math.floor(Math.random() * pool.length);
  displayQuote(pool[randomIndex]);
}

// Wait until DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Show today's quote on load
  pickTodayQuote();

  // New Random Quote button
  const newQuoteBtn = document.getElementById('new-random-quote');
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', () => pickRandomQuote(false));
  }

  // Save to Favorites button
  const saveBtn = document.getElementById('save-random-fav');
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
});
