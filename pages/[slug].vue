<template>
  <BaseContainer>
    <LayoutBreadcrumpsProvider :breadcrumbs="[{ label: page?.name || '', link: route.fullPath }]" />
    <LayoutLoading :active="pending" />
    <div class="page">
      <BaseWysiwygContent :content="page?.content_html" />
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()

const { data: page, pending } = useAsyncData(`page-${route.params.slug}`, async () => {
  try {
    return await heseya.Pages.getOneBySlug(route.params.slug as string)
  } catch (e: any) {
    if (e?.response?.status === 404) showError({ message: t('notFoundError'), statusCode: 404 })
    else showError({ message: e.statusCode, statusCode: 500 })
    return null
  }
})

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.name || '',
  description: () => page.value?.seo?.description || '',
  ogImage: () => page.value?.seo?.og_image?.url || '',
  twitterCard: () => page.value?.seo?.twitter_card || 'summary',
  robots: () => (page.value?.seo?.no_index ? 'no_index' : 'index'),
})
</script>

<style lang="scss" scoped>
.page {
  max-width: $content-width;
  margin: auto;
}
</style>
