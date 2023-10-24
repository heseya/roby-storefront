import { Redirect } from '@heseya/store-core'

export interface RedirectUrl {
  target: string
  type: number
}

export const getAllRedirects = async (): Promise<Redirect[]> => {
  const redirectsState = useState<Redirect[] | null>('redirects', () => null)
  if (redirectsState.value) return redirectsState.value

  const heseya = useHeseya()
  const { data } = await heseya.Redirects.get({ limit: 500 })
  redirectsState.value = data
  return data
}

export const pushVariablesToUrl = (
  patternPath: string,
  variables: Array<string> | null,
): string => {
  if (variables === null) return patternPath

  variables.forEach((element: string) => {
    patternPath = patternPath.replace(/\{([^}]+)}/, element)
  })
  return patternPath
}

export const replaceVariablesInPathPattern = (pattern: string): string => {
  return pattern.replaceAll(/\{([^}]+)}/g, '([^/]+)')
}

export const extractVariables = (path: string, pattern: string) => {
  const regex = replaceVariablesInPathPattern(pattern)
  const match = path.match(regex)
  return match ? match.slice(1) : null
}

export const handleRedirect = (url: string): Promise<RedirectUrl> => {
  return getAllRedirects()
    .then((items) => {
      const result: RedirectUrl = {
        target: '',
        type: 0,
      }

      items.forEach((redirect) => {
        const regExp = new RegExp(replaceVariablesInPathPattern(redirect.source_url))
        if (redirect.enabled && regExp.test(url)) {
          const variables = extractVariables(url, redirect.source_url)
          result.target = pushVariablesToUrl(redirect.target_url, variables)
          result.type = redirect.type
        }
      })
      return result
    })
    .catch()
}
