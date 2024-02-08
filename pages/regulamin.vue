<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <LayoutLoading :active="pending" />
    <BaseContainer v-if="!pending" class="statute-page">
      <aside class="statute-page__aside">
        <div class="table-of-contents">
          <LayoutHeader class="table-of-contents__title" variant="black">
            {{ t('title') }}
          </LayoutHeader>
          <button
            v-for="(header, index) in headers"
            :key="index"
            class="table-of-contents__item"
            @click="header.scrollIntoView({ behavior: 'smooth', block: 'center' })"
          >
            {{ header.innerText }}
          </button>
        </div>
        <div></div>
      </aside>
      <main ref="content" class="statute-page__content">
        <BaseWysiwygContent :content="page?.content_html" />
      </main>
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Regulamin",
    "notFoundError": "Nie znaleziono treści regulaminu"
  },
  "en": {
    "title": "Statute",
    "notFoundError": "Statute content not found"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const heseya = useHeseya()
const route = useRoute()

const content = ref<HTMLElement>()

useSeoTitle(t('title'))

const breadcrumbs = computed(() => [
  {
    label: t('title'),
    link: route.path,
  },
])

const { data: page, pending } = useAsyncData(`static-regulamin`, async () => {
  try {
    return await heseya.Pages.getOneBySlug(route.path.replace('/', ''))
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

  &__aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: visible;
  }
}

.table-of-contents {
  position: sticky;
  top: 300px;
  width: 300px;
  background-color: $white-color;
  align-self: flex-start;

  @media ($max-viewport-9) {
    display: none;
  }

  &__title {
    display: inline-block;
    margin-bottom: 10px;
  }

  &__item {
    @include reset-button;
    color: $blue-color-500;
    text-align: left;
    font-size: rem(14);
    padding: 5px 0;
    width: 100%;
  }
}
</style>
