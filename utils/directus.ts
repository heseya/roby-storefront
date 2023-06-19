import { DirectusImage } from '~/interfaces/DirectusImage'
import { DirectusTranslated } from '~/interfaces/DirectusTranslated'

export const getImageUrl = (
  file?: DirectusImage,
  params?: Record<string, string | number>,
): string => {
  if (!file) return ''
  const { directusUrl } = usePublicRuntimeConfig()

  const query = new URLSearchParams()
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) query.set(key, value.toString())
  })

  return `${directusUrl}/assets/${file.filename_disk}?${query.toString()}`
}

export const getTranslated = <T>(translated: DirectusTranslated<T>, lang: string): T => {
  return (
    translated.find((t) => t.languages_code?.includes(lang) || t.languages_id?.includes(lang)) ||
    translated[0]
  )
}
