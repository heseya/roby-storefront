<template>
  <div class="cart-page">
    <div class="cart-page__content">
      <div class="cart-page__cart">
        <h1 class="cart-page__title">
          Koszyk <span class="cart-page__subtext">({{ cart.length }})</span>
        </h1>

        <div class="cart-page__list">
          <CartItem
            v-for="item in cart.items"
            :key="item.id"
            :item="item"
            class="cart-page__item"
          />
        </div>
      </div>

      <div class="cart-page__summary">
        <h2 class="cart-page__title">Podsumowanie</h2>

        <div class="cart-page__summary-box"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'

const cart = useCartStore()
</script>

<style lang="scss" scoped>
.cart-page {
  max-width: $container-width;
  padding: 0 $container-padding;
  margin: 0 auto;

  &__title {
    font-size: rem(26);
    line-height: rem(34);
    font-weight: 600;
    margin-bottom: 16px;

    @media ($max-viewport-10) {
      display: none;
    }
  }

  &__subtext {
    color: $gray-color-600;
    font-weight: 400;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 24px;

    @media ($viewport-10) {
      grid-template-columns: 1fr minmax(auto, 400px);
    }
  }

  &__item {
    padding: 16px 0;

    &:not(:last-child) {
      border-bottom: solid 2px $gray-color-300;
    }
  }

  &__summary-box {
    padding: 16px;
    background-color: $gray-color-100;
  }
}
</style>
