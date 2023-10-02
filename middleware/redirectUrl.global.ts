import { Redirect } from '@heseya/store-core'

export interface RedirectUrl {
  target: string
  type: number
}

export const getAllRedirects = async (): Promise<Redirect[]> => {
  const heseya = useHeseya()
  return (await heseya.Redirects.get()).data
}

export const pushVariablesToUrl = (oldUrl: string, newUrl: string): string => {
  const varOldUrl = oldUrl.match(/-\{([^}]+)}/g)
  const varNewUrl = newUrl.match(/-\{([^}]+)}/g)

  if (!varOldUrl || !varNewUrl) {
    return newUrl
  }

  return newUrl.replace(/-\{([^}]+)}/g, () => {
    const variable1 = varOldUrl.shift()
    return variable1 ?? ''
  })
}

export const skipVariablesAtUrl = (url: string): string => {
  return transformBracketsUrl(url).replaceAll(/-\{[^}]*}/g, '')
}

export const transformBracketsUrl = (url: string): string => {
  return url.replaceAll(/%7B/g, '{').replaceAll(/%7D/g, '}')
}

export const redirectUrl = (url: RouteLocationNormalized): Promise<RedirectUrl> => {
  return getAllRedirects()
    .then((items) => {
      const result: RedirectUrl = {
        target: '',
        type: 0,
      }

      items.forEach((redirect) => {
        if (
          redirect.enabled &&
          skipVariablesAtUrl(redirect.source_url) === skipVariablesAtUrl(url.path)
        ) {
          result.target = pushVariablesToUrl(transformBracketsUrl(url.path), redirect.target_url)
          result.type = redirect.type
        }
      })
      return result
    })
    .catch()
}

export default defineNuxtRouteMiddleware((to, _from) => {
  redirectUrl(to).then((redirect) => {
    if (redirect?.target !== '') {
      return navigateTo(redirect.target, { redirectCode: redirect.type })
    }
  })
})
