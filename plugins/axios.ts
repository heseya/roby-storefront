import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'
import { cacheAdapterEnhancer } from 'axios-extensions'
import { LRUCache } from 'lru-cache'
import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { useAuthStore } from '~/store/auth'

declare module 'axios' {
  interface AxiosRequestConfig {
    _beginTime?: number
    _endTime?: number
  }
}
export default defineNuxtPlugin((nuxt) => {
  const { apiUrl: baseURL, isProduction, clientCacheTtl } = usePublicRuntimeConfig()

  const ax = axios.create({ baseURL })

  // ? --------------------------------------------------------------------------------------------
  // ? Cache
  //   TODO: this does not work
  // ? --------------------------------------------------------------------------------------------

  const defaultCache = process.server
    ? // @ts-ignore // Shared cache on whole ServerSide
      nuxt.$axCache
    : new LRUCache({ ttl: Number(clientCacheTtl), max: 50 })

  // @ts-ignore
  ax.defaults.adapter = cacheAdapterEnhancer(axios.defaults.adapter!, {
    enabledByDefault: false,
    defaultCache,
  })

  // ? --------------------------------------------------------------------------------------------
  // ? Auth
  // ? --------------------------------------------------------------------------------------------
  const auth = useAuthStore(nuxt.$pinia as Pinia)

  const accessToken = useAccessToken()
  const identityToken = useIdentityToken()
  const refreshToken = useRefreshToken()

  const pathsWithAuth = [
    'auth',
    'product-sets/favourites',
    'orders',
    'cart/process',
    'wishlist',
    'users/self-remove',
  ]

  enhanceAxiosWithAuthTokenRefreshing(ax, {
    heseyaUrl: baseURL,
    getAccessToken: () => accessToken.value,
    setAccessToken: (token) => (accessToken.value = token),
    setIdentityToken: (token) => (identityToken.value = token),
    getRefreshToken: () => refreshToken.value,
    setRefreshToken: (token) => (refreshToken.value = token),
    shouldIncludeAuthorizationHeader: (req) => pathsWithAuth.some((url) => req.url?.includes(url)),
    onTokenRefreshError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Auth Error', error.message)
      auth.clearAuth()
      navigateTo('/', { replace: true })
    },
  })

  ax.interceptors.request.use((config) => {
    config._beginTime = Date.now()
    return config
  })

  ax.interceptors.response.use((response) => {
    const config = response.config
    config._endTime = Date.now()
    if (!isProduction) {
      const time = `${config._endTime - config._beginTime!}ms`
      // eslint-disable-next-line no-console
      console.log(`(${time}) - [${config.method}]`, config.url)
    }
    return response
  })

  return {
    provide: {
      axios: ax,
    },
  }
})
