import svgLoader from 'vite-svg-loader'

const {
  API_URL = 'https://demo-***REMOVED***.***REMOVED***',
  DIRECTUS_URL = 'https://cms.heseya.com',
  ENVIRONMENT = 'development',
  APP_HOST,
  RECAPTCHA_PUBLIC,
  CENEO_GUID,
} = process.env

const isProduction = ENVIRONMENT === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s | ***REMOVED***',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,maximum-scale=1',
        },
        { hid: 'description', name: 'description', content: '' },
        {
          hid: 'robots',
          name: 'robots',
          content: isProduction ? 'index, follow' : 'noindex, nowfollow',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap',
        },
      ],
      script: [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_PUBLIC}`,
        },
      ],
    },
  },

  css: ['@/assets/scss/index.scss'],

  runtimeConfig: {
    public: {
      apiUrl: API_URL,
      directusUrl: DIRECTUS_URL,
      appHost: APP_HOST,
      isProduction,
      recaptchaPublic: RECAPTCHA_PUBLIC,
      ceneoGuid: CENEO_GUID,
    },
  },

  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt'],

  i18n: {
    locales: [{ code: 'pl', iso: 'pl-PL', file: 'pl.ts' }],
    defaultLocale: 'pl',
    langDir: 'lang',
    strategy: 'prefix_except_default',
  },

  piniaPersistedstate: {
    storage: 'localStorage',
  },

  vite: {
    plugins: [svgLoader({ defaultImport: 'url' })],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/global.scss" as *;`,
        },
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  },
})
