# AI Agent Setup & Deployment Guide

## Prerequisites

Choose ONE of the following:

**Option A: Docker (Recommended)**
- Install Docker Desktop for Windows: https://docs.docker.com/desktop/install/windows-install/
- Restart your computer after installation

**Option B: Node.js (Local Development)**
- Install Node.js 18+ from: https://nodejs.org/
- Verify installation: `node --version` and `npm --version`

---

## Setup Instructions

### Option A: Using Docker (Recommended)

1. **Open PowerShell** and navigate to the project:
```powershell
cd C:\workspace\ai-agent
```

2. **Build and run with Docker Compose:**
```powershell
docker-compose up -d
```

   Or build and run manually:
```powershell
# Build the image
docker build -t ai-agent:latest .

# Run the container
docker run -d -p 3000:3000 -v ${pwd}/data:/usr/src/app/data --name ai-agent ai-agent:latest
```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Click "🔄 Fetch New Resources" to populate the database
   - Start browsing and checking off items!

4. **View logs:**
```powershell
docker logs -f ai-agent
```

5. **Stop the container:**
```powershell
docker-compose down
# or
docker stop ai-agent
```

---

### Option B: Using Node.js (Local Development)

1. **Open PowerShell** and navigate to the project:
```powershell
cd C:\workspace\ai-agent
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Start the server:**
```powershell
npm run server
```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Click "🔄 Fetch New Resources" to populate the database

5. **Stop the server:**
   - Press `Ctrl+C` in the PowerShell window

---

## Customizing Sources

Edit `src/config.js` to add/remove AI resources:

### Add a new RSS feed:
```javascript
rssFeeds: [
  // ... existing feeds
  { 
    name: 'Your Favorite AI Blog', 
    url: 'https://yourblog.com/feed.xml' 
  }
]
```

### Add a manual resource (course, paper, tutorial):
```javascript
manualResources: [
  // ... existing resources
  {
    title: 'New AI Course',
    url: 'https://example.com/course',
    summary: 'Learn cutting-edge AI techniques',
    source: 'Example University',
    category: 'course' // Options: 'course', 'news', 'reading'
  }
]
```

### Add a website scraper:
```javascript
siteScrapers: [
  // ... existing scrapers
  {
    name: 'Your Site',
    url: 'https://yoursite.com/ai-courses',
    itemSelector: '.course-item',      // CSS selector for each item
    titleSelector: '.title',            // CSS selector for title
    urlSelector: 'a',                   // CSS selector for link
    summarySelector: '.description'     // CSS selector for description
  }
]
```

**Note**: Web scraping requires knowledge of CSS selectors and may break if sites change their HTML structure. RSS feeds are more reliable.

---

## Using the Web Interface

### Main Features:

1. **Fetch New Resources**
   - Click the "🔄 Fetch New Resources" button
   - The agent will fetch from all configured sources
   - New items are automatically categorized and stored

2. **Browse by Category**
   - **All**: View all items
   - **📰 News**: AI news, announcements, research papers
   - **🎓 Courses**: Online courses and tutorials
   - **📚 Reading**: Papers, books, documentation

3. **Track Progress**
   - Check boxes next to items you've read/completed
   - Stats update in real-time
   - Use "Hide Checked" to focus on unread items

4. **Persistent Storage**
   - All data stored in SQLite (`./data/ai-agent.db`)
   - Survives restarts and updates
   - Backed up with your data volume (Docker)

---

## Automation & Scheduling

### Run fetch periodically (Windows Task Scheduler):

1. Create a PowerShell script `fetch-ai-resources.ps1`:
```powershell
docker exec ai-agent node -e "
const axios = require('axios');
axios.post('http://localhost:3000/api/fetch')
  .then(r => console.log('Fetched:', r.data))
  .catch(e => console.error('Error:', e.message));
"
```

2. Schedule it in Task Scheduler to run daily/weekly

### Or use the API directly:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/fetch -Method POST
```

---

## Troubleshooting

### Port 3000 already in use:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
docker run -p 8080:3000 ...
# Then access at http://localhost:8080
```

### Docker build fails:
- Ensure Docker Desktop is running
- Try: `docker system prune -a` to clean up
- Check Docker has enough resources (Settings > Resources)

### Database locked error:
- Stop all running instances
- Delete `./data/ai-agent.db` to start fresh
- Ensure only one server instance is running

### RSS feeds not loading:
- Check internet connection
- Some feeds may be slow or down temporarily
- Check logs for specific errors: `docker logs ai-agent`

---

## Project Structure

```
ai-agent/
├── src/
│   ├── server.js          # Express web server (main entry)
│   ├── index.js           # CLI tool (alternative)
│   ├── db.js              # SQLite database layer
│   ├── config.js          # ⭐ Configure sources here
│   ├── organizer.js       # Categorization logic
│   └── sources/
│       ├── rssSource.js   # RSS feed fetcher
│       └── webScraper.js  # Web scraping helper
├── public/
│   └── index.html         # Web UI
├── data/                  # SQLite database (auto-created)
├── test/
│   └── run.js            # Simple test script
├── package.json          # Dependencies
├── Dockerfile            # Container definition
├── docker-compose.yml    # Docker orchestration
└── README.md             # Main documentation
```

---

## What's Next?

- **Add more sources**: Edit `src/config.js` with your favorite AI blogs/newsletters
- **Export data**: Add export to markdown/PDF feature
- **Notifications**: Get alerted when high-value content appears
- **Mobile app**: Build a mobile interface
- **Share lists**: Export/import resource lists with colleagues

Enjoy staying up-to-date with AI! 🚀
