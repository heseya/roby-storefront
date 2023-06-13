<template>
  <div class="step-header">
    <div class="step-header__order">{{ order }}</div>
    <LayoutHeader class="step-header__title" variant="black">
      {{ header }}
    </LayoutHeader>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  header: string
  order: number
}>()
</script>

<style lang="scss" scoped>
.step-header {
  @include flex-row;
  gap: 22px;
  align-items: center;

  &__order {
    height: 30px;
    width: 30px;

    flex-shrink: 0;
    @include flex-column;
    justify-content: center;
    align-items: center;
    color: var(--primary-color-alt);
    font-weight: $font-weight-bold;
    border: 1px solid var(--primary-color-alt);
    border-radius: 50%;
    position: relative;

    // This is the only way to lighten css variable in the background without adding a new color
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: var(--primary-color-alt);
      opacity: 0.15;
      z-index: -1;
    }
  }

  &__title {
    font-size: rem(20);
    text-align: left;

    @media ($max-viewport-9) {
      font-size: rem(18);
    }
  }
}
</style>
