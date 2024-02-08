import type { ID } from '@directus/sdk'
import type { DirectusImage } from './DirectusImage'
import type { BlogTag } from './BlogTag'
import type { DirectusTranslated } from './DirectusTranslated'

export interface BlogArticle {
  id: ID
  image: DirectusImage
  cover_image?: DirectusImage
  hide_cover?: boolean
  no_index: boolean
  date_created: string
  date_updated: string
  status: 'draft' | 'published' | 'archived'
  tags: {
    id: ID
    BlogTags_id: BlogTag
  }[]
  slug: string
  translations: DirectusTranslated<{
    title: string
    content: string
    description: string
    seo_title: string
    seo_description: string
    metatags: string | null
  }>
  user_created: {
    first_name: string
    last_name: string
    avatar: DirectusImage
  }
}

export interface TranslatedBlogArticle {
  id: ID
  image: string
  cover_image: string
  hide_cover: boolean
  date_created: string
  date_updated: string
  status: 'draft' | 'published' | 'archived'
  title: string
  content: string
  slug: string
  description: string
  seo_title: string
  seo_description: string
  metatags: string | null
  tags: string[]
  user_created: {
    first_name: string
    last_name: string
    avatar_url: string
  }
}
