<template>
  <div class="search">
    <form class="search__form" @submit.prevent="onSubmit">
      <input
        ref="inputRef"
        v-model="formCtx.values.query"
        class="search__input search__input--query"
        :placeholder="$t('search.placeholder')"
        name="query"
        autocomplete="off"
      />
      <div class="search__separator" />
      <select
        v-model="formCtx.values.category"
        class="search__input search__input--select"
        name="category"
      >
        <option selected value="all">{{ t('allCategories') }}</option>
        <option v-for="{ name, slug } in categories" :key="slug" :value="slug">
          {{ name }}
        </option>
      </select>
      <LayoutIconButton
        icon-size="sm"
        class="search__button"
        :class="`search__button--${searchButtonColorTheme}`"
        :icon="Search"
        type="submit"
        :title="$t('search.action')"
      />
    </form>
    <LayoutNavSearchHistory v-show="showHistory" ref="historyRef" class="search__history" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "allCategories": "Wszystkie kategorie"
  },
  "en": {
    "allCategories": "All"
  }
}
</i18n>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { ProductSetList } from '@heseya/store-core'

import Search from '@/assets/icons/search.svg?component'
import { useSearchHistoryStore } from '@/store/searchHistory'

export interface SearchValues {
  query: string
  category: string
}

const t = useLocalI18n()
const $t = useGlobalI18n()
const searchHistory = useSearchHistoryStore()

const historyRef = ref(null)
const inputRef = ref(null)

const isHoverHistory = useElementHover(historyRef)
const { focused: isFocusInput } = useFocus(inputRef)

const showHistory = computed(
  () => (isFocusInput.value || isHoverHistory.value) && searchHistory.queries.length,
)

const emit = defineEmits<{
  (event: 'search', values: SearchValues): void
}>()

const formCtx = useForm({
  initialValues: {
    query: '',
    category: 'all',
  },
})

const onSubmit = formCtx.handleSubmit((values) => {
  emit('search', values)
})

defineProps<{
  categories: ProductSetList[]
}>()

const searchButtonColorTheme = useContrastColorFromCssVar('primary-color')
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  max-width: 600px;
  width: 100%;

  &__form {
    @include flex-row;
    align-items: center;
    gap: 22px;
    padding-left: 22px;
    background-color: $gray-color-300;
    border-radius: 23px;
  }

  &__separator {
    height: 32px;
    width: 2px;
    background-color: $gray-color-400;
  }

  &__input {
    background-color: $transparent;
    height: 100%;
    padding: 0;
    outline: none;
    border: none;
    font-size: rem(14);
    height: 46px;

    &--query {
      width: 100%;
    }

    &--select {
      background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjEuNDEgNC42NyAyLjQ4IDMuMTggMy41NCA0LjY3IDEuNDEgNC42NyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIzLjU0IDUuMzMgMi40OCA2LjgyIDEuNDEgNS4zMyAzLjU0IDUuMzMiLz48L3N2Zz4=)
        no-repeat 98% 50%;
      background-size: 14px;
      padding-right: 24px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
    }
  }

  &__button {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background-color: var(--primary-color);

    &--light {
      color: $white-color;
    }
  }

  &__history {
    margin-top: 6px;
    position: absolute;
    width: 100%;
    border-radius: 5px;
    border: solid 1px $gray-color-300;
  }
}
</style>
