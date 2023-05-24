import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor'

import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { useAuthStore } from '~/store/auth'

declare module 'axios' {
  interface AxiosRequestConfig {
    _beginTime?: number
    _endTime?: number
  }
}

// Common cache storage for server side
const cacheStorage = buildMemoryStorage()

export default defineNuxtPlugin((nuxt) => {
  const { apiUrl: baseURL, isProduction, clientCacheTtl } = usePublicRuntimeConfig()

  const baseAxios = axios.create({ baseURL })

  // ? --------------------------------------------------------------------------------------------
  // ? Cache
  // ? --------------------------------------------------------------------------------------------
  const cacheTTL =
    (process.client ? clientCacheTtl : parseInt(process.env.SERVER_CACHE_TTL || '0')) ?? 0
  const ax = setupCache(baseAxios, {
    // This time is a fallback value, by default time is determined by the `Cache-Control` header
    ttl: cacheTTL,
    // TODO: remove this override when API stop returning `Cache-Control: no-cache`
    headerInterpreter: () => cacheTTL,
    storage: cacheStorage,
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
      const time = response.cached ? 'cache' : `${config._endTime - config._beginTime!}ms`
      // eslint-disable-next-line no-console
      console.log(`(${time}) - [${config.method}] ${config.url}`)
    }
    return response
  })

  return {
    provide: {
      axios: ax,
    },
  }
})
