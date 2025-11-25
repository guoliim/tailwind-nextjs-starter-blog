import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

/**
 * Card 组件 - Liquid Glass 轻微风格
 *
 * 设计参考：
 * - ip.skk.moe: 细边框、轻柔阴影、悬浮效果
 * - iOS 26 Liquid Glass: Lensing Effect 边缘高光
 * - 苹果 HIG: 统一圆角系统
 */
const Card = ({ title, description, imgSrc, href }: CardProps) => (
  <div className="md max-w-[544px] md:w-1/2" style={{ padding: 'var(--spacing-4)' }}>
    <div
      className={`${imgSrc && 'h-full'} glass-ultra-light lensing-effect lensing-subtle hover:glass-light overflow-hidden transition-all duration-300`}
      style={{
        borderRadius: 'var(--radius-lg)',
      }}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center transition-transform duration-300 hover:scale-[1.02] md:h-36 lg:h-48"
              width={544}
              height={306}
              style={{
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
              }}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
            style={{
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            }}
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
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="transition-colors-fast hover:text-primary-500"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p
          className="prose mb-3 max-w-none"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-sm)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="transition-colors-fast group inline-flex items-center"
            style={{
              color: 'var(--color-text-link)',
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--leading-normal)',
              fontWeight: 'var(--font-weight-medium)',
            }}
            aria-label={`Link to ${title}`}
          >
            Learn more
            <span
              className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
