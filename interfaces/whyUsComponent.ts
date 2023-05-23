import { ID } from '@directus/sdk'
import { DirectusImage } from './DirectusImage'
import { DirectusTranslated } from './DirectusTranslated'

export interface WhyUsComponent {
  id: ID
  image: DirectusImage
  translations: DirectusTranslated<{
    title: string
    image_title: string
    image_description: string
  }>
  active: boolean
}

export interface TranslatedWhyUsComponent {
  title: string
  image_title: string
  image_description: string
  image: DirectusImage
  active: boolean
}
