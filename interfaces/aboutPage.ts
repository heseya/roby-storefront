import { ID } from '@directus/sdk'
import { DirectusTranslated } from './DirectusTranslated'
import { DirectusImage } from './DirectusImage'

export interface AboutPartner {
  name: string
  subname?: string
  description: string
  image: string
}

export interface TranslatedAboutPage {
  banner_image: DirectusImage
  banner_text: string
  banner_title: string
  catching_text: string
  main_image: DirectusImage
  persons_title: string
  point_1: string
  point_2: string
  slider_title: string
  text: string
  title: string
}

export interface AboutPage {
  id: ID
  translations: DirectusTranslated<TranslatedAboutPage>
}
