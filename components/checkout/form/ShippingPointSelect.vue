<template>
  <div class="shipping-point-select">
    <h2 class="shipping-point-select__title">{{ t('title') }}</h2>
    <div class="shipping-point-select__points">
      <div
        v-for="point in method.shipping_points"
        :key="point.id"
        class="shipping-point"
        :class="{ 'shipping-point--selected': point.id === checkout.shippingPointId }"
        @click="selectShippingPoint(point)"
      >
        <span class="shipping-point__name">{{ point.name }}</span>
        <span>{{ point.address }}</span>
        <span>{{ point.zip }}, {{ point.city }}</span>
        <span>{{ point.country_name }}</span>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Wybierz punkt odbioru"
  }
}
</i18n>

<script setup lang="ts">
import { Address, ShippingMethod } from '@heseya/store-core'
import { useCheckoutStore } from '~/store/checkout'

const t = useLocalI18n()

withDefaults(
  defineProps<{
    method: ShippingMethod
  }>(),
  {},
)

const checkout = useCheckoutStore()

const selectShippingPoint = (point: Address) => {
  // TODO: Address dont have id??????
  checkout.shippingPointId = point.id!
}
</script>

<style lang="scss" scoped>
.shipping-point-select {
  padding: 16px 0;
  &__title {
    font-weight: 600;
    font-size: rem(14);
    margin-bottom: 8px;
  }

  &__points {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

.shipping-point {
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: solid 1px $gray-color-100;
  font-size: rem(12);
  cursor: pointer;

  &__name {
    font-weight: 500;
  }

  &:not(&--selected):hover {
    border-color: var(--secondary-color);
  }

  &--selected {
    border-color: var(--secondary-color-alt);
  }
}
</style>
