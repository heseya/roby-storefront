<template>
  <div class="account-order-product-view">
    <div>
      <AccountProductCard :product="product.product" />
    </div>
    <div class="account-order-product-view__container">
      <div class="account-order-product-view__name">{{ product.name }}</div>
      <div class="account-order-product-view__price">
        <div>{{ product.quantity }} {{ t('quantity') }}</div>
        <div>{{ formatAmount(product.price) }}</div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "quantity": "szt."
  }
}
</i18n>

<script setup lang="ts">
import { OrderProduct } from '@heseya/store-core'
const t = useLocalI18n()

defineProps<{
  product: OrderProduct
}>()
</script>

<style lang="scss" scoped>
.account-order-product-view {
  display: flex;
  justify-content: space-between;

  &__container {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    align-items: center;
    flex-wrap: wrap;

    @media ($viewport-12) {
      justify-content: flex-end;
      flex-wrap: nowrap;
      width: 100%;
    }
  }

  &__name {
    width: 66%;

    @media ($viewport-12) {
      justify-content: flex-end;
      width: 100%;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 66%;
    gap: 44px;

    @media ($viewport-12) {
      justify-content: flex-end;
    }
  }
}
</style>
