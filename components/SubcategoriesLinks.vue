<template>
  <div class="subcategories-list">
    <template v-if="isParent">
      <NuxtLink
        v-if="category?.parent"
        class="subcategories-list__link"
        :to="localePath(`/category/${category?.parent?.slug}`)"
      >
        <ChevronIcon class="subcategories-list__icon" /> {{ category?.parent?.name }}
      </NuxtLink>

      <span v-if="subcategories?.length" class="subcategories-list__text">
        {{ category?.name }}
      </span>
    </template>

    <div ref="containerRef" class="subcategories-list__list">
      <NuxtLink
        v-for="cat in subcategories || []"
        :key="cat.id"
        class="subcategories-list__link"
        :class="{
          'subcategories-list__link--intended': isParent,
        }"
        :to="localePath(`/category/${cat.slug}`)"
      >
        {{ cat.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeseyaPaginationMeta, ProductSet, ProductSetList } from '@heseya/store-core'
import ChevronIcon from '@/assets/icons/chevron.svg?component'

const props = defineProps<{
  category: ProductSet
}>()
const heseya = useHeseya()
const localePath = useLocalePath()

const containerRef = ref()
const loadedCategories = ref<ProductSetList[]>([])
const pagination = ref<HeseyaPaginationMeta>({ currentPage: 0, lastPage: 0, perPage: 0, total: 0 })

const isParent = computed(() => !!props.category?.parent)

const loadSubcategories = async (page: number) => {
  const { data, pagination: p } = await heseya.ProductSets.get({
    parent_id: props.category.id,
    page,
    limit: 20,
  })
  pagination.value = p
  /**
   * This is due to the hydration error
   */
  if (!process.server) loadedCategories.value = [...loadedCategories.value, ...data]
  return data
}

const { data: asyncCategories } = useAsyncData(() => loadSubcategories(1))

const subcategories = computed(() =>
  loadedCategories.value?.length ? loadedCategories.value : asyncCategories.value,
)

watch(
  () => props.category,
  () => {
    loadedCategories.value = []
    loadSubcategories(1)
  },
)

onMounted(() => {
  useInfiniteScroll(
    containerRef,
    () => {
      if (pagination.value.currentPage < pagination.value.lastPage)
        loadSubcategories(pagination.value.currentPage + 1)
    },
    { distance: 10 },
  )
})
</script>

<style lang="scss" scoped>
.subcategories-list {
  display: flex;
  flex-direction: column;
  font-size: rem(14);
  line-height: rem(19);

  &__list {
    @include styled-scrollbar;
    max-height: 400px;
    overflow: auto;
  }

  &__icon {
    transform: rotate(180deg);
    margin-right: 2px;
    height: 0.65em;
  }

  &__link {
    display: block;
    color: $text-color;
    text-decoration: none;

    &:not(:last-child) {
      margin-bottom: 6px;
    }

    &--intended {
      margin-left: 20px;
    }

    &:hover {
      color: var(--secondary-color);
    }
  }

  &__text {
    font-weight: 600;

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }
}
</style>
