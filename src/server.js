#!/usr/bin/env node
const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const { fetchRssFeeds } = require('./sources/rssSource');
const { scrapeSite } = require('./sources/webScraper');
const { categorize } = require('./organizer');
const { insertItems, getItems, toggleChecked, getStats, voteItem, getTopSources, getJourneyStats } = require('./db');
const chalk = require('chalk');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 3000;

// Fetch and store new items
app.post('/api/fetch', async (req, res) => {
  try {
    console.log(chalk.cyan('Fetching RSS feeds...'));
    const rssItems = await fetchRssFeeds(config.rssFeeds);
    console.log(chalk.green(`Fetched ${rssItems.length} RSS items`));

    let scrapedItems = [];
    console.log(chalk.cyan('Running site scrapers...'));
    for (const s of config.siteScrapers) {
      console.log(chalk.gray(`Scraping ${s.name}`));
      const r = await scrapeSite(s);
      scrapedItems = scrapedItems.concat(r);
    }
    console.log(chalk.green(`Scraped ${scrapedItems.length} items`));

    // Add manual resources
    const manualItems = config.manualResources.map(m => ({ ...m, source: m.source || 'Manual' }));

    const all = rssItems.concat(scrapedItems).concat(manualItems);
    const categorized = categorize(all, config.heuristics);

    // Flatten and insert
    const toInsert = [
      ...categorized.news.map(i => ({ ...i, category: 'news' })),
      ...categorized.courses.map(i => ({ ...i, category: 'courses' })),
      ...categorized.reading.map(i => ({ ...i, category: 'reading' }))
    ];

    insertItems(toInsert);
    console.log(chalk.green(`Inserted/updated ${toInsert.length} items in DB`));

    res.json({ success: true, fetched: all.length, inserted: toInsert.length, stats: getStats() });
  } catch (err) {
    console.error(chalk.red(err));
    res.status(500).json({ error: err.message });
  }
});

// Get items by category
app.get('/api/items', (req, res) => {
  const { category, checked } = req.query;
  const checkedFilter = checked === 'true' ? true : checked === 'false' ? false : null;
  const items = getItems(category || null, checkedFilter);
  res.json(items);
});

// Toggle checked state
app.post('/api/items/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id, 10);
  toggleChecked(id);
  res.json({ success: true });
});

// Get stats
app.get('/api/stats', (req, res) => {
  res.json(getStats());
});

// Vote on an item
app.post('/api/items/:id/vote', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { type } = req.body; // 'up' or 'down'
  if (type !== 'up' && type !== 'down') {
    return res.status(400).json({ error: 'Invalid vote type' });
  }
  voteItem(id, type);
  res.json({ success: true });
});

// Get top sources by votes
app.get('/api/sources/top', (req, res) => {
  res.json(getTopSources());
});

// Get journey stats
app.get('/api/journey', (req, res) => {
  res.json(getJourneyStats());
});

app.listen(PORT, () => {
  console.log(chalk.green(`AI-Agent web UI running at http://localhost:${PORT}`));
  console.log(chalk.cyan('Visit the URL to view and manage your AI resources'));
  console.log(chalk.gray('POST /api/fetch to fetch new items'));
});
