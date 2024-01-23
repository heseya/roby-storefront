import { Auth, Directus } from '@directus/sdk'
import { DirectusCollections } from '~/plugins/directus'

export const useDirectus = (): Directus<DirectusCollections, Auth> => {
  const { $directus } = useNuxtApp()

  if (!$directus.url) {
    // eslint-disable-next-line no-console
    console.warn('Directus does not have URL set up, check NUXT_PUBLIC_DIRECTUS_URL env')
  }

  return $directus
}
