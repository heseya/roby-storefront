import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY, REFRESH_TOKEN_KEY } from '~/consts/cookiesKeys'

export default defineEventHandler((event) => {
  const cookies = parseCookies(event)
  const isAuthRequest = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, IDENTITY_TOKEN_KEY].some(
    (key) => !!cookies[key],
  )

  setResponseHeader(event, 'Is-Auth', isAuthRequest.toString())

  if (isAuthRequest) {
    setResponseHeader(event, 'Cache-Control', 'private, no-cache, no-store, max-age=0')
  } else {
    // setResponseHeader(event, 'Cache-Control', 's-maxage=15, stale-while-revalidate')
    setResponseHeader(event, 'Cache-Control', 'private, no-cache, no-store, max-age=0')
  }
})
