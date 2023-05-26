import { ID } from '@directus/sdk'
import { DirectusImage } from './DirectusImage'
import { DirectusTranslated } from './DirectusTranslated'

export interface TranslatedRentPage {
  id: ID
  title: string
  steps_image: DirectusImage
  banner_image: DirectusImage
  banner_text: string
  banner_title: string
  banner_subtitle: string
}

export interface TranslatedRentPageStep {
  id: ID
  order: number
  title: string
  description?: string
  button: boolean
}

export interface RentPage {
  id: ID
  translations: DirectusTranslated<TranslatedRentPage>
}

export interface RentPageStep {
  id: ID
  order: number
  translations: DirectusTranslated<TranslatedRentPageStep>
  button: boolean
}
