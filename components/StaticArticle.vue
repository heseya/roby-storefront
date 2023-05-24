<template>
  <div>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer>
      <div class="page">
        <h1 class="page__title">{{ page.name }}</h1>
        <BaseWysiwygContent :content="page?.content_html" />
      </div>
    </BaseContainer>
  </div>
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

  &__title {
    font-size: rem(26);
    line-height: rem(34);
    margin-bottom: 24px;
  }
}
</style>
