<template>
  <Html :lang="i18nHead.htmlAttrs?.lang" :dir="i18nHead.htmlAttrs?.dir">
    <IntegrationEkomiWidget :token="ekomiPopupToken" />

    <LayoutThemeContext>
      <NuxtLoadingIndicator />
      <LazyShopOff v-if="isShopDisabled" />
      <NuxtPage v-else />

      <ClientOnly>
        <LazyCartUnavailableModal />
        <Notifications class="notifications" position="bottom right" />
      </ClientOnly>

      <LazyColorThemePicker v-if="showColorThemePicker" />
    </LayoutThemeContext>
  </Html>
</template>

<script setup lang="ts">
import { useConfigStore } from './store/config'

const { showColorThemePicker, ekomiPopupToken } = usePublicRuntimeConfig()

const config = useConfigStore()
const seo = toRef(config, 'seo')
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})
const title = computed(() => seo.value.title || 'Store')

const isShopDisabled = computed(() => config.storeFrontDisabled)

useSeoMeta({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ${title.value}` : title.value),
})

useSeo(() => [
  {
    description: seo.value.description,
    ogImage: seo.value.og_image?.url,
    twitterCard: seo.value.twitter_card,
    robots: 'index, follow',
  },
])

useHead({
  link: [
    ...(i18nHead.value.link || []),
    { rel: 'icon', type: 'image/x-icon', href: config.faviconUrl },
    ...(seo.value.header_tags?.filter((tag) => tag.type === 'link') || []),
  ],
  meta: [
    ...(i18nHead.value.meta || []),
    ...(seo.value.header_tags?.filter((tag) => tag.type === 'meta') || []),
  ],
  script: [...(seo.value.header_tags?.filter((tag) => tag.type === 'script') || [])],
})

delayedOnMounted(() => {
  const { $enableGtm } = useNuxtApp()
  $enableGtm()
}, 3000)
</script>

<style lang="scss" scoped>
.notifications {
  z-index: 99999999;
}
</style>
