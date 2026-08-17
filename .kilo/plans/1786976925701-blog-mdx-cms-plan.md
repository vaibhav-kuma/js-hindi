# Blog/CMS System Implementation Plan

## Goal
Add a fully-featured MDX-based blog system to the portfolio with syntax highlighting, tags, RSS feed, and seamless integration with existing Next.js 15 + TypeScript architecture.

---

## Scope

### In Scope
- File-based MDX content in `content/blog/`
- Blog index page with pagination (`/blog`)
- Individual post pages (`/blog/[slug]`)
- Tag archive pages (`/blog/tag/[tag]`)
- Syntax highlighting with Shiki + rehype-pretty-code
- RSS 2.0 feed generation (`/blog/rss.xml`)
- SEO metadata (Open Graph, Twitter Cards, JSON-LD Article)
- Reading time calculation
- Custom MDX components (Callout, CodeBlock, Tweet, etc.)
- Navigation integration ("Blog" in header)

### Out of Scope
- Headless CMS integration (Contentful, Sanity, etc.)
- Comment system (Disqus, Giscus, etc.)
- Full-text search (Algolia, Meilisearch) — can be added later
- Newsletter subscription
- Multi-author support

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **MDX Processor** | `@next/mdx` + `next-mdx-remote/rsc` | Native Next.js 15 support, RSC-compatible, zero config |
| **Frontmatter Parsing** | `gray-matter` | Battle-tested, supports YAML/TOML |
| **Syntax Highlighting** | `rehype-pretty-code` + `shiki` | Modern, performant, themes, line numbers, focus |
| **Date Handling** | `date-fns` | Lightweight, tree-shakeable |
| **RSS Generation** | `rss` package at build time | Simple, standards-compliant |
| **Content Directory** | `content/blog/*.mdx` | Colocated, version-controlled, no DB needed |

---

## File Structure

```
content/
└── blog/
    ├── 2026-08-15-building-soc-platform.mdx
    ├── 2026-07-20-legacy-modernization-with-ai-agents.mdx
    └── 2026-06-10-threat-detection-at-scale.mdx

src/
├── lib/
│   ├── blog/
│   │   ├── index.ts           # Public API: getPosts, getPost, getTags, getPostsByTag
│   │   ├── mdx.ts             # MDX compilation pipeline
│   │   ├── rss.ts             # RSS feed generation
│   │   └── types.ts           # BlogPost, BlogPostMeta, Tag types
│   └── mdx-components.tsx     # Custom MDX components registry
├── components/
│   ├── blog/
│   │   ├── BlogPostCard.tsx   # Card for index/tag pages
│   │   ├── BlogPostContent.tsx # MDX-rendered post body
│   │   ├── BlogPostHeader.tsx # Title, date, tags, reading time
│   │   ├── BlogPostMeta.tsx   # SEO metadata generator
│   │   ├── CodeBlock.tsx      # Enhanced code block with copy button
│   │   ├── Callout.tsx        # Info/Warn/Danger callout boxes
│   │   ├── ReadingTime.tsx    # Reading time display
│   │   └── TagLink.tsx        # Tag badge with link
│   └── mdx/
│       ├── Callout.tsx
│       ├── CodeBlock.tsx
│       ├── Tweet.tsx
│       └── index.ts           # Component map for MDX
├── app/
│   ├── blog/
│   │   ├── layout.tsx         # Blog section layout
│   │   ├── page.tsx           # Blog index (paginated)
│   │   ├── rss.xml/route.ts   # RSS feed endpoint
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page.tsx   # Tag archive page
│   │   └── [slug]/
│   │       └── page.tsx       # Individual post page
│   └── components/
│       └── BlogHeader.tsx     # Blog section header
├── data/
│   └── site.ts                # Add "blog" to nav array
└── types/
    └── blog.ts                # Shared blog types (or extend lib/types.ts)
```

---

## Implementation Tasks

### Phase 1: Foundation & Types
1. **Create blog types** (`src/lib/blog/types.ts`)
   - `BlogPostMeta` (frontmatter: title, date, description, tags, coverImage, draft)
   - `BlogPost` (meta + content + slug + readingTime)
   - `TagCount` (tag + count)

2. **Add blog to site config** (`src/data/site.ts`)
   - Add `{ id: "blog", label: "Blog" }` to `nav` array
   - Add `blogUrl` to siteConfig

3. **Create MDX compilation pipeline** (`src/lib/blog/mdx.ts`)
   - `compileMDX(source: string)` → `{ content: ReactNode, frontmatter: BlogPostMeta }`
   - Use `@next/mdx` with `rehype-pretty-code`, `rehype-slug`, `rehype-autolink-headings`
   - Configure Shiki theme (github-dark / github-light based on CSS vars)

### Phase 2: Content Layer
4. **Build content utilities** (`src/lib/blog/index.ts`)
   - `getAllPosts(): BlogPost[]` — read all `.mdx` files, parse frontmatter, sort by date desc
   - `getPost(slug: string): BlogPost | null` — single post by slug
   - `getAllTags(): TagCount[]` — unique tags with counts
   - `getPostsByTag(tag: string): BlogPost[]` — filtered posts
   - `getPaginatedPosts(page: number, perPage: number)` — pagination helper

5. **Create RSS generator** (`src/lib/blog/rss.ts`)
   - `generateRSSFeed(posts: BlogPost[]): string` — RSS 2.0 XML
   - Include: title, link, description, items with guid, pubDate, categories
   - Route: `src/app/blog/rss.xml/route.ts` → returns `Response` with `Content-Type: application/xml`

### Phase 3: MDX Components
6. **Custom MDX components** (`src/components/mdx/`)
   - `CodeBlock` — wrapper with filename, copy button, line highlighting
   - `Callout` — `<Callout type="info|warn|danger|tip">content</Callout>`
   - `Tweet` — embed tweet by ID
   - `index.ts` — export component map for `MDXRemote`

7. **Register components** (`src/lib/mdx-components.tsx`)
   - Merge with default HTML elements
   - Export `mdxComponents` for use in `MDXRemote`

### Phase 4: Blog Pages
8. **Blog layout** (`src/app/blog/layout.tsx`)
   - Shared header with "Blog" title, description, RSS link
   - Consistent sidebar or full-width based on design

9. **Blog index** (`src/app/blog/page.tsx`)
   - Server Component
   - Fetch posts via `getPaginatedPosts(1, 10)`
   - Render `BlogPostCard` grid
   - Pagination controls (prev/next or numbered)
   - SEO metadata

10. **Individual post page** (`src/app/blog/[slug]/page.tsx`)
    - Server Component with `generateStaticParams()` for all slugs
    - Fetch post via `getPost(slug)`
    - Render `BlogPostHeader` + `BlogPostContent` (wraps `MDXRemote`)
    - SEO: Open Graph article, Twitter Card, JSON-LD `BlogPosting`
    - `notFound()` if post doesn't exist or is draft

11. **Tag archive page** (`src/app/blog/tag/[tag]/page.tsx`)
    - Server Component with `generateStaticParams()` for all tags
    - Fetch posts via `getPostsByTag(tag)`
    - Render similar to index with tag context

### Phase 5: UI Components
12. **BlogPostCard** — title, date, description preview, tags, reading time, link
13. **BlogPostHeader** — title, date, tags (linked), reading time, cover image
14. **BlogPostContent** — `MDXRemote` wrapper with custom components
15. **CodeBlock** — Shiki-highlighted, copy-to-clipboard, line numbers
16. **Callout** — styled boxes with icons (info, warning, danger, tip)
17. **ReadingTime** — "X min read" display
18. **TagLink** — badge linking to `/blog/tag/[tag]`

### Phase 6: Integration & Polish
19. **Update Header navigation** — "Blog" link appears automatically from siteConfig.nav
20. **Add blog to sitemap** — if `next-sitemap` or manual sitemap exists
21. **Sample content** — Create 3-4 example `.mdx` posts in `content/blog/`
22. **Responsive styling** — Match existing Tailwind design system
23. **Dark mode code themes** — Sync Shiki theme with CSS `color-scheme`

---

## Frontmatter Schema

```yaml
---
title: "Building a Unified SOC Platform with 15 Microservices"
date: "2026-08-15"
description: "How we architected a real-time security operations platform..."
tags: ["backend", "security", "architecture", "fastapi", "kafka"]
coverImage: "/blog/soc-platform-cover.png"  # optional, in public/
draft: false  # optional, default false
---
```

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@next/mdx": "^15.1.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "rehype-pretty-code": "^0.14.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.1.0",
    "shiki": "^1.12.0",
    "date-fns": "^4.1.0",
    "rss": "^1.2.2",
    "reading-time": "^1.5.0"
  },
  "devDependencies": {
    "@types/rss": "^0.0.32",
    "@types/reading-time": "^1.2.0"
  }
}
```

---

## Configuration Updates

### `next.config.ts`
```typescript
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // ... existing config
});
```

### `tsconfig.json` — add path alias for `content/*` if needed

---

## Validation & Testing

| Check | Method |
|-------|--------|
| **TypeScript** | `npm run typecheck` — no errors |
| **Lint** | `npm run lint` — no errors |
| **Build** | `npm run build` — succeeds, generates RSS |
| **Dev Server** | `npm run dev` — blog pages render, MDX compiles |
| **RSS Feed** | `curl localhost:3000/blog/rss.xml` — valid XML |
| **Static Params** | Build generates `/blog/[slug]` for all posts |
| **SEO** | View source: OG tags, Twitter cards, JSON-LD present |
| **Syntax Highlighting** | Code blocks render with theme, copy button works |
| **Responsive** | Mobile/tablet/desktop layouts correct |

---

## Rollout Strategy

1. **Feature branch** — `feat/blog-mdx-cms`
2. **Incremental commits** — one phase per commit
3. **Preview deployment** — Vercel preview for review
4. **Merge to main** — after validation passes
5. **Content migration** — add real posts post-launch

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| MDX compilation errors at build | Wrap `compileMDX` in try/catch, log file path, skip draft posts |
| Large bundle from Shiki languages | Use `shiki` with `langs: ['typescript', 'python', 'bash', 'json', 'yaml', 'dockerfile']` |
| RSS feed stale after new post | Regenerate at build time (static), or use ISR with `revalidate` |
| Draft posts leaking to production | Filter `draft: true` in `getAllPosts()` unless `process.env.NODE_ENV === 'development'` |
| Hydration mismatch with MDXRemote | Ensure components are client-only where needed, use `suppressHydrationWarning` sparingly |

---

## Future Enhancements (Post-Launch)

- **Search** — Pagefind (static) or Algolia
- **Series/Collections** — Group related posts
- **Table of Contents** — Auto-generated from headings
- **Social Share Buttons** — Twitter, LinkedIn, Mastodon
- **Reading Progress Bar** — Top-of-page indicator
- **Related Posts** — Tag-based suggestions at bottom
- **Newsletter** — Buttondown/ConvertKit embed
- **Analytics** — Plausible/Umami page views per post