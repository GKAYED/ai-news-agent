# AI Agent - Resource Tracker

> **📢 AI-GENERATED PROJECT**: This entire application was built through conversation with AI. [Read the experiment documentation](./AI-EXPERIMENT.md) to understand how AI created 3,800+ lines of code, deployment config, and comprehensive docs from natural language prompts.


A lightweight web-based agent that collects AI news, courses, and reading materials from trusted sources. Features a clean UI with checkboxes to track what you've read/completed, backed by SQLite persistence.

## Features

- ðŸ“° **Curated AI Sources**: 20+ trusted RSS feeds (arXiv, OpenAI, Google AI, DeepMind, HuggingFace, etc.)
- ðŸŽ“ **Course Recommendations**: Pre-loaded with top AI courses (Stanford CS229, fast.ai, Coursera DL Specialization, etc.)
- ðŸ“š **Reading Materials**: Essential papers, books, and tutorials
- âœ… **Checkbox Tracking**: Mark items as read/completed with persistent state
- ðŸ—‚ï¸ **Smart Categorization**: Automatically sorts items into news/courses/reading
- ðŸŽ¨ **Clean Web UI**: Modern, responsive interface
- ðŸ’¾ **SQLite Storage**: All data persisted locally

## What's included

- `src/server.js` â€” Express web server with REST API
- `src/db.js` â€” SQLite database layer with schema
- `src/sources/rssSource.js` â€” RSS feed fetcher
- `src/sources/webScraper.js` â€” Generic web scraper (configurable selectors)
- `src/organizer.js` â€” Categorization logic
- `src/config.js` â€” **Configurable list of AI resources** (edit to add/remove sources)
- `public/index.html` â€” Web UI with checkboxes and filters
- `Dockerfile` â€” Container setup for easy deployment

## Quick Start (Docker - Recommended)

1. **Build the image:**
```powershell
cd ai-agent
docker build -t ai-agent:latest .
```

2. **Run the container:**
```powershell
docker run -p 3000:3000 -v ${pwd}/data:/usr/src/app/data ai-agent:latest
```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Click "Fetch New Resources" to populate the database
   - Browse news/courses/reading tabs and check items off as you complete them

## Alternative: Run with Node.js

If you have Node.js installed:

```powershell
npm install
npm run server
```

Then open `http://localhost:3000`

## Configuration

Edit `src/config.js` to customize:
- **RSS feeds**: Add/remove AI news sources and blogs
- **Site scrapers**: Configure web scrapers for course platforms (requires selector tuning)
- **Manual resources**: Pre-populate with specific courses, papers, or tutorials
- **Categorization heuristics**: Adjust keyword patterns for smart categorization

Example - Adding a new RSS feed:
```javascript
rssFeeds: [
  // ...existing feeds
  { name: 'Your Blog', url: 'https://yourblog.com/feed.xml' }
]
```

Example - Adding a manual resource:
```javascript
manualResources: [
  // ...existing resources
  {
    title: 'New AI Course',
    url: 'https://example.com/course',
    summary: 'Description here',
    source: 'Example University',
    category: 'course' // or 'news' or 'reading'
  }
]
```

## API Endpoints

- `GET /api/stats` â€” Get item counts
- `GET /api/items?category=news&checked=false` â€” Get items (filterable)
- `POST /api/fetch` â€” Fetch new resources from all sources
- `POST /api/items/:id/toggle` â€” Toggle checkbox state

## Data Persistence

SQLite database stored in `./data/ai-agent.db`. When using Docker, mount this directory as a volume to persist data across container restarts:

```powershell
docker run -p 3000:3000 -v ${pwd}/data:/usr/src/app/data ai-agent:latest
```

## Next Steps

- Schedule periodic fetches with cron or GitHub Actions
- Add email/Slack notifications for new items
- Export completed items to markdown/PDF
- Add more course platform scrapers (may require API keys)
- Implement search and tagging


