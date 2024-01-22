import svgLoader from 'vite-svg-loader'
import { removePageByName, changePagePathOrRemoveByName } from './utils/routing'
import pkg from './package.json'

const {
  /**
   * * Build envs
   */
  NODE_ENV,
  VERCEL_ENV,
  ENVIRONMENT = 'development',

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

  // Sentry
  NUXT_PUBLIC_SENTRY_DSN = '',
  NUXT_PUBLIC_SENTRY_ENVIRONMENT = 'development',

  /**
   * * Runtime private envs
   */
  NUXT_MAIL_HOST,
  NUXT_MAIL_USER,
  NUXT_MAIL_PASSWORD,
  NUXT_MAIL_RECEIVER,
  NUXT_MAIL_PORT = '587',
  NUXT_MIN_RECAPTCHA_SCORE,
  NUXT_RECAPTCHA_SECRET,
} = process.env

const allowedUiLanguages = BUILD_ALLOWED_UI_LANGUAGES?.split(',') || ['pl']
const defaultLanguage = BUILD_DEFAULT_LANGUAGE || allowedUiLanguages[0]

// TODO: this happens on build time but should be on runtime
const isProduction = (VERCEL_ENV || ENVIRONMENT) === 'production'

// if (!NUXT_PUBLIC_API_URL) console.warn('NUXT_PUBLIC_API_URL env is not defined')
// if (!NUXT_PUBLIC_PRICE_TRACKER_URL) console.warn('NUXT_PUBLIC_PRICE_TRACKER_URL env is not defined')
// if (!NUXT_PUBLIC_APP_HOST) console.warn('NUXT_PUBLIC_APP_HOST env is not defined')
// if (!NUXT_PUBLIC_RECAPTCHA_PUBLIC) console.warn('NUXT_PUBLIC_RECAPTCHA_PUBLIC env is not defined')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // TODO: remove envs from head
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,maximum-scale=5',
        },
        { name: 'version', content: pkg.version },
        {
          hid: isProduction ? 'robots' : 'force-robots',
          name: 'robots',
          content: isProduction ? 'index, follow' : 'noindex, nofollow',
        },
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      ],
      link: [
        { rel: 'sitemap', href: '/sitemap.xml', type: 'application/xml' },
        { rel: 'preconnect', href: NUXT_PUBLIC_API_URL },
        { rel: 'dns-prefetch', href: NUXT_PUBLIC_API_URL },
        { rel: 'preconnect', href: NUXT_PUBLIC_CDN_URL },
        { rel: 'dns-prefetch', href: NUXT_PUBLIC_CDN_URL },
        { rel: 'preconnect', href: NUXT_PUBLIC_DIRECTUS_URL },
        { rel: 'dns-prefetch', href: NUXT_PUBLIC_DIRECTUS_URL },
      ],
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
    mailHost: NUXT_MAIL_HOST,
    mailUser: NUXT_MAIL_USER,
    mailPassword: NUXT_MAIL_PASSWORD,
    mailReceiver: NUXT_MAIL_RECEIVER,
    mailPort: NUXT_MAIL_PORT,
    minRecaptchaScore: NUXT_MIN_RECAPTCHA_SCORE,
    recaptchaSecret: NUXT_RECAPTCHA_SECRET,

    public: {
      apiUrl: NUXT_PUBLIC_API_URL,
      directusUrl: NUXT_PUBLIC_DIRECTUS_URL,
      priceTrackerUrl: NUXT_PUBLIC_PRICE_TRACKER_URL,
      appHost: NUXT_PUBLIC_APP_HOST,
      isProduction,
      recaptchaPublic: NUXT_PUBLIC_RECAPTCHA_PUBLIC,
      googleTagManagerId: NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
      ceneoGuid: NUXT_PUBLIC_CENEO_GUID,
      leaslinkId: NUXT_PUBLIC_LEASLINK_ID,
      callpageId: NUXT_PUBLIC_CALLPAGE_ID,
      edroneId: NUXT_PUBLIC_EDRONE_ID,
      showColorThemePicker: NUXT_PUBLIC_COLOR_THEME_PICKER === '1',
      axiosCacheTtl: parseInt(NUXT_PUBLIC_AXIOS_CACHE_TTL || '0') ?? 0,
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
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
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
