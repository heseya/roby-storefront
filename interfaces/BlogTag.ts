import { ID } from '@directus/sdk'
import { DirectusTranslated } from './DirectusTranslated'

export interface BlogTag {
  id: ID
  translations: DirectusTranslated<{ name: string }>
}

export interface TranslatedBlogTag {
  id: ID
  name: string
}
