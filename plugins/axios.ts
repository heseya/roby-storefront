import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin((nuxt) => {
  const baseURL = nuxt.$config.public.apiUrl

  const ax = axios.create({ baseURL })
  const auth = useAuthStore(nuxt.$pinia as Pinia)

  const accessToken = useAccessToken()
  const identityToken = useIdentityToken()
  const refreshToken = useRefreshToken()

  const pathsWithAuth = ['auth', 'product-sets/favourites', 'orders', 'cart/process', 'wishlist']

  enhanceAxiosWithAuthTokenRefreshing(ax, {
    heseyaUrl: baseURL,
    getAccessToken: () => accessToken.value,
    setAccessToken: (token) => (accessToken.value = token),
    setIdentityToken: (token) => (identityToken.value = token),
    getRefreshToken: () => refreshToken.value,
    setRefreshToken: (token) => (refreshToken.value = token),
    shouldIncludeAuthorizationHeader: (req) => pathsWithAuth.some((url) => req.url?.includes(url)),
    onTokenRefreshError: (error) => {
      // TODO: Handle token refresh error, basicly logout user?
      // eslint-disable-next-line no-console
      console.error('Auth Error', error.message)
      auth.clearAuth()
      navigateTo('/', { replace: true })
    },
  })

  return {
    provide: {
      axios: ax,
    },
  }
})
