<template>
  <div class="checkout">
    <div class="checkout__header">
      <NuxtLink :to="localePath('/')" class="checkout__logo">
        <img class="checkout__logo-img" :src="config.storeLogoUrl" :alt="config.storeName" />
      </NuxtLink>
    </div>
    <div v-if="activeStep" class="checkout__bar">
      <div class="checkout__bar-container">
        <div class="checkout__bar-item checkout__bar-item--filled">
          {{ $t('cart.title') }}
        </div>
        <div
          class="checkout__bar-item"
          :class="{
            'checkout__bar-item--active': activeStep === CheckoutStep.Checkout,
            'checkout__bar-item--filled': activeStep === CheckoutStep.Finished,
          }"
        >
          {{ t('checkout') }}
        </div>
        <div
          class="checkout__bar-item"
          :class="{ 'checkout__bar-item--filled': activeStep === CheckoutStep.Finished }"
        >
          {{ t('finished') }}
        </div>
      </div>
    </div>
    <div class="checkout__content"><slot /></div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "checkout": "Dostawa i płatność",
    "finished": "Gotowe"
  },
  "en": {
    "checkout": "Delivery and payment",
    "finished": "Finished"
  }
}
</i18n>

<script setup lang="ts">
import { useConfigStore } from '@/store/config'
import { useCartStore } from '@/store/cart'
import { useCheckoutStore } from '~/store/checkout'

// This forces initialisation of the cart store, somehow it's not hydrating state without it
useCartStore()

const route = useRoute()
const config = useConfigStore()
const t = useLocalI18n()
const $t = useGlobalI18n()
const localePath = useLocalePath()
const checkout = useCheckoutStore()

enum CheckoutStep {
  Cart = 'cart',
  Checkout = 'checkout',
  Finished = 'finished',
}

const activeStep = computed(() => {
  if (route.path === localePath('/checkout')) return CheckoutStep.Checkout
  if (route.path === localePath('/checkout/thank-you')) {
    checkout.reset()
    return CheckoutStep.Finished
  }
  return null
})
</script>
<style lang="scss">
.checkout {
  min-height: 100vh;
  background: $gray-color-100;
  display: grid;
  grid-template-rows: auto auto 1fr;

  &__header {
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 16px;
    background-color: $white-color;
    width: 100%;

    @media ($viewport-7) {
      height: 100px;
      grid-gap: 16px;
      grid-template-columns: 1fr 1fr;
      padding-left: 54px;
    }
  }

  &__logo {
    width: 90px;
    height: 20px;

    @media ($viewport-7) {
      width: 160px;
      height: 40px;
    }
  }

  &__logo-img {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__bar-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    @media ($viewport-7) {
      width: 50%;
      margin-top: 0;
    }

    @media ($viewport-13) {
      width: 25%;
    }
  }

  &__bar {
    height: 36px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ($viewport-7) {
      height: 92px;
    }
  }

  &__bar-item {
    position: relative;
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-top: 40px;
    font-size: rem(10);

    @media ($viewport-6) {
      font-size: rem(14);
    }

    &::before {
      background-color: $gray-color-050;
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      border: 3px solid $gray-color-400;
    }

    &:not(:last-child)::after {
      background-color: $gray-color-400;
      content: '';
      height: 2px;
      width: calc(100% - 25px);
      position: absolute;
      top: -18px;
      left: calc(50% + 12px);
      padding-left: 5px;
      padding-right: 5px;
    }

    &--filled {
      &::before,
      &:not(:last-child)::after {
        background-color: var(--primary-color-alt);
        border: none;
      }
    }

    &--active {
      &::before {
        border-color: var(--primary-color-alt);
      }
    }
  }

  &__content {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: 32px;

    @media ($viewport-7) {
      margin-top: 10px;
    }
  }
}
</style>
