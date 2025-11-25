import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo-60x60.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

/**
 * Header 组件 - Liquid Glass 轻微风格
 *
 * 设计参考：
 * - ip.skk.moe: 胶囊导航、轻微模糊、细边框
 * - iOS 26 Liquid Glass: 半透明背景 + saturate
 * - WWDC 2025: 统一的圆角系统
 */
const Header = () => {
  const baseClass = 'flex w-full items-center justify-between transition-all duration-300'
  const stickyClass = siteMetadata.stickyNav
    ? 'sticky top-0 z-50 bg-[var(--glass-bg-light)] backdrop-blur-[var(--glass-blur-md)] backdrop-saturate-[180%] px-[var(--spacing-4)] py-[var(--spacing-3)]'
    : 'bg-[var(--color-surface-base)] p-[var(--spacing-4)]'

  return (
    <header className={`${baseClass} ${stickyClass}`}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-[var(--spacing-3)]">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-[length:var(--font-size-xl)] font-semibold tracking-[var(--tracking-tight)] text-[var(--color-text-primary)] sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center gap-[var(--spacing-3)] leading-[var(--leading-normal)]">
        {/* 统一胶囊容器 - 导航 + 工具按钮合并，参考 ip.skk.moe */}
        <nav className="glass-pill no-scrollbar hidden items-center gap-[var(--spacing-1)] overflow-x-auto px-[var(--spacing-2)] py-[var(--spacing-1)] sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="transition-colors-fast hover:text-primary-500 rounded-[var(--radius-md)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--font-size-sm)] font-medium whitespace-nowrap text-[var(--color-text-secondary)]"
              >
                {link.title}
              </Link>
            ))}
          {/* 分隔线 */}
          <div
            className="mx-[var(--spacing-1)] h-4 w-px bg-[var(--glass-border-subtle)]"
            aria-hidden="true"
          />
          {/* 工具按钮 */}
          <SearchButton />
          <ThemeSwitch />
        </nav>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
