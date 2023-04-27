<template>
  <div>
    <div class="products-list">
      <div class="products-list__header-bar">
        <h3 class="products-list__header">{{ header }}</h3>
        <NuxtLink :to="link">
          <LayoutButton class="products-list__button">
            {{ t('showAll') }}
            <LayoutIcon :icon="GoNextIcon" :size="8" /> </LayoutButton
        ></NuxtLink>
      </div>
    </div>
    <div class="products-list__content">
      <slot></slot>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "showAll": "Pokaż wszystkie"
  }
}
</i18n>

<script setup lang="ts">
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'
const t = useLocalI18n()

useBreadcrumbs([{ label: 'Moje konto', link: '/account' }])

defineProps<{
  header: string
  link: string
}>()
</script>

<style lang="scss" scoped>
.products-list {
  &__content {
    border: 1px solid $gray-color-300;
    padding: 15px 10px;
  }

  &__header-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__button {
    padding: 4px 7px;
    background-color: $gray-color-300;
    color: $text-color;
    text-transform: uppercase;
    border-radius: 20px;
    font-size: 12px;

    &:hover {
      background-color: $gray-color-400 !important;
    }
  }

  &__icon {
    margin-left: 4px;
  }
}
</style>
