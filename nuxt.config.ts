import svgLoader from 'vite-svg-loader'

import { removePageByName, changePagePathOrRemoveByName } from './utils/routing'
import pkg from './package.json'

const {
  /**
   * * Build envs
   */
  NODE_ENV,

  // Custom pages paths
  BUILD_PAGE_BLOG_PATH = '/blog',
  BUILD_PAGE_CONTACT_PATH = '/kontakt',
  BUILD_PAGE_ABOUT_PATH = '/o-nas',
  BUILD_PAGE_RENT_PATH = '/wynajem',
  BUILD_PAGE_STATUTE_PATH = '/regulamin',

  // Font
  BUILD_FONT_FAMILY = 'Roboto',

  // Languages
  BUILD_DEFAULT_LANGUAGE,
  BUILD_ALLOWED_UI_LANGUAGES,

  /**
   * * Runtime envs
   */
  NUXT_PUBLIC_PRODUCTION = 'false',
  NUXT_PUBLIC_API_URL,
  NUXT_PUBLIC_CDN_URL = 'https://cdn-dev.heseya.com"',
  NUXT_PUBLIC_DIRECTUS_URL,
  NUXT_PUBLIC_PRICE_TRACKER_URL,
  NUXT_PUBLIC_APP_HOST,
  NUXT_PUBLIC_I18N_BASE_URL,
  NUXT_PUBLIC_RECAPTCHA_PUBLIC,
  NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  NUXT_PUBLIC_CENEO_GUID,
  NUXT_PUBLIC_LEASLINK_ID,
  NUXT_PUBLIC_CALLPAGE_ID,
  NUXT_PUBLIC_EDRONE_ID,
  NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  NUXT_PUBLIC_COLOR_THEME_PICKER,
  NUXT_PUBLIC_AXIOS_CACHE_TTL,

  // Ekomi
  NUXT_PUBLIC_EKOMI_CUSTOMER_ID,
  NUXT_PUBLIC_EKOMI_POPUP_TOKEN,
  NUXT_PUBLIC_EKOMI_MINI_STARS_TOKEN,
  NUXT_PUBLIC_EKOMI_REVIEWS_TOKEN,
  NUXT_PUBLIC_EKOMI_SURVEY_FORM_ID,

  // Sentry
  NUXT_PUBLIC_SENTRY_DSN = '',
  NUXT_PUBLIC_SENTRY_ENVIRONMENT = 'development',

  /**
   * * Runtime private envs
   */
  NUXT_MAIL_HOST,
  NUXT_MAIL_SENDER,
  NUXT_MAIL_USER,
  NUXT_MAIL_PASSWORD,
  NUXT_MAIL_RECEIVER,
  NUXT_MAIL_PORT = '587',
  NUXT_MIN_RECAPTCHA_SCORE,
  NUXT_RECAPTCHA_SECRET,
} = process.env

const allowedUiLanguages = BUILD_ALLOWED_UI_LANGUAGES?.split(',') || ['pl']
const defaultLanguage = BUILD_DEFAULT_LANGUAGE || allowedUiLanguages[0]

// if (!NUXT_PUBLIC_API_URL) console.warn('NUXT_PUBLIC_API_URL env is not defined')
// if (!NUXT_PUBLIC_PRICE_TRACKER_URL) console.warn('NUXT_PUBLIC_PRICE_TRACKER_URL env is not defined')
// if (!NUXT_PUBLIC_APP_HOST) console.warn('NUXT_PUBLIC_APP_HOST env is not defined')
// if (!NUXT_PUBLIC_RECAPTCHA_PUBLIC) console.warn('NUXT_PUBLIC_RECAPTCHA_PUBLIC env is not defined')

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
        { name: 'version', content: pkg.version },
      ],
      link: [{ rel: 'sitemap', href: '/sitemap.xml', type: 'application/xml' }],
      script: [
        {
          hid: 'polyfill',
          defer: true,
          src: 'https://polyfill.io/v3/polyfill.min.js?features=Intl.NumberFormat%2CIntl.PluralRules.~locale.pl',
        },
      ],
    },
  },

  experimental: {
    defaults: {
      useAsyncData: {
        deep: false,
      },
    },
  },

  css: ['@/assets/scss/index.scss'],

  runtimeConfig: {
    mail: {
      host: NUXT_MAIL_HOST,
      sender: NUXT_MAIL_SENDER,
      user: NUXT_MAIL_USER,
      password: NUXT_MAIL_PASSWORD,
      receiver: NUXT_MAIL_RECEIVER,
      port: NUXT_MAIL_PORT,
    },
    minRecaptchaScore: NUXT_MIN_RECAPTCHA_SCORE,
    recaptchaSecret: NUXT_RECAPTCHA_SECRET,

    public: {
      production: NUXT_PUBLIC_PRODUCTION,
      apiUrl: NUXT_PUBLIC_API_URL,
      cdnUrl: NUXT_PUBLIC_CDN_URL,
      directusUrl: NUXT_PUBLIC_DIRECTUS_URL,
      priceTrackerUrl: NUXT_PUBLIC_PRICE_TRACKER_URL,
      appHost: NUXT_PUBLIC_APP_HOST,
      recaptchaPublic: NUXT_PUBLIC_RECAPTCHA_PUBLIC,
      googleTagManagerId: NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
      googleSiteVerification: NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      ceneoGuid: NUXT_PUBLIC_CENEO_GUID,
      leaslinkId: NUXT_PUBLIC_LEASLINK_ID,
      callpageId: NUXT_PUBLIC_CALLPAGE_ID,
      edroneId: NUXT_PUBLIC_EDRONE_ID,
      showColorThemePicker: NUXT_PUBLIC_COLOR_THEME_PICKER,
      axiosCacheTtl: NUXT_PUBLIC_AXIOS_CACHE_TTL,
      ekomi: {
        customerId: NUXT_PUBLIC_EKOMI_CUSTOMER_ID,
        popupToken: NUXT_PUBLIC_EKOMI_POPUP_TOKEN,
        miniStarsToken: NUXT_PUBLIC_EKOMI_MINI_STARS_TOKEN,
        reviewsToken: NUXT_PUBLIC_EKOMI_REVIEWS_TOKEN,
        surveyFormId: NUXT_PUBLIC_EKOMI_SURVEY_FORM_ID,
      },
      sentry: {
        dsn: NUXT_PUBLIC_SENTRY_DSN,
        environment: NUXT_PUBLIC_SENTRY_ENVIRONMENT,
      },
      i18n: {
        baseUrl: NUXT_PUBLIC_I18N_BASE_URL || NUXT_PUBLIC_APP_HOST,
      },
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
    '@nuxtjs/sitemap',
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
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Blog, BUILD_PAGE_BLOG_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Contact, BUILD_PAGE_CONTACT_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.AboutUs, BUILD_PAGE_ABOUT_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Rent, BUILD_PAGE_RENT_PATH)
      changePagePathOrRemoveByName(pages, CUSTOM_PAGE_NAMES.Statute, BUILD_PAGE_STATUTE_PATH)

      /**
       * These pages must be disabled, when directus is not available
       */
      const directusPageNames = [
        CUSTOM_PAGE_NAMES.Blog,
        CUSTOM_PAGE_NAMES.Contact,
        CUSTOM_PAGE_NAMES.AboutUs,
        CUSTOM_PAGE_NAMES.Rent,
      ]

      // TODO this is runtime env
      if (!NUXT_PUBLIC_DIRECTUS_URL)
        directusPageNames.forEach((name) => removePageByName(name, pages))
    },
  },

  sitemap: {
    sitemapName: 'sitemap.xml',
    autoI18n: true,
    autoLastmod: false,
    cacheTtl: 1000 * 60 * 15,
    _route: '_sitemap-urls',
  },

  googleFonts: {
    families: {
      [BUILD_FONT_FAMILY]: [300, 400, 500, 600, 700],
    },
  },

  i18n: {
    defaultLocale: defaultLanguage,
    // @ts-ignore TODO: where to put this?
    fallbackLocale: defaultLanguage,
    langDir: 'lang',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'pl', iso: 'pl-PL', file: 'pl.ts' },
      { code: 'en', iso: 'en-US', file: 'en.ts' },
    ].filter((locale) => allowedUiLanguages.includes(locale.code)),
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
    // on build it will be always disabled
    debug: NODE_ENV === 'development',
  },

  swiper: {
    modules: ['pagination', 'navigation', 'autoplay'],
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

  devtools: {
    enabled: false,
  },
})
