<template>
  <div class="category-mobile-btn" :class="{ 'category-mobile-btn--special': highlighted }">
    <div class="category-mobile-btn__link-container">
      <NuxtLink class="category-mobile-btn__link" :to="localePath(link.path)">
        {{ link.text }}
      </NuxtLink>
      <LayoutIconButton
        v-show="link.children?.length"
        class="category-mobile-btn__arrow"
        :class="{ 'category-mobile-btn__arrow--down': isOpen }"
        :icon="Chevron"
        :icon-size="12"
        :title="$t('nav.showSubcategories')"
        @click="toggleOpen"
      />
    </div>
    <div v-show="isOpen" class="category-mobile-btn__list">
      <NuxtLink
        v-for="sub in link.children || []"
        :key="sub.path"
        class="category-mobile-btn__list-item"
        :to="localePath(sub.path)"
      >
        {{ sub.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'
import { NavLink } from '@/interfaces/NavLink'

withDefaults(
  defineProps<{
    link: NavLink
    highlighted?: boolean
  }>(),
  { highlighted: false },
)

const localePath = useLocalePath()

const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
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
    @include styled-scrollbar;
    max-height: 50vh;
    overflow-y: auto;
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
    color: var(--secondary-color);
  }
}
</style>
