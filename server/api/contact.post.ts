import { createHeseyaApiService, ProductList } from '@heseya/store-core'
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer'
import axios from 'axios'
import { verifyRecaptchToken } from '../utils/recaptcha'

interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
  type: 'renting' | 'price' | 'offer'
  product?: ProductList
  recaptchaToken: string
}

const { MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_RECEIVER, APP_HOST, API_URL } = process.env

if (!MAIL_HOST || !MAIL_USER || !MAIL_PASSWORD || !APP_HOST)
  // eslint-disable-next-line no-console
  console.warn(
    '[Contact Form] Missing required env variables: MAIL_HOST, MAIL_USER, MAIL_PASSWORD, APP_HOST',
  )

const mailer = createTransport({
  host: MAIL_HOST,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
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
  const sdk = createHeseyaApiService(axios.create({ baseURL: API_URL }))
  const settings = await sdk.Settings.get({ array: true })
  return settings.contact_mail_receiver ? settings.contact_mail_receiver.toString() : MAIL_RECEIVER
}

export default defineEventHandler(async (event) => {
  const { name, email, phone, message, type, product, recaptchaToken } =
    await readBody<ContactForm>(event)

  if (!name || !email || !message || !type || !recaptchaToken)
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing required fields',
    })

  const isTokenValid = await verifyRecaptchToken(recaptchaToken)
  if (!isTokenValid)
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid Recaptcha token',
    })

  try {
    const getTitle = (type: ContactForm['type']) => {
      switch (type) {
        case 'offer':
          return 'Zapytanie o ofertę indywidualną'
        case 'price':
          return 'Zapytanie o cenę'
        case 'renting':
          return 'Zapytanie o wynajem'
      }
    }
    const title = getTitle(type)

    const subject = product ? `${title}: ${product.name}` : title

    const mailReceiver = await getContactMailReceiver()
    if (!mailReceiver) throw new Error('Missing contact mail receiver')

    await sendMail({
      from: `${name} <${MAIL_USER}>`,
      to: mailReceiver,
      subject: `${subject} | ${APP_HOST}`,
      replyTo: email,
      text: `
      Wiadomość od ${name} \n
      Email: ${email || '-'}\n
      Telefon kontaktowy: ${phone || '-'}\n
      ${
        product
          ? `Dotyczy produktu: ${product.name} (${APP_HOST}/product/${product.slug}) \n\n`
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
          ? `<p>Dotyczy produktu: ${product.name} (<a href="${APP_HOST}/product/${product.slug}">${APP_HOST}/product/${product.slug}</a>)</p><br />`
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
