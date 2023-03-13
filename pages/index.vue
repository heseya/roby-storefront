<template>
  <div class="index-page">
    <div>
      <h1 class="index-page__title">{{ t('home.title') }}</h1>
      <br />
      <br />
      <div v-for="product in products?.data || []" :key="product.id">
        <b>{{ product.name }}</b> -
        <span>już od {{ formatAmount(product.price_min) }}</span>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "home": {
      "title": "store-template"
    }
  }
}
</i18n>

<script setup lang="ts">
import { useStore } from '~/store'

const { t } = useI18n({
  useScope: 'local',
})
const store = useStore()

const { data: products } = useAsyncData('products', () => {
  return store.fetchProducts()
})
</script>

<style lang="scss" scoped>
.index-page {
  margin: 200px auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__title {
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: $primaryColor;
    letter-spacing: 1px;
  }
}
</style>
