<template>
  <div v-if="header" class="account-order">
    <div class="account-order__header">
      <h3 class="account-order__text">{{ header }}</h3>
      <NuxtLink :to="link">
        <LayoutButton class="account-order__btn">
          {{ t('showAll') }}
          <LayoutIcon :icon="GoNextIcon" :size="8" />
        </LayoutButton>
      </NuxtLink>
    </div>
  </div>
  <div class="account-order__content">
    <slot></slot>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "showAll": "Pokaż wszystkie",
    "myAccount": "Moje konto"
  }
}
</i18n>

<script setup lang="ts">
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'
const t = useLocalI18n()

defineProps<{
  header: string
  link: string
}>()
</script>

<style lang="scss" scoped>
.account-order {
  &__content {
    border: 1px solid $gray-color-300;
    padding: 20px;

    @media ($viewport-11) {
      padding: 15px 10px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    @media ($viewport-11) {
      margin-bottom: 11px;
    }
  }

  &__text {
    @media ($viewport-11) {
      font-size: 16px;
    }
  }

  &__btn {
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
