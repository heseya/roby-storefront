import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleAnalyticsId } = useRuntimeConfig()

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: googleAnalyticsId,
    },
  })

  trackRouter(useRouter())
})
