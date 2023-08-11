import { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useConfigStore } from '@/store/config'
import { useCategoriesStore } from '@/store/categories'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
import { useLanguageStore } from '@/store/language'
import { useChannelsStore } from '@/store/channels'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useConfigStore(nuxtApp.$pinia as Pinia)
  const categories = useCategoriesStore(nuxtApp.$pinia as Pinia)
  const auth = useAuthStore(nuxtApp.$pinia as Pinia)
  const user = useUserStore(nuxtApp.$pinia as Pinia)
  const languages = useLanguageStore(nuxtApp.$pinia as Pinia)
  const channels = useChannelsStore(nuxtApp.$pinia as Pinia)

  await Promise.all([config.fetchConfig(), languages.fetchApiLanguages(), channels.fetchChannels()])

  await Promise.all([
    config.fetchSeo(),
    categories.fetchRootCategories(),
    auth.isLogged ? user.fetchProfile() : Promise.resolve(),
  ])
})
