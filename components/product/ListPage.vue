<template>
  <div class="product-list-page" :class="{ 'product-list-page--no-aside': !isAsideSection }">
    <aside v-if="isAsideSection" class="product-list-page__aside">
      <slot name="aside"></slot>
    </aside>

    <div class="product-list-page__content">
      <LayoutLoading :active="pending" />

      <header class="product-list-page__header">
        <div class="product-list-page__header-content">
          <h1 class="h3 h3--smaller product-list-page__title">{{ title }}</h1>

          <button
            v-if="isAsideSection"
            class="product-list-page__aside-btn"
            @click="isAsideOpen = true"
          >
            <img src="@/assets/icons/filters-ico.svg" role="presentation" />
            {{ asideOpenText }}
          </button>
        </div>

        <div class="product-list-page__header-content">
          <span class="product-list-page__quantity">
            {{ pagination.total }}
          </span>

          <!-- <ProductsSortSelect
            :value="sort"
            :default-sort="defaultSort"
            @input="(sort) => changeRouteQuery('sort', sort)"
          /> -->
        </div>
      </header>

      <template v-if="products?.length">
        <main class="product-list-page__grid">
          <ProductMiniature v-for="product in products" :key="product.id" :product="product" />
        </main>

        <Pagination
          class="product-list-page__pagination"
          :pagination="pagination"
          @go="(page) => changeRouteQuery('page', page)"
        />
      </template>

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

<script setup lang="ts">
import { HeseyaEvent, HeseyaPaginationMeta } from '@heseya/store-core'

const route = useRoute()
const router = useRouter()
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
    asideOpenText: 'Filtruj',
    queryParams: () => ({}),
    defaultSort: undefined,
  },
)

const pagination = ref<HeseyaPaginationMeta>({} as HeseyaPaginationMeta)
const isAsideOpen = ref(false)

const sort = computed(() => {
  return (route.query.sort as string) ?? props.defaultSort ?? undefined
})

const isAsideSection = computed(() => !!slots.aside)

const emitViewEvent = () => {
  ev.emit(HeseyaEvent.ViewProductList, {
    set: { name: props.title },
    items: products.value || [],
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
} = useAsyncData(
  async () => {
    try {
      const page = Number(route.query.page ?? 1)

      const response = await heseya.Products.get({
        ...props.queryParams,
        ...route.query,
        page,
        sort: sort.value as any, // TODO
        limit: 30,
      })
      pagination.value = response.pagination
      return response.data
    } catch (e) {
      console.log('🚀 ~ file: ListPage.vue:140 ~ e:', e)
      // TODO: handle error
      return []
    }
  },
  { default: () => [] },
)

watch(
  () => products.value,
  () => emitViewEvent(),
)

watch(
  () => route.query,
  () => refresh(),
)

onBeforeMount(() => {
  // If current page is out of scope, redirect to the first page
  const page = Number(route.query.page ?? 1)
  if (page < 1 || page > pagination.value.lastPage) {
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
  display: grid;
  grid-gap: 48px;
  grid-template-columns: 1fr;

  @media ($viewport-10) {
    grid-template-columns: auto 1fr;
  }

  &--no-aside {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }

  &__aside {
    display: none;

    @media ($viewport-10) {
      display: block;
    }
  }

  &__header {
    margin-bottom: 16px;

    @media ($viewport-10) {
      padding-left: 21px;
    }
  }

  &__header-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 7px;
  }

  &__quantity {
    font-size: rem(14);

    img {
      height: 12px;
      width: 11px;
      object-fit: contain;
    }
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
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 39px 10px;

    @media ($viewport-6) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media ($viewport-11) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      row-gap: 53px;
    }

    @media ($viewport-13) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }

  &__pagination {
    margin-top: 64px;
  }

  &__content {
    min-height: 40vh;
    position: relative;
  }
}
</style>
