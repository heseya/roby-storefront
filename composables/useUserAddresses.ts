import { UserSavedAddressCreateDto, UserSavedAddressUpdateDto } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

export const useUserAddreses = (type: 'billing' | 'shipping') => {
  const user = useUser()
  const channel = useChannelsStore()

  const valueKey = `${type}_addresses` as const
  const methodSuffix = type === 'billing' ? 'BillingAddress' : 'ShippingAddress'

  const addresses = computed(() => user.value?.[valueKey] || [])

  const addressesAllowedInChannel = computed(() => {
    // Allow all addresses in billing
    if (type === 'billing') return addresses.value

    return addresses.value.filter((address) =>
      channel.isCountryCodeAllowedInChannel(address.address.country),
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
      if (!user.value) throw new Error('User is not logged')

      const updatedAddresses = await heseya.UserProfile[`save${methodSuffix}`](payload)
      user.value[valueKey] = updatedAddresses
      return { success: true }
    } catch (e) {
      return { success: false, error: e }
    }
  }

  const editAddress = async (id: string, payload: UserSavedAddressUpdateDto) => {
    const heseya = useHeseya()
    try {
      if (!user.value) throw new Error('User is not logged')

      const updatedAddresses = await heseya.UserProfile[`update${methodSuffix}`](id, payload)
      user.value[valueKey] = updatedAddresses
      return { success: true }
    } catch (e) {
      return { success: false, error: e }
    }
  }

  const removeAddress = async (id: string) => {
    const heseya = useHeseya()
    try {
      if (!user.value) throw new Error('User is not logged')

      await heseya.UserProfile[`remove${methodSuffix}`](id)
      user.value[valueKey] = user.value[valueKey].filter((address) => address.id !== id)
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

export const useUserBillingAddresses = () => useUserAddreses('billing')
export const useUserShippingAddresses = () => useUserAddreses('shipping')
