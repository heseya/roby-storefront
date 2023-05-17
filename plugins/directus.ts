import { Directus } from '@directus/sdk'

import { BlogArticle } from '~/interfaces/BlogArticle'

export type DirectusCollections = {
  Article: BlogArticle
}

export default defineNuxtPlugin((nuxtApp) => {
  const directus = new Directus<DirectusCollections>(nuxtApp.$config.public.directusUrl)

  if (directus.url) {
    return {
      provide: { directus },
    }
  }
})
