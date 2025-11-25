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
  <div className="md max-w-[544px] p-[var(--spacing-4)] md:w-1/2">
    <div
      className={`${imgSrc && 'h-full'} glass-ultra-light lensing-effect lensing-subtle hover:glass-light overflow-hidden rounded-[var(--radius-lg)] transition-all duration-300`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="rounded-t-[var(--radius-lg)] object-cover object-center transition-transform duration-300 hover:scale-[1.02] md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="rounded-t-[var(--radius-lg)] object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-[var(--spacing-component-lg)]">
        <h2 className="typography-h5 mb-[var(--spacing-3)] text-[var(--color-text-primary)]">
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
        <p className="prose mb-3 max-w-none text-[length:var(--font-size-sm)] leading-[var(--leading-relaxed)] text-[var(--color-text-secondary)]">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="group transition-colors-fast inline-flex items-center text-[length:var(--font-size-sm)] leading-[var(--leading-normal)] font-[var(--font-weight-medium)] text-[var(--color-text-link)]"
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
