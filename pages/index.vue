<template>
  <div class="index-page">
    <div>
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
      <br />
      <HomeLinkBox
        text="ZAPYTAJ O WYNAJEM"
        background-src="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
        link="rent"
        link-text="Zapytaj"
      />
      <br />
      <HomeBanner />
      <br />
      <HomeWhyUs />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.index-page {
  margin: 24px auto;
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
