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

    // TODO: this request is currently unused, but it should be used on all product lists
    getPrices: async (productIds: string[]) => {
      const response = await axiosInstance.get<{
        data: OmnibusPrice[]
      }>(
        `/products?${stringifyQueryParams({
          product_ids: productIds,
          currency: currency.value,
        })}`,
      )
      return response.data
    },
  }

  return {
    provide: { omnibus: omnibusService },
  }
})
