import { CartItem } from '@heseya/store-core'
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
  price: parseFloat(product.price.gross),
  discount: round(parseFloat(product.price_initial.gross) - parseFloat(product.price.gross)),
})

export const mapCartItemToItem = (item: CartItem): GoogleItem => ({
  item_id: item.productId,
  item_name: item.name,
  affiliation: 'website',
  price: item.price.gross,
  discount: round(+item.initialPrice.gross - +item.price.gross),
  quantity: item.totalQty,
})

export const mapOrderProductToItem = (item: OrderProduct): GoogleItem => ({
  item_id: item.product.id,
  item_name: item.name,
  affiliation: 'website',
  price: parseFloat(item.price.gross),
  discount: round(parseFloat(item.price_initial.gross) - parseFloat(item.price.gross)),
  quantity: item.quantity,
})
