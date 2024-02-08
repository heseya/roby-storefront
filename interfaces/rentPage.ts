import type { ID } from '@directus/sdk'
import type { DirectusImage } from './DirectusImage'
import type { DirectusTranslated } from './DirectusTranslated'

export interface TranslatedRentPage {
  id: ID
  title: string
  steps_image: DirectusImage
  banner_image: DirectusImage
  banner_text: string
  banner_title: string
  banner_subtitle: string
  advantages_title: string
  decision_title: string
  decision_description: string
  faq_title_1: string
  faq_title_2: string
}

export interface TranslatedRentPageAdvantage {
  id: ID
  image: DirectusImage
  order: number
  title: string
  description: string
}

export interface TranslatedRentPageStep {
  id: ID
  title: string
  order: number
  description?: string
  button: boolean
}

export interface TranslatedRentPageDecision {
  id: ID
  text: string
}

export interface TranslatedRentPageFaq {
  id: ID
  order: number
  title: string
  question: string
  answer: string
}

export interface TranslatedRentPageForm {
  id: ID
  text_1: string
  text_2: string
  description: string
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

export interface RentPageAdvantage {
  id: ID
  order: number
  translations: DirectusTranslated<TranslatedRentPageAdvantage>
  image: DirectusImage
}

export interface RentPageDecision {
  id: ID
  translations: DirectusTranslated<TranslatedRentPageDecision>
}

export interface RentPageForm {
  id: ID
  translations: DirectusTranslated<TranslatedRentPageForm>
}

export interface RentPageFaq {
  id: ID
  order: number
  translations: DirectusTranslated<TranslatedRentPageFaq>
}
