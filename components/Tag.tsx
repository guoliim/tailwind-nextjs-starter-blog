import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  /** 标签变体：glass（默认）、solid、outline - 参考 ip.skk.moe */
  variant?: 'glass' | 'solid' | 'outline'
}

/**
 * Tag 组件 - 药丸形状标签
 *
 * 设计参考：
 * - ip.skk.moe: 药丸形状（border-radius: 9999px）、轻微玻璃效果
 * - iOS 26: 统一的圆角系统、hover 微动效
 *
 * 变体说明：
 * - glass: 玻璃材质背景（默认）
 * - solid: 实色背景，类似 ip.skk.moe 的"国内"标签
 * - outline: 描边样式，类似 ip.skk.moe 的"国际"标签
 */
const Tag = ({ text, variant = 'glass' }: Props) => {
  // 根据变体选择样式类
  const variantClasses = {
    glass: 'tag-pill tag-pill-glass',
    solid: 'tag-pill tag-pill-solid',
    outline: 'tag-pill tag-pill-outline',
  }

  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`${variantClasses[variant]} mr-2 mb-2 inline-flex items-center`}
      style={{
        textTransform: 'lowercase',
      }}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
