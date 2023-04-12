<template>
  <button class="show-all">
    <span class="show-all__label">{{ t('showAll') }}</span>
    <LayoutIcon :icon="ArrowNext" :size="8" />
  </button>
</template>

<i18n lang="json">
{
  "pl": {
    "showAll": "Pokaż wszystkie"
  }
}
</i18n>

<script lang="ts" setup>
import ArrowNext from '@/assets/icons/arrow-next.svg?component'

const t = useLocalI18n()
</script>

<style lang="scss" scoped>
.show-all {
  all: unset;
  height: 20px;
  padding: 0 10px;

  @include flex-row;
  gap: 8px;
  align-items: center;

  border-radius: 10px;
  background-color: $gray-color-300;
  transition: background-color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: $gray-color-400;
  }
  &__label {
    text-transform: uppercase;
    font-family: $textFont;
    font-size: rem(12);
    white-space: nowrap;
  }
}
</style>
