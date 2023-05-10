<template>
  <div class="account-order-details-container">
    <div class="account-order-details-container__header">{{ header }}</div>
    <div class="account-order-details-container__content">
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
.account-order-details-container {
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
