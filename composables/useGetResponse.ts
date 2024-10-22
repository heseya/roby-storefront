export const useGetResponse = () => {
  const config = usePublicRuntimeConfig()

  const enabled = computed(() => {
    return config.getresponseApiEnabled
  })
  const webConnectEnabled = computed(() => !!config.getresponseWebConnect)

  const trackUserByEmail = (email: string) => {
    if (window.GrTracking) {
      window.GrTracking('setUserId', email)
    }
  }

  const subscribe = async (data: { email: string }) => {
    trackUserByEmail(data.email)

    if (!config.getresponseApiEnabled) {
      // eslint-disable-next-line no-console
      console.error('[useGetResponse] GetResponse key not set in environment variables')
      return Promise.resolve({ success: false })
    }

    // sending a request to the server (nuxt)
    return await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email }),
    })
      .then(() => ({ success: true }))
      .catch(() => ({ success: false }))
  }

  return { subscribe, enabled, webConnectEnabled, trackUserByEmail }
}
