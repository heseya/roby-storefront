<template>
  <div class="bar__notification">
    <span class="notification__title"
      >Złóż zamówienie do 19.12, 18:00, aby prezenty trafiły pod choinkę na czas!</span
    >
    <LayoutIconButton class="notification__button" :icon="Close" />
  </div>
</template>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'
</script>

<style lang="scss" scoped>
.bar {
  &__notification {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    color: $white-color;
    background-color: $primary-color;
  }
}

.notification {
  &__title {
    flex: 1;
  }

  &__button {
    height: 40px;
    width: 40px;
    color: $white-color;
  }
}
</style>
