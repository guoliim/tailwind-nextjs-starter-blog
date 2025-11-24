import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo-60x60.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'flex items-center w-full justify-between'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  // Light mode: semi-transparent white with subtle blur
  // Dark mode: handled by CSS custom properties
  const headerStyle = siteMetadata.stickyNav
    ? {
        backgroundColor: 'var(--color-surface-base)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        paddingTop: 'var(--spacing-4)',
        paddingBottom: 'var(--spacing-4)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }
    : {
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'var(--spacing-4)',
        paddingBottom: 'var(--spacing-4)',
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
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
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
        className="flex items-center sm:-mr-6"
        style={{
          gap: 'var(--spacing-4)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        <div
          className="no-scrollbar hidden items-center overflow-x-auto sm:flex"
          style={{
            gap: 'var(--spacing-6)',
            maxWidth: '10rem',
          }}
        >
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 transition-colors duration-200"
                style={{
                  fontWeight: 'var(--font-weight-normal)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-sm)',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
