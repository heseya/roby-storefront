import type { AxiosInstance } from 'axios'
import { createHeseyaApiService } from '@heseya/store-core'
import Cookie from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '~/consts/cookiesKeys'
import { SiteMode } from '~/interfaces/siteMode'

function cookieFromRequestHeaders(key: string) {
  const headers = useRequestHeaders(['cookie'])
  if ('cookie' in headers) {
    const cookie = headers.cookie?.split(';').find((c) => c.trim().startsWith(`${key}=`))
    if (cookie) {
      return cookie.split('=')[1]
    }
  }
  return undefined
}

export default defineNuxtPlugin((nuxt) => {
  const axiosInstance = nuxt.$axios as AxiosInstance
  const token =
    cookieFromRequestHeaders(ACCESS_TOKEN_KEY) ?? Cookie.get(ACCESS_TOKEN_KEY) ?? 'system'
  const config = usePublicRuntimeConfig()

  // eslint-disable-next-line no-console
  if (!axiosInstance) console.error('nuxt.$axios is undefined')

  const sdk = createHeseyaApiService(axiosInstance)

  // NOTE: only in B2B mode we need to add the Authorization header
  config.siteMode === SiteMode.B2B &&
    axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        // Handle request error here
        return Promise.reject(error)
      },
    )
  return {
    provide: {
      heseya: sdk,
    },
  }
})
