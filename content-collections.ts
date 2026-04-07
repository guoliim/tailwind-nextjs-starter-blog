import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
import { z } from 'zod'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

const remarkPlugins = [
  remarkExtractFrontmatter,
  remarkGfm,
  remarkCodeTitles,
  remarkMath,
  remarkImgToJsx,
  remarkAlert,
]

const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'prepend',
      headingProperties: {
        className: ['content-header'],
      },
      content: icon,
    },
  ],
  rehypeKatex,
  rehypeKatexNoTranslate,
  [rehypeCitation, { path: path.join(root, 'data') }],
  [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
  rehypePresetMinify,
]

const blogs = defineCollection({
  name: 'Blog',
  directory: 'data/blog',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    lastmod: z.string().optional(),
    draft: z.boolean().default(false),
    summary: z.string().optional(),
    images: z.any().optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, {
      cwd: root,
      remarkPlugins,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rehypePlugins: rehypePlugins as any,
    })
    const flattenedPath = `blog/${doc._meta.path}`
    return {
      ...doc,
      body: { code, raw: doc.content },
      slug: doc._meta.path,
      path: flattenedPath,
      filePath: doc._meta.filePath,
      readingTime: JSON.parse(JSON.stringify(readingTime(doc.content))),
      toc: await extractTocHeadings(doc.content),
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images
          ? Array.isArray(doc.images)
            ? doc.images[0]
            : doc.images
          : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${flattenedPath}`,
      },
      _id: flattenedPath,
      _raw: {
        flattenedPath,
        sourceFilePath: doc._meta.filePath,
      },
    }
  },
  onSuccess: (docs) => {
    // Generate tag counts
    const tagCount: Record<string, number> = {}
    docs.forEach((file) => {
      if (file.tags && (!isProduction || file.draft !== true)) {
        file.tags.forEach((tag) => {
          const formattedTag = slug(tag)
          if (formattedTag in tagCount) {
            tagCount[formattedTag] += 1
          } else {
            tagCount[formattedTag] = 1
          }
        })
      }
    })
    writeFileSync('./app/tag-data.json', JSON.stringify(tagCount, null, 2))

    // Generate search index
    if (
      siteMetadata?.search?.provider === 'kbar' &&
      siteMetadata.search.kbarConfig.searchDocumentsPath
    ) {
      writeFileSync(
        `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSON.stringify(allCoreContent(sortPosts(docs as any)))
      )
      console.log('Local search index generated...')
    }
  },
})

const authors = defineCollection({
  name: 'Authors',
  directory: 'data/authors',
  include: '**/*.mdx',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    twitter: z.string().optional(),
    bluesky: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    layout: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, {
      cwd: root,
      remarkPlugins,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rehypePlugins: rehypePlugins as any,
    })
    const flattenedPath = `authors/${doc._meta.path}`
    return {
      ...doc,
      body: { code, raw: doc.content },
      slug: doc._meta.path,
      path: flattenedPath,
      filePath: doc._meta.filePath,
      readingTime: JSON.parse(JSON.stringify(readingTime(doc.content))),
      toc: await extractTocHeadings(doc.content),
      _id: flattenedPath,
      _raw: {
        flattenedPath,
        sourceFilePath: doc._meta.filePath,
      },
    }
  },
})

export default defineConfig({
  content: [blogs, authors],
})
