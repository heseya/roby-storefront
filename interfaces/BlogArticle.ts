import { ID } from '@directus/sdk'
import { DirectusImage } from './DirectusImage'
import { BlogTag } from './BlogTag'
import { DirectusTranslated } from './DirectusTranslated'

export interface BlogArticle {
  id: ID
  image: DirectusImage
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
  }>
  user_created: {
    first_name: string
    last_name: string
    avatar: DirectusImage
  }
}

export interface TranslatedBlogArticle {
  id: ID
  image_url: string
  date_created: string
  date_updated: string
  status: 'draft' | 'published' | 'archived'
  title: string
  content: string
  slug: string
  description: string
  seo_title: string
  seo_description: string
  tags: string[]
  user_created: {
    first_name: string
    last_name: string
    avatar_url: string
  }
}
