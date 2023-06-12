import { convertCategoryUrl } from '../utils/convertCategoryUrl'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  const redirectUrl = convertCategoryUrl(url)
  if (redirectUrl) sendRedirect(event, redirectUrl.toString(), 301)
})
