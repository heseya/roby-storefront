<template>
  <div v-show="notificationBar.isOpen" class="notification">
    <span class="notification__title">{{ notificationBar.notification }}</span>
    <LayoutIconButton
      class="notification__button"
      :icon="Close"
      icon-size="sm"
      @click="notificationBar.closeNotification"
    />
  </div>
</template>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'
import { useConfigStore } from '@/store/config'
import { useNotificationBarStore } from '@/store/notificationBar'

const config = useConfigStore()
const notificationBar = useNotificationBarStore()

onMounted(() => notificationBar.setIfNewNotification(config.env.top_site_text as string))

watch(
  () => config.env.top_site_text,
  () => notificationBar.setIfNewNotification(config.env.top_site_text as string),
  { deep: true },
)
</script>

<style lang="scss" scoped>
.notification {
  @include flex-row;
  justify-content: space-between;
  align-items: center;
  color: $white-color;
  background-color: var(--primary-color);
  font-size: rem(12);

  @media ($viewport-6) {
    font-size: 1rem;
  }

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
