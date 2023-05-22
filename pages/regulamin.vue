<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumb" />
    <LayoutLoading :active="pending" />
    <BaseContainer v-if="!pending" class="statute-page">
      <div>
        <div class="statute-page__contents-container">
          <LayoutHeader class="statute-page__title" variant="black">{{
            t('statute')
          }}</LayoutHeader>
          <button
            v-for="(header, index) in headers"
            :key="index"
            class="statute-page__content"
            @click="header.scrollIntoView({ behavior: 'smooth', block: 'center' })"
          >
            {{ header.innerText }}
          </button>
        </div>
      </div>
      <div ref="content">
        <BaseWysiwygContent :content="page?.content_html" />
      </div>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "statute": "Regulamin",
    "notFoundError": "Nie znaleziono treści regulaminu"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const heseya = useHeseya()

const content = ref<HTMLElement>()

useSeoMeta({
  title: () => t('statute'),
})

const breadcrumb = [
  {
    label: 'Regulamin',
    link: '/regulamin',
  },
]

const { data: page, pending } = useAsyncData(`static-regulamin`, async () => {
  try {
    return await heseya.Pages.getOneBySlug('regulamin')
  } catch (e: any) {
    if (e?.response?.status !== 404) {
      showError({ message: e.statusCode, statusCode: 500 })
      return null
    }
    showError({ message: t('notFoundError'), statusCode: 404 })
    return null
  }
})

const headers: ComputedRef<HTMLHeadingElement[]> = computed(() => {
  if (!content.value) {
    return []
  }
  return [...content.value.getElementsByTagName('h2')]
})
</script>

<style lang="scss" scoped>
.statute-page {
  display: grid;
  column-gap: 38px;
  grid-template-columns: 300px 1fr;

  @media ($max-viewport-9) {
    grid-template-columns: 1fr;
  }

  &__contents-container {
    position: fixed;
    width: 300px;
    background-color: $white-color;
    @media ($max-viewport-9) {
      display: none;
    }
  }

  &__content {
    @include reset-button;
    color: $blue-color;
    text-align: left;
    font-size: rem(14);
    padding: 5px 0;
    width: 100%;
  }

  &__title {
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>
