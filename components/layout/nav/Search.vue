<template>
  <form class="search" @submit.prevent="onSubmit">
    <input
      class="search__input"
      :placeholder="t('search')"
      v-model="form.values.query"
      name="query"
    />
    <div class="search__separator" />
    <select class="search__input" v-model="form.values.category" name="category">
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
import { useForm } from 'vee-validate'
import Search from '@/assets/icons/search.svg?component'

const t = useLocalI18n()

export interface SearchValues {
  query: string
  category: string
}

export interface SelectOption {
  label: string
  value: string
}

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

    font-size: rem(14);
  }

  &__button {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background-color: $secondary-color;
  }
}
</style>
