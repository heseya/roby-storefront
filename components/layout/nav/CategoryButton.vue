<template>
  <LayoutNavMobileButton
    v-if="mobile"
    :link="link"
    :highlighted="isProductSetHighlighted(category)"
  />
  <LayoutNavButton v-else :link="link" :highlighted="isProductSetHighlighted(category)" />
</template>

<script lang="ts" setup>
import { ProductSetList } from '@heseya/store-core'
import { useCategoriesStore } from '@/store/categories'
import { NavLink } from '@/interfaces/NavLink'

const props = withDefaults(
  defineProps<{
    category: ProductSetList
    mobile?: boolean
  }>(),
  { mobile: false },
)

const categoriesStore = useCategoriesStore()

const subcategories = ref<ProductSetList[]>([])

onBeforeMount(async () => {
  subcategories.value = await categoriesStore.getSubcategories(props.category.id)
})

const link = computed<NavLink>(() => ({
  text: props.category.name,
  path: `/category/${props.category.slug}`,
  children: subcategories.value.map((cat) => ({
    text: cat.name,
    path: `/category/${cat.slug}`,
  })),
}))
</script>
