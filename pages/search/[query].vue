<template>
  <BaseContainer>
    <ProductListPage :title="query" :sets="preparedSets" :query-params="{ search: query }" />
  </BaseContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const t = useLocalI18n()

const { query } = route.params
const { set } = route.query
const preparedSets = computed(() => {
  if (!set) {
    return
  }

  return Array.isArray(set) ? set : [set]
})

useHead({
  title: query,
})

useBreadcrumbs([
  {
    label: query,
    link: ``,
  },
])
</script>

<style lang="scss" scoped></style>
