import { createHeseyaApiService, ProductList } from '@heseya/store-core'
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer'
import axios from 'axios'
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

export default defineEventHandler(async (event) => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  const config = useRuntimeConfig(event)

  if (!config.mailHost || !config.mailUser || !config.mailPassword || !config.public.appHost)
    // eslint-disable-next-line no-console
    console.warn(
      '[Contact Form] Missing required env variables: MAIL_HOST, MAIL_USER, MAIL_PASSWORD, APP_HOST',
    )

  const { name, email, phone, message, type, product, recaptchaToken } =
    await readBody<ContactForm>(event)

  if (!name || !email || !message || !type || !recaptchaToken)
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing required fields',
    })

  const isTokenValid = await verifyRecaptchToken(
    config.recaptchaSecret,
    recaptchaToken,
    Number(config.minRecaptchaScore) || 0.7,
  )
  if (!isTokenValid)
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid Recaptcha token',
    })

  try {
    const mailer = createTransport({
      host: config.mailHost,
      port: parseInt(config.mailPort),
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
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
      const sdk = createHeseyaApiService(axios.create({ baseURL: config.public.apiUrl }))
      const settings = await sdk.Settings.get({ array: true })
      return settings.contact_mail_receiver
        ? settings.contact_mail_receiver.toString()
        : config.mailReceiver
    }

    const title = getTitle(type)

    const subject = product ? `${title}: ${product.name}` : title

    const mailReceiver = await getContactMailReceiver()
    if (!mailReceiver) throw new Error('Missing contact mail receiver')

    await sendMail({
      from: `${name} <${config.mailUser}>`,
      to: mailReceiver,
      subject: `${subject} | ${config.public.appHost}`,
      replyTo: email,
      text: `
      Wiadomość od ${name} \n
      Email: ${email || '-'}\n
      Telefon kontaktowy: ${phone || '-'}\n
      ${
        product
          ? `Dotyczy produktu: ${product.name} (${config.public.appHost}/product/${product.slug}) \n\n`
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
          ? `<p>Dotyczy produktu: ${product.name} (<a href="${config.public.appHost}/product/${product.slug}">${config.public.appHost}/product/${product.slug}</a>)</p><br />`
          : ''
      }


      <p>${message}</p>
      `,
    })
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to send email - ${e.message}`,
    })
  }

  return { success: true }
})
