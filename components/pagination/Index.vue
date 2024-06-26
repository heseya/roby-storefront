<template>
  <div class="pagination">
    <button
      class="pagination__button pagination__button--action"
      :class="{ 'pagination__button--disabled': current === 1 }"
      :aria-label="t('prev')"
      @click="prev"
    >
      <LayoutIcon :icon="ChevronRight" class="pagination__icon pagination__icon--rotated" />
    </button>

    <div class="pagination__content pagination__content--desktop">
      <button
        :class="['pagination__button', { 'pagination__button--active': 1 === current }]"
        :title="t('first')"
        @click="first"
      >
        1
      </button>

      <div v-if="current > pagesPadding" class="pagination__text">...</div>

      <button
        v-for="page in visiblePages"
        :key="page"
        :class="['pagination__button', { 'pagination__button--active': page === current }]"
        :title="t('go', { page })"
        @click="go(page)"
      >
        {{ page }}
      </button>

      <div v-if="current + pagesPadding < total - 1" class="pagination__text">...</div>

      <button
        v-if="total !== 1"
        :class="['pagination__button', { 'pagination__button--active': total === current }]"
        :title="t('last')"
        @click="last"
      >
        {{ total }}
      </button>
    </div>

    <div class="pagination__content pagination__content--mobile">
      <select
        class="pagination__button pagination__button--select"
        :value="current"
        @input="(ev: Event) => go(parseInt((ev.target as HTMLSelectElement)?.value || '1'))"
      >
        <option v-for="page in allPages" :key="page" :value="page">{{ page }}</option>
      </select>
      <div class="pagination__text">z {{ total }}</div>
    </div>

    <button
      class="pagination__button pagination__button--action"
      :class="{ 'pagination__button--disabled': current === total }"
      :aria-label="t('next')"
      @click="next"
    >
      <span class="pagination__button-text"> {{ t('next') }} </span>
      <LayoutIcon :icon="ChevronRight" class="pagination__icon" />
    </button>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "next": "Następna",
    "prev": "Poprzednia",
    "first": "Przejdź do pierwszej strony",
    "go": "Przejdź do strony {page}",
    "last": "Przejdź do ostatniej strony"
  },
  "en": {
    "next": "Next",
    "prev": "Previous",
    "first": "Go to the first page",
    "go": "Go to page {page}",
    "last": "Go to last page"
  }
}
</i18n>

<script setup lang="ts">
import ChevronRight from '@/assets/icons/chevron.svg?component'

const t = useLocalI18n()

const props = withDefaults(
  defineProps<{
    current: number
    total: number
  }>(),
  {},
)

const emit = defineEmits<{
  (e: 'go', page: number): void
}>()

/**
 * Returns the number of pages to show on each side of the current page.
 * Ex. if current page is 5, and pagesPadding is 2, then visible pages will be [3, 4, 5, 6, 7]
 */
const pagesPadding = 2

const allPages = computed(() => Array.from({ length: props.total }, (_v, k) => k + 1))

const visiblePages = computed(() =>
  Array.from({ length: pagesPadding * 2 + 1 }, (_v, k) => k + props.current - pagesPadding).filter(
    (page) => page > 1 && page < props.total,
  ),
)

const go = (page: number) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  emit('go', page)
}

const first = () => go(1)
const next = () => go(props.current + 1)
const prev = () => go(props.current - 1)
const last = () => go(props.total)
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: rem(13);

  &__content {
    display: flex;
    align-items: center;
    gap: 6px;

    &--mobile {
      @media ($viewport-8) {
        display: none;
      }
    }

    &--desktop {
      @media ($max-viewport-8) {
        display: none;
      }
    }
  }

  &__icon {
    width: 12px;
    height: 12px;
  }

  &__text {
    min-width: 36px;
    height: 36px;
    padding-top: 9px;
    text-align: center;
  }

  &__button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid $gray-color-300;
    min-width: 36px;
    height: 36px;
    border-radius: 18px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    text-align: -webkit-center;

    &:hover {
      border-color: $text-color;
    }

    &--disabled {
      color: $gray-color-400;
      pointer-events: none;
    }

    &--action {
      padding: 0 10px;
      background-color: $gray-color-300;

      &:hover {
        border-color: $gray-color-400;
        background-color: $gray-color-400;
      }
    }

    &--select {
      padding: 0 25px;
    }

    &--active {
      border-color: $text-color;
    }
  }

  &__button-text {
    display: none;

    @media ($viewport-8) {
      display: block;
    }
  }

  &__icon--rotated {
    transform: rotate(180deg);
  }
}
</style>
