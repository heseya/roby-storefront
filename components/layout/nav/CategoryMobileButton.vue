<template>
  <div
    class="category-mobile-btn"
    :class="{ 'category-mobile-btn--special': isProductSetHighlighted(category) }"
  >
    <div class="category-mobile-btn__link-container">
      <NuxtLink class="category-mobile-btn__link" :to="localePath(`/category/${category.slug}`)">
        {{ category.name }}
      </NuxtLink>
      <LayoutIconButton
        v-show="subcategories?.length"
        class="category-mobile-btn__arrow"
        :class="{ 'category-mobile-btn__arrow--down': isOpenSubcategories }"
        :icon="Chevron"
        :icon-size="12"
        @click="toggleOpenSubcategories"
      />
    </div>
    <div v-show="isOpenSubcategories" class="category-mobile-btn__list">
      <NuxtLink
        v-for="cat in subcategories"
        :key="cat.id"
        class="category-mobile-btn__list-item"
        :to="localePath(`/category/${cat.slug}`)"
      >
        {{ cat.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProductSetList } from '@heseya/store-core'
import Chevron from '@/assets/icons/chevron.svg?component'
import { useCategoriesStore } from '@/store/categories'

const props = defineProps<{
  category: ProductSetList
}>()

const localePath = useLocalePath()

const categoriesStore = useCategoriesStore()
const isOpenSubcategories = ref(false)

const toggleOpenSubcategories = () => {
  isOpenSubcategories.value = !isOpenSubcategories.value
}

const subcategories = ref<ProductSetList[]>([])

onBeforeMount(async () => {
  subcategories.value = await categoriesStore.getSubcategories(props.category.id)
})
</script>

<style lang="scss" scoped>
.category-mobile-btn {
  @include flex-column;

  &__link-container {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid $gray-color-300;
  }

  &__link {
    padding: 12px 16px;
    flex: 1;

    text-decoration: none;
    text-transform: uppercase;
    text-align: left;
    font-weight: bold;
    color: $gray-color-900;
  }

  &__arrow {
    width: 44px;
    height: 44px;
    rotate: 90deg;
    transition: 200ms ease-in-out;

    &--down {
      transform: rotate(-180deg);
    }
  }

  &__list {
    @include flex-column;
    background-color: $white-color;
  }

  &__list-item {
    padding: 12px 32px;

    text-align: left;
    white-space: nowrap;
    text-decoration: none;
    color: $gray-color-900;

    border-bottom: 1px solid $gray-color-100;
  }

  &--special &__link {
    color: var(--primary-color);
  }
}
</style>
