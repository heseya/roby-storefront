<template>
  <div class="checkout-page-area">
    <h2 v-if="title" class="checkout-page-area__title">{{ title }}</h2>
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
    description?: string
    placeholderHeight?: number
  }>(),
  {
    title: '',
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

  &__placeholder {
    width: 100%;
    height: 80px;
  }
}
</style>
