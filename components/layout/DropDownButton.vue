<template>
  <button
    class="dropdown-btn"
    :class="{ 'dropdown-btn--expand': expanded }"
    @click="emit('update:expanded', !expanded)"
  >
    <template v-if="expanded">{{ collapseText || t('collapse') }}</template>
    <template v-else>{{ expandText || t('expand') }}</template>

    <LayoutIcon
      class="dropdown-btn__icon"
      :class="{ 'dropdown-btn__icon--expand': expanded }"
      :icon="Chevron"
      :size="8"
    />
  </button>
</template>

<i18n lang="json">
{
  "pl": {
    "expand": "Rozwiń",
    "collapse": "Zwiń"
  },
  "en": {
    "expand": "Expand",
    "collapse": "Collapse"
  }
}
</i18n>

<script setup lang="ts">
import Chevron from '@/assets/icons/chevron.svg?component'

withDefaults(
  defineProps<{
    expanded?: boolean
    expandText?: string
    collapseText?: string
  }>(),
  { expanded: false, expandText: '', collapseText: '' },
)

const t = useLocalI18n()

const emit = defineEmits<{
  (e: 'update:expanded', v: boolean): void
}>()
</script>

<style lang="scss" scoped>
.dropdown-btn {
  @include reset-button;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 8px;

  @include flex-row;
  gap: 4px;
  align-items: center;
  justify-content: center;

  background-color: $white-color;
  box-shadow: 0 -20px 16px $white-color;
  transition: all 500ms ease-in-out;

  color: $blue-color-500;

  &--expand {
    box-shadow: none;
  }

  &:hover {
    cursor: pointer;
  }

  &__icon {
    color: $blue-color-500;
    transform: rotate(90deg);
    transition: all 500ms ease-in-out;

    &--expand {
      transform: rotate(-90deg);
    }
  }
}
</style>
