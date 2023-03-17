<template>
  <div class="product-page">
    <div class="product-page__header">
      <ProductPageCover class="product-page__gallery" :media="product?.gallery || []" />

      <div class="product-page__summary">
        {{ product }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const heseya = useHeseya()
const route = useRoute()

const { data: product } = useAsyncData('product', async () => {
  try {
    return await heseya.Products.getOneBySlug(route.params.slug as string)
  } catch (e: any) {
    if (e?.response?.status === 404)
      showError({ message: 'Podany produkt nie istnieje', statusCode: 404 })
    else showError({ message: e.statusCode, statusCode: 500 })
    return null
  }
})
</script>

<style lang="scss" scoped>
.product-page {
  max-width: $container-width;
  margin: 0 auto;
  padding: $container-padding;

  @media ($viewport-13) {
    padding: 0;
  }

  &__header {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr;

    @media ($viewport-10) {
      grid-gap: 46px;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
