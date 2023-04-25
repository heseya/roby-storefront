<template>
  <nuxt-link :to="link" class="blog-tag">
    <div class="blog-tag__tag">
      {{ name }}
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  link: string
  name: string
}>()
</script>

<style lang="scss" scoped>
.blog-tag {
  text-decoration: none;
  color: $text-color;

  &__tag {
    border: 1px solid $gray-color-300;
    padding: 10px 14px;
    border-radius: 5px;
    transition: 0.2s;

    &:hover {
      border: 1px solid var(--primary-color);
    }
  }

  &--active {
    .blog-tag__tag {
      border: 1px solid var(--primary-color);
    }
  }
}
</style>
