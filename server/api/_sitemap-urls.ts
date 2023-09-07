import { createHeseyaApiService } from '@heseya/store-core'
import axios from 'axios'

const { API_URL } = process.env

interface SitemapEntry {
  loc: string
  lastmod: string
}

/**
 * https://nuxtseo.com/sitemap/guides/dynamic-urls
 */
export default defineEventHandler(async (): Promise<SitemapEntry[]> => {
  const sdk = createHeseyaApiService(axios.create({ baseURL: API_URL }))

  const products = await sdk.Products.get()

  /**
   * TODO: product sets, blog posts, static sites
   * all with pagination
   */

  return [...products.data].map((p) => {
    return { loc: `/product/${p.slug}`, lastmod: '' }
  })
})
