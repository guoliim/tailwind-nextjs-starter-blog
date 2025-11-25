import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

/**
 * Footer 组件 - Liquid Glass 轻微风格
 *
 * 设计参考：
 * - ip.skk.moe: 极简风格，居中布局
 * - Liquid Glass: 玻璃胶囊社交图标
 */
export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'var(--spacing-section-md)',
        paddingTop: 'var(--spacing-8)',
        paddingBottom: 'var(--spacing-8)',
      }}
    >
      <div className="flex flex-col items-center">
        {/* 社交图标 - 玻璃胶囊容器 */}
        <div
          className="glass-pill mb-6 flex items-center"
          style={{
            gap: 'var(--spacing-3)',
            padding: 'var(--spacing-2) var(--spacing-4)',
          }}
        >
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={5} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={5} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={5} />
          <SocialIcon kind="x" href={siteMetadata.x} size={5} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={5} />
          <SocialIcon kind="medium" href={siteMetadata.medium} size={5} />
          <SocialIcon kind="rss" href={siteMetadata.rss} size={5} />
        </div>

        {/* 版权信息 */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{
            marginBottom: 'var(--spacing-2)',
            gap: 'var(--spacing-2)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          <span>{siteMetadata.author}</span>
          <span aria-hidden="true">•</span>
          <span>{`© ${new Date().getFullYear()}`}</span>
          <span aria-hidden="true">•</span>
          <Link href="/" className="hover:text-primary-500 transition-colors-fast">
            {siteMetadata.title}
          </Link>
        </div>

        {/* 主题归属 */}
        <div
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="hover:text-primary-500 transition-colors-fast"
          >
            based on Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
