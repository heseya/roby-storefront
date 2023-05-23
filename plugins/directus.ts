import { Directus } from '@directus/sdk'

import { BlogArticle } from '@/interfaces/BlogArticle'
import { AboutPage, AboutPartner } from '@/interfaces/aboutPage'
import { ContactDepartment, ContactPerson } from '@/interfaces/contactPage'
import { WhyUsComponent, WhyUsReason } from '@/interfaces/whyUsComponent'

export type DirectusCollections = {
  Articles: BlogArticle
  Person: ContactPerson
  Departments: ContactDepartment
  AboutPage: AboutPage
  AboutPagePartner: AboutPartner
  WhyUsComponent: WhyUsComponent
  WhyUsReason: WhyUsReason
}

export default defineNuxtPlugin((nuxtApp) => {
  const directus = new Directus<DirectusCollections>(nuxtApp.$config.public.directusUrl)

  return {
    provide: { directus },
  }
})
