<template>
  <div class="attribute">
    <LayoutIcon class="attribute__icon" :icon="CheckIcon" :size="20" />
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
  gap: 20px;
  align-items: center;

  &__text {
    font-size: rem(20);
    font-weight: $font-weight-medium;
  }
}
</style>
