<template>
  <LayoutModal :open="isOpen" hide-close @update:open="close">
    <div class="unavailable-modal">
      <template v-if="cartAge > MAX_CART_AGE">
        <span class="unavailable-modal__title">{{ t('cartAged.title') }}</span>
        <p class="unavailable-modal__text">
          {{ t('cartAged.text') }}
        </p>
      </template>
      <template v-else>
        <span class="unavailable-modal__title">{{ t('tooManyItems.title') }}</span>
        <p class="unavailable-modal__text">
          {{ t('tooManyItems.text') }}
        </p>
      </template>

      <p class="unavailable-modal__text">
        {{ t('productsRemoved') }}
      </p>

      <div class="unavailable-modal__products">
        <LazyCartItem v-for="(item, i) in items" :key="item.id + i" :item="(item as any)" static />
      </div>

      <LayoutButton type="purchase" class="unavailable-modal__btn" @click="close">
        {{ t('action') }}
      </LayoutButton>
    </div>
  </LayoutModal>
</template>

<i18n lang="json">
{
  "pl": {
    "cartAged": {
      "title": "Część z produktów przestała być dostępna",
      "text": "Niestety, od twojej poprzedniej wizyty, część produktów która znajdowała się w koszyku przestała być dostępna w żądanej ilości."
    },
    "tooManyItems": {
      "title": "Nie można dodać produktów do koszyka",
      "text": "Niestety, nie możemy dodać produków w żądanej ilości. Prawdopodobnie nie posiadamy na stanie wymaganej ilości. Spróbuj dodać mniejszą ilość."
    },
    "productsRemoved": "Poniżej znajduje się lista produktów, które zostały usunięte z koszyka.",
    "action": "Rozumiem"
  }
}
</i18n>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'

/**
 * If cart is older than 1 minute, we assume that it was created in a previous session. Therefore unavailable items probably stopped being available.
 * Otherwise, we assume that the user is trying to add too many items to the cart.
 */
const MAX_CART_AGE = 1000 * 60

const cart = useCartStore()
const t = useLocalI18n()

const items = computed(() => cart.unavailableItems)
const isOpen = computed(() => items.value.length > 0)

const cartAge = computed(
  () =>
    Date.now() - items.value.reduce((maxAge, item) => Math.max(maxAge, item.toJSON().createdAt), 0),
)

const close = () => {
  cart.unavailableItems = []
}
</script>

<style lang="scss" scoped>
.unavailable-modal {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ($viewport-10) {
    width: 800px;
  }

  &__title {
    width: 100%;
    font-weight: 600;
    font-size: rem(24);
    line-height: rem(36);
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: solid 1px $gray-color-300;
  }

  &__text {
    width: 100%;
    margin: 8px 0;
    font-size: rem(14);
  }

  &__products {
    margin: 16px 0;
  }

  &__btn {
    margin: 0 auto;
  }
}
</style>
