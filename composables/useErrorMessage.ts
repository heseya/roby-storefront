import { formatApiError } from '@heseya/store-core'

export const useErrorMessage = () => {
  const t = useGlobalI18n()

  return (error: any) => {
    const { title, key, errors, text } = formatApiError(error)

    const firstError = errors ? Object.values(errors)[0][0] : undefined
    if (firstError) {
      return t(`errors.${firstError.key}`) || text
    }

    if (!key) return title

    return t(`errors.${key}`) || title
  }
}
