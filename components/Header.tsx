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
  // 基础类名
  let headerClass = 'flex items-center w-full justify-between transition-all duration-300'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  // Liquid Glass 轻微风格 - 参考 ip.skk.moe（极简，无 border/shadow）
  // 使用 CSS 变量确保 dark mode 自动适配
  const headerStyle = siteMetadata.stickyNav
    ? {
        // Liquid Glass 效果 - 轻微模糊 + 饱和度增强
        backgroundColor: 'var(--glass-bg-light)',
        backdropFilter: 'blur(var(--glass-blur-md)) saturate(180%)',
        WebkitBackdropFilter: 'blur(var(--glass-blur-md)) saturate(180%)',
        // 内边距
        padding: 'var(--spacing-3) var(--spacing-4)',
        // 移除 border 和 shadow - 参考 ip.skk.moe 极简风格
      }
    : {
        backgroundColor: 'var(--color-surface-base)',
        padding: 'var(--spacing-4)',
      }

  return (
    <header className={headerClass} style={headerStyle}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div style={{ marginRight: 'var(--spacing-3)' }}>
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div
              className="hidden h-6 sm:block"
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div
        className="flex items-center"
        style={{
          gap: 'var(--spacing-3)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        {/* 统一胶囊容器 - 导航 + 工具按钮合并，参考 ip.skk.moe */}
        <nav
          className="glass-pill no-scrollbar hidden items-center overflow-x-auto sm:flex"
          style={{
            gap: 'var(--spacing-1)',
            padding: 'var(--spacing-1) var(--spacing-2)',
          }}
        >
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 transition-colors-fast"
                style={{
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--font-size-sm)',
                  whiteSpace: 'nowrap',
                  padding: 'var(--spacing-1) var(--spacing-3)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {link.title}
              </Link>
            ))}
          {/* 分隔线 */}
          <div
            style={{
              width: '1px',
              height: '16px',
              backgroundColor: 'var(--glass-border-subtle)',
              margin: '0 var(--spacing-1)',
            }}
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
