<template>
  <LayoutModal :open="open" :closeable="false">
    <div class="form-modal">
      <form class="form-modal__form" @submit.prevent="onSubmit">
        <div class="form-modal__header">{{ header }}</div>
        <div class="form-modal__content">
          <slot></slot>
        </div>

        <LayoutInfoBox v-if="error" type="danger" class="form-modal__error">
          {{ formatError(error) }}
        </LayoutInfoBox>
        <div class="form-modal__actions">
          <LayoutButton
            class="form-modal__button form-modal__button--cancel"
            :label="$t('common.cancel')"
            @click="emit('update:open', false)"
          />
          <LayoutButton
            class="form-modal__button"
            :label="okText || $t('common.save')"
            html-type="submit"
          />
        </div>
      </form>
    </div>
  </LayoutModal>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
const { t: $t } = useI18n({ useScope: 'global' })
const formatError = useErrorMessage()

const props = defineProps<{
  values: any
  open: boolean
  header: string
  okText?: string
  error?: any
}>()

const emit = defineEmits<{
  (e: 'update:open', isModalVisible: boolean): void
  (e: 'submit'): void
}>()

const form = useForm({ initialValues: props.values })

const onSubmit = form.handleSubmit(() => emit('submit'))
</script>

<style lang="scss" scoped>
.form-modal {
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: $gray-color-100;
  padding: 10px 0px;
  height: fit-content;

  &__header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__form {
    display: grid;
    height: 100%;
    padding: 10px 20px;
    height: fit-content;
  }

  &__form,
  &__content {
    display: grid;
    gap: 5px;

    @media ($viewport-11) {
      gap: 20px;
    }
  }

  &__content {
    margin: 10px 0px;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  &__button {
    width: 120px;

    @media ($viewport-8) {
      width: 200px;
    }

    &--cancel {
      background-color: $white-color;
      color: $text-color;
    }
  }

  &__error {
    color: $error-color;
    font-weight: bold;
    text-align: center;
  }
}
</style>
