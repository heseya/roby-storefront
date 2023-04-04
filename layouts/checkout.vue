<template>
  <div class="checkout">
    <div class="checkout__header">
      <div class="checkout__logo">
        <LogoIcon />
      </div>
    </div>
    <div class="checkout__bar">
      <div class="checkout__bar-container">
        <div
          v-for="item of barItems"
          :key="item.name"
          class="checkout__bar-item"
          :class="{ 'checkout__bar-item--active-path': item.value }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="checkout__content"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LogoIcon from '@/assets/icons/logo.svg?component'

interface CheckoutSiteBarItem {
  name: string
  value: boolean
}

const barItems = ref<CheckoutSiteBarItem[]>([
  { name: 'Koszyk', value: true },
  { name: 'Dostawa i płatność', value: true },
  { name: 'Gotowe', value: true },
])
</script>
<style lang="scss">
.checkout {
  min-height: 100vh;
  background: $gray-color-100;
  display: grid;
  grid-template-rows: 0.1fr 0.1fr 1fr;

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

  &__bar-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    @media ($viewport-7) {
      width: 50%;
      margin-top: 0px;
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

    &--active-path {
      &::before,
      &:not(:last-child)::after {
        background-color: $unnamed-color-e1a044;
        border: none;
      }
    }
  }

  &__content {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    @media ($viewport-7) {
      margin-top: 10px;
    }
  }
}
</style>
