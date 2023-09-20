<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer class="categories-page">
      <ProductListPage
        :title="category?.name"
        :sets="[route.params.slug as string]"
        :default-sort="`set.${route.params.slug}`"
      >
        <template #aside>
          <SubcategoriesLinks v-if="category" :category="category" />
        </template>
      </ProductListPage>

      <BaseWysiwygContent
        v-show="!!category?.description_html"
        class="categories-page__description"
        :content="category?.description_html"
      />
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Podana kategoria nie istnieje"
  },
  "en": {
    "notFoundError": "The specified category doesnt exist"
  }
}
</i18n>

<script setup lang="ts">
import { HeseyaEvent } from '@heseya/store-core'

const heseya = useHeseya()
const route = useRoute()
const t = useLocalI18n()

const { data: category } = useAsyncData(`category-${route.params.slug}`, async () => {
  try {
    const category = await heseya.ProductSets.getOneBySlug(route.params.slug as string)

    if (!category) showError({ message: t('notFoundError'), statusCode: 404 })

    return category
  } catch (e: any) {
    if (e?.response?.status === 404 || e?.response?.status === 406) {
      showError({ message: t('notFoundError'), statusCode: e?.response?.status })
      return null
    }

    showError({ message: e.message, statusCode: 500 })
    return null
  }
})

useSeo(() => [category.value?.seo, { title: category.value?.name }])

delayedOnMounted(() => {
  const ev = useHeseyaEventBus()
  ev.emit(HeseyaEvent.ViewContent, {
    contentType: 'product-set',
    contentId: category.value?.id,
    contentName: category.value?.name,
  })
})

const breadcrumbs = computed(() => [
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
  &__description {
    margin-top: 32px;
  }
}
</style>
