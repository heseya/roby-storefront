import type { AxiosInstance } from 'axios'
import { createHeseyaApiService } from '@heseya/store-core'

export default defineNuxtPlugin((nuxt) => {
  const axiosInstance = nuxt.$axios as AxiosInstance

  // eslint-disable-next-line no-console
  if (!axiosInstance) console.error('nuxt.$axios is undefined')

  const sdk = createHeseyaApiService(axiosInstance)

  return {
    provide: {
      heseya: sdk,
    },
  }
})
