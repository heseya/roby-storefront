<template>
  <div class="product-list-page">
    <LayoutLoading :active="pending" />

    <header class="product-list-page__header">
      <div class="product-list-page__header-content">
        <h1 class="h3 h3--smaller product-list-page__title">
          {{ title }}
          <span class="product-list-page__quantity"> ({{ products?.pagination.total }}) </span>
        </h1>

        <button
          v-if="isAsideSection"
          class="product-list-page__aside-btn"
          @click="isAsideOpen = true"
        >
          <img src="@/assets/icons/filters-ico.svg" role="presentation" />
          {{ asideOpenText || t('openAside') }}
        </button>
      </div>
    </header>

    <div
      class="product-list-page__content"
      :class="{ 'product-list-page__content--no-aside': !isAsideSection }"
    >
      <aside v-if="isAsideSection" class="product-list-page__aside">
        <slot name="aside"></slot>
      </aside>

      <div v-if="products?.data.length">
        <main class="product-list-page__grid">
          <ProductMiniature v-for="product in products.data" :key="product.id" :product="product" />
        </main>

        <div class="product-list-page__footer">
          <PaginationPerPageSelect
            :model-value="perPage"
            class="product-list-page__per-page-select"
            @update:model-value="(quantity) => changeRouteQuery('per_page', quantity)"
          />
          <Pagination
            class="product-list-page__pagination"
            :current="products?.pagination.currentPage"
            :total="products?.pagination.lastPage"
            @go="(page) => changeRouteQuery('page', page)"
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

      <LayoutEmpty v-else> Nie znaleziono produktów spełniających podane kryteria </LayoutEmpty>
    </div>

    <LayoutModal v-model="isAsideOpen" class="product-list-page__aside-modal">
      <slot name="aside"></slot>
    </LayoutModal>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "openAside": "Rozwiń filtry"
  }
}
</i18n>

<script setup lang="ts">
import { HeseyaEvent } from '@heseya/store-core'

const route = useRoute()
const router = useRouter()
const t = useLocalI18n()

const ev = useHeseyaEventBus()
const heseya = useHeseya()

const slots = useSlots()

const props = withDefaults(
  defineProps<{
    title?: string
    asideOpenText?: string
    queryParams?: Record<string, any>
    defaultSort?: string
  }>(),
  {
    title: '',
    asideOpenText: '',
    queryParams: () => ({}),
    defaultSort: undefined,
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

const emitViewEvent = () => {
  ev.emit(HeseyaEvent.ViewProductList, {
    set: { name: props.title },
    items: products.value?.data || [],
  })
}

const changeRouteQuery = (key: string, value: any) => {
  router.push({
    name: route.name!,
    params: route.params,
    query: { ...route.query, [key]: value !== undefined ? String(value) : undefined },
  })
}

const {
  data: products,
  refresh,
  pending,
  error,
} = useAsyncData(async () => {
  const page = Number(route.query.page ?? 1)

  const response = await heseya.Products.get({
    ...props.queryParams,
    ...route.query,
    page,
    sort: sort.value,
    limit: perPage.value,
  })
  return response
})

watch(
  () => products.value,
  () => emitViewEvent(),
)

watch(
  () => route.query,
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

onBeforeMount(() => {
  // If current page is out of scope, redirect to the first page
  const page = Number(route.query.page ?? 1)
  if (page < 1 || page > (products.value?.pagination.lastPage || Infinity)) {
    changeRouteQuery('page', 1)
  }
})

onMounted(() => emitViewEvent())
</script>

<style lang="scss" scoped>
.product-list-page {
  max-width: $container-width;
  padding: $container-padding;
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

    &--no-aside {
      grid-template-columns: 1fr;
      grid-gap: 0;
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
    text-transform: uppercase;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: rem(13);
    transition: 0.3s;

    img {
      height: 12px;
      width: 11px;
      object-fit: contain;
    }

    &:hover {
      background-color: $gray-color-300;
    }
  }

  &__aside-modal,
  &__aside-btn {
    @media ($viewport-6) {
      display: none;
    }
  }

  &__grid {
    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: 20px 9px;

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
