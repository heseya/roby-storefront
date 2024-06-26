<template>
  <div class="product-list-page">
    <LayoutLoading :active="pending" />

    <header class="product-list-page__header">
      <h1 class="product-list-page__title">
        {{ title }}
        <span class="product-list-page__quantity"> ({{ products?.pagination.total }}) </span>
      </h1>

      <slot name="header"></slot>

      <div class="product-list-page__header-content">
        <button class="product-list-page__aside-btn" @click="isAsideOpen = true">
          {{ asideOpenText || t('openAside') }}
        </button>

        <ProductSortSelect
          hide-label
          :model-value="String(route.query.sort)"
          @update:model-value="(newSort) => changeRouteQuery({ sort: newSort })"
        />
      </div>
    </header>

    <div class="product-list-page__content">
      <aside class="product-list-page__aside">
        <slot name="aside"></slot>

        <hr v-if="isAsideSection" class="hr" />

        <ProductFilters
          :filters="route.query"
          :sets="sets"
          @update:filters="(query) => changeRouteQuery(query)"
        />
      </aside>

      <div v-if="products?.data.length">
        <main class="product-list-page__grid">
          <ProductMiniature v-for="product in products.data" :key="product.id" :product="product" />
        </main>

        <div class="product-list-page__footer">
          <PaginationPerPageSelect
            :model-value="perPage"
            class="product-list-page__per-page-select"
            @update:model-value="(quantity) => changeRouteQuery({ per_page: quantity })"
          />
          <Pagination
            class="product-list-page__pagination"
            :current="products?.pagination.currentPage"
            :total="products?.pagination.lastPage"
            @go="(page) => changeRouteQuery({ page })"
          />
        </div>
      </div>

      <template v-else-if="pending">
        <main class="product-list-page__grid">
          <div class="product-list-page__placeholder"></div>
          <div class="product-list-page__placeholder"></div>
          <div class="product-list-page__placeholder"></div>
          <div class="product-list-page__placeholder"></div>
          <div class="product-list-page__placeholder"></div>
        </main>
      </template>

      <LayoutEmpty v-else> {{ t('empty') }} </LayoutEmpty>
    </div>

    <LayoutModal v-model:open="isAsideOpen">
      <div class="product-list-page__aside-modal">
        <ProductFilters
          hide-sort
          :sets="sets"
          :filters="route.query"
          @update:filters="(query) => changeRouteQuery(query)"
        />
        <LayoutButton class="product-list-page__aside-modal-btn" @click="isAsideOpen = false">
          {{ t('useFilters') }}
        </LayoutButton>
      </div>
    </LayoutModal>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "openAside": "Rozwiń filtry",
    "useFilters": "Zastosuj filtry",
    "empty": "Nie znaleziono produktów spełniających podane kryteria"
  },
  "en": {
    "openAside": "Expand filters",
    "useFilters": "Apply filters",
    "empty": "No products were found matching your criteria"
  }
}
</i18n>

<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const route = useRoute()
const t = useLocalI18n()

const { get: getProducts } = useHeseyaProducts()
const config = useConfigStore()
const slots = useSlots()

const props = withDefaults(
  defineProps<{
    title?: string
    asideOpenText?: string
    queryParams?: Record<string, any>
    defaultSort?: string
    sets?: string[]
  }>(),
  {
    title: '',
    asideOpenText: '',
    queryParams: () => ({}),
    defaultSort: undefined,
    sets: () => [],
  },
)

const isAsideOpen = ref(false)

const sort = computed(() => {
  return (route.query.sort as string) ?? props.defaultSort ?? undefined
})

const perPage = computed(() => {
  return Number(route.query.per_page) || 24
})

const isAsideSection = computed(() => !!slots.aside)

const changeRouteQuery = (query: Record<string, any>) => {
  const transformValue = (
    v: string | any[] | number | undefined,
  ): undefined | string | string[] => {
    if (!v) return undefined
    if (Array.isArray(v)) return v.map((i) => String(i))
    return String(v)
  }

  navigateTo({
    name: route.name!,
    params: route.params,
    query: {
      ...route.query,
      ...Object.entries(query).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: transformValue(value),
        }),
        {} as Record<string, any>,
      ),
    },
  })
}

const {
  data: products,
  refresh,
  pending,
  error,
} = useAsyncData(async () => {
  try {
    const page = Number(route.query.page ?? 1)

    // Override attributes to make sure they are arrays
    const attribute = Object.entries(route.query)
      .filter(([key]) => key.startsWith('attribute'))
      .reduce(
        (acc, [key, value]) => {
          const [, attributeId] = key.split('.')
          return {
            ...acc,
            [attributeId]: Array.isArray(value) ? (value as string[]) : [value as string],
          }
        },
        {} as Record<string, string[]>,
      )

    const response = await getProducts({
      ...props.queryParams,
      ...route.query,
      sets: props.sets,
      page,
      sort: sort.value,
      limit: perPage.value,
      attribute: Object.keys(attribute).length ? attribute : undefined,
      shipping_digital: false,
      attribute_slug: config.productSubtextAttr,
    })

    return { pagination: response.pagination, data: response.data }
  } catch (e) {
    return { pagination: { total: 0, lastPage: 0, currentPage: 0 }, data: [] }
  }
})

useEmitProductsViewEvent(
  computed(() => products.value?.data || []),
  props.title,
)

watch(
  () => route.query,
  () => refresh(),
)

watch(
  () => props.sets,
  () => refresh(),
)

watch(
  () => error.value,
  () => {
    // TODO: Handle error
    // eslint-disable-next-line no-console
    if (error.value) console.error(error.value)
  },
)

watch(
  () => products.value,
  () => {
    // If current page is out of scope, redirect to the first page
    const page = Number(route.query.page ?? 1)
    if (page < 1 || page > (products.value?.pagination.lastPage || Infinity)) {
      changeRouteQuery({ page: 1 })
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.product-list-page {
  max-width: $container-width;
  margin: 0 auto;
  position: relative;

  &__content {
    min-height: 40vh;
    position: relative;
    display: grid;
    grid-gap: 38px;
    grid-template-columns: 1fr;

    @media ($viewport-10) {
      grid-template-columns: minmax(auto, 300px) 1fr;
    }
  }

  &__aside {
    display: none;

    @media ($viewport-10) {
      display: block;
    }
  }

  &__header {
    margin-bottom: 16px;
  }

  &__title {
    font-size: rem(16);

    @media ($viewport-6) {
      font-size: rem(26);
    }
  }

  &__header-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 9px;
    margin-top: 14px;

    @media ($viewport-10) {
      display: none;
    }
  }

  &__quantity {
    color: $gray-color-600;
    font-weight: 400;
  }

  &__placeholder {
    width: 100%;
    padding-top: 150%;
    background-color: $gray-color-400;
  }

  &__aside-btn {
    all: unset;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: rem(12);
    transition: 0.3s;
    border: solid 1px $gray-color-300;
    text-align: center;

    &:hover {
      background-color: $gray-color-300;
    }
  }

  &__aside-modal,
  &__aside-btn {
    @media ($viewport-10) {
      display: none;
    }
  }

  &__aside-modal {
    padding: 24px;
    overflow: auto;
  }

  &__aside-modal-btn {
    width: 100%;
  }

  &__grid {
    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: 20px 9px;
    max-width: 100%;

    @media ($viewport-6) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media ($viewport-11) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      row-gap: 37px;
    }
  }

  &__footer {
    margin-top: 64px;
    display: flex;
    justify-content: space-between;
  }

  &__pagination {
    margin: 0 auto;

    @media ($viewport-4) {
      margin: 0;
    }
  }

  &__per-page-select {
    @media ($max-viewport-4) {
      display: none;
    }
  }
}
</style>
