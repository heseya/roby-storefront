<template>
  <div class="cart-item">
    <Media width="120" class="cart-item__cover" :media="item.coverMedia" />

    <div class="cart-item__content">
      <div class="cart-item__name">{{ item.name }}</div>

      <div class="cart-item__quantity">
        Ilość
        <FormSelect name="quantity" :model-value="item.qty">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
        </FormSelect>
      </div>

      <div class="cart-item__price">{{ formatAmount(item.price) }}</div>
    </div>

    <div class="cart-item__actions">
      <button class="cart-item__btn">
        <CrossIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItem } from '@heseya/store-core'
import CrossIcon from '@/assets/icons/cross.svg?component'

defineProps<{
  item: CartItem
}>()
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-gap: 20px;

  &__cover {
    width: 100px;
    height: 100px;
    border: solid 1px $gray-color-300;

    @media ($viewport-8) {
      width: 120px;
      height: 120px;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: start;
    grid-gap: 8px;

    @media ($viewport-8) {
      grid-template-columns: 3fr auto 1fr;
      grid-gap: 20px;
    }
  }

  &__name {
    font-weight: 600;
    font-size: rem(16);
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  &__price {
    font-weight: 600;
    font-size: rem(16);

    @media ($viewport-8) {
      margin-left: auto;
    }
  }

  &__btn {
    all: unset;
    cursor: pointer;
  }
}
</style>
