<template>
  <div>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer>
      <article class="page">
        <h1 class="page__title">{{ page.name }}</h1>
        <BaseWysiwygContent :content="page?.content_html" />
      </article>
    </BaseContainer>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "notFoundError": "Nie znaleziono strony o podanym adresie"
  },
  "en": {
    "notFoundError": "The page with the given address was not found"
  }
}
</i18n>

<script setup lang="ts">
import type { Page } from '@heseya/store-core'

const props = defineProps<{
  page: Page
}>()

useSeo(() => [props.page?.seo, { title: props.page?.name }])

usePageJsonLd(props.page)

const breadcrumbs = computed(() => [
  { label: props.page?.name || '', link: `/${props.page?.slug}` },
])
</script>

<style lang="scss" scoped>
.page {
  max-width: $container-width;
  margin: auto;

  &__title {
    font-size: rem(26);
    line-height: rem(34);
    margin-bottom: 24px;
  }
}
</style>
