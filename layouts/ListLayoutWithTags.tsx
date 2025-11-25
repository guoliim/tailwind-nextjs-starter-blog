'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

/**
 * Pagination 组件 - 玻璃卡片风格
 */
function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="glass-ultra-light mt-[var(--spacing-6)] rounded-[var(--radius-lg)] p-[var(--spacing-4)]">
      <nav className="flex items-center justify-between">
        {!prevPage ? (
          <button
            className="cursor-not-allowed rounded-[var(--radius-md)] px-[var(--spacing-4)] py-[var(--spacing-2)] text-gray-400 dark:text-gray-600"
            disabled
          >
            ← Previous
          </button>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-primary-500 transition-colors-fast hover:text-primary-600 dark:hover:text-primary-400 rounded-[var(--radius-md)] px-[var(--spacing-4)] py-[var(--spacing-2)]"
          >
            ← Previous
          </Link>
        )}
        <span className="text-[length:var(--font-size-sm)] text-gray-600 dark:text-gray-400">
          {currentPage} of {totalPages}
        </span>
        {!nextPage ? (
          <button
            className="cursor-not-allowed rounded-[var(--radius-md)] px-[var(--spacing-4)] py-[var(--spacing-2)] text-gray-400 dark:text-gray-600"
            disabled
          >
            Next →
          </button>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-primary-500 transition-colors-fast hover:text-primary-600 dark:hover:text-primary-400 rounded-[var(--radius-md)] px-[var(--spacing-4)] py-[var(--spacing-2)]"
          >
            Next →
          </Link>
        )}
      </nav>
    </div>
  )
}

/**
 * ListLayoutWithTags - 博客列表布局
 *
 * 设计参考：
 * - ip.skk.moe: 卡片化布局，移除分割线
 * - Liquid Glass: 玻璃效果卡片
 */
export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex gap-[var(--spacing-6)]">
          {/* 侧边栏标签列表 - 玻璃卡片风格 */}
          <div className="glass-ultra-light sticky top-[var(--spacing-20)] hidden h-fit max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-[var(--radius-lg)] p-[var(--spacing-4)] sm:flex">
            <div className="p-[var(--spacing-2)]">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-500 mb-[var(--spacing-3)] font-bold uppercase">
                  All Posts
                </h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="transition-colors-fast hover:text-primary-500 dark:hover:text-primary-500 mb-[var(--spacing-3)] block font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </Link>
              )}
              <ul className="space-y-1">
                {sortedTags.map((t) => {
                  const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                  return (
                    <li key={t}>
                      {isActive ? (
                        <span className="text-primary-500 block rounded-[var(--radius-md)] bg-[var(--glass-bg-tinted-primary)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </span>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="transition-colors-fast hover:text-primary-500 dark:hover:text-primary-500 block rounded-[var(--radius-md)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          {/* 文章列表 - 卡片化 */}
          <div className="flex-1">
            <ul className="space-y-4">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path}>
                    <article className="glass-ultra-light hover:glass-light rounded-[var(--radius-lg)] p-[var(--spacing-5)] transition-all duration-300">
                      <div className="flex flex-col space-y-2">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-sm leading-6 font-medium text-gray-500 dark:text-gray-400">
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </dd>
                        </dl>
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-xl leading-8 font-bold tracking-tight">
                              <Link
                                href={`/${path}`}
                                className="hover:text-primary-500 transition-colors-fast dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="mt-1 flex flex-wrap">
                              {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                            </div>
                          </div>
                          {summary && (
                            <div className="prose max-w-none text-sm text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
