import { convertCategoryUrl } from '../utils/convertCategoryUrl'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  /**
   * This redirects are needed only for strict bussines purposes, maybe we can remove it in the future or at least move it to more abstract place?
   */
  const redirectUrl = convertCategoryUrl(url)
  if (redirectUrl) return sendRedirect(event, redirectUrl.toString(), 301)
})
