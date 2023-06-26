<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <LayoutHeader class="product-carousel__title" variant="black" :tag="headerTag">
        {{ label || category.name }}
      </LayoutHeader>
      <HomeShowAllButton :path="`/category/${category.slug}`" />
    </div>
    <LayoutCarousel
      v-if="subcategories?.length && !withoutSubcategories"
      class="product-carousel__categories"
      :items="subcategories"
      :space-between="12"
      hide-nav
    >
      <template #item="set: ProductSetList">
        <HomeProductCarouselCategoryButton
          :label="set.name"
          :is-chosen="set.slug === selectedCategory"
          @click="setNewCategory(set.slug)"
        />
      </template>
    </LayoutCarousel>
    <HomeProductCarouselSimple :products="products || []" />
  </div>
</template>

<script lang="ts" setup>
import { ProductSetList } from '@heseya/store-core'
import { useCategoriesStore } from '@/store/categories'

const props = withDefaults(
  defineProps<{
    category: ProductSetList
    label?: string
    withoutSubcategories?: boolean
    headerTag?: string
  }>(),
  { label: '', withoutSubcategories: false, headerTag: 'span' },
)
const heseya = useHeseya()
const categoriesStore = useCategoriesStore()

const selectedCategory = ref<string | null>(null)

const subcategories = ref<ProductSetList[]>([])

const { data: products, refresh: refreshProducts } = useAsyncData(
  `products-${props.category.id}`,
  async () => {
    const categorySlug = selectedCategory.value || props.category.slug
    const { data } = await heseya.Products.get({
      sets: [categorySlug],
      limit: 16,
      sort: `set.${categorySlug}`,
    })

    return data
  },
  { immediate: false },
)

useAsyncData(`subcategories-${props.category.id}`, async () => {
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
  gap: 22px;

  &__header {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    @media ($max-viewport-3) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__title {
    padding-left: 150px;
    flex: 1;
    line-height: 130%;

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
    justify-content: center;

    @media ($max-viewport-8) {
      justify-content: flex-start;
    }
  }

  &__picture {
    object-fit: contain;
    flex-shrink: 0;
  }
}
</style>
