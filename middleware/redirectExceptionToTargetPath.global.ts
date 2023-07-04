// temporary solution for ***REMOVED***
export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.startsWith('/tag-produktu/')) {
    return navigateTo(to.path.replace('/tag-produktu/', '/category/'))
  }
})
