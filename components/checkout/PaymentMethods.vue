<template>
  <CheckoutPaymentMethodsSelect
    v-model:value="checkout.paymentMethodId"
    class="checkout-payment-methods"
  />
</template>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const checkout = useCheckoutStore()
</script>

<style lang="scss" scoped>
.checkout-payment-methods {
}
</style>
