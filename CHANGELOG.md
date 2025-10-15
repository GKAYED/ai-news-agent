# 🤖 AI Resource Tracker - Complete Project

**Status**: ✅ Ready to deploy  
**Version**: 0.2.0  
**Last Updated**: October 15, 2025

---

## 📋 Project Overview

A production-ready web application that automatically fetches, categorizes, and tracks AI resources (news, courses, reading materials) from 20+ curated sources. Features a modern web UI with checkbox tracking backed by SQLite.

### Key Features
✅ 20+ trusted AI RSS feeds (arXiv, OpenAI, Google AI, DeepMind, etc.)  
✅ Pre-loaded with top AI courses and papers  
✅ Smart categorization (news/courses/reading)  
✅ Checkbox tracking with persistent state  
✅ Modern, responsive web UI  
✅ SQLite database for local storage  
✅ Docker-ready for easy deployment  
✅ Fully configurable sources in `src/config.js`

---

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** (recommended) OR **Node.js 18+**

### Run in 3 Steps

1. **Navigate to project**
```powershell
cd C:\workspace\ai-agent
```

2. **Start the server**
```powershell
.\start.ps1
```

3. **Open browser**
- Go to `http://localhost:3000`
- Click "🔄 Fetch New Resources"
- Start tracking your AI learning!

### Stop the server
```powershell
.\stop.ps1
```

---

## 📁 Project Structure

```
ai-agent/
├── 📄 README.md              # Main documentation
├── 📄 SETUP.md               # Detailed setup guide
├── 📄 RESOURCES.md           # List of all AI sources
├── 📄 CHANGELOG.md           # This file
├── 📄 package.json           # Node.js dependencies
├── 📄 Dockerfile             # Container definition
├── 📄 docker-compose.yml     # Docker orchestration
├── 📄 start.ps1             # Quick start script
├── 📄 stop.ps1              # Stop script
│
├── 📂 src/
│   ├── server.js            # 🌐 Express web server (main entry point)
│   ├── index.js             # 💻 CLI tool (alternative)
│   ├── db.js                # 💾 SQLite database layer
│   ├── config.js            # ⚙️ CONFIGURE SOURCES HERE
│   ├── organizer.js         # 🏷️ Categorization logic
│   └── 📂 sources/
│       ├── rssSource.js     # 📡 RSS feed fetcher
│       └── webScraper.js    # 🕷️ Web scraping helper
│
├── 📂 public/
│   └── index.html           # 🎨 Web UI (single-page app)
│
├── 📂 data/                 # 💾 SQLite database (auto-created)
│   └── ai-agent.db
│
└── 📂 test/
    └── run.js               # 🧪 Simple test script
```

---

## 🎯 What Can You Do?

### Browse AI Resources
- **News**: Latest AI research, announcements, blog posts
- **Courses**: Online courses, tutorials, specializations
- **Reading**: Papers, books, documentation

### Track Your Progress
- Check off items as you read/complete them
- Filter by category (all/news/courses/reading)
- Hide completed items to focus on new content
- View real-time stats

### Customize Sources
Edit `src/config.js` to:
- Add/remove RSS feeds
- Pre-load specific courses or papers
- Configure web scrapers for course platforms
- Adjust categorization patterns

---

## 🔧 Configuration

### Adding a New RSS Feed

Edit `src/config.js`:
```javascript
rssFeeds: [
  // ...existing feeds
  { 
    name: 'Your AI Blog', 
    url: 'https://yourblog.com/feed.xml' 
  }
]
```

### Adding a Manual Resource

```javascript
manualResources: [
  // ...existing
  {
    title: 'Advanced ML Course',
    url: 'https://example.com/course',
    summary: 'Learn advanced techniques',
    source: 'Example University',
    category: 'course' // 'news', 'course', or 'reading'
  }
]
```

### Adding a Website Scraper

```javascript
siteScrapers: [
  // ...existing
  {
    name: 'Course Platform',
    url: 'https://site.com/ai-courses',
    itemSelector: '.course-card',
    titleSelector: '.title',
    urlSelector: 'a',
    summarySelector: '.description'
  }
]
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get item counts |
| GET | `/api/items` | Get all items |
| GET | `/api/items?category=news` | Filter by category |
| GET | `/api/items?checked=false` | Filter unchecked |
| POST | `/api/fetch` | Fetch new resources |
| POST | `/api/items/:id/toggle` | Toggle checkbox |

---

## 📊 Curated AI Sources (20+)

### Academic (4)
- arXiv cs.AI, cs.LG, cs.CL, cs.CV

### Industry Labs (6)
- OpenAI, Google AI, DeepMind, Microsoft Research, Meta AI, Anthropic

### Community (3)
- Hacker News, r/MachineLearning, r/artificial

### Publications (5)
- Towards Data Science, The Batch, MIT Tech Review, VentureBeat, The Gradient

### Tools (3)
- Hugging Face, Papers with Code, LangChain

### Pre-loaded Courses (4)
- Deep Learning Specialization (Coursera)
- CS229 (Stanford)
- Fast.ai Practical DL
- Hugging Face NLP Course

### Pre-loaded Reading (4)
- The Little Book of Deep Learning
- Attention Is All You Need (paper)
- Spinning Up in Deep RL
- Dive into Deep Learning

**See RESOURCES.md for complete list**

---

## 🐳 Docker Commands

```powershell
# Build image
docker build -t ai-agent:latest .

# Run with volume mount (persists data)
docker run -d -p 3000:3000 -v ${pwd}/data:/usr/src/app/data --name ai-agent ai-agent:latest

# Using docker-compose (easier)
docker-compose up -d

# View logs
docker logs -f ai-agent

# Stop
docker stop ai-agent
# or
docker-compose down
```

---

## 💻 Node.js Commands

```powershell
# Install dependencies
npm install

# Run web server
npm run server

# Run CLI tool (outputs JSON)
npm start

# Run test
npm test
```

---

## 🔍 Troubleshooting

### Port 3000 in use
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Or use different port
docker run -p 8080:3000 ...
```

### Database locked
- Stop all instances
- Delete `./data/ai-agent.db`
- Restart

### RSS feeds not loading
- Check internet connection
- Check logs: `docker logs ai-agent`
- Some feeds may be temporarily down

---

## 🚀 Next Steps

### Immediate
1. ✅ Run `.\start.ps1`
2. ✅ Open `http://localhost:3000`
3. ✅ Click "Fetch New Resources"
4. ✅ Start tracking!

### Future Enhancements
- [ ] Email/Slack notifications
- [ ] Export to markdown/PDF
- [ ] Mobile app
- [ ] Advanced search/filtering
- [ ] Tags and custom collections
- [ ] Scheduled fetching (cron)
- [ ] Multi-user support
- [ ] API authentication

---

## 📚 Documentation

- **README.md** - Quick overview and basic usage
- **SETUP.md** - Detailed setup instructions and troubleshooting
- **RESOURCES.md** - Complete list of AI sources with descriptions
- **CHANGELOG.md** - This file (project summary)

---

## 🤝 Contributing

To add more sources or features:

1. Fork or clone the project
2. Edit `src/config.js` for new sources
3. Test with `npm run server` or Docker
4. Submit changes or share your config

---

## 📝 License

MIT License - Feel free to modify and distribute

---

## ✨ Credits

**Built with:**
- Node.js & Express
- SQLite (better-sqlite3)
- Cheerio (web scraping)
- rss-parser
- Vanilla JavaScript (no framework bloat!)

**AI Sources curated from:**
- Academic institutions (Stanford, MIT)
- Leading AI labs (OpenAI, DeepMind, Google, Meta)
- Community platforms (arXiv, Hacker News, Reddit)
- Quality publications and blogs

---

**Ready to stay ahead in AI? Start now!** 🚀

```powershell
cd C:\workspace\ai-agent
.\start.ps1
```

Then open `http://localhost:3000` and click "Fetch New Resources"!
