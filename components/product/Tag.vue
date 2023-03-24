<template>
  <div class="tag" :class="[`tag--${type}`, `tag--${size}`]" :style="{ backgroundColor: color }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string
    type?: 'default' | 'sale'
    size?: 'default' | 'big'
  }>(),
  {
    color: '',
    type: 'default',
    size: 'default',
  },
)
</script>

<style lang="scss" scoped>
.tag {
  background-color: var(--secondary-color);
  padding: 2px 9px;
  font-size: rem(10);
  text-transform: uppercase;
  margin-bottom: 3px;

  &--sale {
    background-color: $green-color;
    color: #fff;
    font-size: rem(14);
    font-weight: 500;
  }
}
</style>
