import { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useConfigStore } from '@/store/config'
import { useCategoriesStore } from '@/store/categories'
import { useAuthStore } from '~~/store/auth'
import { useUserStore } from '~~/store/user'
import { useLanguageStore } from '~~/store/language'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useConfigStore(nuxtApp.$pinia as Pinia)
  const categories = useCategoriesStore(nuxtApp.$pinia as Pinia)
  const auth = useAuthStore(nuxtApp.$pinia as Pinia)
  const user = useUserStore(nuxtApp.$pinia as Pinia)
  const languages = useLanguageStore(nuxtApp.$pinia as Pinia)

  await config.fetchConfig()
  await Promise.all([
    config.fetchSeo(),
    categories.fetchRootCategories(),
    auth.isLogged ? user.fetchProfile() : Promise.resolve(),
    languages.fetchApiLanguages(),
  ])
})
