<template>
  <div v-if="cart.items.length" class="cart-preview">
    <div class="cart-preview__item-list">
      <div v-for="item in cart.items" :key="item.id" class="cart-preview-item">
        <Media width="100" class="cart-preview-item__cover" :media="item.coverMedia" />
        <div class="cart-preview-item__content">
          <span class="cart-preview-item__name">{{ item.name }}</span>
          <span class="cart-preview-item__brand">{{ productSubtext(item) }}</span>
          <div class="cart-preview-item__summary">
            <span class="cart-preview-item__quantity">{{ t('quantity') }} {{ item.qty }}</span>
            <span class="cart-preview-item__price">
              {{ formatAmount(item.totalPrice) }}
            </span>
          </div>
        </div>
        <LayoutIconButton
          class="cart-preview-item__remove-btn"
          :icon="CrossIcon"
          icon-size="sm"
          @click="handleRemove(item.id)"
        />
      </div>
    </div>
    <div class="cart-preview-summary">
      <span>{{ t('totalAmount') }}</span>
      <span class="cart-preview-summary__total">{{ formatAmount(cart.totalValue) }}</span>
    </div>
  </div>
  <div v-else class="cart-preview cart-preview--empty">{{ t('emptyCart') }}</div>
</template>

<i18n lang="json">
{
  "pl": {
    "quantity": "Ilość:",
    "totalAmount": "Łączna kwota",
    "emptyCart": "Twój koszyk jest pusty"
  }
}
</i18n>

<script setup lang="ts">
import { CartItem } from '@heseya/store-core'
import CrossIcon from '@/assets/icons/cross.svg?component'
import { useCartStore } from '@/store/cart'
import { PRODUCT_SUBTEXT_ATTRIBUTE_NAME } from '~/consts/subtextAttribute'

const t = useLocalI18n()
const cart = useCartStore()

const handleRemove = (id: string) => {
  cart.remove(id)
}

const productSubtext = (item: CartItem) => {
  // TODO: do not attribute from fixed string
  return item?.attributes.find((a) => a.name === PRODUCT_SUBTEXT_ATTRIBUTE_NAME)
    ?.selected_options[0]?.name
}
</script>

<style lang="scss" scoped>
.cart-preview {
  position: absolute;
  right: 0;
  width: 350px;
  max-height: calc(100vh - 130px);
  z-index: 1001;
  padding: 16px 0;

  @include flex-column;
  border: 1px solid $gray-color-300;
  background-color: $white-color;

  &--empty {
    text-align: center;
  }

  &__item-list {
    padding: 0 16px;
    height: 100%;
    overflow: auto;
    @include flex-column;
  }
}

.cart-preview-item {
  position: relative;
  @include flex-row;
  padding: 10px 0;
  gap: 10px;

  border-bottom: solid 1px $gray-color-400;

  &:last-child {
    border-bottom-color: transparent;
  }

  &__cover {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border: solid 1px $gray-color-300;
  }

  &__content {
    width: 100%;
    @include flex-column;
    gap: 8px;
  }

  &__name {
    padding-right: 24px;
  }

  &__brand {
    color: $gray-color-600;
  }

  &__summary {
    @include flex-row;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
  }

  &__remove-btn {
    position: absolute;
    top: 10px;
    right: 0;
  }
}

.cart-preview-summary {
  padding-top: 10px;
  margin: 0 16px;

  @include flex-row;
  justify-content: space-between;
  border-top: solid 1px $gray-color-400;

  &__total {
    font-weight: bold;
    font-size: rem(16);
    color: var(--primary-color);
  }
}
</style>
