import { Redirect, resolveRedirect } from '@heseya/store-core'

export const getAllRedirects = async (): Promise<Redirect[]> => {
  const redirectsState = useState<Redirect[] | null>('redirects', () => null)
  if (redirectsState.value) return redirectsState.value

  const heseya = useHeseya()
  const { data } = await heseya.Redirects.get({ limit: 500 })
  redirectsState.value = data
  return data
}

export const handleRedirect = (currentUrl: string) => {
  return getAllRedirects()
    .then((redirectsList) => resolveRedirect(redirectsList, currentUrl))
    .catch()
}
