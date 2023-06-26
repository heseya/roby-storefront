<template>
  <div
    class="tag"
    :class="[`tag--${type}`, `tag--${size}`, { 'tag--dark-text': isDarkText }]"
    :style="{ backgroundColor: color }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
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

const isDarkText = computed(() => {
  if (!props.color) return false
  const contrast = useContrastColor(props.color)
  return contrast.value === 'dark'
})
</script>

<style lang="scss" scoped>
.tag {
  background-color: var(--primary-color);
  padding: 2px 9px;
  font-size: rem(10);
  text-transform: uppercase;
  margin-bottom: 3px;
  color: #fff;

  &--dark-text {
    color: $text-color;
  }

  &--sale {
    background-color: $green-color-500;
    color: #fff;
    font-size: rem(14);
    font-weight: 500;
  }

  &--big {
    font-size: rem(14);
  }
}
</style>
