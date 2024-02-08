import type { AxiosInstance } from 'axios'
import type { KeyGenerator } from 'axios-cache-interceptor'

export const enhanceAxiosWithRequestCancellation = (
  axios: AxiosInstance,
  config: {
    generateKey: KeyGenerator
    allowedRoutes: [method: string, path: string][]
  },
) => {
  const abortControllersState = new Map<string, AbortController>()

  axios.interceptors.request.use((requestConfig) => {
    // handle only allowed routes
    if (
      !config.allowedRoutes.some(
        ([method, path]) =>
          requestConfig.method?.toUpperCase() === method.toUpperCase() &&
          requestConfig.url?.includes(path),
      )
    )
      return requestConfig

    // Abort previous request
    const requestCacheKey = config.generateKey(requestConfig)

    const prevController = abortControllersState.get(requestCacheKey)
    if (prevController) prevController.abort()

    // Create new controller
    const controller = new AbortController()
    abortControllersState.set(requestCacheKey, controller)
    requestConfig.signal = controller.signal

    return requestConfig
  })
}
