<template>
  <div class="checkout-address-card">
    <h2 v-if="title" class="checkout-address-card__title">{{ title }}</h2>

    <div class="checkout-address-card__content">
      <span>{{ address.name }}</span>
      <span v-if="address.company_name">{{ address.company_name }}</span>
      <span>{{ address.phone }}</span>
      <span>{{ address.address }}</span>
      <span>{{ address.zip }} {{ address.city }}</span>
      <span v-if="address.vat">{{ $t('form.vat') }}: {{ address.vat }}</span>
      <span>{{ address.country_name }}</span>
    </div>

    <button
      v-if="!isBlocked"
      class="checkout-address-card__edit-btn"
      :title="$t('common.edit')"
      @click="emit('edit')"
    >
      <LayoutIcon class="checkout-address-card__edit-btn-icon" :size="14" :icon="PencilLine" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '@heseya/store-core'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const $t = useGlobalI18n()

const props = defineProps<{
  address: Address
  title?: string
  type?: 'billing' | 'shipping'
}>()
const { isModeB2B } = useSiteMode()
const isBlocked = computed(() => props.type === 'billing' && isModeB2B.value)

const emit = defineEmits<{
  (e: 'edit'): void
}>()
</script>

<style lang="scss" scoped>
.checkout-address-card {
  padding: 10px;
  font-size: rem(12);
  border-radius: 4px;
  background-color: $blue-color-100;
  margin-top: 16px;
  position: relative;

  &__title {
    font-weight: 600;
    font-size: rem(12);
    line-height: rem(16);
  }

  &__content {
    display: flex;
    flex-direction: column;
    line-height: rem(16);
  }

  &__edit-btn {
    background-color: $transparent;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    color: $blue-color-500;

    &:hover {
      color: var(--primary-color-alt);
    }
  }
}
</style>
