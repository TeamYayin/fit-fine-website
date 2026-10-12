# Eugen Fit & Fine — Editorial Blog Publishing Guide

Welcome to the Eugen Fit & Fine editorial content directory. This repository is configured so **developers, marketing specialists, and coaching contributors** can seamlessly write and publish luxury blog articles using Markdown.

---

## 📁 Folder Structure

Each blog article lives in its own dedicated folder inside `src/content/blog/`:

```text
src/content/blog/
├── _README.md                     # This publishing guide (prefixed with _ so Astro ignores it)
├── progressive-overload/          # Article folder (slug = "progressive-overload")
│   └── index.md                   # Article markdown file
├── macro-nutrition-101/           # Article folder (slug = "macro-nutrition-101")
│   └── index.md                   # Article markdown file
└── your-new-article-slug/         # YOUR NEW ARTICLE FOLDER
    ├── index.md                   # YOUR ARTICLE MARKDOWN FILE
    └── hero-image.png             # (Optional) Co-located assets
```

The URL slug is automatically derived from the folder name:
`/blog/your-new-article-slug`

---

## ✍️ How to Submit a New Blog Post

### Step 1: Create a Folder
Create a descriptive folder name in kebab-case under `src/content/blog/`:
```bash
mkdir src/content/blog/circadian-sleep-recovery
```

### Step 2: Create `index.md`
Inside that folder, create `index.md` and define the required frontmatter header:

```markdown
---
title: "Circadian Sleep Rhythms and High-Performance Recovery"
excerpt: "How aligning your light exposure and REM sleep phases doubles muscle recovery and regulates hunger hormones."
category: "Lifestyle & Habits"
readTime: "7 min read"
publishDate: "October 15, 2026"
author: "Coach Marcus Vance"
authorRole: "Director of Biomechanics & Recovery"
imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
featured: false
tags: ["Sleep", "Recovery", "Circadian", "Performance"]
---

Your article introduction goes here...

## Section 1: The Physiology of Deep Sleep

Write your insights using standard Markdown headings, lists, blockquotes, and tables.
```

### Step 3: Available Categories
Choose one of our official site categories:
* `Workout & Training`
* `Diet & Nutrition`
* `Weight Loss`
* `Muscle Gain`
* `Lifestyle & Habits`
* `Mental Health & Motivation`

---

## 🎨 Layout & Typography Features

The layout is powered by `src/layouts/BlogLayout.astro`. You do not need to style HTML manually; Markdown elements automatically render with Eugen FnF luxury aesthetics:

* **Headings (`##`, `###`):** Rendered with crisp white typography and subtle gold border accents.
* **Blockquotes (`> Quote`):** Highlighted with a gold vertical bar and subtle gold tint.
* **Tables:** Formatted with dark glass borders and gold header text.
* **Lead Excerpt:** Displayed in a styled Executive Summary callout box at the top.
* **Concierge Callout:** Automatically attaches a personalized consultation booking section at the end of your article.

---

## 🚀 Testing & Publishing

To verify your article locally before committing:
```bash
npm run build
```
Once approved, commit with a descriptive conventional commit:
```bash
./scripts/pre-commit.sh "feat(blog): add circadian sleep recovery article"
```
Your article will automatically appear on `/blog` and create its standalone route at `/blog/<folder-slug>`!
