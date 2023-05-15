<template>
  <div class="drop-down-container">
    <div
      :style="{
        maxHeight: (showButton && isExpand ? slotRef?.clientHeight : minExpandHeight) + 'px',
      }"
      class="drop-down-container__slot"
    >
      <div ref="slotRef">
        <slot />
      </div>
    </div>
    <button
      v-show="showButton"
      class="drop-down-container__button"
      :class="{ 'drop-down-container__button--expand': isExpand }"
      @click="isExpand = !isExpand"
    >
      {{ isExpand ? t('collapse') : t('expand') }}
      <LayoutIcon
        class="drop-down-container__button-icon"
        :class="{ 'drop-down-container__button-icon--expand': isExpand }"
        :icon="Chevron"
        :size="8"
      />
    </button>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "expand": "Rozwiń",
    "collapse": "Zwiń"
  }
}
</i18n>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'
const t = useLocalI18n()

const isExpand = ref(false)

const slotRef = ref<HTMLElement>()

const showButton = computed(() => (slotRef.value?.clientHeight ?? 0) > props.minExpandHeight)

const props = withDefaults(defineProps<{ minExpandHeight?: number }>(), { minExpandHeight: 700 })
</script>

<style lang="scss" scoped>
.drop-down-container {
  &__slot {
    overflow: hidden;
    transition: max-height 500ms ease-in-out;

    @media ($viewport-8) {
      max-height: 100% !important;
    }
  }

  &__button {
    @include reset-button;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 8px;

    @include flex-row;
    gap: 4px;
    align-items: center;
    justify-content: center;

    background-color: $white-color;
    box-shadow: 0 -20px 16px $white-color;
    transition: all 500ms ease-in-out;

    color: $blue-color;

    &--expand {
      box-shadow: none;
    }

    &:hover {
      cursor: pointer;
    }

    @media ($viewport-8) {
      display: none;
    }
  }
  &__button-icon {
    color: $blue-color;
    transform: rotate(90deg);
    transition: all 500ms ease-in-out;

    &--expand {
      transform: rotate(-90deg);
    }
  }
}
</style>
