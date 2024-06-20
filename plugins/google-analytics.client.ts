export default defineNuxtPlugin(() => {
  const config = usePublicRuntimeConfig()
  if (!config.googleAnalyticsId) return

  onLoad(() => {
    useHead({
      script: [
        {
          hid: 'google-analytics-src',
          defer: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`,
        },
        {
          hid: 'google-analytics-init',
          defer: true,
          children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${config.googleAnalyticsId}');`,
        },
      ],
    })
  }, 2500)
})
