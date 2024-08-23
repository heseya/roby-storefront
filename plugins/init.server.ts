/* eslint-disable no-console */
import type { Pinia } from 'pinia'

import { useConfigStore } from '@/store/config'
import { useCategoriesStore } from '@/store/categories'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
import { useLanguageStore } from '@/store/language'
import { useChannelsStore } from '@/store/channels'

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = usePublicRuntimeConfig()
  if (!runtimeConfig.apiUrl) console.error('NUXT_PUBLIC_API_URL env is not defined')
  if (!runtimeConfig.priceTrackerUrl)
    console.error('NUXT_PUBLIC_PRICE_TRACKER_URL env is not defined')
  if (!runtimeConfig.i18n.baseUrl) console.error('NUXT_PUBLIC_I18N_BASE_URL env is not defined')
  if (!runtimeConfig.recaptchaPublic)
    console.error('NUXT_PUBLIC_RECAPTCHA_PUBLIC env is not defined')

  const config = useConfigStore(nuxtApp.$pinia as Pinia)
  const categories = useCategoriesStore(nuxtApp.$pinia as Pinia)
  const auth = useAuthStore(nuxtApp.$pinia as Pinia)
  const user = useUserStore(nuxtApp.$pinia as Pinia)
  const languages = useLanguageStore(nuxtApp.$pinia as Pinia)
  const channels = useChannelsStore(nuxtApp.$pinia as Pinia)

  await languages.fetchApiLanguages()
  await Promise.all([config.fetchConfig(), channels.fetchChannels()])

  if (auth.isLogged) await user.fetchProfile()

  channels.initSalesChannels()

  await Promise.all([config.fetchSeo(), categories.fetchRootCategories()])
})
