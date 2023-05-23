import svgLoader from 'vite-svg-loader'
import { removePageByName } from './utils/removePageByName'

const {
  API_URL = 'https://demo-***REMOVED***.***REMOVED***',
  DIRECTUS_URL = 'https://blog-***REMOVED***.heseya.pl',
  PRICE_TRACKER_URL = 'https://main-price-tracker.app.***REMOVED***',
  ENVIRONMENT = 'development',
  APP_HOST,
  RECAPTCHA_PUBLIC,
  GOOGLE_ANALYTICS_ID,
  CENEO_GUID,
  LEASLINK_ID,
  COLOR_THEME_PICKER,
} = process.env

const isProduction = ENVIRONMENT === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,maximum-scale=5',
        },
        {
          hid: isProduction ? 'robots' : 'force-robots',
          name: 'robots',
          content: isProduction ? 'index, follow' : 'noindex, nofollow',
        },
      ],
      link: [],
      script: [],
    },
  },

  css: ['@/assets/scss/index.scss'],

  runtimeConfig: {
    public: {
      apiUrl: API_URL,
      directusUrl: DIRECTUS_URL,
      priceTrackerUrl: PRICE_TRACKER_URL,
      appHost: APP_HOST,
      isProduction,
      recaptchaPublic: RECAPTCHA_PUBLIC,
      googleAnalyticsId: GOOGLE_ANALYTICS_ID,
      ceneoGuid: CENEO_GUID,
      leaslinkId: LEASLINK_ID,
      showColorThemePicker: COLOR_THEME_PICKER === '1',
    },
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-swiper',
    'nuxt-delay-hydration',
  ],

  hooks: {
    'pages:extend'(pages) {
      /**
       * This pages must be disabled, when directus is not available
       */
      const directusPages = ['blog', 'kontakt', 'o-nas', 'wynajem']

      if (!DIRECTUS_URL) directusPages.forEach((page) => removePageByName(page, pages))
    },
  },

  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 600, 700],
    },
  },

  i18n: {
    baseUrl: APP_HOST,
    locales: [{ code: 'pl', iso: 'pl-PL', file: 'pl.ts' }],
    defaultLocale: 'pl',
    langDir: 'lang',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  piniaPersistedstate: {
    storage: 'localStorage',
  },

  delayHydration: {
    mode: 'mount',
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development',
  },

  // routeRules: {
  //   // '/account/**': { swr: true },
  //   '/category/**': { swr: true },
  //   '/checkout/**': { swr: true },
  //   '/product/**': { swr: true },
  //   '/search/**': { swr: true },
  //   '/status/**': { swr: true },
  //   // '/**': { swr: true },
  //   '/cart': { swr: true },
  //   '/forgot-password': { static: true },
  //   '/': { swr: true },
  //   '/login': { static: true },
  //   '/register': { swr: true },
  //   '/wishlist': { swr: true },
  //   '/wynajem': { static: true },
  // },

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
