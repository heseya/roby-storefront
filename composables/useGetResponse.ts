export const useGetResponse = () => {
  const config = usePublicRuntimeConfig()

  const enabled = computed(() => {
    // eslint-disable-next-line no-console
    console.log('!!! config.getresponseApiEnabled !!!', config.getresponseApiEnabled)
    return config.getresponseApiEnabled
  })
  const webConnectEnabled = computed(() => !!config.getresponseWebConnect)

  const subscribe = async (data: { email: string }) => {
    // eslint-disable-next-line no-console
    console.log('config.getresponseApiEnabled', config.getresponseApiEnabled)
    if (!config.getresponseApiEnabled) {
      // eslint-disable-next-line no-console
      console.error('[useGetResponse] GetResponse key not set in environment variables')
      return Promise.resolve({ success: false })
    }

    // eslint-disable-next-line no-console
    console.log('subscribe fetch')

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

  return { subscribe, enabled, webConnectEnabled }
}
