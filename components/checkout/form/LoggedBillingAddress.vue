<template>
  <CheckoutPageArea :title="$t('payments.billingAddress')">
    <CheckoutAddressCard :address="checkout.billingAddress" @edit="handleEdit" />

    <CheckoutAddressModal
      :title="t('title')"
      :open="isEditOpen"
      @update:open="(v) => (isEditOpen = v)"
      @save="onSave"
    >
      <CheckoutAddressList v-model:address="selectedAddress" type="billing" />
    </CheckoutAddressModal>
  </CheckoutPageArea>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adres rozliczeniowy"
  }
}
</i18n>

<script setup lang="ts">
import clone from 'lodash/clone'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const { defaultAddress } = useUserBillingAddresses()

const isEditOpen = ref(false)
const selectedAddress = ref(defaultAddress.value?.address || null)

watch(
  () => defaultAddress,
  () => {
    if (defaultAddress.value) selectedAddress.value = defaultAddress.value?.address || null
  },
  { immediate: true },
)

const handleEdit = () => {
  isEditOpen.value = true
}

const onSave = () => {
  if (selectedAddress.value) checkout.billingAddress = clone(selectedAddress.value)
  isEditOpen.value = false
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
