import { Address } from '@heseya/store-core'

export const isAddressValid = (address?: Address | null): boolean => {
  return !!(
    address &&
    address.address &&
    address.city &&
    address.country &&
    address.name &&
    address.phone &&
    address.zip
  )
}
