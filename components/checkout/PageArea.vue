<template>
  <div class="checkout-page-area">
    <div class="checkout-page-area__header">
      <h2 v-if="title" class="checkout-page-area__title">{{ title }}</h2>
      <div v-if="shortInfo" class="checkout-page-area__short-info">{{ shortInfo }}</div>
    </div>
    <div v-if="description">{{ description }}</div>
    <ClientOnly>
      <slot></slot>
      <template #placeholder>
        <div class="checkout-page-area__placeholder" :style="`height: ${placeholderHeight}px`" />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string
    shortInfo?: string
    description?: string
    placeholderHeight?: number
  }>(),
  {
    title: '',
    shortInfo: '',
    description: '',
    placeholderHeight: 80,
  },
)
</script>

<style lang="scss" scoped>
.checkout-page-area {
  padding: 16px;
  background-color: #fff;
  position: relative;

  &__title {
    font-size: rem(18);
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 16px;

    &--slim {
      font-weight: 400;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__short-info {
    text-align: right;
    color: #9d9d9d;
    font-size: rem(12);
  }

  &__placeholder {
    width: 100%;
    height: 80px;
  }
}
</style>
