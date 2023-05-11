<template>
  <AddressesCard :title="t('title')" :address="address" :is-selected="true" @edit="handleEdit" />
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

const address = computed(() => checkout.shippingAddress)

watch(
  () => defaultAddress,
  () => {
    if (defaultAddress.value) checkout.shippingAddress = clone(defaultAddress.value.address)
  },
  { immediate: true },
)

const handleEdit = () => {
  // TODO: handle edit
  // eslint-disable-next-line no-console
  console.log('edit')
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
