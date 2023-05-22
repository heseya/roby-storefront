import { Directus } from '@directus/sdk'

import { BlogArticle } from '@/interfaces/BlogArticle'
import { ContactDepartment, ContactPerson } from '@/interfaces/contact'

export type DirectusCollections = {
  Articles: BlogArticle
  Person: ContactPerson
  Departments: ContactDepartment
}

export default defineNuxtPlugin((nuxtApp) => {
  const directus = new Directus<DirectusCollections>(nuxtApp.$config.public.directusUrl)
  return {
    provide: { directus },
  }
})
