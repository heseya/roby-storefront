<template>
  <BaseContainer>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <ProductListPage
      :title="t('searchResultFor') + route.params.query"
      :sets="preparedSets"
      :query-params="{ search: route.params.query }"
    />
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "searchResultFor": "Wyniki wyszukiwania dla: ",
    "searchResult": "Wyniki wyszukiwania"
  }
}
</i18n>

<script setup lang="ts">
const route = useRoute()
const t = useLocalI18n()

const preparedSets = computed(() => {
  if (!route.query.set) return
  return (Array.isArray(route.query.set) ? route.query.set : [route.query.set]) as string[]
})

useHead({
  title: t('searchResult'),
})

const breadcrumbs = computed(() => [
  {
    label: t('searchResultFor') + route.params.query,
    link: ``,
  },
])
</script>

<style lang="scss" scoped></style>
