import { Auth, Directus } from '@directus/sdk'
import axios from 'axios'
import { createHeseyaApiService } from '@heseya/store-core'
import type { ListResponse } from '@heseya/store-core'

import type { DirectusCollections } from '@/plugins/directus'

interface SitemapEntry {
  loc: string
  lastmod: string
}

const fetchDirectusPosts =
  (directus: Directus<DirectusCollections, Auth>) =>
  async (params: { page: number; limit: number }): Promise<ListResponse<{ slug: string }>> => {
    const response = await directus.items('Articles').readByQuery({
      fields: ['slug'],
      meta: '*',
      page: params.page,
      limit: params.limit,
      filter: { status: 'published' },
    })

    return {
      data: response.data || [],
      pagination: {
        currentPage: params.page,
        lastPage: Math.ceil((response.meta?.filter_count || 0) / params.limit),
        perPage: params.limit,
        total: response.meta?.filter_count || 0,
      },
    }
  }

const fullPaginationFetch = async <T>(
  method: (params: { page: number; limit: number }) => Promise<ListResponse<T>>,
): Promise<T[]> => {
  /**
   * 500 is max that Heseya is supporting
   */
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
export default defineEventHandler(async (event): Promise<SitemapEntry[]> => {
  // @ts-ignore Docs suggest to pass event to useRuntimeConfig, but it's not typed? https://nuxt.com/docs/guide/going-further/runtime-config#server-routes
  const config = useRuntimeConfig(event)

  const sdk = createHeseyaApiService(axios.create({ baseURL: config.public.apiUrl }))
  const directus = new Directus<DirectusCollections>(config.public.directusUrl || '')

  const [products, productSets, pages, blogPosts] = await Promise.all([
    fullPaginationFetch((params) => sdk.Products.get(params)),
    fullPaginationFetch((params) => sdk.ProductSets.get(params)),
    fullPaginationFetch((params) => sdk.Pages.get(params)),
    directus.url ? fullPaginationFetch((params) => fetchDirectusPosts(directus)(params)) : [],
  ])

  return [
    ...products.map((e) => ({ loc: `/product/${e.slug}`, lastmod: '' })),
    ...productSets.map((e) => ({ loc: `/category/${e.slug}`, lastmod: '' })),
    ...pages.map((e) => ({ loc: `/${e.slug}`, lastmod: '' })),
    ...blogPosts.map((e) => ({ loc: `/${e.slug}`, lastmod: '' })),
  ]
})
