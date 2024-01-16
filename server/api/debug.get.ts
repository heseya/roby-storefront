// TODO: remove this file
export default defineEventHandler((event) => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  return useRuntimeConfig(event)
})
