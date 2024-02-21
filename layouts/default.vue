<template>
  <div class="site">
    <div class="site__nav">
      <LazyLayoutNav />
    </div>
    <div
      class="site__content"
      :class="{
        'site__content--with-notification': config.topSiteText,
        'site__content--with-additional-navbar': isAdditionalNavBarVisible,
      }"
    >
      <main class="site__main">
        <slot></slot>
      </main>

      <LazyLayoutBreadcrumps />
    </div>

    <ClientOnly>
      <div class="site__footer">
        <LazyNewsletterForm />
        <LazyBaseFooter />
      </div>
    </ClientOnly>
    <LazyBaseCookiesBar v-if="isShowCookies" />
  </div>
</template>

<script lang="ts" setup>
import { useChannelsStore } from '~/store/channels'
import { useConfigStore } from '~/store/config'

const config = useConfigStore()
const channels = useChannelsStore()
const { locales } = useI18n()
const isShowCookies = ref(false)

const isAdditionalNavBarVisible = computed(
  () => locales.value.length > 1 || !!config.customRedirect || channels.channels.length > 1,
)

delayedOnMounted(() => {
  isShowCookies.value = true
}, 5000)
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
    padding-bottom: 32px;
    transition: padding-top 200ms ease-in-out;

    @media ($max-viewport-12) {
      padding-top: 60px;
      padding-bottom: 32px;
    }

    &--with-notification {
      padding-top: 225px;

      @media ($max-viewport-12) {
        padding-top: 100px;
      }
    }

    &--with-additional-navbar {
      padding-top: 235px;

      @media ($max-viewport-12) {
        padding-top: 110px;
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
