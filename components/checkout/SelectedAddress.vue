<template>
  <div class="selected-address">
    <span v-if="label" class="selected-address__label">{{ label }}</span>

    <template v-if="address">
      <span>{{ address.name }}</span>
      <span>{{ address.address }}</span>
      <span>{{ address.zip }} {{ address.city }}</span>
      <span>{{ address.country_name }}</span>
      <span v-if="address.vat">{{ t('vat') }}: {{ address.vat }}</span>
      <span> {{ t('phone') }}: {{ address.phone }}</span>
    </template>

    <span v-else class="selected-address__empty">{{ emptyText }}</span>

    <LayoutIconButton
      class="selected-address__btn"
      :icon="EditIcon"
      :icon-size="14"
      @click="emit('edit')"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "vat": "NIP",
    "phone": "Tel."
  }
}
</i18n>

<script setup lang="ts">
import { Address } from '@heseya/store-core'
import EditIcon from '@/assets/icons/pencil-line-filled.svg?component'

withDefaults(
  defineProps<{
    address: Address | null
    label?: string
    emptyText?: string
  }>(),
  {
    address: null,
    label: '',
    emptyText: '',
  },
)

const t = useLocalI18n()

const emit = defineEmits<{
  (event: 'edit'): void
}>()
</script>

<style lang="scss" scoped>
.selected-address {
  display: flex;
  flex-direction: column;
  background-color: $blue-color-100;
  border-radius: 4px;
  padding: 10px;
  font-size: rem(12);
  position: relative;

  &__label {
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__btn {
    color: $blue-color;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__empty {
    font-size: rem(14);
    color: $gray-color-600;
  }
}
</style>
