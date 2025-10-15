# 🎯 AI Agent - Visual Quick Start Guide

```
┌─────────────────────────────────────────────────────────────────┐
│                    🤖 AI RESOURCE TRACKER                       │
│                                                                 │
│  Automatically fetch, categorize, and track AI resources       │
│  with a beautiful web UI and persistent checkbox tracking      │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 What You Get

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  20+ FEEDS   │  │   COURSES    │  │   WEB UI     │  │  TRACKING    │
│              │  │              │  │              │  │              │
│ • arXiv      │  │ • Stanford   │  │ • Modern     │  │ • Checkboxes │
│ • OpenAI     │  │ • Coursera   │  │ • Filters    │  │ • SQLite DB  │
│ • DeepMind   │  │ • Fast.ai    │  │ • Categories │  │ • Stats      │
│ • HN/Reddit  │  │ • Papers     │  │ • Responsive │  │ • Persistent │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🚀 3-Step Quick Start

```powershell
# Step 1: Navigate to project
cd C:\workspace\ai-agent

# Step 2: Run the start script
.\start.ps1

# Step 3: Open browser to http://localhost:3000
```

**That's it!** 🎉

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│              http://localhost:3000                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ REST API
                  ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER                           │
│                   (src/server.js)                           │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ RSS Fetcher │  │ Web Scraper  │  │  Categorizer    │   │
│  │             │  │              │  │                 │   │
│  │ 20+ feeds   │  │ Configurable │  │ news/courses/   │   │
│  │ rss-parser  │  │ selectors    │  │ reading         │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
│                                                             │
│                         ↓                                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              SQLite Database                        │   │
│  │              (data/ai-agent.db)                     │   │
│  │                                                     │   │
│  │  items: id, title, url, summary, category, checked │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure Explained

```
ai-agent/
│
├── 🎯 CORE FILES
│   ├── package.json           → Dependencies & scripts
│   ├── Dockerfile            → Container definition
│   ├── docker-compose.yml    → Easy orchestration
│   └── .gitignore            → Git exclusions
│
├── 📖 DOCUMENTATION
│   ├── README.md             → Quick overview
│   ├── SETUP.md              → Detailed setup guide
│   ├── RESOURCES.md          → List of AI sources
│   └── CHANGELOG.md          → Project summary
│
├── 🛠️ SCRIPTS
│   ├── start.ps1             → Auto-detect & start
│   ├── stop.ps1              → Stop server
│   └── check-system.ps1      → Verify prerequisites
│
├── 💻 SOURCE CODE
│   └── src/
│       ├── server.js         → 🌐 Express web server (MAIN)
│       ├── index.js          → CLI alternative
│       ├── db.js             → 💾 SQLite operations
│       ├── config.js         → ⚙️ CONFIGURE SOURCES HERE
│       ├── organizer.js      → Categorization logic
│       └── sources/
│           ├── rssSource.js  → RSS fetcher
│           └── webScraper.js → Web scraper
│
├── 🎨 FRONTEND
│   └── public/
│       └── index.html        → Complete web UI (SPA)
│
└── 🧪 TESTING
    └── test/
        └── run.js            → Simple test script
```

---

## 🎨 Web UI Preview

```
┌──────────────────────────────────────────────────────────────┐
│                    🤖 AI Resource Tracker                    │
│        Stay updated with the latest AI news, courses,       │
│               and reading materials                          │
├──────────────────────────────────────────────────────────────┤
│  Total: 156  │  News: 89  │  Courses: 34  │  Reading: 33   │
├──────────────────────────────────────────────────────────────┤
│  [🔄 Fetch New Resources]  [Hide Checked]        Status: ✓   │
├──────────────────────────────────────────────────────────────┤
│     [All]     [📰 News]     [🎓 Courses]     [📚 Reading]    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ☐ New Transformer Architecture Released                    │
│     OpenAI announces GPT-5 with revolutionary capabilities   │
│     [news] 📍 OpenAI Blog  🕒 Oct 15, 2025                  │
│  ──────────────────────────────────────────────────────────  │
│  ☑ Deep Learning Specialization                             │
│     5-course series covering deep learning fundamentals      │
│     [courses] 📍 Coursera  🕒 Oct 10, 2025                  │
│  ──────────────────────────────────────────────────────────  │
│  ☐ Attention Is All You Need                                │
│     The foundational transformer architecture paper          │
│     [reading] 📍 arXiv  🕒 Oct 12, 2025                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚙️ How to Configure Sources

### 1. Open the config file:
```powershell
notepad src\config.js
# or
code src\config.js
```

### 2. Add RSS Feeds:
```javascript
rssFeeds: [
  // Add your favorite AI blog
  { 
    name: 'My AI Blog', 
    url: 'https://myblog.com/feed.xml' 
  }
]
```

### 3. Add Manual Resources:
```javascript
manualResources: [
  // Add a specific course or paper
  {
    title: 'Advanced Reinforcement Learning',
    url: 'https://example.com/course',
    summary: 'Learn advanced RL techniques',
    source: 'University',
    category: 'course'  // 'news', 'course', or 'reading'
  }
]
```

### 4. Add Web Scrapers:
```javascript
siteScrapers: [
  // Scrape a course listing page
  {
    name: 'Course Site',
    url: 'https://site.com/ai-courses',
    itemSelector: '.course-card',     // Container for each item
    titleSelector: '.title',           // Title element
    urlSelector: 'a',                  // Link element
    summarySelector: '.description'    // Description element
  }
]
```

### 5. Restart the server to apply changes

---

## 🔄 Workflow Diagram

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Run start  │
                    │   script    │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
         ┌────▼─────┐            ┌─────▼────┐
         │  Docker  │            │ Node.js  │
         │ detected │            │ detected │
         └────┬─────┘            └─────┬────┘
              │                        │
              │                        │
         ┌────▼─────────────────────┬──▼───┐
         │   Server Running         │      │
         │   http://localhost:3000  │      │
         └──────────────────────────┴──────┘
                      │
         ┌────────────▼────────────┐
         │   Open in Browser       │
         └────────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │ Click "Fetch Resources" │
         └────────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │  RSS Feeds Fetched      │
         │  Sites Scraped          │
         │  Items Categorized      │
         │  Stored in SQLite       │
         └────────────┬────────────┘
                      │
         ┌────────────▼────────────┐
         │  Browse & Check Items   │
         │  Filter by Category     │
         │  Track Progress         │
         └─────────────────────────┘
```

---

## 📊 Data Flow

```
┌─────────────┐
│ RSS Feeds   │────┐
└─────────────┘    │
                   │
┌─────────────┐    │      ┌──────────────┐      ┌──────────┐
│ Web Scrapers│────┤─────→│ Categorizer  │─────→│ SQLite   │
└─────────────┘    │      │              │      │ Database │
                   │      │ • News       │      └────┬─────┘
┌─────────────┐    │      │ • Courses    │           │
│   Manual    │────┘      │ • Reading    │           │
│  Resources  │           └──────────────┘           │
└─────────────┘                                      │
                                                     │
┌──────────┐                                         │
│   Web    │←────────────────────────────────────────┘
│    UI    │
│          │  Display items with:
│  • List  │  ✓ Checkboxes
│  • Filter│  ✓ Categories
│  • Check │  ✓ Links
│  • Stats │  ✓ Summaries
└──────────┘
```

---

## 🎯 Use Cases

### 📰 Daily AI News Check
```
1. Open http://localhost:3000
2. Click "Fetch New Resources"
3. Filter by "News"
4. Skim headlines
5. Check off items you've read
6. Click links to read full articles
```

### 🎓 Course Discovery
```
1. Navigate to "Courses" tab
2. Browse pre-loaded courses
3. Check out new course announcements
4. Mark courses you've completed
5. Track your learning journey
```

### 📚 Reading List Management
```
1. Go to "Reading" tab
2. Find papers and tutorials
3. Export list for later
4. Mark items as read
5. Track technical depth
```

---

## 🚨 Common Issues & Fixes

### Issue: Port 3000 in use
```powershell
# Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=8080; npm run server
```

### Issue: Docker not running
```
1. Open Docker Desktop
2. Wait for it to start
3. Run .\start.ps1 again
```

### Issue: Database locked
```powershell
# Stop all instances
.\stop.ps1

# Delete database
Remove-Item .\data\ai-agent.db

# Start fresh
.\start.ps1
```

---

## 🎓 What's Included (Sources)

### Academic Research (4 feeds)
- arXiv AI, ML, NLP, Computer Vision

### Industry Labs (6 feeds)
- OpenAI, Google AI, DeepMind, Microsoft, Meta, Anthropic

### Community (3 feeds)
- Hacker News, r/MachineLearning, r/artificial

### Publications (5 feeds)
- Towards Data Science, The Batch, MIT Tech Review, etc.

### Tools & Platforms (3 feeds)
- Hugging Face, Papers with Code, LangChain

### Pre-loaded Courses (4)
- Deep Learning Specialization, CS229, Fast.ai, HF NLP

### Pre-loaded Reading (4)
- Essential papers, books, tutorials

**Total: 25+ curated sources + configurable**

---

## 🎉 Success Checklist

- [x] Project created with all files
- [x] Docker configuration ready
- [x] Node.js configuration ready
- [x] Web UI with checkboxes
- [x] SQLite persistence
- [x] 20+ RSS feeds configured
- [x] Pre-loaded courses & papers
- [x] Smart categorization
- [x] Comprehensive documentation
- [x] Quick start scripts
- [x] System check script

### ✅ YOU'RE READY TO GO!

```powershell
cd C:\workspace\ai-agent
.\start.ps1
```

Then open `http://localhost:3000` 🚀

---

**Questions? Check:**
- README.md - Overview
- SETUP.md - Detailed setup
- RESOURCES.md - Source list
- CHANGELOG.md - Full summary

**Enjoy tracking your AI learning journey!** 🤖📚
