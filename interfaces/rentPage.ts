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
  advantages_title: string
  decision_title: string
  decision_description: string
  faq_title_1: string
  faq_title_2: string
}

export interface TranslatedRentPageAdvantage {
  id: ID
  order: number
  image: DirectusImage
  title: string
  description: string
}

export interface TranslatedRentPageStep {
  id: ID
  order: number
  title: string
  description?: string
  button: boolean
}

export interface TranslatedRentPageDecision {
  id: ID
  text: string
  order: number
}

export interface TranslatedRentPageFaq {
  id: ID
  order: number
  type: 'formal' | 'technical'
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
  translations: DirectusTranslated<TranslatedRentPageAdvantage>
  order: number
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
  translations: DirectusTranslated<TranslatedRentPageDecision>
  type: 'formal' | 'technical'
  order: number
}
