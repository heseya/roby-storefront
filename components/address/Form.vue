<template>
  <FormInput
    :model-value="address.address"
    name="address.address"
    :label="'adres'"
    rules="required"
    @update:model-value="(v) => update('address', v as string)"
  />
</template>

<script setup lang="ts">
import { Address, UserSavedAddressCreateDto } from '@heseya/store-core'

const props = defineProps<{
  address: Address
}>()

const emit = defineEmits<{
  (e: 'update:open', form: Address): void
}>()

const update = (xd: string, value: string) => {
  emit('update:open', { ...props.address, [xd]: value })
}
</script>
