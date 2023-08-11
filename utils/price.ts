import { Price } from '@heseya/store-core'

export const parsePrices = (prices: Price[], currency: string) =>
  parseFloat((prices || []).find((price) => price.currency === currency)?.gross || '0') || 0
