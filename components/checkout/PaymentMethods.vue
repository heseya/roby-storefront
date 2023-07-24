<template>
  <CheckoutPageArea :title="t('payment')" :placeholder-height="100">
    <CheckoutPaymentMethodsSelect
      v-model:value="checkout.paymentMethodId"
      class="checkout-payment-methods"
    />
  </CheckoutPageArea>
</template>

<i18n lang="json">
{
  "pl": {
    "payment": "Metoda płatności"
  },
  "en": {
    "payment": "Payment methods"
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '@/store/checkout'

const t = useLocalI18n()

const checkout = useCheckoutStore()
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
