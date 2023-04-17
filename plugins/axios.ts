import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'

export default defineNuxtPlugin((nuxt) => {
  const baseURL = nuxt.$config.public.apiUrl

  const ax = axios.create({ baseURL })

  const accessToken = useAccessToken()
  const identityToken = useIdentityToken()
  const refreshToken = useRefreshToken()

  enhanceAxiosWithAuthTokenRefreshing(ax, {
    heseyaUrl: baseURL,
    getAccessToken: () => accessToken.value,
    setAccessToken: (token) => (accessToken.value = token),
    setIdentityToken: (token) => (identityToken.value = token),
    getRefreshToken: () => refreshToken.value,
    setRefreshToken: (token) => (refreshToken.value = token),
    shouldIncludeAuthorizationHeader: (req) => {
      return req.url?.includes('auth') || req.url?.includes('product-sets/favourites') || false
    },
    onTokenRefreshError: (error) => {
      // TODO: Handle token refresh error, basicly logout user?
      // eslint-disable-next-line no-console
      console.error('Auth Error', error.message)
      // auth.clearAuth()
      // router.replace('/')
    },
  })

  return {
    provide: {
      axios: ax,
    },
  }
})
