import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'
import { setupCache, buildMemoryStorage, buildKeyGenerator } from 'axios-cache-interceptor'

import { Pinia } from '@pinia/nuxt/dist/runtime/composables'

import { useChannelsStore } from '@/store/channels'
import { useLanguageStore } from '@/store/language'
import { useAuthStore } from '@/store/auth'

declare module 'axios' {
  interface AxiosRequestConfig {
    _beginTime?: number
    _endTime?: number
  }
}

// Common cache storage for server side
const cacheStorage = buildMemoryStorage()

export default defineNuxtPlugin((nuxt) => {
  const { apiUrl: baseURL, isProduction, axiosCacheTtl } = usePublicRuntimeConfig()
  const localePath = useLocalePath()

  const baseAxios = axios.create({ baseURL })

  // ? --------------------------------------------------------------------------------------------
  // ? Cache
  // ? --------------------------------------------------------------------------------------------
  const ax = setupCache(baseAxios, {
    // This time is a fallback value, by default time is determined by the `Cache-Control` header
    ttl: axiosCacheTtl,
    // TODO: remove this override when API stop returning `Cache-Control: no-cache`
    headerInterpreter: () => axiosCacheTtl,
    storage: cacheStorage,
    generateKey: buildKeyGenerator((request) => ({
      method: request.method,
      url: request.url,
      salesChannel: request.headers?.['X-Sales-Channel'],
      acceptLanguage: request.headers?.['Accept-Language'],
    })),
  })

  // ? --------------------------------------------------------------------------------------------
  // ? Auth
  // ? --------------------------------------------------------------------------------------------
  const auth = useAuthStore(nuxt.$pinia as Pinia)
  const languageStore = useLanguageStore(nuxt.$pinia as Pinia)
  const channelsStore = useChannelsStore(nuxt.$pinia as Pinia)

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
    'users/password',
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
      navigateTo(localePath('/'), { replace: true })
    },
  })

  ax.interceptors.request.use((config) => {
    config._beginTime = Date.now()

    // @ts-ignore this $i18n exists, but it's not in the Nuxt types for some reason
    const apiLanguage = languageStore.getLanguageByIso(nuxt.$i18n.locale.value)
    if (apiLanguage && languageStore.languages.length > 0) {
      config.headers['Accept-Language'] = apiLanguage.iso
    } else if (!config.url?.includes('languages')) {
      // ignore languages endpoint
      // eslint-disable-next-line no-console
      console.warn('Current language not found in languages provided by api')
    }

    if (channelsStore.selected) config.headers['X-Sales-Channel'] = channelsStore.selected.id

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
