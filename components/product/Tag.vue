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
  const [red, green, blue] = props.color // Hex color e.g. #ff0000
    .replace('#', '')
    .match(/.{1,2}/g)
    ?.map((x) => parseInt(x, 16)) || [0, 0, 0]

  // Formula from https://stackoverflow.com/a/3943023
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186
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
    background-color: $green-color;
    color: #fff;
    font-size: rem(14);
    font-weight: 500;
  }
}
</style>
