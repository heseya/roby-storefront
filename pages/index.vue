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
    </BaseContainer>
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

const { data } = useAsyncData(async () => {
  const mainBanner = await heseya.Banners.getOneBySlug('main-banner')
  console.log('🚀 ~ file: index.vue:35 ~ const{data}=useAsyncData ~ mainBanner:', mainBanner)
  return { mainBanner }
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
