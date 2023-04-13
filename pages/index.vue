<template>
  <div class="index-page">
    <HomeBanner v-if="data?.mainBanner" class="index-page__banner" :banner="data?.mainBanner" />

    <BaseContainer class="index-page__content">
      <HomeLinkBox
        text="Zapytaj o wynajem"
        background-src="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
        link="rent"
        link-text="Zapytaj"
      />
      <HomeWhyUs />
      <HomeImageCarousel
        v-for="banner in data?.homepageBanners"
        :key="banner.id"
        :banner="banner"
        :title="banner.name"
      />
      <HomeProductCarousel :category="category" />
    </BaseContainer>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Strona główna"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const heseya = useHeseya()

useHead({
  title: t('title'),
})

const category = {
  id: 'maincat',
  name: 'MainCategory',
  children: [
    { name: 'Category1', id: 'cat1' },
    {
      name: 'Category2',
      id: 'cat2',
    },
    {
      name: 'Category3',
      id: 'cat3',
    },
    {
      name: 'Category4',
      id: 'cat4',
    },
    {
      name: 'Category5',
      id: 'cat5',
    },
  ],
}

const { data } = useAsyncData('main-banner', async () => {
  const [mainBanner, { data: homepageBanners }] = await Promise.all([
    heseya.Banners.getOneBySlug('main-banner'),
    heseya.Banners.get({ metadata: { homepage: true } }),
  ])
  return { mainBanner, homepageBanners }
})
</script>

<style lang="scss" scoped>
.index-page {
  &__content {
    > * {
      margin-top: 50px;
    }
  }
}
</style>
