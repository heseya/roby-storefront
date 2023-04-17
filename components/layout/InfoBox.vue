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
  border: solid 1px var(--primary-color);
  padding: 8px;
  width: 100%;
  color: var(--primary-color);
  margin: 12px 0;
  text-align: center;

  &--danger {
    color: $error-color;
    border-color: $error-color;
  }
}
</style>
