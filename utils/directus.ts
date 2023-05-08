import { DirectusImage } from '~/interfaces/DirectusImage'
import { DirectusTranslated } from '~/interfaces/DirectusTranslated'

export const getImageUrl = (file?: DirectusImage): string => {
  if (!file) return ''
  const { directusUrl } = usePublicRuntimeConfig()
  return `${directusUrl}/assets/${file.filename_disk}`
}

export const getTranslated = <T>(translated: DirectusTranslated<T>, lang: string): T => {
  return (
    translated.find((t) => t.languages_code?.includes(lang) || t.languages_id?.includes(lang)) ||
    translated[0]
  )
}
