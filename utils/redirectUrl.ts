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

export const trimSlash = (path: string) => path.replace(/\/$/, '')

export const resolveRedirect = (redirectsList: Redirect[], currentUrl: string): RedirectUrl => {
  const result: RedirectUrl = {
    target: '',
    type: 0,
  }

  redirectsList.forEach((redirect) => {
    const regExp = new RegExp(replaceVariablesInPathPattern(trimSlash(redirect.source_url)))
    if (redirect.enabled && regExp.test(currentUrl)) {
      const variables = extractVariables(currentUrl, trimSlash(redirect.source_url))
      result.target = pushVariablesToUrl(trimSlash(redirect.target_url), variables)
      result.type = redirect.type
    }
  })
  return result
}

export const handleRedirect = (currentUrl: string): Promise<RedirectUrl> => {
  return getAllRedirects()
    .then((redirectsList) => resolveRedirect(redirectsList, currentUrl))
    .catch()
}
