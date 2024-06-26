<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <LazyLayoutHeader
        class="product-carousel__title"
        :class="{ 'product-carousel__title--no-padding': hideMoreButton }"
        variant="black"
        :tag="headerTag"
      >
        {{ label || category.name }}
      </LazyLayoutHeader>
      <LazyHomeShowAllButton v-show="!hideMoreButton" :path="`/category/${category.slug}`" />
    </div>
    <div
      v-show="subcategories?.length && !withoutSubcategories"
      class="product-carousel__categories"
      :items="subcategories"
    >
      <LazyHomeProductCarouselCategoryButton
        v-for="set in subcategories"
        :key="set.id"
        :label="set.name"
        :is-chosen="set.slug === selectedCategory"
        @click="setNewCategory(set.slug)"
      />
    </div>
    <div class="product-carousel__products">
      <ClientOnly><LazyLayoutLoading v-show="pending" :active="pending" /></ClientOnly>
      <LazyLayoutEmpty v-show="!products.length" class="product-carousel__empty">
        {{ t('empty') }}
      </LazyLayoutEmpty>
      <HomeProductCarouselSimple v-show="products?.length" :products="products || []" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "empty": "Brak produktów w tej kategorii"
  },
  "en": {
    "empty": "No products in this category"
  }
}
</i18n>

<script lang="ts" setup>
import type { ProductListed, ProductSetListed } from '@heseya/store-core'

import { useCategoriesStore } from '@/store/categories'
import { useConfigStore } from '@/store/config'

const props = withDefaults(
  defineProps<{
    category: ProductSetListed
    label?: string
    withoutSubcategories?: boolean
    headerTag?: string
    hideMoreButton?: boolean
    hideUnavailable?: boolean
  }>(),
  {
    label: '',
    withoutSubcategories: false,
    hideMoreButton: false,
    headerTag: 'span',
    hideUnavailable: false,
  },
)
const t = useLocalI18n()
const { get: getProducts } = useHeseyaProducts()
const categoriesStore = useCategoriesStore()
const config = useConfigStore()

const selectedCategory = useState<string | null>(`selected-${props.category.id}`, () => null)
const subcategories = useState<ProductSetListed[]>(`subcategories-${props.category.id}`, () => [])
const subcategoriesFetched = useState<boolean>(
  `subcategories-fetched-${props.category.id}`,
  () => false,
)

const products = useState<ProductListed[]>(`products-${props.category.id}`, () => [])
const pending = ref(false)

const fetchProducts = async () => {
  pending.value = true
  const categorySlug = selectedCategory.value || props.category.slug
  const { data } = await getProducts({
    sets: [categorySlug],
    limit: 16,
    sort: `set.${categorySlug}`,
    shipping_digital: false,
    attribute_slug: config.productSubtextAttr,
    available: props.hideUnavailable ? true : undefined,
  })

  products.value = data
  pending.value = false
}

useAsyncData(`subcategories-${props.category.id}`, async () => {
  if (subcategoriesFetched.value) return

  if (!props.withoutSubcategories) {
    subcategories.value = await categoriesStore.getSubcategories(props.category.id)
    if (subcategories.value.length) selectedCategory.value = subcategories.value[0].slug
  }

  subcategoriesFetched.value = true
  await fetchProducts()
})

useEmitProductsViewEvent(
  computed(() => products.value || []),
  props.category.name,
)

const setNewCategory = async (categorySlug: string) => {
  if (categorySlug !== selectedCategory.value) {
    selectedCategory.value = categorySlug
    await fetchProducts()
  }
}
</script>

<style lang="scss" scoped>
.product-carousel {
  @include flex-column;

  &__header {
    @include flex-row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;

    @media ($max-viewport-3) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__title {
    padding-left: 150px;
    flex: 1;
    line-height: 130%;

    &--no-padding {
      padding-left: 0;
    }

    @media ($max-viewport-8) {
      padding: 0;
      text-align: left;
      font-size: rem(18);
    }

    @media ($max-viewport-3) {
      align-self: flex-start;
    }
  }

  &__categories {
    @include flex-row;
    overflow: auto;
    justify-content: center;
    white-space: nowrap;
    padding-bottom: 8px;
    margin-bottom: 16px;
    gap: 12px;

    @media ($viewport-10) {
      gap: 24px;
    }

    @media ($max-viewport-8) {
      justify-content: flex-start;
    }
  }

  &__products {
    position: relative;
  }

  &__picture {
    object-fit: contain;
    flex-shrink: 0;
  }

  &__empty {
    height: 292px;
  }
}
</style>
