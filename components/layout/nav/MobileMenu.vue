<template>
  <div class="mobile-menu">
    <div class="mobile-menu__title">
      <LayoutIconButton
        class="mobile-menu__close-btn"
        :icon="Close"
        icon-size="sm"
        @click="onClose"
      />
      <span>{{ t('menu') }}</span>
    </div>
    <LayoutNavCategoryMobileButton
      v-for="category in categories"
      :key="category.name"
      :label="category.name"
      :special="isProductSetHighlighted(category)"
      :link="`/category/${category.slug}`"
      :subcategories="subcategories"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "menu": "Menu"
  }
}
</i18n>

<script lang="ts" setup>
import { ProductSetList } from '@heseya/store-core'
import Close from '@/assets/icons/cross.svg?component'

const t = useLocalI18n()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const onClose = () => {
  emit('close')
}

defineProps<{ categories: ProductSetList[] }>()

// TODO
const subcategories: ProductSetList[] = []
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: $white-color;
  overflow: hidden;
  @include flex-column;

  @media ($viewport-12) {
    display: none;
  }

  &__title {
    @include flex-row;
    align-items: center;
    height: 60px;
    font-weight: bold;

    border-bottom: 1px solid $gray-color-300;
  }

  &__close-btn {
    width: 44px;
    height: 44px;
  }
}
</style>
