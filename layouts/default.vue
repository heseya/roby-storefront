<template>
  <div class="site">
    <div class="site__nav">
      <LayoutNav />
    </div>
    <div
      class="site__content"
      :class="{ 'site__content--with-notification': notificationBar.isOpen }"
    >
      <LayoutBreadcrumps />
      <slot></slot>
    </div>
    <div class="site__footer">
      <BaseFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNotificationBarStore } from '@/store/notificationBar'

const notificationBar = useNotificationBarStore()
</script>

<style lang="scss">
.site {
  @include flex-column;
  min-height: 100vh;

  &__content {
    flex: 1;
    padding-top: 185px;
    padding-bottom: 100px;
    transition: padding-top 200ms ease-in-out;

    @media ($max-viewport-12) {
      padding-top: 60px;
      padding-bottom: 70px;
    }

    &--with-notification {
      padding-top: 225px;

      @media ($max-viewport-12) {
        padding-top: 100px;
      }
    }
  }
}
</style>
