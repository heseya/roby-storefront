import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId } = usePublicRuntimeConfig()
  if (!googleTagManagerId) return

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: googleTagManagerId,
    },
  })

  trackRouter(useRouter())
})
