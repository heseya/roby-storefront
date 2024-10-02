<template>
  <CheckoutPageArea :title="$t('payments.billingAddress')">
    <CheckoutAddressCard :address="checkout.billingAddress" type="billing" @edit="handleEdit" />

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
  },
  "en": {
    "title": "Billing address"
  }
}
</i18n>

<script setup lang="ts">
import clone from 'lodash/clone'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()
const { isModeB2B } = useSiteMode()
const { defaultAddress } = isModeB2B.value
  ? useOrganizationBillingAddresses()
  : useUserBillingAddresses()

if (defaultAddress.value) {
  checkout.billingAddress = clone(defaultAddress.value.address)
}

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
  if (isModeB2B.value) return
  isEditOpen.value = true
}

const onSave = () => {
  if (selectedAddress.value) {
    checkout.billingAddress = clone(selectedAddress.value)
    checkout.invoiceRequested = !!selectedAddress.value.vat
  }
  isEditOpen.value = false
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
