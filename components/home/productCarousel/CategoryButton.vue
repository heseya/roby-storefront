<template>
  <button class="category-btn" :class="{ 'category-btn--chosen': isChosen }">
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  isChosen?: boolean
  label: string
}>()
</script>

<style lang="scss" scoped>
.category-btn {
  all: unset;
  padding: 6px 0;

  font-family: var(--text-font-family, $textFont);
  font-size: rem(14);

  border-bottom: 2px solid transparent;
  transition:
    border-bottom-color 200ms ease-in-out,
    color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    border-bottom-color: $gray-color-900;
  }

  &--chosen {
    color: var(--highlight-color);
    border-bottom-color: var(--highlight-color);

    &:hover {
      border-bottom-color: var(--highlight-color);
    }
  }
}
</style>
