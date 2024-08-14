<template>
  <form class="billing-form" @submit.prevent="onSubmit">
    {{ form.values }}

    <LayoutButton html-type="submit" class="billing-form__btn" :label="t('finalize')" />
    <LayoutButton
      variant="gray"
      size="small"
      class="billing-form__btn"
      :label="$t('common.back')"
      @click="emit('back')"
    />
  </form>
</template>

<i18n lang="json">
{
  "pl": {
    "finalize": "Zakończ rejestrację"
  },
  "en": {
    "finalize": "Finalize registration"
  }
}
</i18n>

<script setup lang="ts">
import type { OrganizationRegisterDto } from '@heseya/store-core'
import { useForm } from 'vee-validate'

// import { EMPTY_ADDRESS } from '@/consts/address'

const t = useLocalI18n()

const props = withDefaults(
  defineProps<{
    initialValue?: OrganizationRegisterDto
  }>(),
  {
    initialValue: undefined,
  },
)

type ShippingAddressesForm = Pick<OrganizationRegisterDto, 'shipping_addresses'>

const form = useForm<ShippingAddressesForm>({
  initialValues: {
    shipping_addresses: props.initialValue?.shipping_addresses || [],
  },
})

const emit = defineEmits<{
  (event: 'submit', value: ShippingAddressesForm): void
  (event: 'back'): void
}>()

const onSubmit = form.handleSubmit(() => {
  emit('submit', form.values)
})
</script>

<style lang="scss" scoped>
.billing-form {
  &__btn {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
