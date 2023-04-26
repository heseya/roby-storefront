<template>
  <div class="account-layout">
    <div class="account-layout__content">
      <div class="account-layout__header">
        <slot name="header"></slot>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.account-layout {
  &__header {
    font-weight: bold;
    font-size: 22px;

    @media ($viewport-11) {
      font-size: 26px;
    }
  }

  &__content {
    display: grid;
    gap: 5px;
    margin: 0px 20px;
  }
}
</style>
