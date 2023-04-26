<template>
  <div v-if="products && products.length" class="cart-suggested">
    <LayoutHeader tag="h3" class="cart-suggested__header" variant="black">
      {{ t('title') }}
    </LayoutHeader>

    <HomeProductCarouselSimple
      class="cart-suggested__carousel"
      :products="products"
      :space-between="23"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Może Cię zainteresować"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

const { data: products } = useAsyncData('cart-suggested', async () => {
  const heseya = useHeseya()

  // TODO: maybe smarter?
  const page = Math.ceil(Math.random() * 6)
  const { data } = await heseya.Products.get({
    page,
    limit: 8,
    available: true,
  })
  return data
})
</script>

<style lang="scss" scoped>
.cart-suggested {
  &__header {
    text-align: left;
    font-size: rem(20);
    line-height: rem(20);
    margin-bottom: 18px;
  }
}
</style>
