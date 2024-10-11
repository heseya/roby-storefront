<template>
  <div class="view-summary">
    <div class="view-summary__section">
      <div class="view-summary__container">
        <div>
          {{ $t('orders.productsPrice') }} <span v-if="isModeB2B">{{ $t('priceType.net') }}</span>
        </div>
        <div>
          {{ formatAmount(getDisplayedPrice(order.cart_total).value, order.currency) }}
        </div>
      </div>
      <div class="view-summary__container">
        <div>{{ $t('orders.delivery') }}</div>
        <div v-if="getSecondPrice(order.shipping_price).value">
          {{ formatAmount(getSecondPrice(order.shipping_price).value ?? 0, order.currency) }}
        </div>
      </div>
    </div>
    <div class="view-summary__section">
      <div class="view-summary__container">
        <div>{{ $t('orders.totalAmount') }}</div>
        <div class="view-summary__total">
          {{ formatAmount(getDisplayedPrice(order.summary).value, order.currency) }}
          <span v-if="getSecondPrice(order.summary).value">
            {{ formatAmount(getSecondPrice(order.summary).value ?? 0, order.currency) }}
            {{ $t('priceType.gross') }} ({{ Number(order.summary.vat_rate) * 100 }}% VAT)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@heseya/store-core'

const $t = useGlobalI18n()
const { getDisplayedPrice, getSecondPrice } = useGetDisplayedPrice()
const { isModeB2B } = useSiteMode()

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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    span {
      font-size: 12px;
      color: #9d9d9d;
      font-weight: 500;
    }
  }
}
</style>
