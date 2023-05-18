<template>
  <div class="layout-account-section">
    <div v-if="header" class="layout-account-section__header">
      <h3 class="layout-account-section__text">{{ header }}</h3>
      <NuxtLink :to="link">
        <button class="layout-account-section__btn">
          {{ $t('custom.showAll') }}
          <LayoutIcon :icon="GoNextIcon" :size="8" />
        </button>
      </NuxtLink>
    </div>
    <div class="layout-account-section__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'
const { t: $t } = useI18n({ useScope: 'global' })

defineProps<{
  header: string
  link: string
}>()
</script>

<style lang="scss" scoped>
.layout-account-section {
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
      margin-bottom: 8px;
    }
  }

  &__text {
    @media ($viewport-11) {
      font-size: 16px;
    }
  }

  &__btn {
    cursor: pointer;
    padding: 4px 7px;
    background-color: $gray-color-300;
    color: $text-color;
    text-transform: uppercase;
    border-radius: 20px;
    font-size: 12px;
    border: none;

    &:hover {
      background-color: $gray-color-400 !important;
    }
  }

  &__icon {
    margin-left: 4px;
  }
}
</style>
