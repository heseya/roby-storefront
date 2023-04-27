<template>
  <BaseContainer>
    <LayoutLoading :active="pending" />
    <div class="page">
      <div class="hs-html-content" v-html="page.content_html"></div>
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

useBreadcrumbs([{ label: page.value?.name || '', link: route.fullPath }])

useHead({
  title: computed(() => page.value?.seo.title || page.value?.name || ''),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: computed(() => page.value?.seo.description || ''),
    },
  ],
})
</script>

<style lang="scss" scoped>
.page {
  max-width: $content-width;
  margin: auto;
}
</style>
