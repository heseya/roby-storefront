import type { ID } from '@directus/sdk'
import type { DirectusTranslated } from './DirectusTranslated'

interface RawBlogTag {
  id: ID
  translations: DirectusTranslated<{ name: string }>
}

interface NestedBlogTag {
  id: ID
  BlogTags_id: RawBlogTag
}

export type BlogTag = RawBlogTag | NestedBlogTag

export interface TranslatedBlogTag {
  id: ID
  name: string
}
