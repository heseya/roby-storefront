import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'

export default defineNuxtPlugin((nuxt) => {
  const ax = axios.create({ baseURL: nuxt.$config.apiUrl })

  enhanceAxiosWithAuthTokenRefreshing(ax, {
    heseyaUrl: nuxt.$config.apiUrl,
    getAccessToken: () => 'token',
    setAccessToken: (token) => console.log('setAccessToken', token),
    getRefreshToken: () => 'refresh',
    setRefreshToken: (token) => console.log('setRefreshToken', token),
    shouldIncludeAuthorizationHeader: () => false,
  })

  return {
    provide: {
      axios: ax,
    },
  }
})
