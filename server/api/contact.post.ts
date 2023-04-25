import { ProductList } from '@heseya/store-core'
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer'
import { verifyRecaptchToken } from '../utils/recaptcha'

interface ContactForm {
  name: string
  email: string
  message: string
  type: 'renting' | 'price'
  product: ProductList
  recaptchaToken: string
}

const { MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_RECEIVER, APP_HOST } = process.env

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

  if (!name || !email || !message || !type || !product || !recaptchaToken)
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

    await sendMail({
      from: `${name} <${MAIL_USER}>`,
      to: MAIL_RECEIVER,
      subject: `${title}: ${product.name} | ${APP_HOST}`,
      text: `
      Wiadomość od ${name} \n
      Email: ${email || '-'}\n
      Dotyczy produktu: ${product.name} (${APP_HOST}/product/${product.slug}) \n\n
      ${message}
      `,
      html: `
      <h1>Wiadomość od ${name}</h1>
      <small>Email: ${email || '-'}</small><br />
      <small>Dotyczy produktu: ${product.name}
      (<a href="${APP_HOST}/product/${product.slug}">${APP_HOST}/product/${product.slug}</a>)
      </small><br />

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
