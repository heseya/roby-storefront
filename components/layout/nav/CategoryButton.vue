<template>
  <LayoutNavMobileButton
    v-if="mobile"
    :link="link"
    :highlighted="isProductSetHighlighted(category)"
    @mouseenter="fetchSubcategories"
  />
  <LayoutNavButton
    v-else
    :link="link"
    :highlighted="isProductSetHighlighted(category)"
    @mouseenter="fetchSubcategories"
  />
</template>

<script lang="ts" setup>
import type { ProductSetList } from '@heseya/store-core'

import { useCategoriesStore } from '@/store/categories'
import type { NavLink } from '@/interfaces/NavLink'

const props = withDefaults(
  defineProps<{
    category: ProductSetList
    mobile?: boolean
  }>(),
  { mobile: false },
)

const categoriesStore = useCategoriesStore()

const subcategories = ref<ProductSetList[]>([])
const subcategoriesFetched = ref(false)

const fetchSubcategories = async () => {
  subcategories.value = await categoriesStore.getSubcategories(props.category.id)
  subcategoriesFetched.value = true
}

delayedOnMounted(fetchSubcategories, 3000)

const link = computed<NavLink>(() => ({
  text: props.category.name,
  path: `/category/${props.category.slug}`,
  children: subcategories.value.map((cat) => ({
    text: cat.name,
    path: `/category/${cat.slug}`,
  })),
}))
</script>
