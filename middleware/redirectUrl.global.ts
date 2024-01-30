import { handleRedirect } from '~/utils/redirectUrl'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const redirect = await handleRedirect(to.path)

    if (redirect.target !== '' && redirect.target !== to.path) {
      return navigateTo(redirect.target, { redirectCode: redirect.type })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Navigation or redirect failed:', e)
  }
})
