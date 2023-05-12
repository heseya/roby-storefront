<template>
  <CheckoutAddressCard :address="checkout.billingAddress" @edit="handleEdit" />

  <CheckoutAddressModal
    :title="t('title')"
    :open="isEditOpen"
    @update:open="(v) => (isEditOpen = v)"
    @save="isEditOpen = false"
  >
    <CheckoutAddressList v-model:address="checkout.billingAddress" type="billing" />
  </CheckoutAddressModal>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adres rozliczeniowy"
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()

const isEditOpen = ref(false)

const handleEdit = () => {
  isEditOpen.value = true
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
