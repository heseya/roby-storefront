<template>
  <div class="checkout-shipping-methods">
    <FormRadioGroup v-model="selectedMethod" :options="METHODS" name="shipping-method">
      <template v-for="{ key } in METHODS" :key="key" v-slot:[`${key}-label`]>
        <div class="shipping-method">
          <span class="shipping-method__name">{{ t(`shippingMethod.${key}`) }}</span>
          <span class="shipping-method__price">{{ formatAmount(20) }}</span>
        </div>
        <div class="shipping-method-description">
          {{ t('shippingTime') }} <b>24h</b>. {{ t('packagingTime') }}
          <b>1-3 dni roboczych</b>
        </div>
      </template>
    </FormRadioGroup>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "shippingMethod": {
      "courier": "Przesyłka kurierska",
      "inpost": "Paczkomat InPost 24/7",
      "pickupPoint": "Odbiór osobisty"
    },
    "shippingTime": "Przewidywana wysyłka w",
    "packagingTime": "Przewidywany czas realizacji dostawy"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const METHODS = [
  { key: 'courier', value: 'courier', label: '' },
  { key: 'inpost', value: 'inpost', label: '' },
  { key: 'pickupPoint', value: 'pickupPoint', label: '' },
]

const selectedMethod = ref('1')
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
