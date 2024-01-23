<template>
  <Html :lang="i18nHead.htmlAttrs?.lang" :dir="i18nHead.htmlAttrs?.dir">
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
  </Html>
</template>

<script setup lang="ts">
import { useConfigStore } from './store/config'

const { showColorThemePicker } = usePublicRuntimeConfig()

const config = useConfigStore()
const runtimeConfig = usePublicRuntimeConfig()
const seo = toRef(config, 'seo')
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

const title = computed(() => seo.value.title || 'Store')
const isShopDisabled = computed(() => config.storeFrontDisabled)
const isProduction = computed(() => ['true', '1', 1, true].includes(runtimeConfig.production))

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
    { rel: 'preconnect', href: runtimeConfig.apiUrl },
    { rel: 'dns-prefetch', href: runtimeConfig.apiUrl },
    { rel: 'preconnect', href: runtimeConfig.cdnUrl },
    { rel: 'dns-prefetch', href: runtimeConfig.cdnUrl },
    { rel: 'preconnect', href: runtimeConfig.directusUrl },
    { rel: 'dns-prefetch', href: runtimeConfig.directusUrl },
    { rel: 'icon', type: 'image/x-icon', href: config.faviconUrl },
    ...(i18nHead.value.link || []),
    ...(seo.value.header_tags?.filter((tag) => tag.type === 'link') || []),
  ],
  meta: [
    {
      hid: isProduction.value ? 'robots' : 'force-robots',
      name: 'robots',
      content: isProduction.value ? 'index, follow' : 'noindex, nofollow',
    },
    {
      hid: 'google-site-verification',
      name: 'google-site-verification',
      content: runtimeConfig.googleSiteVerification,
    },
    ...(i18nHead.value.meta || []),
    ...(seo.value.header_tags?.filter((tag) => tag.type === 'meta') || []),
  ],
  script: [...(seo.value.header_tags?.filter((tag) => tag.type === 'script') || [])],
})
</script>

<style lang="scss" scoped>
.notifications {
  z-index: 99999999;
}
</style>
