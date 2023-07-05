<template>
  <div class="site">
    <div class="site__nav">
      <LayoutNav />
    </div>
    <div
      class="site__content"
      :class="{
        'site__content--with-notification': config.env.top_site_text,
        'site__content--with-additional-navbar': isAdditionalNavBarVisible,
      }"
    >
      <main class="site__main">
        <slot></slot>
      </main>

      <LayoutBreadcrumps />
    </div>
    <div class="site__footer">
      <BaseFooter />
    </div>
    <BaseCookiesBar />
  </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from '~/store/config'

const config = useConfigStore()
const { locales } = useI18n()

const isAdditionalNavBarVisible = computed(
  () => locales.value.length > 1 || !!config.customRedirect,
)

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
    padding-bottom: 190px;
    transition: padding-top 200ms ease-in-out;

    @media ($max-viewport-12) {
      padding-top: 60px;
      padding-bottom: 100px;
    }

    &--with-notification {
      padding-top: 225px;

      @media ($max-viewport-12) {
        padding-top: 100px;
      }
    }

    &--with-additional-navbar {
      padding-top: 235px;
      padding-bottom: 140px;

      @media ($max-viewport-12) {
        padding-top: 110px;
        padding-bottom: 50px;
      }
    }

    &--with-notification.site__content--with-additional-navbar {
      padding-top: 275px;

      @media ($max-viewport-12) {
        padding-top: 160px;
      }
    }
  }

  &__main {
    width: 100%;
  }
}

.content--no-bottom-padding .site__content {
  padding-bottom: 0;
}
</style>
