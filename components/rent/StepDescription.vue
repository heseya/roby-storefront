<template>
  <div class="step-description">
    <div class="step-description__line-container">
      <div class="step-description__line" />
    </div>
    <div class="step-description__content">
      <span>{{ description }}</span>
      <LayoutButton
        v-if="sendForm"
        class="step-description__button"
        :label="t('fillForm')"
        @click="emit('action')"
      />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "fillForm": "Wypelnij formularz"
  }
}
</i18n>

<script setup lang="ts">
defineProps<{
  description: string
  sendForm?: boolean
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()

const t = useLocalI18n()
</script>

<style lang="scss" scoped>
.step-description {
  @include flex-row;
  gap: 22px;
  align-items: center;

  &__line-container {
    height: 100%;
    width: 30px;

    flex-shrink: 0;
    @include flex-column;
    align-items: center;
  }

  &__line {
    height: 100%;
    border-left: 1px dashed var(--primary-color-alt);
  }

  &__button {
    max-width: 200px;
  }

  &__content {
    flex: 1;

    @include flex-column;
    gap: 12px;
    font-size: rem(16);

    @media ($max-viewport-9) {
      font-size: rem(14);
    }
  }
}
</style>
