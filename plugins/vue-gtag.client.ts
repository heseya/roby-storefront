import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleAnalyticsId } = usePublicRuntimeConfig()

  if (googleAnalyticsId)
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: googleAnalyticsId,
      },
    })

  trackRouter(useRouter())
})
