#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();
const config = require('./config');
const { fetchRssFeeds } = require('./sources/rssSource');
const { scrapeSite } = require('./sources/webScraper');
const { categorize } = require('./organizer');
const chalk = require('chalk');

program
  .option('-o, --output <file>', 'Write JSON output to file')
  .option('--no-web', 'Skip web scraping (only RSS)')
  .parse(process.argv);

(async function main() {
  console.log(chalk.cyan('Starting AI-agent: fetching RSS feeds...'));
  const rssItems = await fetchRssFeeds(config.rssFeeds);
  console.log(chalk.green(`Fetched ${rssItems.length} RSS items`));

  let scrapedItems = [];
  if (program.opts().web) {
    console.log(chalk.cyan('Running site scrapers...'));
    for (const s of config.siteScrapers) {
      console.log(chalk.gray(`Scraping ${s.name} -> ${s.url}`));
      const r = await scrapeSite(s);
      scrapedItems = scrapedItems.concat(r);
      console.log(chalk.gray(`  found ${r.length} items`));
    }
  }

  const all = rssItems.concat(scrapedItems);
  const categorized = categorize(all, config.heuristics);

  const output = { fetchedAt: new Date().toISOString(), totals: { raw: all.length, news: categorized.news.length, courses: categorized.courses.length, reading: categorized.reading.length }, items: categorized };

  const json = JSON.stringify(output, null, 2);
  if (program.opts().output) {
    const outPath = path.resolve(program.opts().output);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, json, 'utf8');
    console.log(chalk.green(`Wrote output to ${outPath}`));
  } else {
    console.log(json);
  }
})();
