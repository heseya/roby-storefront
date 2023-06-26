import { CartItem, ProductList } from '@heseya/store-core'

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

export const mapProductToItem = (product: ProductList): GoogleItem => ({
  item_id: product.id,
  item_name: product.name,
  affiliation: 'website',
  currency: 'PLN',
  price: product.price_min,
  discount: round(product.price_min_initial - product.price_min),
})

export const mapCartItemToItem = (item: CartItem): GoogleItem => ({
  item_id: item.productId,
  item_name: item.name,
  affiliation: 'website',
  price: item.price,
  discount: round(item.initialPrice - item.price),
  quantity: item.totalQty,
})
