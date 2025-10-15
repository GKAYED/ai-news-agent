module.exports = {
  // Curated list of trusted AI resources (news, research, blogs)
  rssFeeds: [
    // Academic research
    { name: 'arXiv cs.AI', url: 'https://export.arxiv.org/rss/cs.AI' },
    { name: 'arXiv cs.LG', url: 'https://export.arxiv.org/rss/cs.LG' },
    { name: 'arXiv cs.CL (NLP)', url: 'https://export.arxiv.org/rss/cs.CL' },
    { name: 'arXiv cs.CV (Computer Vision)', url: 'https://export.arxiv.org/rss/cs.CV' },
    
    // Industry & Research Labs
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss/' },
    { name: 'Google AI Blog', url: 'https://ai.googleblog.com/feeds/posts/default' },
    { name: 'DeepMind Blog', url: 'https://deepmind.google/blog/rss.xml' },
    { name: 'Microsoft Research AI', url: 'https://www.microsoft.com/en-us/research/feed/' },
    { name: 'Meta AI Research', url: 'https://ai.meta.com/blog/rss/' },
    { name: 'Anthropic News', url: 'https://www.anthropic.com/news/rss.xml' },
    
    // Community & Aggregators
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
    { name: 'r/MachineLearning', url: 'https://www.reddit.com/r/MachineLearning/.rss' },
    { name: 'r/artificial', url: 'https://www.reddit.com/r/artificial/.rss' },
    
    // Publications & Media
    { name: 'Towards Data Science', url: 'https://towardsdatascience.com/feed' },
    { name: 'The Batch (deeplearning.ai)', url: 'https://www.deeplearning.ai/the-batch/feed/' },
    { name: 'MIT Technology Review AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
    { name: 'The Gradient', url: 'https://thegradient.pub/rss/' },
    
    // Practitioners & Tools
    { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml' },
    { name: 'Papers with Code', url: 'https://paperswithcode.com/feeds/latest.xml' },
    { name: 'LangChain Blog', url: 'https://blog.langchain.dev/rss/' }
  ],

  // Trusted course platforms and learning resources
  // Note: Many of these require more sophisticated scraping or API access
  siteScrapers: [
    {
      name: 'ClassCentral AI Courses',
      url: 'https://www.classcentral.com/subject/artificial-intelligence',
      itemSelector: '.course-list-course',
      titleSelector: '.course-name',
      urlSelector: 'a',
      summarySelector: '.course-text'
    }
    // Add more as needed - Coursera, edX, Udacity typically require API keys or more complex scraping
  ],

  // Recommended AI learning resources (add to reading category)
  manualResources: [
    {
      title: 'Deep Learning Specialization (Andrew Ng)',
      url: 'https://www.coursera.org/specializations/deep-learning',
      summary: '5-course series covering deep learning fundamentals, CNNs, RNNs, and more',
      source: 'Coursera',
      category: 'course'
    },
    {
      title: 'CS229: Machine Learning (Stanford)',
      url: 'https://cs229.stanford.edu/',
      summary: 'Stanford\'s flagship ML course with lecture notes and assignments',
      source: 'Stanford',
      category: 'course'
    },
    {
      title: 'Fast.ai Practical Deep Learning',
      url: 'https://course.fast.ai/',
      summary: 'Free course teaching deep learning with a top-down, practical approach',
      source: 'fast.ai',
      category: 'course'
    },
    {
      title: 'Hugging Face NLP Course',
      url: 'https://huggingface.co/learn/nlp-course',
      summary: 'Free course on transformers and modern NLP',
      source: 'Hugging Face',
      category: 'course'
    },
    {
      title: 'The Little Book of Deep Learning',
      url: 'https://fleuret.org/public/lbdl.pdf',
      summary: 'Concise, comprehensive introduction to deep learning by François Fleuret',
      source: 'François Fleuret',
      category: 'reading'
    },
    {
      title: 'Attention Is All You Need (Paper)',
      url: 'https://arxiv.org/abs/1706.03762',
      summary: 'The foundational transformer architecture paper',
      source: 'arXiv',
      category: 'reading'
    },
    {
      title: 'Spinning Up in Deep RL',
      url: 'https://spinningup.openai.com/',
      summary: 'OpenAI\'s educational resource for deep reinforcement learning',
      source: 'OpenAI',
      category: 'reading'
    },
    {
      title: 'Dive into Deep Learning',
      url: 'https://d2l.ai/',
      summary: 'Interactive deep learning book with code, math, and discussions',
      source: 'd2l.ai',
      category: 'reading'
    }
  ],

  // Simple heuristics for categorization. You can extend these patterns.
  heuristics: {
    coursePatterns: ['course', 'coursera', 'edx', 'udemy', 'classcentral', 'specialization', 'nanodegree', 'tutorial', 'learning', 'udacity', 'fast.ai'],
    newsPatterns: ['arxiv', 'reddit', 'hn', 'hackernews', 'news', 'blog', 'announcement', 'press', 'release', 'openai', 'deepmind', 'anthropic']
  }
};
