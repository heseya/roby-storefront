import { handleRedirect } from '~/utils/redirectUrl'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const redirect = await handleRedirect(to.path)

    if (redirect?.target !== '') {
      return navigateTo(redirect.target, { redirectCode: redirect.type })
    }
  } catch {}
})
