/**
 * Replace /kategoria-produktu/ with /category/
 * In old notation, all subcategries was joined in url using /, now it's using - (its just slug)
 * Also, we need to handle `/page/{number}` on the end of url converting it to `?page={number}`
 */
export const convertCategoryUrl = (url: URL): URL | null => {
  // Ignore if route does not match
  if (!url.pathname.startsWith('/kategoria-produktu/')) return null

  const urlParts = url.pathname.split('/').filter(Boolean)
  urlParts.shift() // remove matcherPrefix

  const page = urlParts.at(-2) === 'page' ? parseInt(urlParts.pop()!) : null
  if (page) urlParts.pop() // remove page text

  const categorySlug = urlParts.join('-')

  const newUrl = new URL(`/category/${categorySlug}`, url.origin)
  url.searchParams.forEach((value, key) => newUrl.searchParams.set(key, value))

  if (page) newUrl.searchParams.set('page', page.toString())

  return newUrl
}
