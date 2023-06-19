import { ID } from '@directus/sdk'
import { DirectusTranslated } from './DirectusTranslated'

export interface BlogTag {
  BlogTags_id: string | undefined
  id: ID
  translations: DirectusTranslated<{ name: string }>
}

export interface TranslatedBlogTag {
  id: ID
  name: string
}
