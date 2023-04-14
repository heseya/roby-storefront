<template>
  <BaseContainer class="categories-page">
    <ProductListPage
      :title="route.params.slug"
      :sets="[route.query.set]"
      :query-params="{ name: route.params.slug }"
    />
  </BaseContainer>
</template>

<script setup lang="ts">
const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()

const preparedQuery = route.query.set ?? 'all'

const { data: category } = useAsyncData(`category-${preparedQuery}`, async () => {
  try {
    const category = await heseya.ProductSets.getOneBySlug(preparedQuery as string)

    if (!category) showError({ message: t('notFoundError'), statusCode: 404 })

    return category
  } catch (e: any) {
    if (e?.response?.status === 404) {
      showError({ message: t('notFoundError'), statusCode: 404 })
      return null
    }

    showError({ message: e.message, statusCode: 500 })
    return null
  }
})

useHead({
  title: category.value?.name,
})

useBreadcrumbs([
  category.value?.parent
    ? {
        label: category.value?.parent?.name || '',
        link: `/category/${category.value?.parent?.slug}`,
      }
    : null,
  {
    label: category.value?.name || '',
    link: `/category/${category.value?.slug}`,
  },
])
</script>

<style lang="scss" scoped>
.categories-page {
}
</style>
