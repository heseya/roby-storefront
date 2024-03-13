import { resolveRedirect } from '@heseya/store-core'
import type { Redirect } from '@heseya/store-core'

export const getAllRedirects = async (): Promise<Redirect[]> => {
  const redirectsState = useState<Redirect[] | null>('redirects', () => null)
  if (redirectsState.value) return redirectsState.value

  const heseya = useHeseya()
  const { data, pagination } = await heseya.Redirects.get({ limit: 500 })

  if (pagination.lastPage > 1)
    // eslint-disable-next-line no-console
    console.warn('Redirects pagination is not implemented, and only first 500 will be used')

  redirectsState.value = data
  return data
}

export const handleRedirect = (currentUrl: string) => {
  return (
    getAllRedirects()
      .then((redirectsList) => resolveRedirect(redirectsList, currentUrl))
      // eslint-disable-next-line no-console
      .catch((e) => console.error('Failed to resolve redirects', e))
  )
}
