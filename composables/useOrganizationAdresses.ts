import type {
  Address,
  UserSavedAddressCreateDto,
  UserSavedAddressUpdateDto,
} from '@heseya/store-core'
import { useCheckoutStore } from '@/store/checkout'

export const useOrganizationAddresses = (type: 'billing' | 'shipping') => {
  const checkout = useCheckoutStore()
  const organization = useOrganization()

  const addresses = computed(() =>
    type === 'billing'
      ? [
          {
            id: 'billing',
            default: true,
            name: '',
            address: organization.value?.billing_address || ({} as Address),
          },
        ]
      : organization.value?.shipping_addresses || [],
  )

  const addressesAllowedInChannel = computed(() => {
    // Allow all addresses
    if (type === 'billing') return addresses.value

    // Allow only addresses from countries allowed in selected shipping method
    return addresses.value.filter((address) =>
      checkout.isCountryCodeAllowedInShipping(address.address.country),
    )
  })

  const defaultAddress = computed(
    () =>
      addressesAllowedInChannel.value.find((address) => address.default) ??
      addressesAllowedInChannel.value[0] ??
      null,
  )

  const addAddress = async (payload: UserSavedAddressCreateDto) => {
    const heseya = useHeseya()
    try {
      if (!organization.value) throw new Error('User is not logged')

      const updatedAddresses =
        await heseya.UserProfile.My.Organization.ShippingAddresses.create(payload)

      if (organization.value) {
        organization.value.shipping_addresses = updatedAddresses
      }
      return { success: true }
    } catch (e) {
      return { success: false, error: e }
    }
  }

  const editAddress = async (id: string, payload: UserSavedAddressUpdateDto) => {
    const heseya = useHeseya()
    try {
      if (!organization.value) throw new Error('User is not logged')

      const updatedAddresses = await heseya.UserProfile.My.Organization.ShippingAddresses.update(
        id,
        payload,
      )
      if (organization.value) {
        organization.value.shipping_addresses = updatedAddresses
      }
      return { success: true }
    } catch (e) {
      return { success: false, error: e }
    }
  }

  const removeAddress = async (id: string) => {
    const heseya = useHeseya()
    try {
      if (!organization.value) throw new Error('User is not logged')

      await heseya.UserProfile.My.Organization.ShippingAddresses.remove(id)
      if (organization.value) {
        organization.value.shipping_addresses = organization.value.shipping_addresses.filter(
          (address) => address.id !== id,
        )
      }
      return { success: true }
    } catch (e) {
      return { success: false, error: e }
    }
  }

  return {
    addresses,
    addressesAllowedInChannel,
    defaultAddress,
    add: addAddress,
    edit: editAddress,
    remove: removeAddress,
  }
}
export const useOrganizationShippingAddresses = () => useOrganizationAddresses('shipping')
export const useOrganizationBillingAddresses = () => useOrganizationAddresses('billing')
