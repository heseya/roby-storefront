import { ProductList } from '@heseya/store-core'
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer'
import { verifyRecaptchToken } from '../utils/recaptcha'

interface ContactForm {
  name: string
  email: string
  message: string
  type: 'renting' | 'price'
  product?: ProductList
  recaptchaToken: string
}

const { MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_RECEIVER, APP_HOST } = process.env

if (!MAIL_HOST || !MAIL_USER || !MAIL_PASSWORD || !MAIL_RECEIVER || !APP_HOST)
  // eslint-disable-next-line no-console
  console.warn(
    '[Contact Form] Missing required env variables: MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_RECEIVER, APP_HOST',
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

export default defineEventHandler(async (event) => {
  const { name, email, message, type, product, recaptchaToken } = await readBody<ContactForm>(event)

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
    const title = type === 'renting' ? 'Zapytanie o wynajem' : 'Zapytanie o cenę'

    const subject = product ? `${title}: ${product.name}` : title

    await sendMail({
      from: `${name} <${MAIL_USER}>`,
      to: MAIL_RECEIVER,
      subject: `${subject} | ${APP_HOST}`,
      replyTo: email,
      text: `
      Wiadomość od ${name} \n
      Email: ${email || '-'}\n
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
