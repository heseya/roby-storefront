<template>
  <div class="item">
    <div class="item__question-container">
      <span class="item__question">{{ question }}</span>
      <LayoutIconButton
        class="item__arrow"
        :class="{ 'item__arrow--down': isOpen }"
        :icon="Chevron"
        :icon-size="12"
        :title="t(isOpen ? 'hide' : 'show')"
        @click="toggleOpen"
      />
    </div>
    <span class="item__answer" :class="{ 'item__answer--hide': !isOpen }">{{ answer }} </span>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "hide": "Ukryj odpowiedź",
    "show": "Pokaż odpowiedź"
  },
  "en": {
    "hide": "Hide answer",
    "show": "Show answer"
  }
}
</i18n>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'

const t = useLocalI18n()

defineProps<{
  question: string
  answer: string
}>()

const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
.item {
  padding: 16px 0;
  @include flex-column;
  border-bottom: 1px solid $gray-color-300;
  overflow: hidden;

  &__question-container {
    @include flex-row;
    justify-content: space-between;
    align-items: center;
  }

  &__question {
    @media ($viewport-9) {
      font-size: rem(16);
    }
  }

  &__arrow {
    padding: 8px;
    rotate: 90deg;
    transition: 200ms ease-in-out;

    &--down {
      transform: rotate(-180deg);
    }
  }

  &__answer {
    padding-top: 20px;
    text-align: left;
    text-decoration: none;
    color: $gray-color-900;
    transition: all 200ms ease-in-out;

    @media ($viewport-9) {
      font-size: rem(16);
    }

    &--hide {
      opacity: 0;
      height: 0;
      padding-top: 0;
    }
  }
}
</style>
