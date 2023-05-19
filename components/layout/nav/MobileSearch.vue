<template>
  <div class="mobile-search">
    <form class="mobile-search__input-bar" @submit.prevent="onSubmit">
      <LayoutIconButton
        class="mobile-search__btn"
        type="button"
        :icon="ArrowBack"
        icon-size="sm"
        @click="onClose"
      />
      <input
        v-model="form.values.query"
        class="mobile-search__input"
        type="text"
        :placeholder="$t('custom.search')"
        name="query"
        autocomplete="off"
      />
      <LayoutIconButton class="mobile-search__btn" type="submit" icon-size="sm" :icon="Search" />
    </form>
    <LayoutNavSearchHistory v-show="searchHistory.queries.length" class="mobile-search__history" />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

import Search from '@/assets/icons/search.svg?component'
import ArrowBack from '@/assets/icons/arrow-back.svg?component'
import { SearchValues } from '@/components/layout/nav/Search.vue'
import { useSearchHistoryStore } from '@/store/searchHistory'

const { t: $t } = useI18n({ useScope: 'global' })

const searchHistory = useSearchHistoryStore()

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
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @include flex-column;
  background: $gray-color-100;

  @media ($viewport-12) {
    display: none;
  }

  &__input-bar {
    height: 60px;
    @include flex-row;
    align-items: center;
    background: $white-color;
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

  &__history {
    flex: 1;
    background-color: $gray-color-100;
  }
}
</style>
