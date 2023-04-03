<template>
  <form class="mobile-search" @submit.prevent="onSubmit">
    <LayoutIconButton
      class="mobile-search__btn"
      type="button"
      :icon="ArrowBack"
      iconSize="sm"
      @click="onClose"
    />
    <input
      v-model="form.values.query"
      class="mobile-search__input"
      type="text"
      :placeholder="t('search')"
      name="query"
    />
    <LayoutIconButton class="mobile-search__btn" type="submit" iconSize="sm" :icon="Search" />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "search": "Czego szukasz?"
  }
}
</i18n>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

import Search from '@/assets/icons/search.svg?component'
import ArrowBack from '@/assets/icons/arrow-back.svg?component'
import { SearchValues } from '~/components/layout/nav/Search.vue'

const t = useLocalI18n()

const emit = defineEmits<{
  (event: 'search', values: SearchValues): void
  (event: 'close'): void
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

const onClose = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.mobile-search {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: $white-color;
  overflow: hidden;
  @include flex-row;
  align-items: center;

  @media ($viewport-12) {
    display: none;
  }

  &__btn {
    width: 44px;
    height: 44px;
    color: $gray-color-600;
  }

  &__input {
    height: 100%;
    flex: 1;
    padding: 0;
    outline: none;
    border: none;
    background: transparent;

    font-size: rem(14);
  }
}
</style>
