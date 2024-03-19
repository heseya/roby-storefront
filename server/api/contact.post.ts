import { createHeseyaApiService } from '@heseya/store-core'
import type { ProductList } from '@heseya/store-core'
import { createTransport } from 'nodemailer'
import * as Sentry from '@sentry/node'
import type { SendMailOptions, SentMessageInfo } from 'nodemailer'
import axios from 'axios'
import _ from 'lodash'

import { verifyRecaptchToken } from '../utils/recaptcha'

interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
  type: 'renting' | 'price' | 'offer' | 'contact'
  product?: ProductList
  recaptchaToken: string
}

const getTitle = (type: ContactForm['type']) => {
  switch (type) {
    case 'offer':
      return 'Zapytanie o ofertę indywidualną'
    case 'price':
      return 'Zapytanie o cenę'
    case 'renting':
      return 'Zapytanie o wynajem'
    case 'contact':
      return 'Formularz kontaktowy'
  }
}

const stripTags = <T extends Record<string, any>>(obj: T): T => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return { ...acc, [key]: typeof value === 'string' ? _.escape(value) : value }
  }, {} as T)
}

export default defineEventHandler(async (event) => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  const config = useRuntimeConfig(event)

  if (
    !config.mail.host ||
    !config.mail.user ||
    !config.mail.password ||
    !config.public.i18n.baseUrl
  )
    // eslint-disable-next-line no-console
    console.warn(
      '[Contact Form] Missing required env variables: NUXT_MAIL_HOST, NUXT_MAIL_USER, NUXT_MAIL_PASSWORD, NUXT_PUBLIC_I18N_BASE_URL',
    )

  const { name, email, phone, message, type, product, recaptchaToken } = stripTags(
    await readBody<ContactForm>(event),
  )

  if (!name || !email || !message || !type || !recaptchaToken)
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing required fields',
    })

  if (message.length > 2048)
    throw createError({
      statusCode: 422,
      statusMessage: 'Message is too long, max 2048 characters',
    })

  const isTokenValid = await verifyRecaptchToken({
    secret: config.recaptchaSecret,
    token: recaptchaToken,
    minScore: Number(config.minRecaptchaScore) || 0.7,
    action: 'contact_request',
  })
  if (!isTokenValid)
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid Recaptcha token',
    })

  try {
    const port = parseInt(config.mail.port)
    const mailer = createTransport({
      host: config.mail.host,
      port,
      secure: port === 465,
      auth: {
        user: config.mail.user,
        pass: config.mail.password,
      },
      tls: {
        // fail on invalid certs
        // TODO: env maybe?
        rejectUnauthorized: true,
      },
    })

    const sendMail = (options: SendMailOptions): Promise<SentMessageInfo> =>
      new Promise((resolve, reject) => {
        mailer.sendMail(options, (err, info) => {
          if (err) reject(err)
          resolve(info)
        })
      })

    const getContactMailReceiver = async (): Promise<string | undefined> => {
      if (config.public.i18n.baseUrl?.includes('localhost')) return config.mail.receiver

      const sdk = createHeseyaApiService(axios.create({ baseURL: config.public.apiUrl }))
      const settings = await sdk.Settings.get({ array: true })
      return settings.contact_mail_receiver
        ? settings.contact_mail_receiver.toString()
        : config.mail.receiver
    }

    const title = getTitle(type)

    const subject = product ? `${title}: ${product.name}` : title

    const mailReceiver = await getContactMailReceiver()
    if (!mailReceiver) throw new Error('Missing contact mail receiver')

    await sendMail({
      from: `${name} <${config.mail.sender || config.mail.user}>`,
      to: mailReceiver,
      subject: `${subject} | ${config.public.i18n.baseUrl}`,
      replyTo: email,
      text: `
      Wiadomość od ${name} \n
      Email: ${email || '-'}\n
      Telefon kontaktowy: ${phone || '-'}\n
      ${
        product
          ? `Dotyczy produktu: ${product.name} (${config.public.i18n.baseUrl}/product/${product.slug}) \n\n`
          : ''
      }
      ${message}
      `,
      html: `
      <h1>Wiadomość od ${name}</h1>
      <p>Email: ${email || '-'}</p>
      <p>Telefon kontaktowy: ${phone || '-'}</p>
      ${
        product
          ? `<p>Dotyczy produktu: ${product.name} (<a href="${config.public.i18n.baseUrl}/product/${product.slug}">${config.public.i18n.baseUrl}/product/${product.slug}</a>)</p><br />`
          : ''
      }


      <p>${message}</p>
      `,
    })
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Failed to send email', e)
    Sentry.captureException(e)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to send email - ${e.message}`,
    })
  }

  return { success: true }
})
