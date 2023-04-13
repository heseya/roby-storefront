<template>
  <div>
    <form class="search" @submit.prevent="onSubmit">
      <input
        v-model="form.values.query"
        class="search__input search__input--query"
        :placeholder="t('search')"
        name="query"
      />
      <div class="search__separator" />
      <select v-model="form.values.category" class="search__input" name="category">
        <option selected value="all">{{ t('allCategories') }}</option>
        <option v-for="{ name, slug } in categories" :key="slug" :value="slug">
          {{ name }}
        </option>
      </select>
      <LayoutIconButton icon-size="sm" class="search__button" :icon="Search" type="submit" />
    </form>
    <LayoutNavSearchHistory class="search__history" />
  </div>
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
import { useForm } from 'vee-validate'
import { ProductSetList } from '@heseya/store-core'

import Search from '@/assets/icons/search.svg?component'

export interface SearchValues {
  query: string
  category: string
}

const t = useLocalI18n()

const emit = defineEmits<{
  (event: 'search', values: SearchValues): void
}>()

const form = useForm({
  initialValues: {
    query: '',
    category: 'all',
  },
})

const onSubmit = form.handleSubmit((values) => {
  emit('search', values)
})

defineProps<{
  categories: ProductSetList[]
}>()
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  @include flex-row;
  width: 100%;
  max-width: 600px;
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
    padding: 0;
    outline: none;
    border: none;
    background: transparent;
    font-size: rem(14);

    &--query {
      width: 100%;
    }
  }

  &__button {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background-color: var(--secondary-color);
  }

  &__history {
    position: absolute;
    width: 450px; //todo change to dynamic
    border-radius: 5px;
    border: solid 1px $gray-color-300;
  }
}
</style>
