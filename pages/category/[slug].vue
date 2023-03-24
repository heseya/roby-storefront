<template>
  <div class="categories-page">
    <ProductListPage :title="category?.name" :sets="[route.params.slug as string]">
      <template #aside>
        <SubcategoriesLinks v-if="category" :category="category" />
      </template>
    </ProductListPage>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Podany produkt nie istnieje"
  }
}
</i18n>

<script setup lang="ts">
const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()

const { data: category } = useAsyncData('category', async () => {
  try {
    const category = await heseya.ProductSets.getOneBySlug(route.params.slug as string)

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
</script>

<style lang="scss" scoped>
.categories-page {
}
</style>