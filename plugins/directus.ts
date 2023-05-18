import { Directus } from '@directus/sdk'

import { BlogArticle } from '~/interfaces/BlogArticle'
import { Person } from '~/interfaces/Person'

export type DirectusCollections = {
  Articles: BlogArticle
  Person: Person
}

export default defineNuxtPlugin((nuxtApp) => {
  const directus = new Directus<DirectusCollections>(nuxtApp.$config.public.directusUrl)
  return {
    provide: { directus },
  }
})
