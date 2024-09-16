<template>
  <div v-if="cart.items.length" class="cart-preview">
    <div class="cart-preview__item-list">
      <SmartLink
        v-for="item in cart.items"
        :key="item.id"
        :to="`/product/${item.product.slug}`"
        class="cart-preview-item"
      >
        <Media width="100" class="cart-preview-item__cover" :media="item.coverMedia" />
        <div class="cart-preview-item__content">
          <span class="cart-preview-item__name">{{ item.name }}</span>
          <span class="cart-preview-item__brand">{{
            getProductSubtext(item, config.productSubtextAttr)
          }}</span>
          <div class="cart-preview-item__summary">
            <span class="cart-preview-item__quantity"
              >{{ $t('cart.quantity') }} {{ item.qty }}</span
            >
            <span class="cart-preview-item__price">
              {{ formatAmount(getDisplayedPrice(item.totalPrice).value, currency) }}
            </span>
          </div>
        </div>
        <LayoutIconButton
          class="cart-preview-item__remove-btn"
          :icon="CrossIcon"
          icon-size="sm"
          :title="$t('cart.remove')"
          @click.prevent="handleRemove(item.id)"
        />
      </SmartLink>
    </div>
    <div class="cart-preview-summary">
      <span>{{ $t('orders.totalAmount') }}</span>
      <span class="cart-preview-summary__total">{{
        formatAmount(getDisplayedPrice(cart.totalValue).value, currency)
      }}</span>
    </div>
  </div>
  <div v-else class="cart-preview cart-preview--empty">{{ $t('cart.empty') }}</div>
</template>

<script setup lang="ts">
import CrossIcon from '@/assets/icons/cross.svg?component'

import { useConfigStore } from '@/store/config'
import { useCartStore } from '@/store/cart'

const $t = useGlobalI18n()
const cart = useCartStore()
const config = useConfigStore()
const currency = useCurrency()
const { getDisplayedPrice } = useGetDisplayedPrice()

const handleRemove = (id: string) => {
  cart.remove(id)
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
  text-decoration: none;
  color: $text-color;

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
    transition: 0.3s;
  }

  &:hover &__name {
    color: var(--highlight-color);
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
    color: var(--secondary-color);
  }
}
</style>
