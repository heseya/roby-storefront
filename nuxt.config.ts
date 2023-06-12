/* eslint-disable no-console */
import svgLoader from 'vite-svg-loader'
import { removePageByName, changePagePathOrRemoveByName } from './utils/routing'

const {
  API_URL = 'https://demo-***REMOVED***.***REMOVED***',
  CDN_URL = 'https://cdn-dev.heseya.com"',
  DIRECTUS_URL = 'https://blog-***REMOVED***.heseya.pl',
  PRICE_TRACKER_URL = 'https://main-price-tracker.app.***REMOVED***',
  ENVIRONMENT = 'development',
  APP_HOST,
  RECAPTCHA_PUBLIC,
  GOOGLE_ANALYTICS_ID,
  CENEO_GUID,
  LEASLINK_ID,
  COLOR_THEME_PICKER,
  AXIOS_CACHE_TTL,

  // Custom pages paths
  PAGE_BLOG_PATH = '/blog',
  PAGE_CONTACT_PATH = '/kontakt',
  PAGE_ABOUT_PATH = '/o-nas',
  PAGE_RENT_PATH = '/wynajem',
  PAGE_STATUTE_PATH = '/regulamin',
} = process.env

const locales = [
  { code: 'pl', iso: 'pl-PL', file: 'pl.ts' },
  { code: 'en', iso: 'en-US', file: 'en.ts' },
]

const ALLOWED_UI_LANGUAGES = process.env.ALLOWED_UI_LANGUAGES?.split(',') || ['pl']
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || ALLOWED_UI_LANGUAGES[0]

const isProduction = ENVIRONMENT === 'production'

if (!API_URL) console.warn('API_URL env is not defined')
if (!PRICE_TRACKER_URL) console.warn('PRICE_TRACKER_URL env is not defined')
if (!APP_HOST) console.warn('APP_HOST env is not defined')
if (!RECAPTCHA_PUBLIC) console.warn('RECAPTCHA_PUBLIC env is not defined')

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
      link: [
        { rel: 'preconnect', href: API_URL },
        { rel: 'dns-prefetch', href: API_URL },
        { rel: 'preconnect', href: CDN_URL },
        { rel: 'dns-prefetch', href: CDN_URL },
        { rel: 'preconnect', href: DIRECTUS_URL },
        { rel: 'dns-prefetch', href: DIRECTUS_URL },
      ],
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
      axiosCacheTtl: parseInt(AXIOS_CACHE_TTL || '0') ?? 0,
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
      const CUSTOM_PAGE_NAMES = {
        Blog: 'blog',
        Contact: 'kontakt',
        AboutUs: 'o-nas',
        Rent: 'wynajem',
        Statute: 'regulamin',
      }

      /**
       * All custom pages can be disabled or their path can be changed
       */
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Blog, PAGE_BLOG_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Contact, PAGE_CONTACT_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.AboutUs, PAGE_ABOUT_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Rent, PAGE_RENT_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Statute, PAGE_STATUTE_PATH)

      /**
       * These pages must be disabled, when directus is not available
       */
      const directusPageNames = [
        CUSTOM_PAGE_NAMES.Blog,
        CUSTOM_PAGE_NAMES.Contact,
        CUSTOM_PAGE_NAMES.AboutUs,
        CUSTOM_PAGE_NAMES.Rent,
      ]

      if (!DIRECTUS_URL) directusPageNames.forEach((name) => removePageByName(name, pages))
    },
  },

  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 600, 700],
    },
  },

  i18n: {
    baseUrl: APP_HOST,
    defaultLocale: DEFAULT_LANGUAGE,
    fallbackLocale: DEFAULT_LANGUAGE,
    langDir: 'lang',
    strategy: 'prefix_except_default',
    locales: locales.filter((locale) => ALLOWED_UI_LANGUAGES.includes(locale.code)),
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
