<template>
  <div class="info-box" :class="`info-box--${type}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    type: 'info',
  },
)
</script>

<style scoped lang="scss">
.info-box {
  border: solid 1px var(--secondary-color);
  padding: 8px;
  width: 100%;
  color: var(--secondary-color);
  margin: 12px 0;
  text-align: center;

  &--danger {
    color: var(--error-color);
    border-color: var(--error-color);
  }

  &--info {
    color: $blue-color-500;
    border-color: $blue-color-500;
  }
}
</style>
