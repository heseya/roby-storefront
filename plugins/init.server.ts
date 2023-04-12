import { useConfigStore } from '@/store/config'
import { useCategoriesStore } from '@/store/categories'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useConfigStore(nuxtApp.$pinia)
  const categories = useCategoriesStore(nuxtApp.$pinia)

  await config.fetchConfig()
  await Promise.all([categories.fetchRootCategories()])
})
