import axios from 'axios'
import { enhanceAxiosWithAuthTokenRefreshing } from '@heseya/store-core'
import { cacheAdapterEnhancer } from 'axios-extensions'
import { LRUCache } from 'lru-cache'

import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin((nuxt) => {
  const { public: config } = useRuntimeConfig()
  const baseURL = config.apiUrl

  const ax = axios.create({ baseURL })

  // ? --------------------------------------------------------------------------------------------
  // ? Cache
  //   TODO: this does not work
  // ? --------------------------------------------------------------------------------------------

  const defaultCache = process.server
    ? // @ts-ignore // Shared cache on whole ServerSide
      nuxt.$axCache
    : new LRUCache({ ttl: Number(config.clientCacheTtl), max: 50 })

  // @ts-ignore
  ax.defaults.adapter = cacheAdapterEnhancer(axios.defaults.adapter!, {
    enabledByDefault: false,
    defaultCache,
  })

  // ? --------------------------------------------------------------------------------------------
  // ? Auth
  // ? --------------------------------------------------------------------------------------------
  const auth = useAuthStore()
  const router = useRouter()

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
      router.replace('/')
    },
  })

  return {
    provide: {
      axios: ax,
    },
  }
})
