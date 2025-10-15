# Curated AI Resources

This document lists all the AI resources configured in this agent. You can modify `src/config.js` to add or remove sources.

## RSS Feeds (20+ sources)

### Academic Research
- **arXiv cs.AI** - Artificial Intelligence papers
- **arXiv cs.LG** - Machine Learning papers
- **arXiv cs.CL** - Natural Language Processing papers
- **arXiv cs.CV** - Computer Vision papers

### Industry & Research Labs
- **OpenAI Blog** - Latest from OpenAI (GPT, DALL-E, etc.)
- **Google AI Blog** - Google's AI research and products
- **DeepMind Blog** - DeepMind's groundbreaking research
- **Microsoft Research AI** - Microsoft's AI research
- **Meta AI Research** - Meta's AI Lab research
- **Anthropic News** - Claude and AI safety research

### Community & Aggregators
- **Hacker News** - Tech and AI discussions
- **r/MachineLearning** - ML community on Reddit
- **r/artificial** - AI community on Reddit

### Publications & Media
- **Towards Data Science** - Data science and ML articles
- **The Batch (deeplearning.ai)** - Andrew Ng's AI newsletter
- **MIT Technology Review AI** - AI journalism and analysis
- **VentureBeat AI** - AI business and technology news
- **The Gradient** - AI research magazine

### Practitioners & Tools
- **Hugging Face Blog** - Transformers, models, datasets
- **Papers with Code** - Research with implementations
- **LangChain Blog** - LLM application development

## Manual Resources (Pre-loaded)

### Courses
1. **Deep Learning Specialization** (Coursera - Andrew Ng)
   - 5-course series covering DL fundamentals
   - CNNs, RNNs, optimization, structuring projects
   
2. **CS229: Machine Learning** (Stanford)
   - Stanford's flagship ML course
   - Lecture notes, assignments, and videos
   
3. **Fast.ai Practical Deep Learning**
   - Free course with practical, top-down approach
   - Focus on getting results quickly
   
4. **Hugging Face NLP Course**
   - Free course on transformers and modern NLP
   - Hands-on with popular libraries

### Reading Materials
1. **The Little Book of Deep Learning**
   - Concise introduction to DL concepts
   - PDF by François Fleuret
   
2. **Attention Is All You Need**
   - The foundational Transformer paper
   - Essential reading for modern NLP/AI
   
3. **Spinning Up in Deep RL**
   - OpenAI's deep reinforcement learning resource
   - Theory and practice
   
4. **Dive into Deep Learning**
   - Interactive book with code examples
   - Math, discussions, and implementations

## Website Scrapers

### Course Platforms
- **Class Central** - AI course aggregator
  - Scrapes latest AI courses from multiple platforms
  - Note: May require selector updates as site changes

### Adding More Scrapers

To add Coursera, edX, Udacity, etc., you'll need to:
1. Inspect the site's HTML structure
2. Identify CSS selectors for:
   - Item container (e.g., `.course-card`)
   - Title (e.g., `.course-title`)
   - Link (e.g., `a.course-link`)
   - Description (e.g., `.course-description`)
3. Add to `config.js` under `siteScrapers`

**Important**: Many sites have Terms of Service restricting scraping. Consider using official APIs when available.

## Categorization Heuristics

The agent uses keyword patterns to categorize items:

### Course Patterns
- course, coursera, edx, udemy, udacity, classcentral
- specialization, nanodegree, tutorial, learning, fast.ai

### News Patterns
- arxiv, reddit, hn, hackernews, news, blog
- announcement, press, release
- openai, deepmind, anthropic

Items not matching these patterns are categorized as "reading".

## Recommended Additions

Here are some additional high-quality sources you might want to add:

### Newsletters (require email signup, check if RSS available)
- Import AI (Jack Clark)
- The Neuron
- AI Breakfast
- Superhuman AI

### YouTube Channels (would need separate scraper)
- Two Minute Papers
- Yannic Kilcher
- AI Coffee Break with Letitia

### Podcasts (RSS feeds available)
- The TWIML AI Podcast
- Lex Fridman Podcast
- The Robot Brains Podcast

### Additional Blogs
- Lil'Log (Lilian Weng)
- Jay Alammar's Blog
- Sebastian Ruder's Blog
- Distill.pub

### Research Labs
- FAIR (Facebook AI Research)
- Allen Institute for AI
- MILA (Montreal Institute for Learning Algorithms)

---

**To add any of these**: Edit `src/config.js` and add entries to `rssFeeds` or `manualResources` arrays.
