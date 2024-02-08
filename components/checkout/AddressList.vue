<template>
  <AddressList v-model:value="selectedSavedAddress" :type="type" />
</template>

<script setup lang="ts">
import type { Address, UserSavedAddress } from '@heseya/store-core'
import clone from 'lodash/clone'

// Without import, it assumes that it is recursive component
import AddressList from '@/components/address/List.vue'

const props = defineProps<{
  address: Address | null
  type: 'billing' | 'shipping'
}>()

const emit = defineEmits<{
  (e: 'update:address', value: Address | null): void
}>()

const { addresses } = useUserAddreses(props.type)

const selectedSavedAddress = computed({
  get(): UserSavedAddress | null {
    // We need to map the Address in checkout to UserSavedAddress interface that comes from API
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
