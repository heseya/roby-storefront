import { HeseyaEvent, type User } from '@heseya/store-core'
import { onDocumentLoad, useGetResponse } from '#imports'

export default defineNuxtPlugin(() => {
  const config = usePublicRuntimeConfig()
  if (!config.getresponseWebConnectKey) return

  const getResponseWebConnectKey = config.getresponseWebConnectKey

  /**
   * GetResponse Web Connect
   */
  onDocumentLoad(() => {
    useHead({
      script: [
        {
          hid: 'getresponse-webconnect',
          defer: true,
          children: `
  (function(m, o, n, t, e, r, _){
          m['__GetResponseAnalyticsObject'] = e;m[e] = m[e] || function() {(m[e].q = m[e].q || []).push(arguments)};
          r = o.createElement(n);_ = o.getElementsByTagName(n)[0];r.async = 1;r.src = t;r.setAttribute('crossorigin', 'use-credentials');_.parentNode .insertBefore(r, _);
      })(window, document, 'script', 'https://an.gr-wcon.com/script/${getResponseWebConnectKey}/ga.js', 'GrTracking');
          `,
        },
      ],
    })
  }, 2000)

  const bus = useHeseyaEventBus()
  const { trackUserByEmail } = useGetResponse()

  bus.on(HeseyaEvent.Login, (user: User) => {
    trackUserByEmail(user.email)
  })
})
