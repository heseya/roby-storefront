import { Directus } from '@directus/sdk'

import { BlogArticle } from '@/interfaces/BlogArticle'
import { AboutPage, AboutPartner } from '@/interfaces/aboutPage'
import { ContactDepartment, ContactPerson } from '@/interfaces/contactPage'
import { WhyUsComponent, WhyUsReason } from '@/interfaces/whyUsComponent'
import {
  RentPage,
  RentPageAdvantage,
  RentPageDecision,
  RentPageFaq,
  RentPageForm,
  RentPageStep,
} from '@/interfaces/rentPage'

export type DirectusCollections = {
  Articles: BlogArticle
  Person: ContactPerson
  Departments: ContactDepartment
  AboutPage: AboutPage
  AboutPagePartner: AboutPartner
  WhyUsComponent: WhyUsComponent
  WhyUsReason: WhyUsReason
  RentPage: RentPage
  RentPageStep: RentPageStep
  RentPageAdvantage: RentPageAdvantage
  RentPageDecision: RentPageDecision
  RentPageForm: RentPageForm
  RentPageFaq: RentPageFaq
}

export default defineNuxtPlugin((nuxtApp) => {
  const directus = new Directus<DirectusCollections>(nuxtApp.$config.public.directusUrl)

  return {
    provide: { directus },
  }
})
