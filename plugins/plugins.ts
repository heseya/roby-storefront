import { Directus } from '@directus/sdk'

import { Article } from '~/interfaces/Article'

type DirectusCollections = {
  Article: Article
}

export default defineNuxtPlugin((nuxtApp) => {
  const directus = new Directus<DirectusCollections>(nuxtApp.$config.public.directusUrl)
  return {
    provide: { directus },
  }
})
