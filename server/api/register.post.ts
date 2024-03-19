import { createHeseyaApiService } from '@heseya/store-core'
import type { UserRegisterDto } from '@heseya/store-core'
import * as Sentry from '@sentry/node'
import axios from 'axios'

import { verifyRecaptchToken } from '../utils/recaptcha'

interface RegisterForm {
  form: UserRegisterDto
  recaptchaToken: string
}

export default defineEventHandler(async (event) => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  const config = useRuntimeConfig(event)

  const payload = await readBody<RegisterForm>(event)

  const isTokenValid = await verifyRecaptchToken(
    config.recaptchaSecret,
    payload.recaptchaToken,
    Number(config.minRecaptchaScore) || 0.7,
  )
  if (!isTokenValid) {
    setResponseStatus(event, 422)
    return {
      error: {
        message: 'Recaptcha token is invalid',
        code: 422,
        key: 'VALIDATION_ERROR',
        errors: {
          recaptcha: [
            {
              key: 'VALIDATION_RECHAPTCHA',
              message: 'Recaptcha token is invalid',
            },
          ],
        },
      },
    }
  }

  try {
    const sdk = createHeseyaApiService(axios.create({ baseURL: config.public.apiUrl }))
    const data = await sdk.Auth.register(payload.form)
    return data
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Failed to register user', e)
    Sentry.captureException(e)
    setResponseStatus(event, e?.response?.status || 500)
    return (
      e?.response?.data || {
        error: { message: 'Failed to register user', code: 500, key: 'INTERNAL_SERVER_ERROR' },
      }
    )
  }
})
