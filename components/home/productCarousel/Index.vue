<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <LayoutHeader
        class="product-carousel__title"
        :class="{ 'product-carousel__title--no-padding': hideMoreButton }"
        variant="black"
        :tag="headerTag"
      >
        {{ label || category.name }}
      </LayoutHeader>
      <HomeShowAllButton v-show="!hideMoreButton" :path="`/category/${category.slug}`" />
    </div>
    <div
      v-show="subcategories?.length && !withoutSubcategories"
      class="product-carousel__categories"
      :items="subcategories"
    >
      <HomeProductCarouselCategoryButton
        v-for="set in subcategories"
        :key="set.id"
        :label="set.name"
        :is-chosen="set.slug === selectedCategory"
        @click="setNewCategory(set.slug)"
      />
    </div>
    <div class="product-carousel__products">
      <LayoutLoading v-show="pending" :active="pending" />
      <LayoutEmpty v-show="!products?.length" class="product-carousel__empty">
        {{ t('empty') }}
      </LayoutEmpty>
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
import { ProductSetList } from '@heseya/store-core'
import { useCategoriesStore } from '@/store/categories'
import { useConfigStore } from '@/store/config'

const props = withDefaults(
  defineProps<{
    category: ProductSetList
    label?: string
    withoutSubcategories?: boolean
    headerTag?: string
    hideMoreButton?: boolean
  }>(),
  { label: '', withoutSubcategories: false, hideMoreButton: false, headerTag: 'span' },
)
const t = useLocalI18n()
const heseya = useHeseya()
const categoriesStore = useCategoriesStore()
const config = useConfigStore()

const selectedCategory = useState<string | null>(`selected-${props.category.id}`, () => null)
const subcategories = useState<ProductSetList[]>(`subcategories-${props.category.id}`, () => [])

const {
  data: products,
  refresh: refreshProducts,
  pending,
} = useAsyncData(
  `products-${props.category.id}-${selectedCategory.value}`,
  async () => {
    const categorySlug = selectedCategory.value || props.category.slug
    const { data } = await heseya.Products.get({
      sets: [categorySlug],
      limit: 16,
      sort: `set.${categorySlug}`,
      shipping_digital: false,
      attribute_slug: config.productSubtextAttr,
    })

    return data
  },
  { immediate: false },
)

useLazyAsyncData(`subcategories-${props.category.id}`, async () => {
  if (!props.withoutSubcategories) {
    subcategories.value = await categoriesStore.getSubcategories(props.category.id)
    if (subcategories.value.length) selectedCategory.value = subcategories.value[0].slug
  }
  refreshProducts()
})

useEmitProductsViewEvent(
  computed(() => products.value || []),
  props.category.name,
)

const setNewCategory = (categorySlug: string) => {
  if (categorySlug !== selectedCategory.value) {
    selectedCategory.value = categorySlug
    refreshProducts()
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
