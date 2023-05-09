<template>
  <div class="info-card">
    <span class="info-card__title">{{ data.name }}</span>
    <span class="info-card__email">{{ data.email }}</span>
    <span v-for="(number, index) in data.phones" :key="index">{{ number }}</span>
  </div>
</template>

<script lang="ts" setup>
export interface InfoCardProps {
  name: string
  email: string
  phones: string[]
}

defineProps<{ data: InfoCardProps }>()
</script>

<style lang="scss" scoped>
.info-card {
  flex: 1;
  @include flex-column;
  padding: 12px 16px;
  border: solid 1px $gray-color-300;
  border-radius: 4px;

  &__title {
    text-transform: uppercase;
    font-weight: bold;
  }

  &__email {
    color: var(--primary-color);
  }
}
</style>
