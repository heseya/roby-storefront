import { Auth, Directus } from '@directus/sdk'
import { DirectusCollections } from '~/plugins/directus'

export const useDirectus = (): Directus<DirectusCollections, Auth> => {
  const { $directus } = useNuxtApp()
  return $directus
}
