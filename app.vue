<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtPage />

    <ClientOnly>
      <Notifications position="bottom right" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from './store/config'

const config = useConfigStore()
const seo = toRef(config, 'seo')
const title = computed(() => seo.value.title || 'Store')

useSeoMeta({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ${title.value}` : title.value),
  description: () => seo.value.description,
  ogImage: () => seo.value.og_image?.url,
  twitterCard: () => seo.value.twitter_card,
})
</script>

<style lang="scss" scoped></style>
