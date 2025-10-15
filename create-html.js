const fs = require('fs');
const path = require('path');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Agent - Resource Tracker</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    header h1 { font-size: 2.5em; margin-bottom: 10px; }
    header p { opacity: 0.9; }
    .stats {
      display: flex;
      justify-content: space-around;
      padding: 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    .stat { text-align: center; }
    .stat-value { font-size: 2em; font-weight: bold; color: #667eea; }
    .stat-label { color: #6c757d; font-size: 0.9em; }
    .controls {
      padding: 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-primary { background: #667eea; color: white; }
    .btn-primary:hover { background: #5568d3; transform: translateY(-2px); }
    .btn-secondary { background: #6c757d; color: white; }
    .btn-secondary:hover { background: #5a6268; }
    .btn-vote { background: transparent; border: 1px solid #dee2e6; padding: 5px 10px; font-size: 0.9em; }
    .btn-vote:hover { background: #f8f9fa; }
    .btn-vote.upvote:hover { background: #d4edda; border-color: #28a745; }
    .btn-vote.downvote:hover { background: #f8d7da; border-color: #dc3545; }
    .tabs {
      display: flex;
      border-bottom: 2px solid #dee2e6;
      background: white;
    }
    .tab {
      flex: 1;
      padding: 15px;
      text-align: center;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      font-weight: 600;
    }
    .tab:hover { background: #f8f9fa; }
    .tab.active { border-bottom-color: #667eea; color: #667eea; }
    .items {
      padding: 20px;
      max-height: 60vh;
      overflow-y: auto;
    }
    .item {
      padding: 15px;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      margin-bottom: 15px;
      transition: all 0.3s;
      display: flex;
      gap: 15px;
      align-items: start;
    }
    .item:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .item.checked { opacity: 0.6; background: #f8f9fa; }
    .item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-top: 2px;
    }
    .item-content { flex: 1; }
    .item-title {
      font-weight: 600;
      font-size: 1.1em;
      margin-bottom: 5px;
      color: #212529;
    }
    .item-title a { color: #667eea; text-decoration: none; }
    .item-title a:hover { text-decoration: underline; }
    .item-summary {
      color: #6c757d;
      font-size: 0.9em;
      margin-bottom: 8px;
      line-height: 1.6;
      white-space: pre-line;
    }
    .item-meta {
      display: flex;
      gap: 15px;
      font-size: 0.85em;
      color: #6c757d;
      flex-wrap: wrap;
      align-items: center;
    }
    .item-votes {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .vote-count { font-weight: 600; margin: 0 3px; }
    .vote-count.positive { color: #28a745; }
    .vote-count.negative { color: #dc3545; }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.85em;
      font-weight: 600;
    }
    .badge-news { background: #e3f2fd; color: #1976d2; }
    .badge-courses { background: #f3e5f5; color: #7b1fa2; }
    .badge-reading { background: #e8f5e9; color: #388e3c; }
    .loading { text-align: center; padding: 40px; color: #6c757d; }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .empty { text-align: center; padding: 60px 20px; color: #6c757d; }
    .empty-icon { font-size: 4em; margin-bottom: 20px; opacity: 0.3; }
    .journey-container { padding: 30px; }
    .journey-header { text-align: center; margin-bottom: 30px; }
    .journey-progress {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 30px;
      text-align: center;
    }
    .progress-circle {
      width: 200px;
      height: 200px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: conic-gradient(#667eea 0deg, #667eea var(--progress), #e9ecef var(--progress));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .progress-circle::before {
      content: '';
      width: 170px;
      height: 170px;
      background: white;
      border-radius: 50%;
      position: absolute;
    }
    .progress-text {
      position: relative;
      z-index: 1;
      font-size: 3em;
      font-weight: bold;
      color: #667eea;
    }
    .milestone-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .milestone {
      background: white;
      border: 2px solid #dee2e6;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      transition: all 0.3s;
    }
    .milestone.achieved {
      border-color: #667eea;
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
    }
    .milestone-icon { font-size: 2.5em; margin-bottom: 10px; }
    .milestone-label { font-weight: 600; color: #495057; }
    .source-ranking {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #dee2e6;
    }
    .source-ranking h3 { margin-bottom: 15px; color: #495057; }
    .source-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
    }
    .source-item:last-child { border-bottom: none; }
    .source-name { font-weight: 600; color: #495057; }
    .source-score {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 0.9em;
    }
    .celebration {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      text-align: center;
      animation: celebrationAppear 0.5s ease-out;
    }
    @keyframes celebrationAppear {
      from { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
      to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    .celebration img { max-width: 300px; border-radius: 10px; margin-bottom: 20px; }
    .celebration h2 { color: #667eea; margin-bottom: 10px; }
    .celebration p { color: #6c757d; font-size: 1.1em; }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9998;
      animation: fadeIn 0.3s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .category-breakdown {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 30px 0;
    }
    .category-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border: 2px solid #dee2e6;
      text-align: center;
    }
    .category-card.news { border-color: #1976d2; }
    .category-card.courses { border-color: #7b1fa2; }
    .category-card.reading { border-color: #388e3c; }
    .category-icon { font-size: 3em; margin-bottom: 10px; }
    .category-count { font-size: 2.5em; font-weight: bold; margin-bottom: 5px; }
    .category-card.news .category-count { color: #1976d2; }
    .category-card.courses .category-count { color: #7b1fa2; }
    .category-card.reading .category-count { color: #388e3c; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🤖 AI Resource Tracker</h1>
      <p>Stay updated with the latest AI news, courses, and reading materials</p>
    </header>
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="stat-total">0</div>
        <div class="stat-label">Total Items</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-news">0</div>
        <div class="stat-label">News</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-courses">0</div>
        <div class="stat-label">Courses</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-reading">0</div>
        <div class="stat-label">Reading</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-checked">0</div>
        <div class="stat-label">Checked</div>
      </div>
    </div>
    <div class="controls">
      <button class="btn-primary" onclick="fetchNew()">🔄 Fetch New Resources</button>
      <button class="btn-secondary" onclick="toggleShowChecked()">
        <span id="toggle-text">Hide Checked</span>
      </button>
      <span style="margin-left: auto; color: #6c757d; font-size: 0.9em;" id="status"></span>
    </div>
    <div class="tabs">
      <div class="tab active" onclick="switchTab('all')">All</div>
      <div class="tab" onclick="switchTab('news')">📰 News</div>
      <div class="tab" onclick="switchTab('courses')">🎓 Courses</div>
      <div class="tab" onclick="switchTab('reading')">📚 Reading</div>
      <div class="tab" onclick="switchTab('journey')">🎯 Journey</div>
    </div>
    <div class="items" id="items-container">
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading resources...</p>
      </div>
    </div>
  </div>
  <script>
    let currentCategory = null;
    let showChecked = true;
    let lastCheckedCount = 0;
    const celebrationGifs = [
      'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
      'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
      'https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif',
      'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif',
      'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif'
    ];
    async function loadStats() {
      const res = await fetch('/api/stats');
      const stats = await res.json();
      document.getElementById('stat-total').textContent = stats.total;
      document.getElementById('stat-news').textContent = stats.news;
      document.getElementById('stat-courses').textContent = stats.courses;
      document.getElementById('stat-reading').textContent = stats.reading;
      document.getElementById('stat-checked').textContent = stats.checked;
      if (lastCheckedCount > 0 && stats.checked > lastCheckedCount && stats.checked % 5 === 0) {
        showCelebration(stats.checked);
      }
      lastCheckedCount = stats.checked;
    }
    async function loadItems() {
      const params = new URLSearchParams();
      if (currentCategory) params.append('category', currentCategory);
      if (!showChecked) params.append('checked', 'false');
      const res = await fetch(\`/api/items?\${params}\`);
      const items = await res.json();
      const container = document.getElementById('items-container');
      if (items.length === 0) {
        container.innerHTML = \`
          <div class="empty">
            <div class="empty-icon">📭</div>
            <h3>No items found</h3>
            <p>Click "Fetch New Resources" to populate the database</p>
          </div>
        \`;
        return;
      }
      container.innerHTML = items.map(item => \`
        <div class="item \${item.checked ? 'checked' : ''}">
          <input type="checkbox" \${item.checked ? 'checked' : ''} 
                 onchange="toggleItem(\${item.id})">
          <div class="item-content">
            <div class="item-title">
              \${item.url ? \`<a href="\${item.url}" target="_blank">\${item.title}</a>\` : item.title}
            </div>
            \${item.summary ? \`<div class="item-summary">\${item.summary}</div>\` : ''}
            <div class="item-meta">
              <span class="badge badge-\${item.category}">\${item.category}</span>
              <span>📍 \${item.source}</span>
              \${item.date ? \`<span>🕒 \${new Date(item.date).toLocaleDateString()}</span>\` : ''}
              <div class="item-votes">
                <button class="btn-vote upvote" onclick="voteItem(event, \${item.id}, 'up')">👍</button>
                <span class="vote-count \${(item.upvotes || 0) > (item.downvotes || 0) ? 'positive' : (item.upvotes || 0) < (item.downvotes || 0) ? 'negative' : ''}">\${(item.upvotes || 0) - (item.downvotes || 0)}</span>
                <button class="btn-vote downvote" onclick="voteItem(event, \${item.id}, 'down')">👎</button>
              </div>
            </div>
          </div>
        </div>
      \`).join('');
    }
    async function loadJourneyView() {
      const res = await fetch('/api/journey');
      const journey = await res.json();
      const sourcesRes = await fetch('/api/sources/top');
      const sources = await sourcesRes.json();
      const container = document.getElementById('items-container');
      container.innerHTML = \`
        <div class="journey-container">
          <div class="journey-header">
            <h2>🎯 Your AI Learning Journey</h2>
            <p>Track your progress and celebrate milestones!</p>
          </div>
          <div class="journey-progress">
            <div class="progress-circle" style="--progress: \${journey.progress * 3.6}deg">
              <div class="progress-text">\${journey.progress}%</div>
            </div>
            <h3>\${journey.checked} / \${journey.total} Items Completed</h3>
          </div>
          <div class="category-breakdown">
            <div class="category-card news">
              <div class="category-icon">📰</div>
              <div class="category-count">\${journey.byCategoryChecked.find(c => c.category === 'news')?.count || 0}</div>
              <div class="category-label">News Articles</div>
            </div>
            <div class="category-card courses">
              <div class="category-icon">🎓</div>
              <div class="category-count">\${journey.byCategoryChecked.find(c => c.category === 'courses')?.count || 0}</div>
              <div class="category-label">Courses Completed</div>
            </div>
            <div class="category-card reading">
              <div class="category-icon">📚</div>
              <div class="category-count">\${journey.byCategoryChecked.find(c => c.category === 'reading')?.count || 0}</div>
              <div class="category-label">Papers Read</div>
            </div>
          </div>
          <h3 style="margin-bottom: 20px; color: #495057;">🏆 Milestones</h3>
          <div class="milestone-grid">
            <div class="milestone \${journey.milestones.five ? 'achieved' : ''}">
              <div class="milestone-icon">\${journey.milestones.five ? '🌟' : '⭐'}</div>
              <div class="milestone-label">First 5</div>
            </div>
            <div class="milestone \${journey.milestones.ten ? 'achieved' : ''}">
              <div class="milestone-icon">\${journey.milestones.ten ? '🔥' : '🔸'}</div>
              <div class="milestone-label">10 Items</div>
            </div>
            <div class="milestone \${journey.milestones.twenty ? 'achieved' : ''}">
              <div class="milestone-icon">\${journey.milestones.twenty ? '💪' : '🔹'}</div>
              <div class="milestone-label">20 Items</div>
            </div>
            <div class="milestone \${journey.milestones.fifty ? 'achieved' : ''}">
              <div class="milestone-icon">\${journey.milestones.fifty ? '🚀' : '🔺'}</div>
              <div class="milestone-label">50 Items</div>
            </div>
            <div class="milestone \${journey.milestones.hundred ? 'achieved' : ''}">
              <div class="milestone-icon">\${journey.milestones.hundred ? '👑' : '🔻'}</div>
              <div class="milestone-label">100 Items!</div>
            </div>
          </div>
          <div class="source-ranking">
            <h3>📊 Top Sources by Community Votes</h3>
            \${sources.slice(0, 10).map((source, idx) => \`
              <div class="source-item">
                <div>
                  <span style="font-size: 1.5em; margin-right: 10px;">\${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '📌'}</span>
                  <span class="source-name">\${source.source}</span>
                </div>
                <div class="source-score">
                  <span>👍 \${source.total_upvotes}</span>
                  <span>👎 \${source.total_downvotes}</span>
                  <span class="\${source.net_score >= 0 ? 'vote-count positive' : 'vote-count negative'}">\${source.net_score >= 0 ? '+' : ''}\${source.net_score}</span>
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
    }
    async function toggleItem(id) {
      await fetch(\`/api/items/\${id}/toggle\`, { method: 'POST' });
      loadStats();
      if (currentCategory === 'journey') {
        loadJourneyView();
      } else {
        loadItems();
      }
    }
    async function voteItem(event, id, type) {
      event.stopPropagation();
      await fetch(\`/api/items/\${id}/vote\`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (currentCategory === 'journey') {
        loadJourneyView();
      } else {
        loadItems();
      }
    }
    async function fetchNew() {
      const btn = event.target;
      btn.disabled = true;
      btn.textContent = '⏳ Fetching...';
      document.getElementById('status').textContent = 'Fetching resources...';
      try {
        const res = await fetch('/api/fetch', { method: 'POST' });
        const data = await res.json();
        document.getElementById('status').textContent = \`✅ Fetched \${data.fetched} items, inserted \${data.inserted} new\`;
        setTimeout(() => document.getElementById('status').textContent = '', 5000);
        loadStats();
        if (currentCategory === 'journey') {
          loadJourneyView();
        } else {
          loadItems();
        }
      } catch (err) {
        document.getElementById('status').textContent = '❌ Error: ' + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = '🔄 Fetch New Resources';
      }
    }
    function switchTab(category) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      currentCategory = category === 'all' ? null : category;
      if (category === 'journey') {
        loadJourneyView();
      } else {
        loadItems();
      }
    }
    function toggleShowChecked() {
      showChecked = !showChecked;
      document.getElementById('toggle-text').textContent = showChecked ? 'Hide Checked' : 'Show All';
      loadItems();
    }
    function showCelebration(count) {
      const randomGif = celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)];
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      const celebration = document.createElement('div');
      celebration.className = 'celebration';
      celebration.innerHTML = \`
        <img src="\${randomGif}" alt="Celebration!">
        <h2>🎉 Amazing! \${count} Items Completed!</h2>
        <p>Keep up the great work learning AI!</p>
      \`;
      document.body.appendChild(overlay);
      document.body.appendChild(celebration);
      setTimeout(() => {
        overlay.remove();
        celebration.remove();
      }, 3000);
    }
    loadStats();
    loadItems();
  </script>
</body>
</html>`;

const outputPath = '/usr/src/app/public/index.html';
fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log('✅ Successfully created index.html');
