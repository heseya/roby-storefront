import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const { googleTagManagerId } = usePublicRuntimeConfig()

  onNuxtReady(() => {
    if (googleTagManagerId)
      nuxtApp.vueApp.use(VueGtag, {
        property: {
          id: googleTagManagerId,
        },
      })

    trackRouter(useRouter())
  })
})
