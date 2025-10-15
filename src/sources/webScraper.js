const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSite(scrapeConfig) {
  // scrapeConfig: { name, url, itemSelector, titleSelector, urlSelector, summarySelector }
  try {
    const resp = await axios.get(scrapeConfig.url, { timeout: 15000, headers: { 'User-Agent': 'ai-agent-bot/0.1' } });
    const $ = cheerio.load(resp.data);
    const results = [];
    $(scrapeConfig.itemSelector).each((i, el) => {
      const title = $(el).find(scrapeConfig.titleSelector).first().text().trim();
      let link = $(el).find(scrapeConfig.urlSelector).first().attr('href') || '';
      if (link && link.startsWith('/')) {
        // resolve relative
        const base = new URL(scrapeConfig.url).origin;
        link = base + link;
      }
      const summary = $(el).find(scrapeConfig.summarySelector).first().text().trim() || '';
      if (title || link) {
        results.push({ title: title || '(no title)', url: link, summary, source: scrapeConfig.name });
      }
    });
    return results;
  } catch (err) {
    console.warn(`Failed to scrape ${scrapeConfig.url}: ${err.message}`);
    return [];
  }
}

module.exports = {
  scrapeSite
};
