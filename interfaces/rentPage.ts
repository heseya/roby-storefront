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
}

export interface TranslatedRentPageAdvantage {
  id: ID
  order: number
  icon: DirectusImage
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
  translations: DirectusTranslated<TranslatedRentPageStep>
  order: number
  icon: DirectusImage
}

export interface RentPageDecision {
  id: ID
  translations: DirectusTranslated<TranslatedRentPageDecision>
}
