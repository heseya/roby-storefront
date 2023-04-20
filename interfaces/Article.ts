import { ID } from '@directus/sdk'
import { DirectusImage } from './DirectusImage'
import { Tag } from './Tag'
import { DirectusTranslated } from './DirectusTranslated'

export interface Article {
  id: ID
  image: DirectusImage
  date_created: string
  date_updated: string
  status: 'draft' | 'published' | 'archived'
  tags: {
    id: ID
    BlogTags_id: Tag
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

export interface TranslatedArticle {
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
