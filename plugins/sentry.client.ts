import * as Sentry from '@sentry/vue'

import pkg from '../package.json'

/**
 * Based on https://www.lichter.io/articles/nuxt3-sentry-recipe/
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { public: config } = useRuntimeConfig()

  if (!config.sentry.dsn) {
    return
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    release: pkg.version,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],

    // Configure this whole part as you need it!

    tracesSampleRate: 0.2, // TODO: Change in prod

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', config.apiUrl],

    replaysSessionSampleRate: 1.0, // TODO: Change in prod
    replaysOnErrorSampleRate: 1.0, // TODO: Change in prod if necessary
  })
})
