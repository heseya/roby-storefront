import { handleRedirect } from '~/utils/redirectUrl'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const redirect = await handleRedirect(to.path)

    if (!redirect) return
    const [redirectTarget, redirectCode] = redirect

    if (redirectTarget !== '' && redirectTarget !== to.path) {
      return navigateTo(redirectTarget, { redirectCode })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Navigation or redirect failed:', e)
  }
})
