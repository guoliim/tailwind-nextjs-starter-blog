import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="hover:text-primary-500 mr-3 inline-block transition-colors duration-200"
      style={{
        padding: 'var(--spacing-1) var(--spacing-3)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-text-secondary)',
        textTransform: 'lowercase',
      }}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
