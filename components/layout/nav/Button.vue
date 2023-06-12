<template>
  <div class="category-btn" :class="{ 'category-btn--special': highlighted }">
    <div class="category-btn__link-container">
      <NuxtLink ref="linkRef" class="category-btn__link" :to="localePath(link.path)">
        {{ link.text }}
      </NuxtLink>
    </div>
    <Teleport to="body">
      <div
        v-show="Boolean(link.children?.length)"
        ref="popoverRef"
        class="category-btn__list"
        :class="{ 'category-btn__list--active': isActive }"
        :style="{ left: `${left}px`, top: `${topHeight}px` }"
      >
        <NuxtLink
          v-for="sub in link.children"
          :key="sub.path"
          class="category-btn__list-item"
          :to="localePath(sub.path)"
        >
          {{ sub.text }}
        </NuxtLink>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { NavLink } from '@/interfaces/NavLink'
withDefaults(
  defineProps<{
    link: NavLink
    highlighted?: boolean
  }>(),
  { highlighted: false },
)

const localePath = useLocalePath()

const linkRef = ref()
const popoverRef = ref()

const isLinkHover = useElementHover(linkRef)
const isPopoverHover = useElementHover(popoverRef)
const { left, top, height, update } = useElementBounding(linkRef)

const isActive = computed<boolean>(() => isLinkHover.value || isPopoverHover.value)

const topHeight = computed<number>(() => {
  return top.value + height.value
})

watch(
  () => isActive.value,
  () => update(),
)
</script>

<style lang="scss" scoped>
.category-btn {
  position: relative;
  height: 55px;
  padding: 0 12px;
  background-color: $gray-color-300;

  &:hover {
    cursor: pointer;

    .category-btn__link {
      border-bottom-color: $gray-color-900;
    }
  }

  &__link-container {
    @include flex-column;
    justify-content: center;
    height: 100%;
  }

  &__link {
    text-decoration: none;
    text-align: center;
    padding: 5px 0;
    font-weight: bold;
    text-transform: uppercase;
    color: $gray-color-900;
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 200ms ease-in-out;
  }

  &__list {
    position: fixed;
    left: 0;
    top: 50%;
    padding: 10px 0;
    z-index: 9999;
    @include flex-column;
    background-color: $gray-color-300;
    display: none;

    &--active {
      display: flex;
    }
  }

  &__list-item {
    padding: 10px 20px;
    text-align: left;
    white-space: nowrap;
    text-decoration: none;
    color: $gray-color-900;
    transition: color 200ms ease-in-out;

    &:hover {
      color: var(--secondary-color);
    }
  }

  &--special {
    .category-btn__link {
      color: var(--highlight-color);
    }

    &:hover {
      .category-btn__link {
        border-bottom-color: var(--highlight-color);
      }
    }
  }
}
</style>
