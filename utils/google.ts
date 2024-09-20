import { CartItem, parsePrices } from '@heseya/store-core'
import type { OrderProduct, ProductListed } from '@heseya/store-core'

interface GoogleItem {
  item_id: string
  item_name: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}

const round = (v: number): number => Math.round(v * 100) / 100

export const mapProductToItem = (product: ProductListed, currency: string): GoogleItem => ({
  item_id: product.id,
  item_name: product.name,
  affiliation: 'website',
  currency,
  // @ts-ignore TODO: fix this
  price: parsePrices(product.prices_min, currency),
  discount: round(
    // @ts-ignore TODO: fix this
    parsePrices(product.prices_min_initial, currency) - parsePrices(product.prices_min, currency),
  ),
})

export const mapCartItemToItem = (item: CartItem): GoogleItem => ({
  item_id: item.productId,
  item_name: item.name,
  affiliation: 'website',
  price: Number(item.price),
  discount: round(Number(item.initialPrice) - Number(item.price)),
  quantity: item.totalQty,
})

export const mapOrderProductToItem = (item: OrderProduct): GoogleItem => ({
  item_id: item.product.id,
  item_name: item.name,
  affiliation: 'website',
  price: parseFloat(item.price),
  discount: round(parseFloat(item.price_initial) - parseFloat(item.price)),
  quantity: item.quantity,
})
