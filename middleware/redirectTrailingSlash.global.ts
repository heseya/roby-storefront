/**
 * https://github.com/nuxt/nuxt/issues/15462#issuecomment-1407374859
 * May not work on vercer properly
 */
export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    const { path, query, hash } = to
    const nextPath = path.replace(/\/+$/, '') || '/'
    const nextRoute = { path: nextPath, query, hash }
    return navigateTo(nextRoute, { redirectCode: 301 })
  }
})
