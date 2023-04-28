<template>
  <div class="item">
    <div class="item__question-container">
      <span class="item__question">{{ question }}</span>
      <LayoutIconButton
        class="item__arrow"
        :class="{ 'item__arrow--down': isOpen }"
        :icon="Chevron"
        :icon-size="12"
        @click="toggleOpen"
      />
    </div>
    <span class="item__answer" :class="{ 'item__answer--hide': !isOpen }">{{ answer }} </span>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'

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
  padding: 20px 0;
  @include flex-column;
  border-bottom: 1px solid $gray-color-300;
  overflow: hidden;

  &__question-container {
    @include flex-row;
    justify-content: space-between;
    align-items: center;
  }

  &__question {
    font-size: rem(16);
  }

  &__arrow {
    rotate: 90deg;
    transition: 200ms ease-in-out;

    &--down {
      transform: rotate(-180deg);
    }
  }

  &__answer {
    padding-top: 20px;
    font-size: rem(16);

    text-align: left;
    text-decoration: none;
    color: $gray-color-900;

    transition: all 200ms ease-in-out;

    &--hide {
      opacity: 0;
      height: 0;
      padding-top: 0;
    }
  }
}
</style>
