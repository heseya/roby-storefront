// eslint-disable-next-line import/no-named-as-default
import Notifications, { useNotification } from '@kyvg/vue3-notification'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications)
  return {
    provide: {
      notify: useNotification(),
    },
  }
})
