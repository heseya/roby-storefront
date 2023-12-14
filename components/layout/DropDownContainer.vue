<template>
  <div class="drop-down-container">
    <div
      :style="{
        maxHeight: (showButton && isExpanded ? slotHeight : minExpandHeight) + 'px',
      }"
      class="drop-down-container__slot"
      :class="{ 'drop-down-container__slot--disable-on-mobile': disableOnMobile }"
    >
      <div ref="slotRef">
        <slot />
      </div>
    </div>
    <LayoutDropDownButton
      v-show="showButton"
      v-model:expanded="isExpanded"
      class="drop-down-container__btn"
      :class="{ 'drop-down-container__btn-disable-on-mobile': disableOnMobile }"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    minExpandHeight?: number
    disableOnMobile?: boolean
  }>(),
  {
    minExpandHeight: 700,
    disableOnMobile: true,
  },
)

const isExpanded = ref(false)
const slotRef = ref<HTMLElement>()
const { height: slotHeight } = useElementSize(slotRef)
const showButton = computed(() => (slotHeight.value ?? 0) > props.minExpandHeight)
</script>

<style lang="scss" scoped>
.drop-down-container {
  &__slot {
    overflow: hidden;
    transition: max-height 500ms ease-in-out;

    &--disable-on-mobile {
      @media ($viewport-8) {
        max-height: 100% !important;
      }
    }
  }

  &__btn {
    &--disable-on-mobile {
      @media ($viewport-8) {
        display: none;
      }
    }
  }
}
</style>
