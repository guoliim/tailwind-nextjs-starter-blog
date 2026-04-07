import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Author as Authors } from 'content-collections'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

/**
 * PostLayout - 文章详情页布局
 *
 * 设计参考：
 * - ip.skk.moe: 卡片化布局，移除分割线
 * - Liquid Glass: 玻璃效果卡片
 */
export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          {/* 文章头部 */}
          <header className="pt-6 pb-8">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          {/* 主体内容区 - 移除 divide-y，改用间距 */}
          <div className="grid-rows-[auto_1fr] pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6">
            {/* 作者信息卡片 */}
            <dl className="glass-ultra-light mb-[var(--spacing-6)] rounded-[var(--radius-lg)] p-[var(--spacing-4)]">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter
                                .replace('https://twitter.com/', '@')
                                .replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* 文章内容区 - 轻微玻璃卡片 */}
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="glass-ultra-light mb-6 rounded-[var(--radius-lg)] px-[var(--spacing-8)] py-[var(--spacing-6)]">
                <div className="prose dark:prose-invert max-w-none">{children}</div>
              </div>
              <div className="glass-ultra-light mb-6 rounded-[var(--radius-lg)] p-[var(--spacing-4)] text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow" className="hover:text-primary-500">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)} className="hover:text-primary-500">
                  View on GitHub
                </Link>
              </div>
              {siteMetadata.comments && (
                <div
                  className="glass-ultra-light rounded-[var(--radius-lg)] p-[var(--spacing-6)] text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>

            {/* 侧边栏 footer - 卡片化，增加间距 */}
            <footer className="space-y-6">
              {tags && (
                <div className="glass-ultra-light rounded-[var(--radius-lg)] p-[var(--spacing-4)]">
                  <h2 className="mb-2 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              {(next || prev) && (
                <div className="glass-ultra-light space-y-4 rounded-[var(--radius-lg)] p-[var(--spacing-4)]">
                  {prev && prev.path && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${prev.path}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && next.path && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${next.path}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* 返回按钮 - 玻璃胶囊样式 */}
              <div className="pt-[var(--spacing-2)]">
                <Link
                  href={`/${basePath}`}
                  className="glass-pill group transition-colors-fast hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center px-[var(--spacing-4)] py-[var(--spacing-2)] text-[length:var(--font-size-sm)] text-gray-600 dark:text-gray-400"
                  aria-label="Back to the blog"
                >
                  <span
                    className="mr-2 transition-transform duration-200 group-hover:-translate-x-1"
                    aria-hidden="true"
                  >
                    &larr;
                  </span>
                  Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
