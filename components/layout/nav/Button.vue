<template>
  <div class="category-btn" :class="{ 'category-btn--special': highlighted }">
    <NuxtLink class="category-btn__link" :to="localePath(link.path)">
      <div class="category-btn__label-container">
        {{ link.text }}
      </div>
    </NuxtLink>
    <div v-show="Boolean(link.children?.length)" class="category-btn__list">
      <NuxtLink
        v-for="sub in link.children"
        :key="sub.path"
        class="category-btn__list-item"
        :to="localePath(sub.path)"
      >
        {{ sub.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NavLink } from '~~/interfaces/NavLink'
withDefaults(
  defineProps<{
    link: NavLink
    highlighted?: boolean
  }>(),
  { highlighted: false },
)

const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.category-btn {
  position: relative;
  height: 55px;
  padding: 12px 18px;
  background-color: $gray-color-300;

  &:hover {
    cursor: pointer;

    .category-btn__label-container {
      border-bottom-color: $gray-color-900;
    }
  }

  &__link {
    text-decoration: none;
  }

  &__label-container {
    padding: 5px 0;
    font-weight: bold;
    text-transform: uppercase;
    color: $gray-color-900;

    border-bottom: 2px solid transparent;
    transition: border-bottom-color 200ms ease-in-out;
  }

  &__list {
    position: absolute;
    left: 0;
    padding: 10px 0;

    @include flex-column;
    background-color: $gray-color-300;

    &-item {
      padding: 10px 20px;

      text-align: left;
      white-space: nowrap;
      text-decoration: none;
      color: $gray-color-900;
      transition: color 200ms ease-in-out;

      &:hover {
        color: var(--primary-color);
      }
    }

    display: none;
  }

  &:hover {
    .category-btn__list {
      display: flex;
    }
  }

  &--special {
    .category-btn__label-container {
      color: var(--primary-color);
    }

    &:hover {
      .category-btn__label-container {
        border-bottom-color: var(--primary-color);
      }
    }
  }
}
</style>
