<template>
  <LayoutModal
    :open="open"
    class="address-modal"
    hide-close
    @update:open="(v) => emit('update:open', v)"
  >
    <div class="address-modal__wrapper">
      <span v-if="title" class="address-modal__title">{{ title }}</span>

      <div class="address-modal__content">
        <slot></slot>
      </div>

      <div class="address-modal__actions">
        <LayoutButton variant="white" @click="emit('update:open', false)">
          {{ t('common.cancel') }}
        </LayoutButton>
        <LayoutButton @click="emit('save')">{{ t('common.save') }}</LayoutButton>
      </div>
    </div>
  </LayoutModal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:open', isOpen: boolean): void
  (e: 'save'): void
}>()

const { t } = useI18n({ useScope: 'global' })
</script>

<style lang="scss" scoped>
.address-modal {
  :deep(.modal) {
    background-color: $gray-color-100;
  }

  &__wrapper {
    width: 100%;
    padding: 20px;
  }

  &__title {
    font-size: rem(20);
    font-weight: 500;
  }

  &__content {
    margin: 20px 0;
  }

  &__actions {
    padding: 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
}
</style>
