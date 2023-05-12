<template>
  <CheckoutAddressCard :title="t('title')" :address="checkout.shippingAddress" @edit="handleEdit" />

  <CheckoutAddressModal
    :title="t('title')"
    :open="isEditOpen"
    @update:open="(v) => (isEditOpen = v)"
    @save="isEditOpen = false"
  >
    <CheckoutAddressList v-model:address="checkout.shippingAddress" type="shipping" />
  </CheckoutAddressModal>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adres dostawy"
  }
}
</i18n>

<script setup lang="ts">
import clone from 'lodash/clone'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const { defaultAddress } = useUserShippingAddresses()

const isEditOpen = ref(false)

watch(
  () => defaultAddress,
  () => {
    if (defaultAddress.value) checkout.shippingAddress = clone(defaultAddress.value.address)
  },
  { immediate: true },
)

const handleEdit = () => {
  isEditOpen.value = true
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
