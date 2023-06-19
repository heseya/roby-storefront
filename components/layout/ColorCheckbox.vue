<template>
  <div class="color-checkbox" :class="{ 'color-checkbox--active': isChecked }" />
</template>

<script lang="ts" setup>
defineProps<{
  isChecked: boolean
}>()
</script>

<style lang="scss" scoped>
.color-checkbox {
  flex-shrink: 0;
  height: 16px;
  width: 16px;

  border-radius: 50%;
  background-color: $white-color;
  box-shadow: 0 0 0 1px $gray-color-400;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: $gray-color-100;
    cursor: pointer;
  }

  &--active {
    border: 4px solid $white-color;
    box-shadow: 0 0 0 1px var(--primary-color-alt);
    background-color: var(--primary-color-alt);

    &:hover {
      border-color: var(--primary-color);
      background-color: var(--primary-color-alt);
    }
  }
}
</style>
