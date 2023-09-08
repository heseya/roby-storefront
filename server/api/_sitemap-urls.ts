import { createHeseyaApiService, ListResponse } from '@heseya/store-core'
import axios from 'axios'

const { API_URL } = process.env

interface SitemapEntry {
  loc: string
  lastmod: string
}

const fullPaginationFetch = async <T>(
  method: (params: { page: number; limit: number }) => Promise<ListResponse<T>>,
): Promise<T[]> => {
  const LIMIT = 500

  const { data, pagination } = await method({ page: 1, limit: LIMIT })

  const remainingPages = Array.from({ length: pagination.lastPage - 1 }, (_, i) => i + 2)
  const remainingData = await Promise.all(
    remainingPages.map((page) => method({ page, limit: LIMIT }).then((r) => r.data)),
  )

  return [...data, ...remainingData.flat()]
}

/**
 * https://nuxtseo.com/sitemap/guides/dynamic-urls
 */
export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  const sdk = createHeseyaApiService(axios.create({ baseURL: API_URL }))

  const [products, productSets, pages] = await Promise.all([
    fullPaginationFetch((params) => sdk.Products.get(params)),
    fullPaginationFetch((params) => sdk.ProductSets.get(params)),
    fullPaginationFetch((params) => sdk.Pages.get(params)),
  ])

  // TODO: fetch blog posts

  return [
    ...products.map((e) => ({ loc: `/product/${e.slug}`, lastmod: '' })),
    ...productSets.map((e) => ({ loc: `/category/${e.slug}`, lastmod: '' })),
    ...pages.map((e) => ({ loc: `/${e.slug}`, lastmod: '' })),
  ]
})
