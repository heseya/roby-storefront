<template>
  <div class="checkout-summary">
    <div v-for="item in cart.items" :key="item.id" class="checkout-summary-item">
      <span class="checkout-summary-item__text">
        <span class="primary-text">{{ item.qty }}x</span> {{ item.name }}
      </span>
      <span class="checkout-summary-item__text">{{ formatAmount(item.totalPrice) }}</span>
    </div>

    <div class="checkout-summary-item">
      <span class="checkout-summary-item__text checkout-summary-item__text--green">
        {{ t('summary.discount') }}
      </span>
      <span class="checkout-summary-item__text checkout-summary-item__text--green">
        {{ formatAmount(-cart.totalDiscountValue) }}
      </span>
    </div>

    <div class="checkout-summary-item">
      <span class="checkout-summary-item__text">{{ t('summary.shipping') }}</span>
      <span class="checkout-summary-item__text"> {{ formatAmount(cart.shippingPrice) }} </span>
    </div>

    <hr class="checkout-summary__hr hr" />

    <div class="checkout-summary-item">
      <span class="checkout-summary-item__text">{{ t('summary.total') }}</span>
      <span class="checkout-summary-item__text checkout-summary-item__text--big">
        {{ formatAmount(cart.totalValue) }}
      </span>
    </div>

    <LayoutButton variant="primary" class="cart-summary__button" disabled>
      {{ t('summary.submit') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "summary": {
      "discount": "Oszczędzasz",
      "shipping": "Dostawa",
      "total": "Łączna kwota",
      "submit": "Potwierdzam i płacę"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useCartStore } from '~~/store/cart'

const t = useLocalI18n()
const cart = useCartStore()
</script>

<style lang="scss" scoped>
.checkout-summary {
  display: flex;
  flex-direction: column;

  &__hr {
    border-top-width: 2px;
    margin-top: 8px;
  }
}

.checkout-summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;

  &__text {
    &--big {
      font-size: rem(20);
      font-weight: 600;
      color: var(--primary-color);
    }

    &--green {
      color: $green-color;
      font-weight: 500;
    }
  }
}
</style>
