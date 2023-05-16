<template>
  <div :style="colorStyles">
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

const { env } = useConfigStore()

const colorStyles = computed(
  () =>
    `--primary-color: ${env.primary_color};
    --secondary-color: ${env.secondary_color};
    --primary-color-alt: ${env.primary_color_alt};
    --error_color: ${env.error_color};`,
)

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
