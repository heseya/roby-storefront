import { ID } from '@directus/sdk'
import { DirectusTranslated } from './DirectusTranslated'

export interface Tag {
  id: ID
  translations: DirectusTranslated<{ name: string }>
}

export interface TranslatedTag {
  id: ID
  name: string
}
