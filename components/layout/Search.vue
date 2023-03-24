<template>
  <form class="search" v-on:submit.prevent="callback">
    <input class="search__input search__input--main" :placeholder="t('search')" name="search" />
    <div class="search__separator" />
    <select class="search__input search__input--select" name="category">
      <option selected value="all">{{ t('allCategories') }}</option>
      <option :key="value" v-for="{ label, value } in categories" :value="value">
        {{ label }}
      </option>
    </select>
    <LayoutIconButton class="search__button" :icon="Search" type="submit" />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "search": "Czego szukasz?",
    "allCategories": "Wszystkie kategorie"
  }
}
</i18n>

<script lang="ts" setup>
const t = useLocalI18n()

import Search from '@/assets/icons/search.svg?component'

export interface SelectOption {
  label: string
  value: string
}

defineProps<{
  callback: (data: SubmitEvent) => void
  categories: SelectOption[]
}>()
</script>

<style lang="scss" scoped>
.search {
  @include flex-row;
  align-items: center;
  gap: 22px;
  padding-left: 22px;
  background-color: $gray-color-300;
  border-radius: 23px;

  &__separator {
    height: 32px;
    width: 2px;
    background-color: $gray-color-400;
  }

  &__input {
    height: 100%;
    padding: 0px;
    outline: none;
    border: none;
    background: transparent;

    &--main {
    }

    &--select {
    }
  }

  &__button {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background-color: $secondary-color;
  }
}
</style>
