import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

/**
 * Tags 页面 - Liquid Glass 卡片风格
 *
 * 设计参考：
 * - ip.skk.moe: 卡片化布局，移除分割线
 * - Liquid Glass: 玻璃效果卡片
 */
export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div
        className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center"
        style={{ gap: 'var(--spacing-8)' }}
      >
        <div className="pt-6 pb-8 md:pt-0 md:pb-0">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Tags
          </h1>
        </div>
        <div
          className="glass-ultra-light flex max-w-2xl flex-wrap"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-6)',
            gap: 'var(--spacing-3)',
          }}
        >
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="tag-pill tag-pill-glass inline-flex items-center transition-all duration-200 hover:scale-105"
                aria-label={`View posts tagged ${t}`}
              >
                {t}
                <span
                  className="text-gray-500 dark:text-gray-400"
                  style={{
                    marginLeft: 'var(--spacing-1)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  ({tagCounts[t]})
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
