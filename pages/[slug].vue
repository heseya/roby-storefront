<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer>
      <LayoutLoading :active="pending" />
      <div class="page">
        <BaseWysiwygContent :content="page?.content_html" />
      </div>
    </BaseContainer>
  </NuxtLayout>
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
    const page = await heseya.Pages.getOneBySlug(route.params.slug as string)
    return page
  } catch (e: any) {
    if (e?.response?.status === 404) showError({ message: t('notFoundError'), statusCode: 404 })
    else showError({ message: e.statusCode, statusCode: 500 })
    return null
  }
})

useSeo(() => [page.value?.seo, { title: page.value?.name }])

const breadcrumbs = computed(() => [
  { label: page.value?.name || '', link: `/${page.value?.slug}` },
])
</script>

<style lang="scss" scoped>
.page {
  max-width: $content-width;
  margin: auto;
}
</style>
