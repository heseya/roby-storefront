<template>
  <button
    :class="['favorite-btn', { 'favorite-btn--active': isInWishlist }]"
    :variant="isInWishlist ? 'gray' : 'white'"
    @click.prevent="toggle"
  >
    <template v-if="isInWishlist">
      <HeartIcon class="favorite-btn__icon favorite-btn__icon--hover" />
      <FilledHeartIcon class="favorite-btn__icon" />
    </template>

    <template v-else>
      <HeartIcon class="favorite-btn__icon" />
      <FilledHeartIcon class="favorite-btn__icon favorite-btn__icon--hover" />
    </template>
  </button>
</template>

<script setup lang="ts">
import { ProductList } from '@heseya/store-core'

import HeartIcon from '@/assets/icons/heart.svg?component'
import FilledHeartIcon from '@/assets/icons/filled-heart.svg?component'

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

  &__icon {
    color: $gray-color-600;

    &--hover {
      display: none;
    }
  }

  &:hover {
    background-color: $gray-color-100;
  }

  &:hover &__icon:not(&__icon--hover) {
    display: none;
  }
  &:hover &__icon--hover {
    display: block;
  }
}
</style>
