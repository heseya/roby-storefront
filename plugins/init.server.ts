/* eslint-disable no-console */
import type { Pinia } from '@pinia/nuxt/dist/runtime/composables'
import { useConfigStore } from '@/store/config'
import { useCategoriesStore } from '@/store/categories'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
import { useLanguageStore } from '@/store/language'
import { useChannelsStore } from '@/store/channels'
import { SALES_CHANNEL_KEY } from '@/consts/cookiesKeys'

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = usePublicRuntimeConfig()
  if (!runtimeConfig.apiUrl) console.error('NUXT_PUBLIC_API_URL env is not defined')
  if (!runtimeConfig.priceTrackerUrl)
    console.error('NUXT_PUBLIC_PRICE_TRACKER_URL env is not defined')
  if (!runtimeConfig.appHost) console.error('NUXT_PUBLIC_APP_HOST env is not defined')
  if (!runtimeConfig.recaptchaPublic)
    console.error('NUXT_PUBLIC_RECAPTCHA_PUBLIC env is not defined')

  const config = useConfigStore(nuxtApp.$pinia as Pinia)
  const categories = useCategoriesStore(nuxtApp.$pinia as Pinia)
  const auth = useAuthStore(nuxtApp.$pinia as Pinia)
  const user = useUserStore(nuxtApp.$pinia as Pinia)
  const languages = useLanguageStore(nuxtApp.$pinia as Pinia)
  const channels = useChannelsStore(nuxtApp.$pinia as Pinia)

  // TODO: selected channel should probably be included in URL, not in the cookie
  const channelCookie = useCookie(SALES_CHANNEL_KEY)

  await languages.fetchApiLanguages()
  await Promise.all([config.fetchConfig(), channels.fetchChannels()])

  channels.setChannel(channelCookie.value || undefined)

  await Promise.all([
    config.fetchSeo(),
    categories.fetchRootCategories(),
    auth.isLogged ? user.fetchProfile() : Promise.resolve(),
  ])
})
