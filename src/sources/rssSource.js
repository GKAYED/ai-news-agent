const RSSParser = require('rss-parser');
const parser = new RSSParser({ timeout: 10000 });

async function fetchRssFeeds(feeds) {
  const results = [];
  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items || []) {
        results.push({
          title: item.title || item.heading || '(no title)',
          url: item.link || item.id || null,
          summary: item.contentSnippet || item.content || item.summary || '',
          date: item.isoDate || item.pubDate || null,
          source: feed.name || parsed.title || feed.url
        });
      }
    } catch (err) {
      // Log and continue
      console.warn(`Failed to fetch RSS ${feed.url}: ${err.message}`);
    }
  }
  return results;
}

module.exports = {
  fetchRssFeeds
};
