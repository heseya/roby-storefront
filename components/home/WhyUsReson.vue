<template>
  <div class="reason">
    <div class="reason__icon-container">
      <img :src="imageUrl" role="presentation" class="reason__icon" />
    </div>
    <span class="reason__title">{{ reason.name }}</span>
    <span class="reason__description">{{ reason.description }}</span>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedWhyUsReason } from '~/interfaces/whyUsComponent'

const props = defineProps<{
  reason: TranslatedWhyUsReason
}>()

const imageUrl = computed(() => getImageUrl(props.reason.icon))
</script>

<style lang="scss" scoped>
.reason {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  color: $gray-color-900;
  font-size: rem(14);

  &__title {
    font-weight: bold;
    text-transform: uppercase;
  }

  &__icon {
    height: 34px;
    width: 43px;
    object-fit: contain;
  }

  &__icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 68px;
    width: 68px;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: -1;
      background-color: var(--secondary-color);
      opacity: 0.1;
    }
  }
}
</style>
