import { ProductList } from '@heseya/store-core'
import { OmnibusPrice } from './OmnibusPrice'

export type ExtendedProductList = ProductList & {
  omnibus?: OmnibusPrice
}
