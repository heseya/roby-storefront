<template>
  <div class="checkout-shipping-methods">
    <FormRadioGroup
      :value="checkout.shippingMethod?.id"
      :options="shippingOptions"
      name="shipping-method"
      @update:value="setShippingMethod"
    >
      <template v-for="method in shippingMethods" :key="method.id" v-slot:[`${method.id}-label`]>
        <div class="shipping-method">
          <span class="shipping-method__name">{{ method.name }}</span>
          <span class="shipping-method__price">{{ formatAmount(method.price || 0) }}</span>
        </div>
        <div class="shipping-method-description">
          <p>
            <template v-if="cart.shippingTimeDescription">
              {{ t('shippingTime') }} <b>{{ cart.shippingTimeDescription }}.</b>
            </template>
            {{ t('packagingTime') }}
            <b
              >{{ method.shipping_time_min }}-{{ method.shipping_time_max }}
              {{ $t('custom.workingDays') }}</b
            >
          </p>
        </div>
      </template>

      <template v-for="method in shippingMethods" :key="method.id" v-slot:[method.id]>
        <CheckoutFormShippingAddress
          v-if="method.shipping_type === ShippingType.Address && !hasShippingAddresses"
        />
        <CheckoutFormLoggedShippingAddress
          v-if="method.shipping_type === ShippingType.Address && hasShippingAddresses"
        />
        <CheckoutInpostSelect
          v-if="method.shipping_type === ShippingType.PointExternal && method.metadata.paczkomat"
        />
        <CheckoutFormShippingPointSelect
          v-if="method.shipping_type === ShippingType.Point"
          :method="method"
        />
      </template>
    </FormRadioGroup>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "shippingTime": "Przewidywana wysyłka",
    "packagingTime": "Przewidywany czas realizacji dostawy"
  },
  "en": {
    "shippingTime": "Estimated shipment",
    "packagingTime": "Estimated delivery time"
  }
}
</i18n>

<script setup lang="ts">
import { ShippingMethod, ShippingType } from '@heseya/store-core'
import { useCartStore } from '@/store/cart'
import { useCheckoutStore } from '@/store/checkout'

const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const cart = useCartStore()
const checkout = useCheckoutStore()

const { data: shippingMethods } = useLazyAsyncData(
  `shipping-methods-for-value`,
  async () => {
    const methods = await heseya.ShippingMethods.get({ cart_value: cart.totalValue })
    return methods.data
  },
  { server: false, default: () => [] as ShippingMethod[] },
)

const hasShippingAddresses = computed(() => {
  const { defaultAddress } = useUserShippingAddresses()
  return !!defaultAddress.value
})

const shippingOptions = computed(() => {
  return (shippingMethods.value || []).map((method) => ({
    key: method.id,
    value: method.id,
    label: method.name,
  }))
})

const setShippingMethod = (id: unknown) => {
  const shippingMethod = shippingMethods.value?.find((method) => method.id === id) || null
  checkout.shippingMethod = shippingMethod

  if (shippingMethod?.shipping_type === ShippingType.Point && !checkout.shippingPointId) {
    checkout.shippingPointId = shippingMethod.shipping_points[0].id || null
  }

  cart.processCart()
}
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
