<template>
  <div class="checkout-shipping-methods">
    <FormRadioGroup v-model="selectedMethod" :options="shippingOptions" name="shipping-method">
      <template v-for="method in shippingMethods" :key="method.id" v-slot:[`${method.id}-label`]>
        <div class="shipping-method">
          <span class="shipping-method__name">{{ method.name }}</span>
          <span class="shipping-method__price">{{ formatAmount(method.price || 0) }}</span>
        </div>
        <div class="shipping-method-description">
          {{ t('shippingTime') }} <b>{{ packagingTime }}.</b> {{ t('packagingTime') }}
          <b>{{ method.shipping_time_min }}-{{ method.shipping_time_max }} {{ t('days') }}</b>
        </div>
      </template>
    </FormRadioGroup>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "shippingTime": "Przewidywana wysyłka w",
    "packagingTime": "Przewidywany czas realizacji dostawy",
    "days": "dni roboczych"
  }
}
</i18n>

<script setup lang="ts">
import { ShippingMethod } from '@heseya/store-core'
import { useCartStore } from '~~/store/cart'

const t = useLocalI18n()
const heseya = useHeseya()
const cart = useCartStore()

const selectedMethod = ref<string>()

const { data: shippingMethods } = useAsyncData(
  async () => {
    const methods = await heseya.ShippingMethods.get({ cart_value: cart.totalValue })
    return methods.data
  },
  { server: false, default: () => [] as ShippingMethod[] },
)

const shippingOptions = computed(() => {
  return (shippingMethods.value || []).map((method) => ({
    key: method.id,
    value: method.id,
    label: method.name,
  }))
})

// TODO: dynamic value from cart/process
const packagingTime = `24h`
</script>

<style lang="scss" scoped>
.shipping-method {
  display: flex;

  &__price {
    margin-left: auto;
  }
}

.shipping-method-description {
  font-size: rem(12);
  margin-top: 8px;
}
</style>
