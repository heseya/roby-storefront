import { ProductList } from '@heseya/store-core'
import { ProductsService } from '@heseya/store-core/dist/src/services/api/modules/products'
import { OmnibusPrice } from './OmnibusPrice'

type ArgumentType<T> = T extends (arg: infer R) => unknown ? R : never

export type ProductGetParams = Omit<ArgumentType<ProductsService['get']>, 'full'>

export type ExtendedProductList = ProductList & {
  omnibus?: OmnibusPrice
}
