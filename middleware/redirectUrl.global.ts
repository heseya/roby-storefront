import { handleRedirect } from '~/utils/redirectUrl'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const redirect = await handleRedirect(to.fullPath)

    if (!redirect) return
    const [redirectTarget, redirectCode] = redirect

    if (redirectTarget !== '' && redirectTarget !== to.fullPath) {
      return await navigateTo(redirectTarget, { redirectCode, external: true })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Navigation or redirect failed:', e)
  }
})
