const heuristicsDefault = {
  coursePatterns: ['course', 'coursera', 'edx', 'udemy', 'classcentral', 'specialization', 'nanodegree'],
  newsPatterns: ['arxiv', 'reddit', 'hn', 'hackernews', 'news', 'blog', 'announcement', 'press']
};

function formatSummary(text) {
  if (!text) return '';
  
  // Split long blocks of text into paragraphs at sentence boundaries
  // Look for periods followed by spaces, or newlines
  let formatted = text
    .replace(/\r\n/g, '\n')
    .replace(/\n\n+/g, '\n\n') // Normalize multiple newlines
    .trim();
  
  // If text is longer than 200 chars and has no paragraphs, try to split it
  if (formatted.length > 200 && !formatted.includes('\n\n')) {
    // Split at sentence boundaries (. followed by space and capital letter)
    formatted = formatted.replace(/\. ([A-Z])/g, '.\n\n$1');
  }
  
  return formatted;
}

function categorize(items, heuristics = {}) {
  const h = Object.assign({}, heuristicsDefault, heuristics);
  const lowerCourse = h.coursePatterns.map(p => p.toLowerCase());
  const lowerNews = h.newsPatterns.map(p => p.toLowerCase());

  const out = { news: [], courses: [], reading: [] };

  for (const it of items) {
    // If item already has a category (manual resources), use it
    if (it.category) {
      const item = Object.assign({ checked: false }, it, { summary: formatSummary(it.summary) });
      if (out[it.category]) out[it.category].push(item);
      continue;
    }

    const combined = (`${it.title || ''} ${it.summary || ''} ${it.source || ''} ${it.url || ''}`).toLowerCase();
    const isCourse = lowerCourse.some(p => combined.includes(p));
    const isNews = lowerNews.some(p => combined.includes(p));

    const item = Object.assign({ checked: false }, it, { summary: formatSummary(it.summary) });

    if (isCourse) out.courses.push(item);
    else if (isNews) out.news.push(item);
    else out.reading.push(item);
  }

  // simple dedupe by url
  for (const k of Object.keys(out)) {
    const seen = new Set();
    out[k] = out[k].filter(i => {
      if (!i.url) return true;
      if (seen.has(i.url)) return false;
      seen.add(i.url);
      return true;
    });
  }

  return out;
}

module.exports = {
  categorize,
  formatSummary
};
