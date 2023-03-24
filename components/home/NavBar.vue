<template>
  <div class="bar">
    <div class="bar__notification">
      <span class="notification__title"
        >Złóż zamówienie do 19.12, 18:00, aby prezenty trafiły pod choinkę na czas!</span
      >
      <LayoutIconButton class="notification__button" :icon="Close" />
    </div>
    <div class="bar__main">
      <img class="main__logo" src="@/assets/images/logo.svg?url" alt="***REMOVED***" />
      <LayoutSearch :categories="categories" />
      <div class="main__buttons"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'
import { SelectOption } from '~/components/layout/Search.vue'

const categories: SelectOption[] = [
  {
    label: 'Papier',
    value: 'papier',
  },
  {
    label: 'Papier1',
    value: 'papier1',
  },
  {
    label: 'Papier2',
    value: 'papier2',
  },
  {
    label: 'Papier3',
    value: 'papier3',
  },
]
</script>

<style lang="scss" scoped>
.bar {
  @include flex-column;

  &__notification {
    @include flex-row;
    justify-content: space-between;
    align-items: center;

    color: $white-color;
    background-color: $primary-color;
  }

  &__main {
    @include flex-row;
    padding: 54px 42px;
    align-items: center;
  }
}

.notification {
  &__title {
    flex: 1;
  }

  &__button {
    height: 40px;
    width: 40px;
    color: $white-color;
  }
}

.main {
  &__logo {
    height: 38px;
  }
}
</style>
