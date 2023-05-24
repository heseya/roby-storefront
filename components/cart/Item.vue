<template>
  <div class="cart-item">
    <Media width="120" class="cart-item__cover" :media="item.coverMedia" />

    <div class="cart-item__content">
      <div class="cart-item__main">
        <span class="cart-item__name">{{ item.name }}</span>
        <span v-for="[name, value] in item.variant" :key="name" class="cart-item__schema">
          {{ name }}: <b>{{ formatSchemaValue(value) }}</b>
        </span>
      </div>

      <ProductQuantityInput
        show-label
        :disabled="static"
        class="cart-item__quantity"
        :quantity="item.qty"
        @update:quantity="updateQuantity"
      />

      <div class="cart-item__price">
        <span v-if="item.totalInitialPrice !== item.totalPrice" class="cart-item__price-initial">
          {{ formatAmount(item.totalInitialPrice) }}
        </span>
        <span class="cart-item__price-current">{{ formatAmount(item.totalPrice) }}</span>
      </div>
    </div>

    <div v-if="!static" class="cart-item__actions">
      <LayoutIconButton
        :icon="CrossIcon"
        icon-size="sm"
        :title="t('cart.remove')"
        @click="removeFromCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItem } from '@heseya/store-core'
import CrossIcon from '@/assets/icons/cross.svg?component'
import { useCartStore } from '@/store/cart'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    item: CartItem
    static?: boolean
  }>(),
  {
    static: false,
  },
)

const cart = useCartStore()

const updateQuantity = (newQty: number) => {
  cart.setQuantity(props.item.id, newQty)
}

const removeFromCart = () => {
  cart.remove(props.item.id)
}

const formatSchemaValue = (value: string | undefined) => {
  if (value === 'true') return t('common.yes')
  if (value === 'false') return t('common.no')
  return value
}
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-gap: 20px;

  &__cover {
    width: 100px;
    height: 100px;
    border: solid 1px $gray-color-300;

    @media ($viewport-8) {
      width: 120px;
      height: 120px;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: start;
    grid-gap: 8px;

    @media ($viewport-8) {
      grid-template-columns: 5fr 2fr 3fr;
      grid-gap: 20px;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-weight: 600;
    font-size: rem(16);
    margin-bottom: 4px;
  }

  &__schema {
    font-size: rem(10);
    line-height: 1.2em;
    color: $gray-color-600;
  }

  &__quantity {
  }

  &__price {
    font-size: rem(16);

    @media ($viewport-8) {
      margin-left: auto;
    }
  }

  &__price-initial {
    text-decoration: line-through;
    margin-right: 8px;
  }

  &__price-current {
    font-weight: 600;
  }

  &__price-initial + &__price-current {
    color: var(--secondary-color);
  }

  &__btn {
    all: unset;
    cursor: pointer;
  }
}
</style>
