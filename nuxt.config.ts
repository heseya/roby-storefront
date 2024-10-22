import svgLoader from 'vite-svg-loader'

// import { removePageByName, changePagePathOrRemoveByName } from './utils/routing'
import pkg from './package.json'

const {
  /**
   * * Build envs
   */
  NODE_ENV,

  // Languages
  BUILD_DEFAULT_LANGUAGE,
  BUILD_ALLOWED_UI_LANGUAGES,

  /**
   * * Runtime envs
   */
  NUXT_PUBLIC_PRODUCTION = 'false',
  NUXT_PUBLIC_API_URL,
  NUXT_PUBLIC_CDN_URL,
  NUXT_PUBLIC_DIRECTUS_URL,
  NUXT_PUBLIC_PRICE_TRACKER_URL,
  NUXT_PUBLIC_I18N_BASE_URL,
  NUXT_PUBLIC_RECAPTCHA_PUBLIC,
  NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NUXT_PUBLIC_GOOGLE_ADS_ID,
  NUXT_PUBLIC_CENEO_GUID,
  NUXT_PUBLIC_LEASLINK_ID,
  NUXT_PUBLIC_CALLPAGE_ID,
  NUXT_PUBLIC_EDRONE_ID,
  NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  NUXT_PUBLIC_COLOR_THEME_PICKER,
  NUXT_PUBLIC_AXIOS_CACHE_TTL,
  NUXT_PUBLIC_HOMEPAGE_TITLE,

  NUXT_PUBLIC_GETRESPONSE_API_ENABLED,
  NUXT_GETRESPONSE_API_KEY,
  NUXT_GETRESPONSE_CAMPAIGN_ID,
  NUXT_PUBLIC_GETRESPONSE_WEB_CONNECT_KEY,

  // Custom pages paths
  NUXT_PUBLIC_PAGE_BLOG_PATH = '/blog',
  NUXT_PUBLIC_PAGE_CONTACT_PATH = '/kontakt',
  NUXT_PUBLIC_PAGE_ABOUT_PATH = '/o-nas',
  NUXT_PUBLIC_PAGE_RENT_PATH = '/wynajem',
  NUXT_PUBLIC_PAGE_STATUTE_PATH = '/regulamin',

  // Font
  NUXT_PUBLIC_FONT_FAMILY = 'Roboto',

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
  // Email
  NUXT_MAIL_HOST,
  NUXT_MAIL_SENDER,
  NUXT_MAIL_USER,
  NUXT_MAIL_PASSWORD,
  NUXT_MAIL_RECEIVER,
  NUXT_MAIL_PORT = '587',

  // reCAPTCHA
  NUXT_MIN_RECAPTCHA_SCORE,
  NUXT_RECAPTCHA_SECRET,
} = process.env

// TODO: remove that envs
const activeLocales = BUILD_ALLOWED_UI_LANGUAGES?.split(',') || ['pl']
const defaultLocale = BUILD_DEFAULT_LANGUAGE || activeLocales[0]

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
          fetchpriority: 'low',
          src: 'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&features=Intl.NumberFormat%2CIntl.PluralRules.~locale.pl',
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
    viewTransition: true,
  },

  css: ['@/assets/scss/index.scss', '@/assets/scss/components/_input.scss'],

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
    getresponseApiKey: NUXT_GETRESPONSE_API_KEY,
    getresponseCampaignId: NUXT_GETRESPONSE_CAMPAIGN_ID,

    public: {
      production: NUXT_PUBLIC_PRODUCTION,
      apiUrl: NUXT_PUBLIC_API_URL,
      cdnUrl: NUXT_PUBLIC_CDN_URL,
      directusUrl: NUXT_PUBLIC_DIRECTUS_URL,
      priceTrackerUrl: NUXT_PUBLIC_PRICE_TRACKER_URL,
      recaptchaPublic: NUXT_PUBLIC_RECAPTCHA_PUBLIC,
      googleTagManagerId: NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
      googleSiteVerification: NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      googleAnalyticsId: NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      googleAdsId: NUXT_PUBLIC_GOOGLE_ADS_ID,
      ceneoGuid: NUXT_PUBLIC_CENEO_GUID,
      leaslinkId: NUXT_PUBLIC_LEASLINK_ID,
      callpageId: NUXT_PUBLIC_CALLPAGE_ID,
      edroneId: NUXT_PUBLIC_EDRONE_ID,
      getresponseWebConnectKey: NUXT_PUBLIC_GETRESPONSE_WEB_CONNECT_KEY,
      getresponseApiEnabled: !!NUXT_PUBLIC_GETRESPONSE_API_ENABLED,
      showColorThemePicker: NUXT_PUBLIC_COLOR_THEME_PICKER,
      fontFamily: NUXT_PUBLIC_FONT_FAMILY,
      axiosCacheTtl: NUXT_PUBLIC_AXIOS_CACHE_TTL,
      homepageTitle: NUXT_PUBLIC_HOMEPAGE_TITLE,
      ekomi: {
        customerId: NUXT_PUBLIC_EKOMI_CUSTOMER_ID,
        popupToken: NUXT_PUBLIC_EKOMI_POPUP_TOKEN,
        miniStarsToken: NUXT_PUBLIC_EKOMI_MINI_STARS_TOKEN,
        reviewsToken: NUXT_PUBLIC_EKOMI_REVIEWS_TOKEN,
        surveyFormId: NUXT_PUBLIC_EKOMI_SURVEY_FORM_ID,
      },
      page: {
        blogPath: NUXT_PUBLIC_PAGE_BLOG_PATH,
        contactPath: NUXT_PUBLIC_PAGE_CONTACT_PATH,
        aboutPath: NUXT_PUBLIC_PAGE_ABOUT_PATH,
        rentPath: NUXT_PUBLIC_PAGE_RENT_PATH,
        statutePath: NUXT_PUBLIC_PAGE_STATUTE_PATH,
      },
      sentry: {
        dsn: NUXT_PUBLIC_SENTRY_DSN,
        environment: NUXT_PUBLIC_SENTRY_ENVIRONMENT,
      },
      i18n: {
        defaultLocale,
        locales: activeLocales,
        baseUrl: NUXT_PUBLIC_I18N_BASE_URL,
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

  sitemap: {
    sitemapName: 'sitemap.xml',
    autoI18n: true,
    autoLastmod: false,
    cacheTtl: 1000 * 60 * 15,
    sources: [`/api/__sitemap__`],
  },

  googleFonts: {
    download: true,
    inject: false,
    overwriting: true,
    display: 'swap',
    families: {
      Rubik: [400, 500, 600, 700],
      Roboto: [400, 500, 700],
    },
    subsets: ['latin', 'latin-ext'],
    outputDir: 'public/google-fonts',
    fontsDir: 'fonts',
  },

  i18n: {
    defaultLocale,
    langDir: 'lang',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'pl', iso: 'pl-PL', file: 'pl.ts' },
      { code: 'en', iso: 'en-US', file: 'en.ts' },
    ],
    bundle: {
      onlyLocales: activeLocales,
    },
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
    modules: ['autoplay'],
  },

  $production: {
    routeRules: {
      // '/account/**': { swr: true },
      // '/category/**': { swr: 3600 },
      // // '/checkout/**': { swr: true },
      // '/product/**': { swr: 600 },
      // '/search/**': { swr: 300 },
      // // '/status/**': { swr: true },
      // // '/**': { swr: true },
      // // '/cart': { swr: true },
      // '/forgot-password': { swr: true },
      // '/': { swr: 600 },
      // '/login': { swr: true },
      // '/register': { swr: true },
      // '/wishlist': { swr: true },
      // '/wynajem': { swr: true },
    },
  },

  nitro: {
    routeRules: {
      '/google-fonts/**': { headers: { 'Cache-Control': `public, max-age=${60 * 60 * 24 * 365}` } },
      '/fonts/**': { headers: { 'Cache-Control': `public, max-age=${60 * 60 * 24 * 365}` } },
    },
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

  devtools: {
    enabled: false,
  },
})
