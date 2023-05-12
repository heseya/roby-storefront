<template>
  <AddressList v-model:value="selectedAddress" type="billing" />
</template>

<script setup lang="ts">
import { Address } from '@heseya/store-core'
import clone from 'lodash/clone'

const props = defineProps<{
  address: Address | null
  type: 'billing' | 'shipping'
}>()

const emit = defineEmits<{
  (e: 'update:address', value: Address | null): void
}>()

const { addresses } = useUserAddreses(props.type)

const selectedAddress = computed({
  get() {
    return addresses.value.find((a) => a.address.id === props.address?.id) || null
  },
  set(value) {
    if (value) emit('update:address', clone(value.address))
  },
})
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
