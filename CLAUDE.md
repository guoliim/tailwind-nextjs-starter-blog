# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 blog built with Tailwind CSS, TypeScript, and Contentlayer. It uses the Next.js App Router with React Server Components. Content is managed as MDX files in the `data/` directory and processed by Contentlayer into typed objects.

## Development Commands

```bash
# Install dependencies
yarn

# Development server (runs on http://localhost:3000)
yarn dev

# Production build
yarn build

# Serve production build locally
yarn serve

# Lint and auto-fix
yarn lint

# Bundle analysis
yarn analyze
```

## Architecture

### Content Management

- **Contentlayer** (`contentlayer.config.ts`) processes MDX files from `data/blog/` and `data/authors/` into typed content objects
- Blog posts are stored in `data/blog/` as `.mdx` files with frontmatter
- Author profiles are in `data/authors/` (default author is `data/authors/default.md`)
- Contentlayer generates TypeScript types in `.contentlayer/generated`
- On build success, two artifacts are generated:
  - `app/tag-data.json` - tag counts for the tag index
  - `public/search.json` - search index for kbar

### MDX Processing Pipeline

Contentlayer uses a plugin chain for MDX transformation:

**Remark plugins** (process markdown):

- `remarkExtractFrontmatter` - extract YAML frontmatter
- `remarkGfm` - GitHub Flavored Markdown
- `remarkCodeTitles` - code block titles
- `remarkMath` - LaTeX math notation
- `remarkImgToJsx` - convert images to JSX

**Rehype plugins** (process HTML):

- `rehypeSlug` - add IDs to headings
- `rehypeAutolinkHeadings` - add anchor links to headings
- `rehypeKatex` - render math with KaTeX
- `rehypeCitation` - bibliography support (reads from `data/references-data.bib`)
- `rehypePrismPlus` - syntax highlighting with line numbers
- `rehypePresetMinify` - minify HTML

### Routing Structure

Next.js App Router pages in `app/`:

- `app/page.tsx` - home page (lists recent posts)
- `app/blog/page.tsx` - blog listing (paginated)
- `app/blog/[...slug]/page.tsx` - individual blog posts (supports nested routes)
- `app/blog/page/[page]/page.tsx` - blog pagination
- `app/tags/page.tsx` - all tags listing
- `app/tags/[tag]/page.tsx` - posts filtered by tag
- `app/projects/page.tsx` - projects showcase
- `app/about/page.tsx` - about page
- `app/api/` - API routes (e.g., newsletter subscription)

### Layouts

Post layouts in `layouts/`:

- **PostLayout** - default 2-column layout with meta and author info
- **PostSimple** - simplified single-column layout
- **PostBanner** - layout with banner image
- **ListLayout** - blog listing with search bar (v1 style)
- **ListLayoutWithTags** - blog listing with tag sidebar (current default)
- **AuthorLayout** - author profile pages

Specify layout in post frontmatter: `layout: PostBanner`

### Component Organization

- `components/` - React components (Header, Footer, MDXComponents, etc.)
- `components/analytics/` - analytics integrations (via pliny)
- `components/comments/` - comment system components (Giscus/Utterances/Disqus)
- `components/social-icons/` - social media icon components
- `layouts/` - page layout templates
- `lib/` - utility functions and helpers

### Configuration Files

- `data/siteMetadata.js` - **primary site configuration** (title, description, social links, analytics, comments, newsletter, search)
- `data/headerNavLinks.ts` - navigation menu links
- `data/projectsData.ts` - projects page data
- `tailwind.config.js` - Tailwind theme customization
- `next.config.js` - Next.js config with CSP headers and Contentlayer integration
- `css/tailwind.css` - global styles
- `css/prism.css` - code block theme (customizable)

### TypeScript Path Aliases

```typescript
@/components/* → components/*
@/data/* → data/*
@/layouts/* → data/layouts/*
@/css/* → css/*
contentlayer/generated → .contentlayer/generated
```

### Pliny Integration

This blog uses the [pliny](https://github.com/timlrx/pliny) library which provides:

- Analytics (Umami, Plausible, Simple Analytics, PostHog, Google Analytics)
- Comment systems (Giscus, Utterances, Disqus)
- Newsletter subscriptions (Mailchimp, Buttondown, Convertkit, Klaviyo, etc.)
- Search functionality (kbar command palette or Algolia)
- MDX plugins and utilities

Configure these features in `data/siteMetadata.js` and relevant environment variables.

## Content Creation

### Blog Post Frontmatter

Required fields:

```yaml
title: 'Post Title'
date: '2024-01-01'
```

Optional fields:

```yaml
tags: ['tag1', 'tag2']
lastmod: '2024-01-02'
draft: false
summary: 'Brief description'
images: ['/static/images/banner.jpg']
authors: ['default', 'author2'] # must match filenames in data/authors/
layout: PostLayout # PostLayout (default), PostSimple, or PostBanner
canonicalUrl: https://example.com/original-post
bibliography: references-data.bib # for citations
```

### Adding New Content

1. **New blog post**: Create `.mdx` file in `data/blog/` with frontmatter
2. **New author**: Create `.mdx` file in `data/authors/` with name, avatar, occupation, etc.
3. **Images**: Place in `public/static/images/` and reference as `/static/images/filename.jpg`
4. **Custom MDX components**: Export from `components/MDXComponents.tsx` (must be default exports)

## Build Process

1. Next.js build runs
2. Contentlayer processes MDX files → generates types and JSON
3. `postbuild.mjs` script runs:
   - Generates RSS feed (`public/feed.xml`)
   - Generates sitemap
   - Creates static files

## Security

- CSP headers configured in `next.config.js`
- Update CSP if adding external scripts/services
- Security headers include HSTS, X-Frame-Options, etc.

## Testing & Quality

- **Husky** pre-commit hooks configured
- **lint-staged** runs ESLint and Prettier on staged files
- Prettier enforces code formatting (with Tailwind class sorting)
- ESLint with TypeScript, Next.js, and accessibility rules

## Deployment

Default deployment target: Vercel (optimized for Next.js)

For static hosting (GitHub Pages, S3, etc.):

1. Add `output: 'export'` to `next.config.js`
2. Comment out `headers()` function
3. Add `unoptimized: true` to images config or use external image optimization
4. Remove API routes and server components
5. Run `yarn build` → static output in `out/` folder
