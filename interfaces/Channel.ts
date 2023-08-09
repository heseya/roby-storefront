import { Currency, ShippingCountry, Language } from '@heseya/store-core'

export interface Channel {
  id: string
  name: string
  slug: string
  status: 'active' | 'inactive' | 'hidden'
  vat_rate: string
  countries_block_list: boolean
  countries: ShippingCountry[]
  default_currency: Currency
  default_language: Language
}
