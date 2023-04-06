<template>
  <div v-show="isOpenNotification && notification" class="notification">
    <span class="notification__title">{{ notification }}</span>
    <LayoutIconButton
      class="notification__button"
      :icon="Close"
      iconSize="sm"
      @click="isOpenNotification = false"
    />
  </div>
</template>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'

const isOpenNotification = ref(true)

defineProps<{ notification?: string }>()
</script>

<style lang="scss" scoped>
.notification {
  @include flex-row;
  justify-content: space-between;
  align-items: center;

  color: $white-color;
  background-color: var(--primary-color);

  &__title {
    flex: 1;
    text-align: center;
  }

  &__button {
    height: 40px;
    width: 40px;
    color: $white-color;
  }
}
</style>
