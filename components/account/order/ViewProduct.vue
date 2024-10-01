<template>
  <div class="account-order-product-view">
    <div>
      <AccountProductCard :product="product.product" />
    </div>
    <div class="account-order-product-view__container">
      <div class="account-order-product-view__name">{{ product.name }}</div>
      <div class="account-order-product-view__price">
        <div>{{ product.quantity }} {{ t('quantity') }}</div>
        <div class="account-order-product-view__price--price">
          <div class="account-order-product-view__price--price-net">
            {{ formatAmount(getDisplayedPrice(product.price).value, currency) }}
          </div>
          <div
            v-if="getSecondPrice(product.price).value"
            class="account-order-product-view__price--price-gross"
          >
            {{ formatAmount(getSecondPrice(product.price).value ?? 0, currency) }}
            {{ $t('priceType.gross') }}
          </div>
          <div class="account-order-product-view__price--price-gross">
            ({{ Number(product.price.vat_rate) * 100 }}% VAT)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "quantity": "szt."
  },
  "en": {
    "quantity": "pcs."
  }
}
</i18n>

<script setup lang="ts">
import type { OrderProduct } from '@heseya/store-core'
const t = useLocalI18n()
const $t = useGlobalI18n()

const { getDisplayedPrice, getSecondPrice } = useGetDisplayedPrice()

defineProps<{
  product: OrderProduct
  currency: string
}>()
</script>

<style lang="scss" scoped>
.account-order-product-view {
  display: flex;

  @media ($viewport-12) {
    justify-content: space-between;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    @media ($viewport-12) {
      justify-content: flex-end;
      flex-wrap: nowrap;
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
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 66%;

    @media ($viewport-12) {
      width: 40%;
    }
    &--price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      &-gross {
        font-weight: 500;
        font-size: 12px;
        color: #9d9d9d;
      }
    }
  }
}
</style>
