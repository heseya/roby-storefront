<template>
  <div
    class="loading"
    :class="{ 'loading--active': active, 'loading--additional-blur': additionalBlur }"
  >
    <div class="loading__loader"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ active: boolean; additionalBlur?: boolean }>(), {
  active: false,
  additionalBlur: false,
})
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s;
  background-color: rgba($gray-color-300, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 8px;

  &--active {
    opacity: 1;
    visibility: visible;
  }

  &--additional-blur {
    backdrop-filter: blur(15px);
  }

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: solid 4px var(--secondary-color);
    border-top-color: $transparent;
    animation: spin 0.6s ease-in-out infinite;
  }
}
</style>
