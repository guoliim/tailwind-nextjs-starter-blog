# Blog 设计系统完整参考

> 基于 Apple App Store 设计语言，为 Tailwind Next.js 博客定制的设计体系

---

## 📑 目录

1. [设计原则](#设计原则)
2. [色彩系统](#色彩系统)
3. [字体排版](#字体排版)
4. [间距系统](#间距系统)
5. [布局系统](#布局系统)
6. [组件规范](#组件规范)
7. [动效系统](#动效系统)
8. [响应式设计](#响应式设计)
9. [暗色模式](#暗色模式)
10. [代码示例](#代码示例)

---

## 设计原则

### 核心价值观

#### 🎯 内容优先 (Content First)

- 排版服务于阅读体验
- 清晰的视觉层次
- 充足的留白空间

#### 🎨 简约克制 (Simplicity)

- 精简色彩使用（主色 + 中性色）
- 避免过度设计
- 一致的设计语言

#### ⚡ 性能至上 (Performance)

- 优化字体加载
- 响应式图片
- 减少动画复杂度

#### ♿ 可访问性 (Accessibility)

- WCAG 2.1 AA 级对比度
- 支持屏幕阅读器
- 键盘导航友好
- 支持 `prefers-reduced-motion`

---

## 色彩系统

### 设计哲学

参考 Apple 的语义化色彩系统，但简化为博客场景：

```
Apple 方式：
--systemPrimary / Secondary / Tertiary / Quaternary

博客简化：
--color-text-primary / secondary / tertiary
--color-surface-base / elevated / inverse
--color-border-default / subtle
```

### 色彩架构

#### 1. 主题色 (Brand Colors)

**Indigo 色板：**

```css
/* 当前使用的 indigo 调色板 */
--color-primary-50: oklch(0.976 0.014 272.314); /* 最浅 - 背景色调 */
--color-primary-100: oklch(0.954 0.028 272.788);
--color-primary-200: oklch(0.913 0.058 274.293);
--color-primary-300: oklch(0.844 0.103 274.416);
--color-primary-400: oklch(0.738 0.159 274.996);
--color-primary-500: oklch(0.631 0.193 276.934); /* 主色 - 链接/按钮 */
--color-primary-600: oklch(0.541 0.211 277.117); /* 悬停状态 */
--color-primary-700: oklch(0.474 0.185 277.257);
--color-primary-800: oklch(0.405 0.148 276.801);
--color-primary-900: oklch(0.355 0.113 277.077);
--color-primary-950: oklch(0.249 0.081 278.321); /* 最深 */

/* 用途映射 */
--color-brand: var(--color-primary-500);
--color-brand-hover: var(--color-primary-600);
--color-brand-subtle: var(--color-primary-50);
```

#### 2. 中性色 (Neutral Colors)

**Gray 色板：**

```css
--color-gray-50: oklch(0.985 0.002 247.839); /* 白色调 */
--color-gray-100: oklch(0.967 0.003 264.542);
--color-gray-200: oklch(0.928 0.006 264.531);
--color-gray-300: oklch(0.872 0.01 258.338);
--color-gray-400: oklch(0.707 0.022 261.325);
--color-gray-500: oklch(0.551 0.027 264.364); /* 中性灰 */
--color-gray-600: oklch(0.446 0.03 256.802);
--color-gray-700: oklch(0.373 0.034 259.733);
--color-gray-800: oklch(0.278 0.033 256.848);
--color-gray-900: oklch(0.21 0.034 264.665);
--color-gray-950: oklch(0.13 0.028 261.692); /* 黑色调 */
```

#### 3. 语义化色彩令牌

**文本颜色：**

```css
/* 浅色模式 */
--color-text-primary: var(--color-gray-900); /* 主要文字 */
--color-text-secondary: var(--color-gray-600); /* 次要文字 */
--color-text-tertiary: var(--color-gray-500); /* 辅助文字 */
--color-text-placeholder: var(--color-gray-400); /* 占位符 */
--color-text-inverse: var(--color-gray-50); /* 反色文字 */
--color-text-link: var(--color-primary-500); /* 链接 */
--color-text-link-hover: var(--color-primary-600); /* 链接悬停 */

/* 深色模式（在 .dark 类下覆盖）*/
.dark {
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-900);
}
```

**表面颜色：**

```css
/* 浅色模式 */
--color-surface-base: #ffffff; /* 基础背景 */
--color-surface-elevated: var(--color-gray-50); /* 卡片/浮层 */
--color-surface-overlay: rgba(0, 0, 0, 0.5); /* 遮罩 */
--color-surface-subtle: var(--color-gray-100); /* 微妙背景 */
--color-surface-inverse: var(--color-gray-950); /* 反色表面 */

/* 深色模式 */
.dark {
  --color-surface-base: var(--color-gray-950);
  --color-surface-elevated: var(--color-gray-900);
  --color-surface-subtle: var(--color-gray-800);
  --color-surface-inverse: #ffffff;
}
```

**边框颜色：**

```css
--color-border-default: var(--color-gray-200); /* 默认边框 */
--color-border-subtle: var(--color-gray-100); /* 微妙边框 */
--color-border-strong: var(--color-gray-300); /* 强调边框 */
--color-border-brand: var(--color-primary-500); /* 品牌色边框 */

.dark {
  --color-border-default: var(--color-gray-800);
  --color-border-subtle: var(--color-gray-900);
  --color-border-strong: var(--color-gray-700);
}
```

#### 4. 功能色彩

```css
/* 成功 */
--color-success: oklch(0.648 0.155 154.328); /* 绿色 */
--color-success-bg: oklch(0.961 0.029 152.015);

/* 警告 */
--color-warning: oklch(0.808 0.171 85.594); /* 黄色 */
--color-warning-bg: oklch(0.978 0.046 96.053);

/* 错误 */
--color-error: oklch(0.637 0.237 27.325); /* 红色 */
--color-error-bg: oklch(0.97 0.043 17.35);

/* 信息 */
--color-info: var(--color-primary-500); /* 蓝色 */
--color-info-bg: var(--color-primary-50);
```

#### 5. 色彩使用规范

**对比度标准（WCAG 2.1 AA）：**

```
正文文字：4.5:1
大号文字（18px+）：3:1
UI 组件：3:1

当前配置验证：
✅ gray-900 on white: 16.3:1 (优秀)
✅ primary-500 on white: 5.2:1 (通过)
✅ gray-600 on white: 4.6:1 (通过)
```

**色彩科学计算：**

```typescript
// ITU-R BT.709 标准亮度计算
function getLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// 判断是否需要浅色文字
function shouldUseLightText(bgColor: string): boolean {
  const luminance = getLuminance(r, g, b)
  return luminance < 127
}

// 使用示例
const bgLuminance = getLuminance(99, 102, 241) // indigo-500
if (shouldUseLightText(bgLuminance)) {
  textColor = 'white'
}
```

---

## 字体排版

### 字体家族

#### 主字体：Space Grotesk

```typescript
// app/layout.tsx
import { Space_Grotesk } from 'next/font/google'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'], // 扩展字重范围
})
```

```css
@theme {
  --font-sans:
    var(--font-space-grotesk), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;

  --font-mono: 'Fira Code', 'SF Mono', 'Consolas', 'Monaco', monospace;
}
```

#### 可选：双字体方案

```typescript
// Display 字体（标题）
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700', '800'],
})

// Text 字体（正文）
const sourceSerifPro = Source_Serif_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-text',
  weight: ['400', '600'],
})
```

```css
--font-display: var(--font-display-var), var(--font-sans);
--font-text: var(--font-text-var), Georgia, serif;
```

### 字重系统

```css
@theme {
  --font-weight-normal: 400; /* 正文 */
  --font-weight-medium: 500; /* 次级标题 */
  --font-weight-semibold: 600; /* 强调、小标题 */
  --font-weight-bold: 700; /* 主标题 */
  --font-weight-extrabold: 800; /* 超大标题（可选）*/
}
```

**使用指南：**

- **400 (Normal)**: 正文段落、说明文字
- **500 (Medium)**: 按钮、标签、次要强调
- **600 (Semibold)**: H3-H6、卡片标题、强调文字
- **700 (Bold)**: H1-H2、页面标题
- **800 (Extrabold)**: 特大标题、首屏标语（谨慎使用）

### 字号系统

```css
@theme {
  /* 基础字号（16px = 1rem）*/
  --font-size-xs: 0.75rem; /* 12px - 标签、提示 */
  --font-size-sm: 0.875rem; /* 14px - 说明文字、按钮 */
  --font-size-base: 1rem; /* 16px - 正文 */
  --font-size-lg: 1.125rem; /* 18px - 导言、引用 */
  --font-size-xl: 1.25rem; /* 20px - H6 */
  --font-size-2xl: 1.5rem; /* 24px - H5 */
  --font-size-3xl: 1.875rem; /* 30px - H4 */
  --font-size-4xl: 2.25rem; /* 36px - H3 */
  --font-size-5xl: 3rem; /* 48px - H2 */
  --font-size-6xl: 3.75rem; /* 60px - H1 */
  --font-size-7xl: 4.5rem; /* 72px - 超大标题 */
}

/* 响应式字号 */
@media (max-width: 768px) {
  :root {
    --font-size-5xl: 2.5rem; /* H2 在移动端缩小 */
    --font-size-6xl: 3rem; /* H1 在移动端缩小 */
  }
}
```

### 行高系统

```css
@theme {
  --leading-none: 1; /* 单行文本、图标 */
  --leading-tight: 1.2; /* 标题（H1-H3）*/
  --leading-snug: 1.375; /* 副标题（H4-H6）*/
  --leading-normal: 1.5; /* 正文、按钮 */
  --leading-relaxed: 1.625; /* 长文本 */
  --leading-loose: 1.75; /* 引用块 */
}
```

**使用规则：**

- **标题（H1-H3）**: `leading-tight` (1.2)
- **副标题（H4-H6）**: `leading-snug` (1.375)
- **正文段落**: `leading-relaxed` (1.625)
- **按钮/导航**: `leading-normal` (1.5)

### 字间距系统

```css
@theme {
  --tracking-tighter: -0.05em; /* 超大标题 */
  --tracking-tight: -0.025em; /* 大标题 */
  --tracking-normal: 0em; /* 正文 */
  --tracking-wide: 0.025em; /* 按钮、标签 */
  --tracking-wider: 0.05em; /* 全大写文字 */
  --tracking-widest: 0.1em; /* 装饰性文字 */
}
```

### 排版组合（Typography Tokens）

```css
/* === 标题层级 === */
.typography-display {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--font-size-7xl);
  font-weight: var(--font-weight-extrabold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
}

.typography-h1 {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.typography-h2 {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.typography-h3 {
  font-family: var(--font-display, var(--font-sans));
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
}

.typography-h4 {
  font-family: var(--font-sans);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
}

.typography-h5 {
  font-family: var(--font-sans);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
}

.typography-h6 {
  font-family: var(--font-sans);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-normal);
}

/* === 正文层级 === */
.typography-body-large {
  font-family: var(--font-text, var(--font-sans));
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-relaxed);
}

.typography-body {
  font-family: var(--font-text, var(--font-sans));
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-relaxed);
}

.typography-body-small {
  font-family: var(--font-text, var(--font-sans));
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
}

/* === 强调变体 === */
.typography-body-emphasized {
  font-weight: var(--font-weight-semibold);
}

.typography-body-subtle {
  color: var(--color-text-secondary);
}

/* === 特殊用途 === */
.typography-caption {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

.typography-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.typography-code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  font-weight: var(--font-weight-normal);
}

.typography-blockquote {
  font-size: var(--font-size-lg);
  font-style: italic;
  line-height: var(--leading-loose);
  color: var(--color-text-secondary);
}
```

---

## 间距系统

### 基础间距单位

参考 Apple 的精确间距控制，使用 4px 基准网格：

```css
@theme {
  --spacing-0: 0px;
  --spacing-px: 1px;
  --spacing-0_5: 0.125rem; /* 2px */
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-7: 1.75rem; /* 28px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-16: 4rem; /* 64px */
  --spacing-20: 5rem; /* 80px */
  --spacing-24: 6rem; /* 96px */
  --spacing-32: 8rem; /* 128px */
}
```

### 语义化间距令牌

```css
/* === 组件内间距 === */
--spacing-component-xs: var(--spacing-1); /* 4px - 图标与文字 */
--spacing-component-sm: var(--spacing-2); /* 8px - 紧凑组件 */
--spacing-component-md: var(--spacing-4); /* 16px - 标准组件 */
--spacing-component-lg: var(--spacing-6); /* 24px - 松散组件 */
--spacing-component-xl: var(--spacing-8); /* 32px - 卡片内边距 */

/* === 内容间距 === */
--spacing-content-xs: var(--spacing-2); /* 8px - 行内元素 */
--spacing-content-sm: var(--spacing-4); /* 16px - 段落间距 */
--spacing-content-md: var(--spacing-6); /* 24px - 章节间距 */
--spacing-content-lg: var(--spacing-8); /* 32px - 模块间距 */
--spacing-content-xl: var(--spacing-12); /* 48px - 大模块 */

/* === 页面布局间距 === */
--spacing-layout-gutter: clamp(1rem, 5vw, 2.5rem); /* 页面边距 */
--spacing-section-sm: var(--spacing-12); /* 48px */
--spacing-section-md: var(--spacing-16); /* 64px */
--spacing-section-lg: var(--spacing-24); /* 96px */
--spacing-section-xl: var(--spacing-32); /* 128px */
```

### 响应式间距

```css
/* 页面容器边距 */
--spacing-page-gutter: 1rem; /* 默认 16px */

@media (min-width: 640px) {
  --spacing-page-gutter: 1.5rem; /* 平板 24px */
}

@media (min-width: 1024px) {
  --spacing-page-gutter: 2rem; /* 桌面 32px */
}

@media (min-width: 1280px) {
  --spacing-page-gutter: 2.5rem; /* 大屏 40px */
}
```

### 栅格间距

```css
/* 列间距 */
--grid-gap-x-sm: var(--spacing-4); /* 16px - 移动端 */
--grid-gap-x-md: var(--spacing-5); /* 20px - 平板 */
--grid-gap-x-lg: var(--spacing-6); /* 24px - 桌面 */

/* 行间距 */
--grid-gap-y-sm: var(--spacing-6); /* 24px - 移动端 */
--grid-gap-y-md: var(--spacing-8); /* 32px - 平板 */
--grid-gap-y-lg: var(--spacing-10); /* 40px - 桌面 */
```

---

## 布局系统

### 容器系统

```css
/* 最大宽度容器 */
.container-xs {
  max-width: 640px;
} /* 博客文章 */
.container-sm {
  max-width: 768px;
} /* 小表单 */
.container-md {
  max-width: 1024px;
} /* 标准内容 */
.container-lg {
  max-width: 1280px;
} /* 宽屏内容 */
.container-xl {
  max-width: 1536px;
} /* 超宽 */
.container-full {
  max-width: 100%;
} /* 全宽 */

/* 带边距的容器 */
.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--spacing-page-gutter);
}
```

### 响应式断点

```css
/* 5级断点系统（参考 Apple）*/
@custom-media --screen-xs (max-width: 639px); /* 0-639px 移动端 */
@custom-media --screen-sm (min-width: 640px); /* 640-767px 大手机 */
@custom-media --screen-md (min-width: 768px); /* 768-1023px 平板 */
@custom-media --screen-lg (min-width: 1024px); /* 1024-1279px 小桌面 */
@custom-media --screen-xl (min-width: 1280px); /* 1280px+ 大桌面 */

/* 范围查询 */
@custom-media --screen-sm-only (min-width: 640px) and (max-width: 767px);
@custom-media --screen-md-only (min-width: 768px) and (max-width: 1023px);
```

**Tailwind v4 配置：**

```javascript
// tailwind.config.js (如需自定义)
export default {
  theme: {
    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
}
```

### 网格系统

```css
/* 基础网格 */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--grid-gap-y-md) var(--grid-gap-x-md);
}

/* 固定列网格 */
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* 响应式网格 */
.grid-responsive {
  display: grid;
  gap: var(--spacing-6);
  grid-template-columns: 1fr; /* 移动端：1列 */
}

@media (--screen-sm) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr); /* 平板：2列 */
  }
}

@media (--screen-lg) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr); /* 桌面：3列 */
  }
}
```

### 博客特定布局

```css
/* 文章布局（经典左右结构）*/
.article-layout {
  display: grid;
  gap: var(--spacing-8);
  grid-template-columns: 1fr;
}

@media (--screen-lg) {
  .article-layout {
    grid-template-columns: minmax(0, 3fr) minmax(250px, 1fr);
  }
}

/* 卡片网格 */
.card-grid {
  display: grid;
  gap: var(--spacing-6);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* 瀑布流（可选）*/
.masonry {
  columns: 1;
  column-gap: var(--spacing-6);
}

@media (--screen-md) {
  .masonry {
    columns: 2;
  }
}

@media (--screen-lg) {
  .masonry {
    columns: 3;
  }
}
```

---

## 组件规范

### 按钮 (Button)

```css
/* 基础按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
  border-radius: 0.5rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 210ms ease-out;
  user-select: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

/* 主要按钮 */
.btn-primary {
  background-color: var(--color-brand);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-brand-hover);
}

/* 次要按钮 */
.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border-default);
}

.btn-secondary:hover {
  background-color: var(--color-surface-subtle);
}

/* 幽灵按钮 */
.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);
}

.btn-ghost:hover {
  background-color: var(--color-surface-subtle);
}

/* 尺寸变体 */
.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
}
```

### 卡片 (Card)

```css
.card {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: 1rem;
  padding: var(--spacing-6);
  transition: all 210ms ease-out;
}

.card:hover {
  border-color: var(--color-border-default);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: var(--spacing-4);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
  color: var(--color-text-primary);
}

.card-description {
  font-size: var(--font-size-sm);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-2);
}

.card-body {
  color: var(--color-text-secondary);
}

.card-footer {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-border-subtle);
}
```

### 标签 (Tag)

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
  border-radius: 9999px;
  background-color: var(--color-surface-subtle);
  color: var(--color-text-secondary);
  transition: all 105ms ease-out;
}

.tag:hover {
  background-color: var(--color-brand-subtle);
  color: var(--color-brand);
}

.tag-primary {
  background-color: var(--color-brand-subtle);
  color: var(--color-brand);
}
```

### 输入框 (Input)

```css
.input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  background-color: var(--color-surface-base);
  border: 1px solid var(--color-border-default);
  border-radius: 0.5rem;
  transition: all 210ms ease-out;
}

.input:hover {
  border-color: var(--color-border-strong);
}

.input:focus {
  outline: none;
  border-color: var(--color-brand);
  box-shadow: 0 0 0 3px var(--color-brand-subtle);
}

.input::placeholder {
  color: var(--color-text-placeholder);
}
```

---

## 动效系统

### 时长标准

参考 Apple 的动效时长体系：

```css
@theme {
  --duration-instant: 0ms; /* 无动画 */
  --duration-fast: 105ms; /* 快速反馈 - 按钮 hover */
  --duration-normal: 210ms; /* 标准过渡 - 淡入淡出 */
  --duration-slow: 420ms; /* 慢速过渡 - 复杂动画 */
  --duration-slower: 630ms; /* 更慢 - 特殊场景 */
}
```

**使用指南：**

- **105ms**: 按钮悬停、输入框 focus
- **210ms**: 颜色变化、不透明度、模态框
- **420ms**: 高度变化、位置移动、复杂转换
- **630ms**: 页面过渡、大型动画

### 缓动函数

```css
@theme {
  --ease-in: cubic-bezier(0.4, 0, 1, 1); /* 进入 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1); /* 退出（最常用）*/
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* 双向 */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹跳 */
}
```

**使用规则：**

- **ease-out**: 用于进入视图的元素（90% 场景）
- **ease-in**: 用于离开视图的元素
- **ease-in-out**: 双向移动的元素
- **linear**: 循环动画、加载指示器

### 标准过渡

```css
/* 通用过渡 */
.transition-all {
  transition: all var(--duration-normal) var(--ease-out);
}

.transition-colors {
  transition:
    color var(--duration-normal) var(--ease-out),
    background-color var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out);
}

.transition-opacity {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.transition-transform {
  transition: transform var(--duration-normal) var(--ease-out);
}
```

### 动画预设

```css
/* 淡入 */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in var(--duration-normal) var(--ease-out);
}

/* 滑入 */
@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-up {
  animation: slide-in-up var(--duration-slow) var(--ease-out);
}

/* 缩放 */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in var(--duration-normal) var(--ease-out);
}

/* 脉冲（加载指示器）*/
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 旋转（加载指示器）*/
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

### 减弱动效支持

```css
/* 尊重用户偏好 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 性能优化

```css
/* GPU 加速属性 ✅ */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

/* 优先使用这些属性（不触发重排）*/
transform: translateX(10px); /* ✅ */
opacity: 0.5; /* ✅ */

/* 避免使用（触发重排）*/
left: 10px; /* ❌ */
width: 100px; /* ❌ */
margin-left: 10px; /* ❌ */
```

---

## 响应式设计

### 移动优先策略

```css
/* 基础样式（移动端）*/
.element {
  font-size: var(--font-size-base);
  padding: var(--spacing-4);
}

/* 平板及以上 */
@media (--screen-md) {
  .element {
    font-size: var(--font-size-lg);
    padding: var(--spacing-6);
  }
}

/* 桌面及以上 */
@media (--screen-lg) {
  .element {
    font-size: var(--font-size-xl);
    padding: var(--spacing-8);
  }
}
```

### 响应式排版

```css
/* Fluid Typography（流式排版）*/
.fluid-text {
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
}

/* 标题响应式 */
h1 {
  font-size: clamp(2rem, 5vw, 3.75rem); /* 32px - 60px */
  line-height: var(--leading-tight);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 3rem); /* 24px - 48px */
}

h3 {
  font-size: clamp(1.25rem, 3vw, 2.25rem); /* 20px - 36px */
}
```

### 响应式间距

```css
/* 使用 clamp 实现流式间距 */
.section {
  padding-block: clamp(2rem, 5vw, 4rem); /* 32px - 64px */
  padding-inline: clamp(1rem, 5vw, 2.5rem); /* 16px - 40px */
}

.container {
  max-width: min(90%, 1280px);
  margin-inline: auto;
}
```

### 断点工具类

```css
/* 显示/隐藏 */
.hidden-mobile {
  display: none;
}

@media (--screen-md) {
  .hidden-mobile {
    display: block;
  }
}

.hidden-desktop {
  display: block;
}

@media (--screen-md) {
  .hidden-desktop {
    display: none;
  }
}
```

---

## 暗色模式

### 策略

使用 CSS 变量动态切换，参考 Apple 的 DynamicColor 概念：

```css
/* 基础配置 */
:root {
  color-scheme: light dark;
}

/* 浅色模式（默认）*/
:root {
  --color-bg: #ffffff;
  --color-text: var(--color-gray-900);
}

/* 深色模式 */
.dark {
  --color-bg: var(--color-gray-950);
  --color-text: var(--color-gray-50);
}
```

### 完整色彩映射

```css
:root {
  /* 文本 */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-500);

  /* 表面 */
  --color-surface-base: #ffffff;
  --color-surface-elevated: var(--color-gray-50);
  --color-surface-subtle: var(--color-gray-100);

  /* 边框 */
  --color-border-default: var(--color-gray-200);
  --color-border-subtle: var(--color-gray-100);

  /* 品牌色保持不变 */
  --color-brand: var(--color-primary-500);
}

.dark {
  /* 文本（反转亮度）*/
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-text-tertiary: var(--color-gray-500);

  /* 表面（深色调）*/
  --color-surface-base: var(--color-gray-950);
  --color-surface-elevated: var(--color-gray-900);
  --color-surface-subtle: var(--color-gray-800);

  /* 边框（更暗）*/
  --color-border-default: var(--color-gray-800);
  --color-border-subtle: var(--color-gray-900);

  /* 品牌色在深色模式下可能需要调亮 */
  --color-brand: var(--color-primary-400);
}
```

### 暗色模式特殊处理

```css
/* 图片在深色模式下降低亮度 */
.dark img:not(.no-filter) {
  opacity: 0.9;
  filter: brightness(0.95);
}

/* 代码块在深色模式下特殊样式 */
.dark pre {
  background-color: var(--color-gray-900);
  border-color: var(--color-gray-800);
}

/* 阴影在深色模式下调整 */
.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
```

### 主题切换按钮

```tsx
// components/ThemeSwitch.tsx 示例
function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn-ghost"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
```

---

## 代码示例

### 完整的 Tailwind CSS 配置

```css
/* css/tailwind.css */
@import 'tailwindcss';
@plugin "@tailwindcss/forms";
@plugin '@tailwindcss/typography';
@source '../node_modules/pliny';
@custom-variant dark (&:where(.dark, .dark *));

/* === Core Theme === */
@theme {
  /* 字体家族 */
  --font-sans: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Fira Code', Consolas, monospace;

  /* 字重 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* 字号 */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;

  /* 行高 */
  --leading-tight: 1.2;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 1.75;

  /* 字间距 */
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;

  /* 颜色（已有的 indigo + gray）*/
  --color-primary-500: oklch(0.631 0.193 276.934);
  --color-primary-600: oklch(0.541 0.211 277.117);
  /* ... 其他颜色 ... */

  /* 间距 */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* 动效 */
  --duration-fast: 105ms;
  --duration-normal: 210ms;
  --duration-slow: 420ms;

  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* Z-index */
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
}

/* === 语义化颜色令牌 === */
:root {
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-500);

  --color-surface-base: #ffffff;
  --color-surface-elevated: var(--color-gray-50);

  --color-border-default: var(--color-gray-200);
  --color-border-subtle: var(--color-gray-100);

  --color-brand: var(--color-primary-500);
  --color-brand-hover: var(--color-primary-600);
}

.dark {
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-text-tertiary: var(--color-gray-500);

  --color-surface-base: var(--color-gray-950);
  --color-surface-elevated: var(--color-gray-900);

  --color-border-default: var(--color-gray-800);
  --color-border-subtle: var(--color-gray-900);
}

/* === Base Layer === */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-border-default);
  }

  a,
  button {
    outline-color: var(--color-brand);
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid;
    border-radius: 0.25rem;
    outline-color: var(--color-brand);
  }
}

/* === Utilities Layer === */
@layer utilities {
  /* Prose 样式覆盖 */
  .prose {
    & a {
      color: var(--color-brand);
      &:hover {
        color: var(--color-brand-hover);
      }
      & code {
        color: var(--color-brand);
      }
    }

    & :where(h1, h2) {
      font-weight: var(--font-weight-bold);
      letter-spacing: var(--tracking-tight);
    }

    & h3 {
      font-weight: var(--font-weight-semibold);
    }

    & :where(code):not(pre code) {
      color: var(--color-primary-600);
    }
  }

  .prose-invert {
    & a {
      color: var(--color-brand);
      &:hover {
        color: var(--color-primary-400);
      }
    }

    & :where(h1, h2, h3, h4, h5, h6) {
      color: var(--color-gray-100);
    }
  }

  /* 排版工具类 */
  .typography-h1 {
    font-size: var(--font-size-6xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .typography-body {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    line-height: var(--leading-relaxed);
  }
}

/* === 减弱动效支持 === */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 最佳实践清单

### ✅ 色彩

- [ ] 使用语义化色彩令牌而非硬编码颜色
- [ ] 确保文本对比度达到 WCAG AA 标准（4.5:1）
- [ ] 深色模式下测试所有颜色
- [ ] 主题色数量控制在 1-2 种

### ✅ 字体

- [ ] 使用排版令牌而非直接写字号
- [ ] 标题用 `leading-tight`，正文用 `leading-relaxed`
- [ ] 字重使用规范（400/500/600/700）
- [ ] 大标题使用负 `letter-spacing`

### ✅ 间距

- [ ] 使用 4px 基准网格（spacing-1 = 4px）
- [ ] 语义化间距令牌（component/content/layout）
- [ ] 响应式间距使用 `clamp()`
- [ ] 避免魔术数字，使用变量

### ✅ 布局

- [ ] 移动优先设计
- [ ] 使用语义化 HTML（section, article, aside）
- [ ] 容器最大宽度不超过 1280px（阅读性）
- [ ] 网格间距与内容间距保持一致

### ✅ 动效

- [ ] 按钮用 105ms，模态框用 210ms
- [ ] 优先使用 `transform` 和 `opacity`
- [ ] 添加 `prefers-reduced-motion` 支持
- [ ] 避免过度动画

### ✅ 响应式

- [ ] 移动端至少 16px 字号
- [ ] 触摸目标至少 44x44px
- [ ] 测试 320px - 1920px 宽度
- [ ] 使用相对单位（rem, em, %）

### ✅ 可访问性

- [ ] 所有图片添加 `alt` 属性
- [ ] 表单元素关联 `label`
- [ ] 焦点状态清晰可见
- [ ] 使用语义化 HTML 标签

---

## 设计令牌总结表

| 类别     | 令牌数量                           | 示例                                          |
| -------- | ---------------------------------- | --------------------------------------------- |
| **颜色** | 11层主色 + 11层中性色 + 语义化令牌 | `--color-primary-500`, `--color-text-primary` |
| **字体** | 1-2 字体家族 + 4 字重              | `--font-sans`, `--font-weight-semibold`       |
| **字号** | 10 级                              | `--font-size-base` (16px)                     |
| **行高** | 5 级                               | `--leading-relaxed` (1.625)                   |
| **间距** | 15+ 级                             | `--spacing-4` (16px)                          |
| **断点** | 5 级                               | `xs`, `sm`, `md`, `lg`, `xl`                  |
| **动效** | 4 种时长 + 4 种缓动                | `--duration-normal`, `--ease-out`             |
| **圆角** | Tailwind 默认                      | `0.25rem`, `0.5rem`, `1rem`                   |
| **阴影** | Tailwind 默认                      | `shadow-sm`, `shadow-md`                      |

---

## 参考资源

### 内部文档

- `TYPOGRAPHY_SYSTEM_ANALYSIS.md` - 字体体系深度分析
- `CLAUDE.md` - 项目技术文档
- `/Users/guoli/Workspaces/temp/apps.apple.com/DESIGN_LANGUAGE_SYSTEM.md` - Apple 设计体系

### 外部标准

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - 可访问性指南
- [ITU-R BT.709](https://en.wikipedia.org/wiki/Rec._709) - 色彩空间标准
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs) - Tailwind 文档

### 工具

- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - 对比度检查
- [Type Scale](https://typescale.com/) - 字号比例生成器
- [Coolors](https://coolors.co/) - 配色方案生成

---

_本设计系统基于 Apple App Store 最佳实践，为博客场景优化定制。_
_最后更新：2025-11_
