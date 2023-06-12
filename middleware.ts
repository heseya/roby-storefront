import { rewrite } from '@vercel/edge'

export function middleware(request: Request) {
  const url = new URL(request.url)

  /**
   * Needs to replace /kategoria-produktu/ with /category/
   * In old notation, all subcategries was joined in url using /, now it's using - (its just slug)
   * Also, we need to handle `/page/{number}` on the end of url converting it to `?page={number}`
   */
  if (url.pathname.startsWith('/kategoria-produktu')) {
    const slug = url.pathname.split('/').pop()?.replaceAll('/', '-')
    return rewrite(new URL(`/category/${slug}`, request.url))
  }
}
