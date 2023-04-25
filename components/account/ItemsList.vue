<template>
  <div class="items-list">
    <div class="items-list__header-bar">
      <h3 class="items-list__header">{{ header }}</h3>
      <NuxtLink :to="link">
        <LayoutButton class="items-list__button">
          {{ t('showAll') }}
          <GoNextIcon class="items-list__icon" /> </LayoutButton
      ></NuxtLink>
    </div>
    <div class="items-list__content">
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
.items-list {
  margin-top: 50px;

  &__content {
    margin-top: 12px;
    border: 1px solid $gray-color-300;
    padding: 15px 10px;
  }

  &__header-bar {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    padding: 2px 5px;
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
