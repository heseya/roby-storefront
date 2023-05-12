<template>
  <div class="site">
    <div class="site__nav">
      <LayoutNav />
    </div>
    <div
      class="site__content"
      :class="{ 'site__content--with-notification': config.env.top_site_text }"
    >
      <div class="site__main">
        <slot></slot>
      </div>

      <LayoutBreadcrumps />
    </div>
    <div class="site__footer">
      <BaseFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from '~/store/config'

const config = useConfigStore()

// TODO load notification without hydration & layout shift problem
// import { useNavNotificationBarStore } from '@/store/navNotificationBar'
//
// const notificationBar = useNavNotificationBarStore()
</script>

<style lang="scss">
.site {
  @include flex-column;
  min-height: 100vh;

  &__content {
    display: flex;
    align-items: strech;

    /**
    * Nuxt renders components "from top to bottom", so this inverts the order to match visually.
    * Page content must render before the breadcrumps on SSR, and this the simples to achieve that.
    * https://github.com/nuxt/nuxt/discussions/18451
    */
    flex-direction: column-reverse;
    justify-content: flex-end;

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

  &__main {
    width: 100%;
  }
}
</style>
