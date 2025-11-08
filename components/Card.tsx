import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] md:w-1/2" style={{ padding: 'var(--spacing-4)' }}>
    <div
      className={`${imgSrc && 'h-full'} transition-all-normal overflow-hidden`}
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div style={{ padding: 'var(--spacing-component-lg)' }}>
        <h2
          className="typography-h5"
          style={{
            marginBottom: 'var(--spacing-3)',
            color: 'var(--color-text-primary)',
          }}
        >
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="transition-colors-fast"
            style={{
              color: 'var(--color-text-link)',
              fontSize: 'var(--font-size-base)',
              lineHeight: 'var(--leading-normal)',
              fontWeight: 'var(--font-weight-medium)',
            }}
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
