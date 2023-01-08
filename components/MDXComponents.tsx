/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import PostLayout from '@/layouts/PostLayout'
import AuthorLayout from '@/layouts/AuthorLayout'
import ListLayout from '@/layouts/ListLayout'
import PostSimple from '@/layouts/PostSimple'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  switch (layout) {
    case 'PostLayout':
      // @ts-ignore
      return <PostLayout {...rest} />
    case 'AuthorLayout':
      // @ts-ignore
      return <AuthorLayout {...rest} />
    case 'ListLayout':
      // @ts-ignore
      return <ListLayout {...rest} />
    case 'PostSimple':
      // @ts-ignore
      return <PostSimple {...rest} />
  }
}

export const MDXComponents = {
  Image,
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  BlogNewsletterForm,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
