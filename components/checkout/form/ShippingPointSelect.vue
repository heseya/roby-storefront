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
        <LayoutColorCheckbox :is-checked="point.id === checkout.shippingPointId" />
        <div class="shipping-point__text">
          <span class="shipping-point__name">{{ point.name }}</span>
          <span>{{ point.address }}</span>
          <span>{{ point.zip }}, {{ point.city }}</span>
        </div>
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
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
}

.shipping-point {
  @include flex-row;
  gap: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: $unnamed-color-f4f8fc;
  font-size: rem(12);
  cursor: pointer;

  &__name {
    font-weight: $font-weight-medium;
  }

  &__text {
    @include flex-column;
  }
}
</style>
