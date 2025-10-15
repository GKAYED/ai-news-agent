// Minimal smoke test runner (manual)
const { fetchRssFeeds } = require('../src/sources/rssSource');
const config = require('../src/config');

(async () => {
  const items = await fetchRssFeeds(config.rssFeeds.slice(0,2));
  console.log('Sample items:', items.slice(0,3));
})();
