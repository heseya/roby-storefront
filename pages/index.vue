<template>
  <div class="index-page">
    <HomeBanner v-if="data?.mainBanner" class="index-page__banner" :banner="data?.mainBanner" />

    <BaseContainer class="index-page__content">
      <template v-for="section in sections">
        <HomeProductCarousel
          v-if="section.type === 'set'"
          :key="section.data.id"
          :category="section.data"
        />

        <HomeLinkBox v-if="section.type === 'box'" :key="section.data.text" :link="section.data" />
      </template>

      <HomeWhyUs />

      <HomeImageCarousel
        v-for="banner in data?.homepageBanners"
        :key="banner.id"
        :banner="banner"
        :title="banner.name"
        :gray-filter="banner.metadata.gray_filter"
      />
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
import { ProductSetList } from '@heseya/store-core'
import { LinkBox } from '~~/components/home/LinkBox.vue'

const t = useLocalI18n()
const heseya = useHeseya()

type Section = { type: 'set'; data: ProductSetList } | { type: 'box'; data: LinkBox }

useHead({
  title: t('title'),
})

const { data } = useAsyncData('main-banner', async () => {
  const [mainBanner, { data: homepageBanners }, { data: homepageSets }] = await Promise.all([
    heseya.Banners.getOneBySlug('main-banner'),
    heseya.Banners.get({ metadata: { homepage: true } }),
    heseya.ProductSets.get({ metadata: { homepage: true } }),
  ])
  return {
    mainBanner,
    homepageBanners,
    homepageSets,
  }
})

// TODO: maybe fetch from API? Directus?
const LINK_BOXES: LinkBox[] = [
  {
    text: 'Zapytaj o wynajem',
    src: 'https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg',
    link: '/rent',
    linkText: 'Zapytaj',
  },
  {
    text: 'Zapytaj o indywidualną ofertę',
    src: 'https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg',
    link: '/rent',
    linkText: 'Zapytaj',
  },
]

const sections = computed<Section[]>(() => {
  const sets =
    data.value?.homepageSets?.map((set) => ({
      type: 'set' as const,
      data: set,
    })) || []

  const boxes = LINK_BOXES.map((box) => ({
    type: 'box' as const,
    data: box,
  }))

  const length = Math.max(sets.length, boxes.length)
  return Array.from({ length }, (_, i) => [sets[i], boxes[i]])
    .flat()
    .filter(Boolean)
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
