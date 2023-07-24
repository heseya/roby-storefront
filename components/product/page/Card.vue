<template>
  <div class="product-card">
    <span v-if="title" class="product-card__title">{{ title }}</span>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>
.product-card {
  padding: 25px;
  background-color: $gray-color-100;
  align-self: center;
  width: 100%;
  max-width: 400px;
  width: 100%;

  @media ($viewport-8) {
    align-self: flex-start;
  }

  &__title {
    font-size: rem(20);
    line-height: rem(26);
    font-weight: 500;
    margin-bottom: 16px;
  }
}
</style>
