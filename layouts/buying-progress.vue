<template>
  <div class="buying-progress-site">
    <div class="buying-progress-site__header">
      <div class="buying-progress-site__logo">
        <LogoIcon />
      </div>
    </div>
    <div class="buying-progress-site__bar">
      <div class="buying-progress-site__bar-container">
        <div
          v-for="item of barItems"
          :key="item.name"
          class="buying-progress-site__bar-item"
          :class="item.value ? 'active-path' : 'not-active-path'"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="buying-progress-site__content"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LogoIcon from '@/assets/icons/logo.svg?component'

interface BuyingProgressSiteBarItem {
  name: string
  value: boolean
}

const barItems = ref<BuyingProgressSiteBarItem[]>([
  { name: 'Koszyk', value: true },
  { name: 'Dostawa i płatność', value: true },
  { name: 'Gotowe', value: true },
])
</script>
<style lang="scss">
.buying-progress-site {
  min-height: 100vh;
  background: #f7f7f7;

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
  }

  &__content {
    display: flex;
    justify-content: center;
  }

  .active-path::before,
  .active-path:not(:last-child)::after {
    background-color: #e1a044;
  }

  .not-active-path::before,
  .not-active-path:not(:last-child)::after {
    background-color: #a7a7a7;
  }
}
</style>
