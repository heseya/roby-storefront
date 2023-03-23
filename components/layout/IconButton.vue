<template>
  <button class="btn">
    <component :is="icon" />
  </button>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

defineProps<{
  icon: FunctionalComponent
}>()
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
  width: 32px;
  height: 32px;

  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
}
</style>
