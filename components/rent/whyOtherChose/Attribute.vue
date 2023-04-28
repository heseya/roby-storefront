<template>
  <div class="attribute">
    <LayoutIcon class="attribute__icon" :icon="CheckIcon" :size="14" />
    <span class="attribute__text">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import CheckIcon from '@/assets/icons/check-circle.svg?component'

defineProps<{
  text: string
}>()
</script>

<style lang="scss" scoped>
.attribute {
  @include flex-row;
  gap: 8px;
  align-items: center;

  @media ($viewport-9) {
    gap: 20px;
  }

  &__icon {
    flex-shrink: 0;

    @media ($viewport-9) {
      width: 20px;
      height: 20px;
    }
  }

  &__text {
    font-weight: $font-weight-medium;

    @media ($viewport-9) {
      font-size: rem(20);
    }
  }
}
</style>
