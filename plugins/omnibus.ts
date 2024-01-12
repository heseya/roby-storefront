import { stringifyQueryParams } from '@heseya/store-core'
import axios from 'axios'

interface OmnibusPrice {
  id: string | null
  product_id: string | null
  price_max: number | null
  price_min: number | null
  changed_at: string | null
  currency: string | null
}

export default defineNuxtPlugin(() => {
  const { priceTrackerUrl } = usePublicRuntimeConfig()
  const currency = useCurrency()

  const axiosInstance = axios.create({
    baseURL: priceTrackerUrl,
  })

  const omnibusService = {
    getPrice: async (productId: string, currentPriceMin?: number) => {
      const response = await axiosInstance.get<{ data?: OmnibusPrice }>(
        `/products/${productId}/${currency.value}?${stringifyQueryParams({
          current_price_min: currentPriceMin,
        })}`,
      )
      return response.data.data?.price_min || null
    },

    getPrices: async (productIds: string[]): Promise<OmnibusPrice[]> => {
      if (!productIds.length) return Promise.resolve([])
      const response = await axiosInstance.get<{
        data: OmnibusPrice[]
      }>(
        `/products?${stringifyQueryParams({
          product_ids: productIds,
          currency: currency.value,
        })}`,
      )
      return response.data.data
    },
  }

  return {
    provide: { omnibus: omnibusService },
  }
})
