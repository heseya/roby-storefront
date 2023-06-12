import { rewrite } from '@vercel/edge'

export function middleware(request: Request) {
  const url = new URL(request.url)

  /**
   * Needs to replace /kategoria-produktu/ with /category/
   * In old notation, all subcategries was joined in url using /, now it's using - (its just slug)
   * Also, we need to handle `/page/{number}` on the end of url converting it to `?page={number}`
   */
  console.log('Running middleware')

  const matcherPrefix = '/kategoria-produktu/'
  if (url.pathname.startsWith(matcherPrefix)) {
    const slug = url.pathname.split(matcherPrefix).pop()?.replaceAll('/', '-')
    console.log('🚀 ~ file: middleware.ts:14 ~ middleware ~ slug:', slug)
    console.log('New Url:', new URL(`/category/${slug}`, request.url).toString())

    return rewrite(new URL(`/category/${slug}`, request.url))
  }
}
