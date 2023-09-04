import VueGtag, { trackRouter, useGtag } from 'vue-gtag-next'
import { COOKIE_ACCEPTED_KEY } from '@/consts/cookiesKeys'

const COOKIES_CONFIG = {
  maxAge: 365 * 24 * 60 * 60,
  path: '/',
} as const

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId, isProduction } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: googleTagManagerId,
    },
    useDebugger: !isProduction,
  })

  const { set } = useGtag()

  const marketingCookie = useStatefulCookie<number>(COOKIE_ACCEPTED_KEY, COOKIES_CONFIG)
  const analyticsCookie = useStatefulCookie<number>(COOKIE_ACCEPTED_KEY, COOKIES_CONFIG)

  watch(
    marketingCookie,
    (value) => {
      // TODO: is this correct?
      if (value === 0) set({ allow_ad_personalization_signals: false, allow_google_signals: false })
    },
    { immediate: true },
  )

  watch(
    analyticsCookie,
    (value) => {
      // TODO: what should be enabled/disabled here?
      if (value) set({})
      else set({})
    },
    { immediate: true },
  )

  trackRouter(useRouter())
})
