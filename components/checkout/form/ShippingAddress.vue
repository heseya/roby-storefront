<template>
  <div class="shipping-address-form">
    <h2 class="shipping-address-form__title">{{ $t('payments.deliveryAddress') }}</h2>
    <AddressForm
      v-model:address="checkout.shippingAddress"
      name-prefix="shipping_address"
      exclude-countries="shipping-method"
      type="shipping"
    />
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '~/store/checkout'

const $t = useGlobalI18n()
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
