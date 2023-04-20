<template>
  <div class="shipping-address-form">
    <h2 class="shipping-address-form__title">{{ t('title') }}</h2>
    <CheckoutFormAddress v-model:address="checkout.shippingAddress" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adres dostawy"
  }
}
</i18n>

<script setup lang="ts">
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()
const checkout = useCheckoutStore()
</script>

<style lang="scss" scoped>
.shipping-address-form {
  padding: 16px 0;

  &__title {
    font-weight: 600;
    font-size: rem(14);
    margin-bottom: 8px;
  }
}
</style>
