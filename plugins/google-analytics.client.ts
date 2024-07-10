import { onDocumentLoad } from '#imports'

export default defineNuxtPlugin(() => {
  const config = usePublicRuntimeConfig()
  if (!config.googleAnalyticsId) return

  onDocumentLoad(() => {
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
          children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);};
          gtag('consent', 'default', {
            functionality_storage: 'denied',
            security_storage: 'denied',
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            personalization_storage: 'denied',
          })
          gtag('js', new Date()); gtag('config', '${config.googleAnalyticsId}');
      `,
        },
      ],
    })
  }, 2500)
})
