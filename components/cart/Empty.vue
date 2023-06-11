<template>
  <div class="cart-empty">
    <div class="cart-empty__row">
      <LayoutIcon class="cart-empty__icon" :icon="CartIcon" :size="24" />
      <span class="cart-empty__text">{{ $t('cart.empty') }}</span>
    </div>

    <NuxtLink to="/">
      <LayoutButton class="cart-empty__btn">{{ t('btn') }}</LayoutButton>
    </NuxtLink>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "btn": "Wróć do sklepu"
  },
  "en": {
    "btn": "Back to the shop"
  }
}
</i18n>

<script setup lang="ts">
import CartIcon from '@/assets/icons/shopping.svg?component'

const t = useLocalI18n()
const $t = useGlobalI18n()
</script>

<style lang="scss" scoped>
.cart-empty {
  max-width: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;

  &__row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  }

  &__text {
    display: block;
    margin-left: 8px;
  }

  &__icon {
    color: $gray-color-600;
  }

  &__btn {
    width: 100%;
  }
}
</style>
