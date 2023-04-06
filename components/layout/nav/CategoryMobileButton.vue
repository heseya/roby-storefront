<template>
  <div class="category-mobile-btn" :class="{ 'category-mobile-btn--special': special }">
    <div class="category-mobile-btn__link-container">
      <NuxtLink class="category-mobile-btn__link" :to="link">
        {{ label }}
      </NuxtLink>
      <LayoutIconButton
        v-show="subcategories?.length"
        class="category-mobile-btn__arrow"
        :class="{ 'category-mobile-btn__arrow--down': isOpenSubcategories }"
        :icon="Chevron"
        :iconSize="12"
        @click="toggleOpenSubcategories"
      />
    </div>
    <div v-show="isOpenSubcategories" class="category-mobile-btn__list">
      <NuxtLink
        v-for="category in subcategories"
        :key="category.value"
        class="category-mobile-btn__list-item"
        :to="category.value"
        >{{ category.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'
import { SelectOption } from '~/components/layout/nav/Search.vue'

const isOpenSubcategories = ref(false)

const toggleOpenSubcategories = () => {
  isOpenSubcategories.value = !isOpenSubcategories.value
}

defineProps<{
  link?: string
  special?: boolean
  label: string
  subcategories?: SelectOption[]
}>()
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

    &-item {
      padding: 12px 32px;

      text-align: left;
      white-space: nowrap;
      text-decoration: none;
      color: $gray-color-900;

      border-bottom: 1px solid $gray-color-100;
    }
  }

  &--special &__link {
    color: var(--primary-color);
  }
}
</style>
