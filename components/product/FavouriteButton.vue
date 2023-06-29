<template>
  <button
    :class="['favorite-btn', { 'favorite-btn--active': isInWishlist }]"
    :variant="isInWishlist ? 'gray' : 'white'"
    :title="t(isInWishlist ? 'remove' : 'add')"
    @click.prevent="toggle"
  >
    <LayoutIcon v-if="isInWishlist" :size="14" :icon="FilledHeartIcon" class="favorite-btn__icon" />
    <LayoutIcon v-else :size="14" :icon="HeartIcon" class="favorite-btn__icon" />
  </button>
</template>

<i18n lang="json">
{
  "pl": {
    "add": "Dodaj do listy życzeń",
    "remove": "Usuń z listy życzeń"
  },
  "en": {
    "add": "Add to wishlist",
    "remove": "Delete from wishlist"
  }
}
</i18n>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

import HeartIcon from '@/assets/icons/heart.svg?component'
import FilledHeartIcon from '@/assets/icons/filled-heart.svg?component'

const t = useLocalI18n()

const props = withDefaults(defineProps<{ product: ProductList }>(), {})

const { isInWishlist, toggle } = useWishlist(props.product)
</script>

<style lang="scss" scoped>
.favorite-btn {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 6px #0000000d;
  background-color: #fff;
  cursor: pointer;
  transition: 0.3s;
  padding: 0 !important;

  &__icon {
    color: $gray-color-600;
    margin: 0 auto;

    // @media (pointer: coarse) {
    //   transform: scale(1.6);
    // }
  }

  &:hover {
    background-color: $gray-color-100;
  }
}
</style>
