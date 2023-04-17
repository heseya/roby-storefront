import { defineNuxtPlugin } from '#app'
import Notifications, { useNotification } from '@kyvg/vue3-notification'
// import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications)
  return {
    provide: {
      notify: useNotification(),
    },
  }
})
