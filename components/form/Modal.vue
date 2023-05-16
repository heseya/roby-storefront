<template>
  <LayoutModal :open="open" :closeable="false" class="form-modal">
    <form class="form-modal__form" @submit.prevent="onSubmit">
      <h1>{{ header }}</h1>
      <slot></slot>
      <LayoutInfoBox v-if="error" type="danger" class="form-modal__error">
        {{ formatError(error) }}
      </LayoutInfoBox>
      <div class="form-modal__actions">
        <LayoutButton
          class="form-modal__button form-modal__button--cancel"
          :label="t('cancel')"
          @click="emit('update:open', false)"
        />
        <LayoutButton class="form-modal__button" :label="okText || t('save')" html-type="submit" />
      </div>
    </form>
  </LayoutModal>
</template>

<i18n lang="json">
{
  "pl": {
    "save": "Zapisz",
    "cancel": "Anuluj"
  }
}
</i18n>

<script setup lang="ts">
import { useForm } from 'vee-validate'
const t = useLocalI18n()
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
  &__form {
    display: grid;
    padding: 20px;
    gap: 20px;
    background-color: $gray-color-100;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  &__button {
    width: 200px;

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
