<template>
  <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

  <BaseContainer>
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
import { Page } from '@heseya/store-core'

const props = defineProps<{
  page: Page
}>()

useSeo(() => [props.page?.seo, { title: props.page?.name }])

const breadcrumbs = computed(() => [
  { label: props.page?.name || '', link: `/${props.page?.slug}` },
])
</script>

<style lang="scss" scoped>
.page {
  max-width: $content-width;
  margin: auto;
}
</style>
