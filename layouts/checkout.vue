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
  { name: 'Gotowe', value: false },
])
</script>
<style lang="scss">
.checkout {
  min-height: 100vh;
  background: $gray-color-100;

  &__header {
    height: 100px;
    background-color: #ffffff;
    padding-left: 54px;
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 160px;
    height: 40px;
  }

  &__bar-container {
    width: 21%;
    display: flex;
    justify-content: space-between;
  }

  &__bar {
    height: 92px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__bar-item {
    position: relative;
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-top: 40px;

    &::before,
    &:not(:last-child)::after {
      background-color: #a7a7a7;
    }

    &::before {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
    }

    &:not(:last-child)::after {
      content: '';
      height: 3px;
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
        background-color: #e1a044;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: center;
  }
}
</style>
