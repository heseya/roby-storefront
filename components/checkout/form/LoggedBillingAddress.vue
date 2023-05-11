<template>
  <AddressCard :address="address" :is-selected="true" @edit="handleEdit" />
</template>

<script setup lang="ts">
import clone from 'lodash/clone'
import { useCheckoutStore } from '~/store/checkout'

const checkout = useCheckoutStore()
const { defaultAddress } = useUserBillingAddresses()

const address = computed(() => checkout.billingAddress)

watch(
  () => defaultAddress,
  () => {
    if (defaultAddress.value) checkout.billingAddress = clone(defaultAddress.value.address)
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
