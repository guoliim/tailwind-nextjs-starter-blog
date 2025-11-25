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
    <footer className="mt-[var(--spacing-section-md)] py-[var(--spacing-8)]">
      <div className="flex flex-col items-center">
        {/* 社交图标 - 玻璃胶囊容器 */}
        <div className="glass-pill mb-6 flex items-center gap-[var(--spacing-3)] px-[var(--spacing-4)] py-[var(--spacing-2)]">
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
        <div className="mb-[var(--spacing-2)] flex flex-wrap items-center justify-center gap-[var(--spacing-2)] text-[length:var(--font-size-sm)] text-[var(--color-text-tertiary)]">
          <span>{siteMetadata.author}</span>
          <span aria-hidden="true">•</span>
          <span>{`© ${new Date().getFullYear()}`}</span>
          <span aria-hidden="true">•</span>
          <Link href="/" className="transition-colors-fast hover:text-primary-500">
            {siteMetadata.title}
          </Link>
        </div>

        {/* 主题归属 */}
        <div className="text-[length:var(--font-size-xs)] text-[var(--color-text-tertiary)]">
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="transition-colors-fast hover:text-primary-500"
          >
            based on Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
