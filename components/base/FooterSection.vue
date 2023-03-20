<template>
  <section :class="['footer-section', { 'footer-section--last': last }]">
    <button class="footer-section__title" @click="isOpen = !isOpen">
      {{ props.title }}
      <ChevronIcon class="footer-section__title-icon" />
    </button>
    <div class="footer-section__content" :class="{ 'footer-section__content--open': isOpen }">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ChevronIcon from '@/assets/icons/chevron.svg?component'

const props = withDefaults(
  defineProps<{
    title: string
    last?: boolean
  }>(),
  {
    last: false,
  },
)

const isOpen = ref(false)
</script>

<style lang="scss">
.footer-section {
  &--last {
    border-bottom: solid 1px $gray-color-400;

    @media ($viewport-4) {
      border: none;
    }
  }

  &__title {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    text-transform: uppercase;
    font-weight: 600;
    font-size: rem(14);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 8px;
    border-top: solid 1px $gray-color-400;

    @media ($viewport-4) {
      cursor: default;
      padding: 0;
      border: none;
      margin-bottom: 16px;
    }
  }

  &__title-icon {
    width: 11px;
    margin-top: 4px;
    transform: rotate(90deg);

    @media ($viewport-4) {
      display: none;
    }
  }

  &__content {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s;
    padding: 0 8px;

    @media ($viewport-4) {
      padding: 0;
    }

    a {
      display: block;
      color: $text-color;
      text-decoration: none;
      transition: 0.3s;
      font-size: rem(14);

      &:not(:last-of-type) {
        margin-bottom: 12px;
      }

      &:hover {
        color: var(--primary-color);
      }
    }

    &--open {
      max-height: 300px;
      padding-bottom: 16px;
    }

    @media ($viewport-4) {
      max-height: 300px;
      padding-bottom: 16px;
    }
  }
}
</style>
