<template>
  <div class="account-order-details-box">
    <div class="account-order-details-box__header">{{ header }}</div>
    <div class="account-order-details-box__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  header: string
}>()
</script>

<style lang="scss" scoped>
.account-order-details-box {
  margin-bottom: 20px;

  &__header {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
  }

  &__content {
    font-size: 12px;
  }
}
</style>
