<template>
  <div class="search-history">
    <div class="search-history__header-bar">
      <span class="search-history__header">{{ t('lastSearch') }}</span>
      <button class="search-history__button" @click="handleClear">{{ t('clear') }}</button>
    </div>
    <LazyClientOnly>
      <div class="search-history__link-list">
        <NuxtLink
          v-for="(query, index) in searchHistory.queries"
          :key="index"
          :to="localePath(`/search/${encodeURIComponent(query)}`)"
          class="search-history__link"
        >
          <LayoutIcon :icon="HistoryIcon" size="sm" class="search-history__icon" />
          <span>{{ query }}</span>
        </NuxtLink>
      </div>
    </LazyClientOnly>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "clear": "Wyczyść",
    "lastSearch": "Ostatnie wyszukiwania"
  },
  "en": {
    "clear": "Clear",
    "lastSearch": "Last searches"
  }
}
</i18n>

<script lang="ts" setup>
import HistoryIcon from '@/assets/icons/history.svg?component'
import { useSearchHistoryStore } from '@/store/searchHistory'

const t = useLocalI18n()
const localePath = useLocalePath()
const searchHistory = useSearchHistoryStore()

const handleClear = () => {
  searchHistory.clearHistory()
}
</script>

<style lang="scss" scoped>
.search-history {
  z-index: 1001;
  padding: 10px 0;
  max-height: calc(100vh - 130px);

  background-color: $white-color;

  @include flex-column;

  &__header-bar {
    @include flex-row;
    justify-content: space-between;

    padding: 0 22px 3px 22px;
  }

  &__header {
    font-size: rem(12);
    font-weight: $font-weight-medium;
    text-transform: uppercase;
  }

  &__button {
    all: unset;

    color: $blue-color-500;
    transition: color 200ms ease-in-out;
    font-weight: rem(12);

    &:hover {
      cursor: pointer;
      color: $blue-color-700;
    }
  }

  &__link-list {
    overflow: auto;
  }

  &__link {
    @include flex-row;
    padding: 10px 22px;
    gap: 12px;

    text-decoration: unset;
    color: $gray-color-900;
    transition: background-color 200ms ease-in-out;
    &:hover {
      background-color: $gray-color-100;
    }
  }

  &__icon {
    color: $gray-color-600;
  }
}
</style>
