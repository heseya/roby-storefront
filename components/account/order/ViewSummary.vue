<template>
  <div class="view-summary">
    <div class="view-summary__section">
      <div class="view-summary__container">
        <div>{{ $t('custom.productsPrice') }}</div>
        <div>{{ formatAmount(order.cart_total) }}</div>
      </div>
      <div class="view-summary__container">
        <div>{{ $t('custom.delivery') }}</div>
        <div>{{ formatAmount(order.shipping_price) }}</div>
      </div>
    </div>
    <div class="view-summary__section">
      <div class="view-summary__container">
        <div>{{ $t('custom.totalAmount') }}</div>
        <div class="view-summary__total">
          {{ formatAmount(order.summary) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Order } from '@heseya/store-core'

const $t = useGlobalI18n()

defineProps<{
  order: Order
}>()
</script>

<style lang="scss" scoped>
.view-summary {
  &__section {
    border-top: 1px solid $gray-color-300;
    padding: 6px 0px;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  &__total {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
