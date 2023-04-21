import { Address } from '@heseya/store-core'
import isObject from 'lodash/isObject'

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

export const isAddress = (address?: unknown): address is Address => {
  return (
    isObject(address) &&
    `address` in address &&
    `city` in address &&
    `country` in address &&
    `name` in address &&
    `phone` in address &&
    `zip` in address
  )
}
