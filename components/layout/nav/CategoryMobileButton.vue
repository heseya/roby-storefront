<template>
  <div class="category-mobile-btn" :class="special && 'category-mobile-btn--special'">
    <div class="category-mobile-btn__link-container">
      <NuxtLink class="category-mobile-btn__link" :to="link">
        {{ label }}
      </NuxtLink>
      <IconButton
        v-show="Boolean(subcategories?.length)"
        class="category-mobile-btn__arrow"
        :class="isOpenSubcategories ? 'category-mobile-btn__arrow--down' : ''"
        :icon="Chevron"
        @click="toggleOpenSubcategories"
      />
    </div>
    <div v-show="isOpenSubcategories" class="category-mobile-btn__list">
      <NuxtLink
        class="category-mobile-btn__list-item"
        :key="category.value"
        v-for="category in subcategories"
        :to="category.value"
        >{{ category.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'
import { SelectOption } from '~/components/layout/nav/Search.vue'
import IconButton from '~/components/layout/IconButton.vue'

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

  &--special {
    .category-mobile-btn__link {
      color: $primary-color;
    }
  }
}
</style>
