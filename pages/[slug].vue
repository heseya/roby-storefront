<template>
  <BaseContainer>
    <LayoutBreadcrumpsProvider :breadcrumbs="[{ label: page?.name || '', link: route.fullPath }]" />
    <LayoutLoading :active="pending" />
    <div class="page">
      <BaseWysiwygContent :content="page?.content_html" />
    </div>
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Nie znaleziono strony o podanym adresie"
  }
}
</i18n>

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

useSeo(() => [page.value?.seo, { title: page.value?.name }])
</script>

<style lang="scss" scoped>
.page {
  max-width: $content-width;
  margin: auto;
}
</style>
