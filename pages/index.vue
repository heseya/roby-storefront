<template>
  <div class="index-page">
    <div>
      <h1 class="index-page__title">{{ t('home.title') }}</h1>
      <br />
      <PaginationPerPageSelect v-model="perPage" />
      <br />
      <Pagination :current="currentPage" :total="totalPages" @go="(v) => (currentPage = v)" />
      <br />
      <ProductMiniature
        v-for="product in products?.data || []"
        :key="product.id"
        :product="product"
        style="margin-bottom: 80px"
      />
      <HomeLinkBox
        text="ZAPYTAJ O WYNAJEM"
        backgroundSrc="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
        link="rent"
        linkText="Zapytaj"
      />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "home": {
      "title": "***REMOVED***"
    }
  }
}
</i18n>

<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
const heseya = useHeseya()

const perPage = ref(24)
const currentPage = ref(1)
const totalPages = ref(40)

const { data: products } = useAsyncData('products', () => {
  return heseya.Products.get()
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
    font-weight: 600;
    font-size: 100px;
    color: var(--primary-color);
    letter-spacing: 1px;
  }
}
</style>
