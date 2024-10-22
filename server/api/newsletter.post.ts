import axios from 'axios'

export default defineEventHandler(async (event) => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  const config = useRuntimeConfig(event)

  if (!(!!config.getresponseApiKey && !!config.getresponseCampaignId)) {
    // eslint-disable-next-line no-console
    console.error('[SERVER [POST] /newsletter] GetResponse key not set in environment variables')

    throw createError({
      statusCode: 500,
      statusMessage: 'Unknown error has occurred',
      stack: '', // clear stack
    })
  }

  const { email } = await readBody(event)

  if (!email || !validateEmail(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Incorrect e-mail address',
      stack: '', // clear stack
    })
  }

  const apiKey = config.getresponseApiKey
  const campaignId = config.getresponseCampaignId

  return await axios
    .post(
      'https://api.getresponse.com/v3/contacts',
      {
        email,
        campaign: {
          campaignId, // ID kampanii/listy mailingowej
        },
      },
      {
        headers: {
          'X-Auth-Token': `api-key ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .then(() => ({}))
    .catch((error) => {
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: error.response?.data?.message || 'Unknown error has occurred',
        data: error.response?.data,
        stack: '', // clear stack
      })
    })
})

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]{2,})\.[a-z]{2,}|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))$/i
  return re.test(String(email).toLowerCase())
}
