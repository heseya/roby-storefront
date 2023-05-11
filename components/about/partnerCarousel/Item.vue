<template>
  <div class="item">
    <img class="item__image" :src="data.image" :alt="data.name" />
    <div>
      <span class="item__name">{{ data?.name }}</span>
      <span class="item__subname">{{ data?.subname ?? ' ' }}</span>
    </div>
    <span class="item__description"> {{ data.description }} </span>
  </div>
</template>

<script lang="ts" setup>
export interface PartnerProps {
  name: string
  subname?: string
  description: string
  image: string
}
defineProps<{ data: PartnerProps }>()
</script>

<style lang="scss" scoped>
.item {
  height: 100%;
  max-width: 275px;
  padding: 20px 16px;
  border-radius: 4px;
  border: 1px solid $gray-color-300;

  @include flex-column;
  align-items: center;
  gap: 32px;
  text-align: center;

  &__image {
    height: 150px;
    width: 150px;
  }

  &__name {
    display: block;
    margin-bottom: 6px;
    font-size: rem(18);
    font-weight: $font-weight-bold;
  }

  &__subname {
    white-space: pre;
    color: $gray-color-600;
  }

  &__description {
    @include flex-row;
    align-items: center;
    flex: 1;
    font-size: rem(16);
  }
}
</style>
