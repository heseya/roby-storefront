<template>
  <CheckoutPageArea v-show="requirePaymentMethod" :title="t('payment')" :placeholder-height="100">
    <CheckoutPaymentMethodsSelect
      v-model:value="checkout.paymentMethodId"
      :shipping-method-id="checkout.shippingMethod?.id"
      class="checkout-payment-methods"
      @select="onSelect"
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
import { CartItem, HeseyaEvent, PaymentMethodList } from '@heseya/store-core'
import { useCheckoutStore } from '@/store/checkout'
import { useCartStore } from '~/store/cart'

const t = useLocalI18n()

const checkout = useCheckoutStore()
const cart = useCartStore()
const ev = useHeseyaEventBus()

const requirePaymentMethod = computed(() => checkout.requirePaymentMethod)

watch(
  () => requirePaymentMethod,
  () => {
    if (!requirePaymentMethod.value) checkout.paymentMethodId = null
  },
  { immediate: true },
)

const onSelect = (method: PaymentMethodList | null) => {
  if (method) {
    checkout.paymentMethod = method
    ev.emit(HeseyaEvent.AddPaymentInfo, {
      items: cart.items as CartItem[],
      payment: method,
    })
  }
}
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
