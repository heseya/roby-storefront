import { AxiosInstance } from 'axios'
import { createHeseyaApiService } from '@heseya/store-core'

export default defineNuxtPlugin((nuxt) => {
  const sdk = createHeseyaApiService(nuxt.$axios as AxiosInstance)

  return {
    provide: {
      heseya: sdk,
    },
  }
})
