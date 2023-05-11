<template>
  <div class="products-and-summary">
    <div>
      <div class="products-and-summary__header">{{ t('header') }}</div>
      <div class="products-and-summary__products-list">
        <div v-for="product in order.products" :key="product.id">
          <AccountOrderViewProduct :product="product" />
        </div>
      </div>
    </div>
    <AccountOrderViewSummary :order="order" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "header": "Zamówione produkty"
  }
}
</i18n>

<script setup lang="ts">
import { Order } from '@heseya/store-core'
const t = useLocalI18n()

defineProps<{
  order: Order
}>()
</script>

<style lang="scss" scoped>
.products-and-summary {
  display: grid;
  align-content: space-between;
  padding-left: 4px;

  &__header {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
  }

  &__products-list {
    display: grid;
    margin: 15px 0px;
    gap: 15px;
  }
}
</style>
