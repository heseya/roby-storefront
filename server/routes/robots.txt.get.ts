const ALLOWED = `
User-agent: *
Disallow: /checkout/*
Disallow: /account/*
Disallow: /status/*

User-agent: Googlebot
Disallow:

User-agent: Googlebot-image
Disallow:

User-agent: AdsBot-Google
Disallow:
`

const DISALLOWED = `
User-agent: *
Disallow: /
`

export default defineEventHandler((event) => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  const config = useRuntimeConfig(event)

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  return config.public.isProduction ? ALLOWED : DISALLOWED
})
