import axios from 'axios'
import { createHeseyaApiService, Redirect } from '@heseya/store-core'

interface RedirectUrl {
  target: string
  type: number
}

const getAllRedirects = async (): Promise<Redirect[]> => {
  const { API_URL } = process.env
  const sdk = createHeseyaApiService(axios.create({ baseURL: API_URL }))
  return (await sdk.Redirects.get()).data
}

const pushVariablesToUrl = (oldUrl: string, newUrl: string): string => {
  const varOldUrl = oldUrl.match(/-\{([^}]+)}/g)
  const varNewUrl = newUrl.match(/-\{([^}]+)}/g)

  if (!varOldUrl || !varNewUrl) {
    return newUrl
  }

  const result = newUrl.replace(/-\{([^}]+)}/g, () => {
    const variable1 = varOldUrl.shift()
    return variable1 ?? ''
  })

  return result
}

const skipVariablesAtUrl = (url: string): string => {
  return transformBracketsUrl(url).replaceAll(/-\{[^}]*}/g, '')
}

const transformBracketsUrl = (url: string): string => {
  return url.replaceAll(/%7B/g, '{').replaceAll(/%7D/g, '}')
}

export const redirectUrl = (url: URL): Promise<RedirectUrl> => {
  return getAllRedirects()
    .then((items) => {
      const result: RedirectUrl = {
        target: '',
        type: 0,
      }

      items.forEach((redirect) => {
        const pathName =
          url.pathname === '/__nuxt_error' ? url.searchParams.get('url') ?? '' : url.pathname
        if (
          redirect.enabled &&
          skipVariablesAtUrl(redirect.source_url) === skipVariablesAtUrl(pathName)
        ) {
          result.target = pushVariablesToUrl(transformBracketsUrl(pathName), redirect.target_url)
          result.type = redirect.type
        }
      })
      return result
    })
    .catch()
}
