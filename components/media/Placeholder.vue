<template>
  <div :class="`hs-placeholder ${placeholderClassName}`">
    <slot name="default">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#8d8d8d">
        <path
          d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm2.15-15.7 8.6-8.6 8.5 8.5 8.55-8.55 2.2 2.2V9H9v15.15ZM9 39h30V24.1l-2.2-2.2-8.55 8.55-8.5-8.5-8.6 8.6L9 28.4V39Zm0 0V24.1v3V9v30Z"
        />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  placeholderClassName?: string
}>()
</script>

<style lang="scss" scoped>
.hs-placeholder {
  width: 100%;
  height: 100%;
  display: grid !important;
  place-items: center;
}
</style>
