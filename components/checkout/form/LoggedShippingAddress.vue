<template>
  <CheckoutAddressCard
    :title="$t('payments.deliveryAddress')"
    :address="checkout.shippingAddress"
    @edit="handleEdit"
  />

  <CheckoutAddressModal
    :title="$t('payments.deliveryAddress')"
    :open="isEditOpen"
    @update:open="(v) => (isEditOpen = v)"
    @save="onSave"
  >
    <CheckoutAddressList v-model:address="selectedAddress" type="shipping" />
  </CheckoutAddressModal>
</template>

<script setup lang="ts">
import clone from 'lodash/clone'
import { useCheckoutStore } from '~/store/checkout'

const $t = useGlobalI18n()
const checkout = useCheckoutStore()
const { defaultAddress } = useUserShippingAddresses()

const isEditOpen = ref(false)
const selectedAddress = ref(defaultAddress.value?.address || null)

watch(
  () => defaultAddress,
  () => {
    if (defaultAddress.value) {
      checkout.shippingAddress = clone(defaultAddress.value.address)
      selectedAddress.value = defaultAddress.value?.address || null
    }
  },
  { immediate: true },
)

const handleEdit = () => {
  isEditOpen.value = true
}

const onSave = () => {
  if (selectedAddress.value) checkout.shippingAddress = clone(selectedAddress.value)
  isEditOpen.value = false
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
