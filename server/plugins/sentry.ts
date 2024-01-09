import { H3Error } from 'h3'
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import pkg from '../../package.json'

/**
 * Based on https://www.lichter.io/articles/nuxt3-sentry-recipe/
 */
export default defineNitroPlugin((nitroApp) => {
  const {
    public: { sentry },
  } = useRuntimeConfig()

  // If no sentry DSN set, ignore and warn in the console
  if (!sentry.dsn) {
    // eslint-disable-next-line no-console
    console.warn('Sentry DSN not set, skipping Sentry initialization')
    return
  }

  // Initialize Sentry
  Sentry.init({
    dsn: sentry.dsn,
    environment: sentry.environment,
    release: pkg.version,
    integrations: [new ProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, // TODO: Change in production!
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0, // TODO: Change in production!
  })

  // Here comes the hooks
  // Inside the plugin, after initializing sentry
  nitroApp.hooks.hook('error', (error) => {
    // Do not handle 404s and 422s
    if (error instanceof H3Error) {
      if (error.statusCode === 404 || error.statusCode === 422) {
        return
      }
    }

    Sentry.captureException(error)
  })

  nitroApp.hooks.hook('request', (event) => {
    event.context.$sentry = Sentry
  })

  nitroApp.hooks.hookOnce('close', async () => {
    await Sentry.close(2000)
  })
})
