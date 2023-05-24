<template>
  <nuxt-link :to="link" class="blog-tag">
    <slot />
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  link: string
}>()
</script>

<style lang="scss" scoped>
.blog-tag {
  text-decoration: none;
  display: block;
  color: $text-color;
  border: 1px solid $gray-color-300;
  padding: 10px 14px;
  border-radius: 5px;
  transition: 0.2s;
  white-space: nowrap;

  &--active,
  &:hover {
    border: 1px solid var(--secondary-color);
  }
}
</style>
