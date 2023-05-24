<template>
  <div class="mobile-menu">
    <div class="mobile-menu__title">
      <LayoutIconButton
        class="mobile-menu__close-btn"
        :icon="Close"
        icon-size="sm"
        :title="$t('nav.close')"
        @click="onClose"
      />
      <span>{{ $t('nav.title') }}</span>
    </div>
    <LayoutNavCategoryButton
      v-for="category in categoriesStore.navCategories"
      :key="category.id"
      :category="category"
      mobile
    />
    <LayoutNavMobileButton v-for="link in links" :key="link.path" :link="link" />
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
import Close from '@/assets/icons/cross.svg?component'
import { useCategoriesStore } from '@/store/categories'
import { NavLink } from '@/interfaces/NavLink'

const $t = useGlobalI18n()

withDefaults(
  defineProps<{
    links?: NavLink[]
  }>(),
  { links: () => [] },
)

const emit = defineEmits<{
  (event: 'close'): void
}>()

const categoriesStore = useCategoriesStore()

const onClose = () => {
  emit('close')
}
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
