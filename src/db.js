const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, 'ai-agent.db');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT,
    summary TEXT,
    source TEXT,
    category TEXT NOT NULL,
    date TEXT,
    checked INTEGER DEFAULT 0,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_category ON items(category);
  CREATE INDEX IF NOT EXISTS idx_checked ON items(checked);
  CREATE UNIQUE INDEX IF NOT EXISTS idx_url ON items(url) WHERE url IS NOT NULL;
  
  -- Add columns to existing tables if they don't exist
  PRAGMA table_info(items);
`);

function insertItems(items) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO items (title, url, summary, source, category, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const insertMany = db.transaction((rows) => {
    for (const r of rows) insert.run(r.title, r.url, r.summary, r.source, r.category, r.date);
  });
  insertMany(items);
}

function voteItem(id, voteType) {
  if (voteType === 'up') {
    db.prepare('UPDATE items SET upvotes = upvotes + 1 WHERE id = ?').run(id);
  } else if (voteType === 'down') {
    db.prepare('UPDATE items SET downvotes = downvotes + 1 WHERE id = ?').run(id);
  }
}

function getTopSources() {
  return db.prepare(`
    SELECT source, 
           COUNT(*) as total_items,
           SUM(checked) as completed_items,
           SUM(upvotes) as total_upvotes,
           SUM(downvotes) as total_downvotes,
           (SUM(upvotes) - SUM(downvotes)) as net_score
    FROM items 
    GROUP BY source 
    ORDER BY net_score DESC, total_upvotes DESC
    LIMIT 20
  `).all();
}

function getJourneyStats() {
  const total = db.prepare('SELECT COUNT(*) as count FROM items').get().count;
  const checked = db.prepare('SELECT COUNT(*) as count FROM items WHERE checked = 1').get().count;
  const byCategoryChecked = db.prepare(`
    SELECT category, COUNT(*) as count 
    FROM items 
    WHERE checked = 1 
    GROUP BY category
  `).all();
  
  const recentlyCompleted = db.prepare(`
    SELECT title, category, source, created_at
    FROM items 
    WHERE checked = 1 
    ORDER BY rowid DESC 
    LIMIT 10
  `).all();
  
  return {
    total,
    checked,
    unchecked: total - checked,
    progress: total > 0 ? Math.round((checked / total) * 100) : 0,
    byCategoryChecked,
    recentlyCompleted,
    milestones: {
      five: checked >= 5,
      ten: checked >= 10,
      twenty: checked >= 20,
      fifty: checked >= 50,
      hundred: checked >= 100
    }
  };
}

function getItems(category = null, checkedFilter = null) {
  let sql = 'SELECT * FROM items WHERE 1=1';
  const params = [];
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (checkedFilter !== null) {
    sql += ' AND checked = ?';
    params.push(checkedFilter ? 1 : 0);
  }
  sql += ' ORDER BY created_at DESC';
  return db.prepare(sql).all(...params);
}

function toggleChecked(id) {
  db.prepare('UPDATE items SET checked = NOT checked WHERE id = ?').run(id);
}

function getStats() {
  const total = db.prepare('SELECT COUNT(*) as count FROM items').get().count;
  const checked = db.prepare('SELECT COUNT(*) as count FROM items WHERE checked = 1').get().count;
  const news = db.prepare("SELECT COUNT(*) as count FROM items WHERE category = 'news'").get().count;
  const courses = db.prepare("SELECT COUNT(*) as count FROM items WHERE category = 'courses'").get().count;
  const reading = db.prepare("SELECT COUNT(*) as count FROM items WHERE category = 'reading'").get().count;
  return { total, checked, unchecked: total - checked, news, courses, reading };
}

module.exports = {
  insertItems,
  getItems,
  toggleChecked,
  getStats,
  voteItem,
  getTopSources,
  getJourneyStats,
  db
};
