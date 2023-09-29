import { redirectUrl } from '../utils/redirectUrl'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  redirectUrl(url).then((redirect) => {
    if (redirect?.target !== '') {
      return sendRedirect(event, redirect.target, redirect.type)
    }
  })
})
