# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog built with Tailwind CSS v4, TypeScript, and Contentlayer2 (the maintained fork of Contentlayer). It uses the Next.js App Router with React Server Components. Content is managed as MDX files in the `data/` directory and processed by Contentlayer2 into typed objects.

## Development Commands

```bash
# Install dependencies (uses Yarn Berry 3.6.1)
yarn

# Development server (runs on http://localhost:3000)
yarn dev

# Production build (also generates tag-data.json, search.json, RSS feed, sitemap)
yarn build

# Serve production build locally
yarn serve

# Lint and auto-fix
yarn lint

# Bundle analysis
yarn analyze
```

There is no test framework configured. Validation is done via `yarn build` and `yarn lint`.

## Architecture

### Content Management

- **Contentlayer2** (`contentlayer.config.ts`) processes MDX files from `data/blog/` and `data/authors/` into typed content objects
- Blog posts are stored in `data/blog/` as `.mdx` files with frontmatter
- Author profiles are in `data/authors/` (default author is `data/authors/default.md`)
- Contentlayer2 generates TypeScript types in `.contentlayer/generated`
- On build success, two artifacts are generated:
  - `app/tag-data.json` — tag counts for the tag index
  - `public/search.json` — search index for kbar

### MDX Processing Pipeline

Contentlayer2 uses a plugin chain defined in `contentlayer.config.ts`:

**Remark plugins** (process markdown):
`remarkExtractFrontmatter`, `remarkGfm`, `remarkCodeTitles`, `remarkMath`, `remarkImgToJsx`, `remarkAlert` (GitHub-style blockquote alerts)

**Rehype plugins** (process HTML):
`rehypeSlug`, `rehypeAutolinkHeadings`, `rehypeKatex`, `rehypeKatexNoTranslate`, `rehypeCitation` (reads from `data/references-data.bib`), `rehypePrismPlus`, `rehypePresetMinify`

### Routing Structure

Next.js App Router pages in `app/`:

- `app/page.tsx` — home page (lists recent posts)
- `app/blog/page.tsx` — blog listing (paginated)
- `app/blog/[...slug]/page.tsx` — individual blog posts (supports nested routes)
- `app/blog/page/[page]/page.tsx` — blog pagination
- `app/tags/page.tsx` — all tags listing
- `app/tags/[tag]/page.tsx` — posts filtered by tag
- `app/projects/page.tsx` — projects showcase
- `app/about/page.tsx` — about page
- `app/api/` — API routes (e.g., newsletter subscription)

### Layouts

Post layouts in `layouts/`:

- **PostLayout** — default 2-column layout with meta and author info
- **PostSimple** — simplified single-column layout
- **PostBanner** — layout with banner image
- **ListLayout** — blog listing with search bar (v1 style)
- **ListLayoutWithTags** — blog listing with tag sidebar (current default)
- **AuthorLayout** — author profile pages

Specify layout in post frontmatter: `layout: PostBanner`

### Configuration Files

- `data/siteMetadata.js` — **primary site configuration** (title, description, social links, analytics, comments, newsletter, search)
- `data/headerNavLinks.ts` — navigation menu links
- `data/projectsData.ts` — projects page data
- `tailwind.config.js` — Tailwind theme customization
- `next.config.js` — Next.js config with CSP headers and Contentlayer2 integration
- `css/tailwind.css` — global styles
- `css/prism.css` — code block theme

### TypeScript Path Aliases

```
@/components/* → components/*
@/data/*       → data/*
@/layouts/*    → layouts/*
@/css/*        → css/*
contentlayer/generated → .contentlayer/generated
```

### Pliny Integration

The [pliny](https://github.com/timlrx/pliny) library provides analytics, comment systems (Giscus/Utterances/Disqus), newsletter subscriptions, search (kbar or Algolia), and MDX plugins. Configure in `data/siteMetadata.js`.

## Content Creation

### Blog Post Frontmatter

Required: `title`, `date`. Optional: `tags`, `lastmod`, `draft`, `summary`, `images`, `authors` (must match filenames in `data/authors/`), `layout`, `canonicalUrl`, `bibliography`.

### Adding Content

- **Blog post**: Create `.mdx` file in `data/blog/` with frontmatter
- **Author**: Create `.mdx` file in `data/authors/`
- **Images**: Place in `public/static/images/`, reference as `/static/images/filename.jpg`
- **Custom MDX components**: Export from `components/MDXComponents.tsx`

## Build Process

1. Next.js build runs with Contentlayer2 processing MDX → types and JSON
2. `scripts/postbuild.mjs` generates RSS feed (`public/feed.xml`) and sitemap

## Security

CSP headers are configured in `next.config.js`. Update CSP when adding external scripts/services (e.g., add analytics domains to `script-src`).

## Code Quality

- **Husky** pre-commit hooks run **lint-staged** (ESLint + Prettier on staged files)
- Prettier uses `prettier-plugin-tailwindcss` for class sorting
- SVGs are processed via `@svgr/webpack` (configured in `next.config.js`)
