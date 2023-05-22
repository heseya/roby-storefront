<template>
  <LayoutThemeContext>
    <NuxtLoadingIndicator />

    <ShopOff v-if="isShopDisabled" />
    <NuxtPage v-else />

    <ClientOnly>
      <CartUnavailableModal />
      <Notifications class="notifications" position="bottom right" />
    </ClientOnly>

    <LazyColorThemePicker v-if="showColorThemePicker" />
  </LayoutThemeContext>
</template>

<script setup lang="ts">
import { useConfigStore } from './store/config'

const { showColorThemePicker } = usePublicRuntimeConfig()

const config = useConfigStore()
const seo = toRef(config, 'seo')
const title = computed(() => seo.value.title || 'Store')

const isShopDisabled = computed(() => config.storeFrontDisabled)

useSeoMeta({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ${title.value}` : title.value),
  description: () => seo.value.description,
  ogImage: () => seo.value.og_image?.url,
  twitterCard: () => seo.value.twitter_card,
  robots: 'index, follow',
})

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: config.faviconUrl }],
})
</script>

<style lang="scss" scoped>
.notifications {
  z-index: 99999999;
}
</style>
