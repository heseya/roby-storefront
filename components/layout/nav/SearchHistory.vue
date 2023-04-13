<template>
  <div class="search-history">
    <div class="search-history__header-bar">
      <span class="search-history__header">Ostatnie wyszukiwania</span>
      <button class="search-history__button" @click="handleClear">Wyczyść</button>
    </div>
    <NuxtLink
      v-for="(query, index) in searchHistory.queries"
      :key="index"
      :to="`/search/${query}`"
      class="search-history__link"
    >
      <LayoutIcon :icon="HistoryIcon" size="sm" class="search-history__icon" />
      <span>{{ query }}</span>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import HistoryIcon from '@/assets/icons/history.svg?component'
import { useSearchHistoryStore } from '@/store/searchHistory'

const searchHistory = useSearchHistoryStore()

const handleClear = () => {
  searchHistory.clearHistory()
}
</script>

<style lang="scss" scoped>
.search-history {
  position: absolute;
  width: 450px; //todo change to dynamic
  z-index: 1001;
  padding: 10px 0;

  border-radius: 5px;
  border: solid 1px $gray-color-300;
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

    color: $blue-color;
    transition: color 200ms ease-in-out;
    font-weight: rem(12);

    &:hover {
      cursor: pointer;
      color: $unnamed-color-30475e;
    }
  }

  &__link {
    @include flex-row;
    padding: 10px 22px;
    gap: 12px;

    text-decoration: unset;
    color: $gray-color-900;
    transition: background-color 200ms ease-in-out;
    &:hover {
      background-color: $gray-color-050;
    }
  }

  &__icon {
    color: $gray-color-600;
  }
}
</style>
