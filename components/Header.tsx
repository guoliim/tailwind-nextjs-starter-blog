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

  return (
    <header
      className={headerClass}
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'var(--spacing-10)',
        paddingBottom: 'var(--spacing-10)',
      }}
    >
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
            gap: 'var(--spacing-4)',
            maxWidth: '10rem',
          }}
        >
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="transition-colors-fast"
                style={{
                  margin: 'var(--spacing-1)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-text-primary)',
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
