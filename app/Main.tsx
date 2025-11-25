import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

/**
 * Home 首页组件 - 卡片化布局
 *
 * 设计参考：
 * - ip.skk.moe: 卡片化布局，移除分割线
 * - Liquid Glass: 玻璃效果卡片
 */
export default function Home({ posts }) {
  return (
    <>
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        {/* 卡片化文章列表 - 移除 divide-y，改用间距和玻璃卡片 */}
        <ul className="space-y-6">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug}>
                <article className="glass-ultra-light hover:glass-light rounded-[var(--radius-lg)] p-[var(--spacing-6)] transition-all duration-300">
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-4 xl:col-span-3">
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="hover:text-primary-500 transition-colors-fast dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-2 flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        {summary && (
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/blog/${slug}`}
                        className="glass-pill group transition-colors-fast hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center px-[var(--spacing-4)] py-[var(--spacing-2)] text-[length:var(--font-size-sm)] text-gray-600 dark:text-gray-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more
                        <span
                          className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-[var(--spacing-4)]">
          <Link
            href="/blog"
            className="glass-pill group transition-colors-fast hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center px-[var(--spacing-4)] py-[var(--spacing-2)] text-[length:var(--font-size-sm)] text-gray-600 dark:text-gray-400"
            aria-label="All posts"
          >
            All Posts
            <span
              className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
