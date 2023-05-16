<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtPage />

    <ClientOnly>
      <CartUnavailableModal />
      <Notifications class="notifications" position="bottom right" />
    </ClientOnly>

    <LazyColorThemePicker v-if="showColorThemePicker" />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from './store/config'

const { showColorThemePicker } = usePublicRuntimeConfig()

const config = useConfigStore()
const seo = toRef(config, 'seo')
const title = computed(() => seo.value.title || 'Store')

const { primary_color, secondary_color, primary_color_alt, error_color } = useConfigStore().env

document.documentElement.style.setProperty('--primary-color', primary_color as string)
document.documentElement.style.setProperty('--primary-color-alt', primary_color_alt as string)
document.documentElement.style.setProperty('--secondary-color', secondary_color as string)
document.documentElement.style.setProperty('--error_color', error_color as string)

useSeoMeta({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ${title.value}` : title.value),
  description: () => seo.value.description,
  ogImage: () => seo.value.og_image?.url,
  twitterCard: () => seo.value.twitter_card,
  robots: 'index, follow',
})
</script>

<style lang="scss" scoped>
.notifications {
  z-index: 99999999;
}
</style>
